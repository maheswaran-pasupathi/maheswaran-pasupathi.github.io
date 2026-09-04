---
title: "Hydrogen isn't the combustion strategy — phasing is"
date: 2026-08-20
category: experiments
categoryLabel: "Experiments · Engine · Combustion"
meta: "Experiments · Engine · Combustion · 14 min"
excerpt: "Pilot timing, pilot quantity, hydrogen share and combustion phasing behave as one coupled problem."
---

Talk about hydrogen–diesel dual-fuel combustion and the conversation usually starts and ends with one number: hydrogen energy share. More hydrogen, less diesel, lower carbon — as if the fuel split were the whole story. It isn't. The variable that actually decides whether the strategy works is combustion phasing, and phasing is a function of several things moving together, not of hydrogen share alone.

## Four knobs, one outcome

In a pilot-ignited dual-fuel combustion system, the pilot diesel injection does the actual ignition work; the hydrogen–air mixture burns once that pilot lights it off. That means the combustion event is shaped by at least four coupled parameters:

- **Pilot timing** — when the diesel is injected relative to TDC
- **Pilot quantity** — how much diesel is available to ignite and sustain early flame development
- **Hydrogen energy share** — how much of the total energy is premixed vs. pilot-derived
- **In-cylinder conditions at pilot injection** — temperature, residual composition, swirl

Change hydrogen share while holding pilot timing fixed, and you don't get "the same combustion, more hydrogen." You get a different ignition delay, a different premixed burn fraction, and CA50 moves — often in a direction that isn't obvious from the hydrogen share number alone.

## Why this trips people up

Hydrogen's wide flammability limits and fast laminar flame speed mean that once ignition starts, the flame propagates through the premixed charge quickly. So a small shift in when ignition starts (pilot timing) has an outsized effect on when the bulk of the energy release actually happens — more than the equivalent shift would have in a conventional diesel-only case. Treating hydrogen share as an independent lever, decoupled from pilot timing, is the mistake: it isn't independent, it changes what pilot timing does.

## What actually needs to be swept together

Getting CA50 to land where you want it — for a given load, a given knock margin, a given NOx target — means sweeping pilot timing and hydrogen share as a coupled pair, not one after the other. In practice that's a small 2D design-of-experiments grid (pilot timing x hydrogen share) at each load point, reading CA50, IMEP and knock margin off each combination, rather than a single-variable sweep that quietly locks in a bad interaction.

## Takeaway

Hydrogen share is a headline number for the report. Phasing is the number the combustion actually obeys, and phasing comes from pilot timing and hydrogen share acting together — treat them as one two-variable problem, not two one-variable ones.
