const json = (data, status = 200, extra = {}) => new Response(JSON.stringify(data), {
  status,
  headers: { 'content-type': 'application/json; charset=utf-8', ...extra },
});

function cors(origin, allowedOrigin) {
  const allowed = origin === allowedOrigin;
  return {
    'access-control-allow-origin': allowed ? origin : allowedOrigin,
    'access-control-allow-methods': 'GET,POST,OPTIONS',
    'access-control-allow-headers': 'content-type',
    'vary': 'Origin',
  };
}

function cleanText(value, max) {
  return String(value ?? '').trim().replace(/\0/g, '').slice(0, max);
}

async function hashVisitor(request) {
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const ua = request.headers.get('user-agent') || '';
  const data = new TextEncoder().encode(`${ip}|${ua}`);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(hash)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get('origin') || '';
    const allowedOrigin = env.ALLOWED_ORIGIN || 'https://maheswaran-pasupathi.github.io';
    const corsHeaders = cors(origin, allowedOrigin);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (url.pathname === '/health') return json({ ok: true }, 200, corsHeaders);

    if (url.pathname === '/comments' && request.method === 'GET') {
      const slug = cleanText(url.searchParams.get('slug'), 240);
      if (!slug) return json({ error: 'Missing slug' }, 400, corsHeaders);
      const { results } = await env.DB.prepare(`
        SELECT id, slug, author, body, parent_id, created_at,
               COALESCE((SELECT COUNT(*) FROM reactions r WHERE r.comment_id = comments.id AND r.reaction = 'like'), 0) AS likes
        FROM comments
        WHERE slug = ? AND status = 'approved'
        ORDER BY created_at ASC
      `).bind(slug).all();
      return json({ comments: results || [] }, 200, corsHeaders);
    }

    if (url.pathname === '/comments' && request.method === 'POST') {
      if (origin && origin !== allowedOrigin) return json({ error: 'Origin not allowed' }, 403, corsHeaders);
      const body = await request.json().catch(() => ({}));
      const slug = cleanText(body.slug, 240);
      const author = cleanText(body.author, 80) || 'Guest';
      const text = cleanText(body.body, 3000);
      const parentId = body.parent_id ? Number(body.parent_id) : null;
      if (!slug || !text) return json({ error: 'Slug and comment are required' }, 400, corsHeaders);
      if (parentId && (!Number.isInteger(parentId) || parentId < 1)) return json({ error: 'Invalid parent_id' }, 400, corsHeaders);

      const visitorHash = await hashVisitor(request);
      const recent = await env.DB.prepare(`SELECT COUNT(*) AS n FROM comments WHERE visitor_hash = ? AND created_at > datetime('now','-10 minutes')`).bind(visitorHash).first();
      if ((recent?.n || 0) >= 5) return json({ error: 'Please wait before posting more comments.' }, 429, corsHeaders);

      const status = env.MODERATION === 'on' ? 'pending' : 'approved';
      const result = await env.DB.prepare(`
        INSERT INTO comments (slug, author, body, parent_id, status, visitor_hash)
        VALUES (?, ?, ?, ?, ?, ?)
      `).bind(slug, author, text, parentId, status, visitorHash).run();

      return json({ ok: true, id: result.meta.last_row_id, status }, 201, corsHeaders);
    }

    if (url.pathname === '/react' && request.method === 'POST') {
      if (origin && origin !== allowedOrigin) return json({ error: 'Origin not allowed' }, 403, corsHeaders);
      const body = await request.json().catch(() => ({}));
      const commentId = Number(body.comment_id);
      if (!Number.isInteger(commentId) || commentId < 1) return json({ error: 'Invalid comment_id' }, 400, corsHeaders);
      const visitorHash = await hashVisitor(request);
      try {
        await env.DB.prepare(`INSERT INTO reactions (comment_id, reaction, visitor_hash) VALUES (?, 'like', ?)`).bind(commentId, visitorHash).run();
      } catch {
        await env.DB.prepare(`DELETE FROM reactions WHERE comment_id = ? AND reaction = 'like' AND visitor_hash = ?`).bind(commentId, visitorHash).run();
      }
      const row = await env.DB.prepare(`SELECT COUNT(*) AS likes FROM reactions WHERE comment_id = ? AND reaction = 'like'`).bind(commentId).first();
      return json({ ok: true, likes: row?.likes || 0 }, 200, corsHeaders);
    }

    return json({ error: 'Not found' }, 404, corsHeaders);
  },
};
