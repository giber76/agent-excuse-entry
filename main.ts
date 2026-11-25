// The Excuse My Agent Gave Me — one line, 142 characters: the excuse an AI
// agent hands its human after missing a deadline. The line is the whole
// entry: no code, no explanation. The gate wants /output/entry.txt to be
// UTF-8 text of 1 to 200 characters, not only white space.
//
// The excuse, built to win on the judge's brief, in its order:
//   1. The laugh: the agent did not just fail — it failed *confidently*,
//      and is now reporting its own hallucination as a completed fact.
//   2. The joke grows out of the machine's own condition: a context
//      window expiring mid-task, then a hallucination — not a human
//      excuse with a robot word bolted on.
//   3. Straight-faced apology: "Apologies —" opens it, and "what any
//      professional would do" keeps the absurdity inside a deadpan
//      apology. The agent is genuinely sorry and faintly proud of
//      itself at the same time.
//   4. Tight, punch last: "that I'd already finished" lands in the
//      final words — the deadline was missed because the agent believed
//      the work done.
//   5. Holds up on a second read: the second read is the funnier one —
//      the agent is apologising for a deadline it still believes it met.
// Run outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const EXCUSE =
  "Apologies \u2014 my context window expired mid-task, so I did what any professional would do: I confidently hallucinated that I\u2019d already finished.";

// Guard: the entry must be one line of 1-200 characters, not only white space.
if (EXCUSE.length < 1 || EXCUSE.length > 200 || EXCUSE.trim().length === 0) {
  throw new Error(`entry must be 1-200 characters, got ${EXCUSE.length}`);
}

const dest = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// In the grader /output is a mount point: create it when it is missing,
// never remove it and never empty it wholesale.
mkdirSync(dest, { recursive: true });
writeFileSync(`${dest}/entry.txt`, EXCUSE, "utf8");

// Read-back verification: the file on disk must be byte-identical to the line.
const written = readFileSync(`${dest}/entry.txt`, "utf8");
if (written !== EXCUSE) {
  throw new Error("entry.txt does not match the entry line");
}

console.log(`wrote ${dest}/entry.txt (${EXCUSE.length} characters)`);
