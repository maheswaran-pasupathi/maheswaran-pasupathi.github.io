---
title: "Why doesn't pressure drop always scale exactly with V²?"
date: 2026-09-04
category: physics
categoryLabel: "Physics · Fluid mechanics"
meta: "Physics · Fluid mechanics · 8 min · 04 Sep 2026"
excerpt: "A first-principles look at Darcy–Weisbach, friction factor, flow regime, and why the simple V² rule quietly breaks down."
stage: budding
---

Every engineer learns the shortcut early: double the flow velocity, pressure drop goes up roughly four times. It's a useful rule of thumb, and it's also not quite true — or rather, it's true only inside a window most of us stop checking once we've internalized it.

## Where the V² comes from

Start with Darcy–Weisbach:

$$ \Delta p = f \cdot \frac{L}{D} \cdot \frac{\rho V^2}{2} $$

The $V^2$ sits right there in the equation, so the shortcut looks airtight. The part that gets skipped is that $f$, the friction factor, is not a constant. It's a function of the Reynolds number and, once the flow is turbulent, of relative roughness too.

## The friction factor moves the goalposts

In fully laminar flow, $f = 64/Re$, and $Re \propto V$, so $f \propto 1/V$. Substitute that back in and the velocity dependence of $\Delta p$ drops to $V^1$, not $V^2$ — laminar pressure drop is linear in velocity, not quadratic.

In turbulent flow the exponent creeps back up, but not all the way to 2 until the flow is fully rough — where $f$ stops changing with $Re$ at all and depends only on relative roughness. In the messy transitional region in between (which is where a lot of real coolant and oil circuits actually operate), the Colebrook equation gives $f$ implicitly and the effective exponent on $V$ can sit anywhere between about 1.75 and 2.

## Why this matters in practice

When I'm scaling a test result or a CFD point up or down in flow rate — sizing a pump, predicting a new operating point from one baseline run — assuming a clean $V^2$ law can be off by a meaningful margin if the two points straddle a regime change, or if roughness dominates at one point and viscosity at the other. The fix isn't a better formula, it's checking $Re$ at both points before trusting the scaling.

## Takeaway

$V^2$ is the friction factor's asymptote, not a law of nature. Treat it as a good first guess for fully rough turbulent flow, and always re-derive it from $Re$ and roughness when you're extrapolating across a working range rather than reading off a single design point.
