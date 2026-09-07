CREATE TABLE IF NOT EXISTS comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL,
  author TEXT NOT NULL,
  body TEXT NOT NULL,
  parent_id INTEGER,
  status TEXT NOT NULL DEFAULT 'approved' CHECK(status IN ('approved','pending','spam')),
  visitor_hash TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(parent_id) REFERENCES comments(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_comments_slug_status_created
ON comments(slug, status, created_at);

CREATE TABLE IF NOT EXISTS reactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  comment_id INTEGER NOT NULL,
  reaction TEXT NOT NULL DEFAULT 'like',
  visitor_hash TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(comment_id, reaction, visitor_hash),
  FOREIGN KEY(comment_id) REFERENCES comments(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_reactions_comment
ON reactions(comment_id, reaction);
