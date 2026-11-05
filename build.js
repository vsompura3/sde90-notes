// Generates STUDY_PLAN.md from plan-data.js.   Usage: node build.js
const fs = require("fs");
const path = require("path");
const PLAN = require("./plan-data.js");

const out = [];
const p = (s = "") => out.push(s);
const G = PLAN.guide, MC = PLAN.machine, FL = PLAN.flagship, CO = require("./concepts-data.js");
const totalHours = PLAN.days.reduce((s, d) => s + d.tasks.reduce((a, t) => a + t.hrs, 0), 0);
const coreHours = PLAN.days.filter(d => d.day <= PLAN.meta.studyDays).reduce((s, d) => s + d.tasks.reduce((a, t) => a + t.hrs, 0), 0);

p(`# ${PLAN.meta.title}`);
p();
p(`> Frontend dev -> well-rounded SDE: advanced JS, Node internals, backend, DBMS/SQL, DSA (from zero), LLD/HLD, machine-coding rounds (frontend + backend), DevOps, AI/ML (RAG, vector DBs, pipelines) and AWS.`);
p(`> Budget: **2h per short session, ~6.5h per long session** (~23h/week). **${PLAN.meta.studyDays} study days** (~${Math.round(coreHours)}h) + a **${PLAN.meta.flagshipDays}-day flagship project, Beacon** (~${Math.round(totalHours - coreHours)}h) = **${PLAN.meta.totalDays} days**.`);
p(`> Interactive tracker: open **tracker.html**. Edit content in **plan-data.js**, then run \`node build.js\` to regenerate this file.`);
p();
p(`---`);
p();

/* ---------- 0. How to follow ---------- */
p(`## 0. How To Follow This Plan (read before Day 1)`);
p();
p(G.intro);
p();
p(`### Step 0: pre-flight (do once, about 2 hours)`);
G.preflight.forEach(([a, b], i) => p(`${i + 1}. **${a}.** ${b}`));
p();
p(`### What a short session looks like (2 h)`);
G.shortSession.forEach(([a, b]) => p(`- **${a}:** ${b}`));
p();
p(`### What a long session looks like (about 6.5 h)`);
G.longSession.forEach(([a, b]) => p(`- **${a}:** ${b}`));
p();
p(`### The weekly cycle`);
G.weekCycle.forEach(([a, b]) => p(`- **${a}:** ${b}`));
p();
p(`### How to do the DSA part (even from zero)`);
G.dsaMethod.forEach(([a, b], i) => p(`${i + 1}. **${a}.** ${b}`));
p();
p(`### How to do a project`);
G.projectMethod.forEach(([a, b], i) => p(`${i + 1}. **${a}.** ${b}`));
p();
p(`### Ground rules`);
G.rules.forEach(r => p(`- ${r}`));
p();
p(`### FAQ`);
G.faq.forEach(([q, a]) => { p(`**${q}**  `); p(a); p(); });

p(`### Session structure`);
p(`| Session | Time | Split |`);
p(`|---|---|---|`);
p(`| Short (days 1-5 of each week) | 2h | 1h **DSA** + 1h **Learn**. In the revision/cloud blocks: 30m DSA + 1h30 Learn. |`);
p(`| Long A (day 6) | ~6.5h | 2h deep-dive + 1.5h DSA patterns + 2.5h project + 30m notes |`);
p(`| Long B (day 7) | ~6.5h | 2.5h project + **1.5h machine coding (timed)** + 1h timed DSA + 1h learn + 30m weekly review |`);
p(`| Flagship short (Days 101-140) | 2h | 30m learn + 1h30 building Beacon. DSA moves to the weekends to keep the flagship moving. |`);
p(`| Flagship long (Days 101-140) | ~6.5h | Sat: 1h learn + 4h build + 1h DSA + 30m review. Sun: 3h30 build + 1h30 machine coding + 1h DSA + 30m review. |`);
p();
p(`> Days are **sessions, not calendar dates**. Do them on any days you choose, skip festivals or busy weeks, and resume at the next unfinished day. If your "6-7 hours" is the weekend **total**, keep the learning and machine coding and let each project run about a week longer.`);
p();

p(`### DSA ladder (beginner -> interview-ready)`);
p(`| Weeks | Topics | ~Problems |`);
p(`|---|---|---|`);
p(`| 1-2 | Big-O, arrays, hashing, prefix sums, two pointers, sliding window, binary search | 35 |`);
p(`| 3-4 | Linked lists, stacks, queues, monotonic stack, recursion, backtracking, sorting | 40 |`);
p(`| 5-6 | Trees, BST, heaps, tries, intervals, greedy | 45 |`);
p(`| 7-8 | Graphs (BFS/DFS, topo, union-find, Dijkstra, MST), DP 1D & 2D | 50 |`);
p(`| 9-10 | 2D DP, bit manipulation, math, hard revisions, contest simulation | 40 |`);
p(`| 11-13 | Mixed timed sets, weak-list revision, mocks | 30+ |`);
p(`Target about **200+ problems** (NeetCode 150 core + extras). Free resources: NeetCode roadmap, LeetCode, Striver A2Z sheet, Grokking Algorithms (book).`);
p();

p(`### Phase overview`);
p(`| Phase | Weeks | Days | Theme | You can... |`);
p(`|---|---|---|---|---|`);
for (const ph of PLAN.phases) {
  const ws = PLAN.weeks.filter(w => w.phase === ph.id);
  p(`| ${ph.id} | ${ph.weeks.join("-")} | ${ws[0].dayRange[0]}-${ws[ws.length - 1].dayRange[1]} | **${ph.name}**: ${ph.goal} | ${ph.outcome} |`);
}
p();
p(`### Projects at a glance`);
p(`| ID | Project | Weeks | Stack |`);
p(`|---|---|---|---|`);
for (const pr of PLAN.projects) p(`| ${pr.id} | ${pr.name} | ${pr.weeks[0] === pr.weeks[1] ? pr.weeks[0] : pr.weeks.join("-")} | ${pr.stack} |`);
p();
p(`---`);
p();

/* ---------- weeks ---------- */
for (const ph of PLAN.phases) {
  p(`# Phase ${ph.id}: ${ph.name}`);
  p(`*${ph.goal}*`);
  p();
  for (const w of PLAN.weeks.filter(x => x.phase === ph.id)) {
    const pr = PLAN.projects.find(x => x.id === w.project);
    p(`## Week ${w.n}: ${w.title}`);
    p(`**Days ${w.dayRange[0]}-${w.dayRange[1]}** · **Focus:** ${w.focus}`);
    p();
    p(`**Project this week:** ${pr.id}: ${pr.name}`);
    p();
    p(`**Resources**`);
    for (const [name, url] of w.resources) p(url ? `- [${name}](${url})` : `- ${name}`);
    p();
    for (const d of PLAN.days.filter(x => x.week === w.n)) {
      const hrs = d.tasks.reduce((s, t) => s + t.hrs, 0);
      p(`### Day ${d.day}: ${d.title} (${d.kind === "weekend" ? "long" : "short"} session, ${hrs}h)`);
      for (const t of d.tasks) p(`- [ ] **${t.track}** (${t.hrs}h): ${t.text.replace(/\n/g, "\n  ")}`);
      p();
    }
  }
}

p(`---`);
p();
p(`# Project Specs (Definition of Done)`);
p();
for (const pr of PLAN.projects) {
  p(`## ${pr.id}: ${pr.name}`);
  p(`**Weeks:** ${pr.weeks[0] === pr.weeks[1] ? pr.weeks[0] : pr.weeks.join("-")} · **Stack:** ${pr.stack}`);
  p();
  p(pr.summary);
  p();
  if (pr.needs.length) {
    p(`**Learn this first** (the day that teaches it)`);
    pr.needs.forEach(([c, d]) => p(`- Day ${d}: ${c}`));
    p();
  }
  p(`**Deliverables**`);
  pr.deliverables.forEach(d => p(`- [ ] ${d}`));
  if (pr.stretch.length) { p(); p(`**Stretch**`); pr.stretch.forEach(d => p(`- [ ] ${d}`)); }
  p();
}

/* ---------- flagship ---------- */
p(`---`);
p();
p(`# Flagship Project: ${FL.name} (Days ${FL.dayRange[0]}-${FL.dayRange[1]})`);
p();
p(`**${FL.tagline}**`);
p();
p(`You build this in 15 parts over 40 days. Each part below has: what to build, how to build it step by step, industry practices, a done-list, pitfalls and resources. The daily tasks in Weeks 16-21 point to these parts.`);
p();
p(`## Why this project impresses recruiters`);
FL.why.forEach(x => p(`- ${x}`));
p();
p(`## Scope guide (what to cut if you fall behind)`);
FL.scopeGuide.forEach(([a, b]) => p(`- **${a}:** ${b}`));
p();
p(`## Stack`);
p(`| Area | Choice |`);
p(`|---|---|`);
FL.stack.forEach(([a, b]) => p(`| ${a} | ${b} |`));
p();
p(`## Components`);
FL.components.forEach(([a, b]) => p(`- **${a}:** ${b}`));
p();
p(`## Repository layout`);
p("```");
FL.repo.forEach(x => p(x));
p("```");
p();
FL.parts.forEach((pt, i) => {
  p(`## Part ${i}: ${pt.title} (${pt.days[0] === pt.days[1] ? "Day " + pt.days[0] : "Days " + pt.days[0] + "-" + pt.days[1]})`);
  p(`**Goal:** ${pt.goal}`);
  p();
  p(`**What to build**`);
  pt.build.forEach(x => p(`- ${x}`));
  p();
  p(`**How to build it**`);
  pt.how.forEach((x, k) => p(`${k + 1}. ${x}`));
  p();
  p(`**Industry practices**`);
  pt.practices.forEach(x => p(`- ${x}`));
  p();
  p(`**Done when**`);
  pt.done.forEach(x => p(`- [ ] ${x}`));
  p();
  p(`**Common pitfalls**`);
  pt.pitfalls.forEach(x => p(`- ${x}`));
  p();
  p(`**Resources**`);
  pt.resources.forEach(([n, u]) => p(`- [${n}](${u})`));
  p();
});
p(`## Resume bullets (replace the numbers with your measured results)`);
FL.resumeBullets.forEach(x => p(`- ${x}`));
p();
p(`## 5-minute demo script`);
FL.demoScript.forEach((x, i) => p(`${i + 1}. ${x}`));
p();
p(`## Interview talking points`);
FL.talkingPoints.forEach(x => p(`- ${x}`));
p();

/* ---------- machine coding ---------- */
p(`---`);
p();
p(`# Machine Coding Rounds (Frontend + Backend)`);
p();
p(MC.intro);
p();
p(`**Schedule:** one timed 90-minute problem on every long session B (Weeks 1-13 and 16-20), alternating frontend and backend, plus two 75-minute mocks on Day 100. The rest of the bank is for extra practice or catching up.`);
p();
p(`## The playbook`);
MC.playbook.forEach(([a, b]) => p(`- **${a}:** ${b}`));
p();
p(`## How you are judged (score yourself after each one)`);
p(`| Area | Weight | What good looks like |`);
p(`|---|---|---|`);
MC.rubric.forEach(([a, w, b]) => p(`| ${a} | ${w} | ${b} |`));
p();
p(`## Frontend tips`);
MC.frontendTips.forEach(t => p(`- ${t}`));
p();
p(`## Backend tips`);
MC.backendTips.forEach(t => p(`- ${t}`));
p();
const sched = {}; Object.entries(MC.schedule).forEach(([w, id]) => sched[id] = w);
p(`## Frontend problem bank`);
p(`| Done | Problem | Time | Scheduled | Requirements |`);
p(`|---|---|---|---|---|`);
MC.frontend.forEach(x => p(`| [ ] | **${x.name}** | ${x.min} min | ${sched[x.id] ? "Week " + sched[x.id] : "extra"} | ${x.spec} |`));
p();
p(`## Backend problem bank`);
p(`| Done | Problem | Time | Scheduled | Requirements |`);
p(`|---|---|---|---|---|`);
MC.backend.forEach(x => p(`| [ ] | **${x.name}** | ${x.min} min | ${sched[x.id] ? "Week " + sched[x.id] : "extra"} | ${x.spec} |`));
p();
p(`**After every problem:** write a 5-line retro in NOTES.md (time to first working version, what you forgot, what you would restructure). Redo any problem you scored under 70% a week later.`);
p();

/* ---------- appendix ---------- */
p(`---`);
p();
p(`# Appendix`);
p();
p(`## A. Core reading list`);
p(`- *Designing Data-Intensive Applications* (Kleppmann): the one book to finish after this plan`);
p(`- *System Design Interview* Vol.1 & 2 (Alex Xu)`);
p(`- *Node.js Design Patterns* (Casciaro)`);
p(`- *You Don't Know JS Yet* (Simpson, free on GitHub)`);
p(`- *Grokking Algorithms* (Bhargava)`);
p(`- Refactoring Guru / *Head First Design Patterns*`);
p(`- *Use The Index, Luke* (free): SQL indexing`);
p();
p(`## B. Weekly review template (copy into NOTES.md)`);
p("```");
p(`Week N review`);
p(`- Hours done / planned:`);
p(`- Problems solved (LC):          Weak list additions:`);
p(`- Machine-coding problem + score (rubric):`);
p(`- 3 things I learned:`);
p(`- 1 thing I still can't explain without notes:`);
p(`- Project status (deliverables ticked / total):`);
p(`- Adjustment for next week:`);
p("```");
p();
p(`## C. Why AWS (and when to pick something else; used in Flagship Part 13)`);
p(`- **Market:** AWS has the largest share of cloud workloads and the most job postings and interview questions, so skills pay off in the most places.`);
p(`- **Fit for you:** Node backends map cleanly to ECS Fargate/Lambda, RDS Postgres, ElastiCache, SQS, S3/CloudFront, which are exactly the pieces of P3-P5.`);
p(`- **Transferable:** the concepts (IAM, VPC, load balancer, managed DB, queue, object store, serverless, IaC) are the same on every cloud, only names change.`);
p(`- **Pick GCP** if your employer or target company runs on it, or if you go deep on data/ML (BigQuery, Vertex AI). **Pick Azure** if the target is a Microsoft/.NET-heavy enterprise. Otherwise start with AWS.`);
p(`- **Cost safety:** budgets first, destroy after each session, avoid NAT gateways and Multi-AZ RDS while practicing.`);
p();
p(`| Concept | AWS | GCP | Azure |`);
p(`|---|---|---|---|`);
[
  ["Virtual machines", "EC2", "Compute Engine", "Virtual Machines"],
  ["Containers (managed)", "ECS Fargate / App Runner", "Cloud Run", "Container Apps"],
  ["Kubernetes", "EKS", "GKE", "AKS"],
  ["Functions", "Lambda", "Cloud Functions", "Functions"],
  ["Object storage", "S3", "Cloud Storage", "Blob Storage"],
  ["Managed Postgres", "RDS / Aurora", "Cloud SQL / AlloyDB", "Azure Database for PostgreSQL"],
  ["Redis", "ElastiCache", "Memorystore", "Azure Cache for Redis"],
  ["Queue / pub-sub", "SQS / SNS / EventBridge", "Pub/Sub", "Service Bus / Event Grid"],
  ["Load balancer", "ALB / NLB", "Cloud Load Balancing", "Application Gateway / Load Balancer"],
  ["CDN + DNS", "CloudFront + Route 53", "Cloud CDN + Cloud DNS", "Front Door + Azure DNS"],
  ["Identity", "IAM / IAM Identity Center", "IAM", "Entra ID + RBAC"],
  ["Secrets", "Secrets Manager", "Secret Manager", "Key Vault"],
  ["Monitoring", "CloudWatch", "Cloud Monitoring", "Azure Monitor"],
  ["Infrastructure as code", "Terraform / CloudFormation", "Terraform / Deployment Manager", "Terraform / Bicep"]
].forEach(r => p(`| ${r.join(" | ")} |`));
p();
p(`## D. Interview-readiness checklist`);
[
  "Explain event loop, closures, prototypes, promises without notes",
  "Explain Node: libuv phases, streams/backpressure, worker_threads vs cluster",
  "Design + secure a REST API with auth, RBAC, pagination, idempotency",
  "Explain isolation levels/MVCC, pick indexes with EXPLAIN, normalize a schema",
  "Solve LC mediums in about 25 min across arrays/trees/graphs/DP; about 200 problems done",
  "Finish a frontend machine-coding problem in 90 min with a11y and edge cases",
  "Finish a backend machine-coding problem in 90 min with tests and clean layering",
  "Run a 45-min HLD interview (requirements -> estimate -> design -> trade-offs)",
  "Run a 60-min LLD interview with SOLID + patterns",
  "Deployed app with CI/CD, HTTPS and a metrics dashboard",
  "Built a RAG app with an eval set; can explain chunking, embeddings, ANN, hybrid search, reranking",
  "Deploy Beacon on AWS with Terraform, least-privilege IAM, OIDC CI/CD, alarms and a verified teardown",
  "3 STAR stories + 2 polished project READMEs"
].forEach(x => p(`- [ ] ${x}`));
p();
p(`## F. Concepts explained (what it is, why we use it)`);
p(`The tracker has the same list with search under the "Concepts" tab. "Day" is where the plan teaches it.`);
p();
const cats = [...new Set(CO.map(x => x.cat))];
for (const cat of cats) {
  p(`### ${cat}`);
  p();
  for (const x of CO.filter(y => y.cat === cat)) {
    p(`**${x.term}** (Day ${x.day})  `);
    p(`*What it is:* ${x.what}  `);
    p(`*Why we use it:* ${x.why}  `);
    p(`*Example:* ${x.example}`);
    p();
  }
}
p(`## E. After the plan`);
p(`LeetCode to 300 + contests, AWS Solutions Architect Associate, read DDIA fully, contribute to an open-source Node project, Kubernetes in depth, deeper ML (Andrew Ng spec, fast.ai), and 5 classic distributed-systems papers (Dynamo, Bigtable, Raft, Kafka, Spanner).`);
p();

const target = path.join(__dirname, "STUDY_PLAN.md");
fs.writeFileSync(target, out.join("\n"));
console.log(`Wrote ${target} (${out.length} lines). Days: ${PLAN.days.length}, total hours ≈ ${Math.round(totalHours)} (core ${Math.round(coreHours)})`);
