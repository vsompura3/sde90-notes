/* ============================================================
   90-DAY SDE PLAN — SINGLE SOURCE OF TRUTH
   Edit this file, then run:  node build.js   (regenerates STUDY_PLAN.md)
   tracker.html reads this file directly (window.PLAN).
   ============================================================ */

const T = (track, hrs, text) => ({ track, hrs, text });

/* ---------- Phases ---------- */
const phases = [
  { id: 1, name: "Advanced JavaScript", weeks: [1, 2], goal: "Own the language: closures, prototypes, event loop, promises, modules, V8 basics. Start DSA + SQL from zero.", outcome: "You can explain and re-implement Promise, bind, EventEmitter, debounce from memory." },
  { id: 2, name: "Node.js Internals", weeks: [3, 4], goal: "Understand what happens under Express: libuv, streams, HTTP, workers, testing, profiling.", outcome: "You can process a 1GB file in constant memory and build an HTTP framework on raw `http`." },
  { id: 3, name: "Backend Engineering", weeks: [5, 6], goal: "TypeScript, REST, auth, validation, ORMs, testing, security, schema design, indexes.", outcome: "You can ship a secure, tested, documented multi-tenant API." },
  { id: 4, name: "Databases, Caching, Distributed Basics", weeks: [7, 8], goal: "Transactions, MVCC, query plans, Redis, Mongo, replication/sharding, CAP, queues, rate limiting.", outcome: "You can tune a slow query with EXPLAIN and design a cache strategy with justified trade-offs." },
  { id: 5, name: "LLD + HLD", weeks: [9, 10], goal: "SOLID, design patterns, LLD katas, system design framework, classic HLD problems, event-driven architecture.", outcome: "You can run a 45-min design interview: requirements, estimation, architecture, deep dive, trade-offs." },
  { id: 6, name: "DevOps + AI/ML", weeks: [11, 12], goal: "Docker, CI/CD, Nginx, K8s basics, observability — then LLMs, embeddings, vector DBs, RAG, ML pipelines.", outcome: "Your project is deployed with CI/CD, and you have a working RAG app with an evaluation set." },
  { id: 7, name: "Advanced Backend", weeks: [13, 14], goal: "Multi-tenancy with Row-Level Security, authorization at scale, idempotent APIs, job systems and the outbox, clean architecture, reliability and observability: the toolkit the flagship project needs.", outcome: "You can design a tenant-isolated, queue-driven API and defend every trade-off." },
  { id: 8, name: "Revision + Capstone", weeks: [15], goal: "Consolidate, mock interviews, polish projects, tell your story.", outcome: "Portfolio-ready projects + interview-ready answers." },
  { id: 9, name: "Flagship: Beacon", weeks: [16, 21], goal: "Days 101-140. Build one resume-grade product in 15 parts: a multi-tenant support platform with RBAC, queues, SLA automation, webhooks, realtime, AI replies and an AWS deployment.", outcome: "A deployed, documented, load-tested SaaS you can demo in 5 minutes and defend in a system-design interview." }
];

/* ---------- Projects ---------- */
const projects = [
  { id: "P1", name: "jsutils — Mini Lodash + Promise from scratch", weeks: [1, 2], stack: "JavaScript (ESM), Vitest",
    summary: "A tested utility library where every piece is a classic interview/internals question implemented properly.",
    deliverables: [
      "debounce / throttle (leading + trailing options) with tests using fake timers",
      "memoize (custom key resolver, cache eviction), curry, compose/pipe",
      "deepClone handling cycles, Date, Map, Set",
      "EventEmitter (on/off/once/prependListener, error event semantics)",
      "Promise.all / allSettled / race / any polyfills",
      "LRU cache: Map-based version in Week 2, then add the doubly-linked-list + hashmap version after you learn linked lists (Day 17)",
      "asyncPool (concurrency limiter), retry with exponential backoff + jitter, timeout via AbortController",
      "Your own Promise implementation passing the Promises/A+ test suite",
      "README with complexity notes for every function; >90% test coverage"
    ],
    stretch: ["Publish to npm under a scoped name", "Add TypeScript type definitions (.d.ts)"] },
  { id: "P2", name: "logscope — Streaming Log/CSV Analyzer CLI + mini HTTP framework", weeks: [3, 4], stack: "Node.js core modules only (no Express), worker_threads, SQLite/Postgres",
    summary: "Prove you understand streams, backpressure and the HTTP layer by building without frameworks.",
    deliverables: [
      "CLI (commander or util.parseArgs) with subcommands: stats, top, filter, export",
      "Reads a generated 1GB file via streams; peak memory stays < 100MB (measure it)",
      "Transform pipeline: parse -> filter -> group-by/aggregate -> top-N, using stream.pipeline",
      "worker_threads pool processes chunks in parallel; benchmark speedup vs single thread",
      "Batched insert of aggregates into SQLite/Postgres",
      "Mini framework on node:http: router with params, middleware chain, JSON body parser, error handler",
      "Integration tests with supertest; graceful shutdown (SIGTERM) implemented",
      "PERF.md with memory/time measurements and a flamegraph"
    ],
    stretch: ["Add gzip streaming input/output", "Add a live `tail -f` mode using fs.watch + streams"] },
  { id: "P3", name: "TaskBoard API — production-grade multi-tenant Trello-like backend", weeks: [5, 6], stack: "TypeScript, Fastify (or Express), Postgres, Prisma/Drizzle, zod, Vitest, Docker Compose",
    summary: "The 'real job' project: auth, RBAC, relational schema, pagination, tests, security, docs.",
    deliverables: [
      "Schema: users, organizations, memberships, boards, lists, tasks, comments, audit_log (ERD in docs/)",
      "Auth: register/login/refresh/logout, argon2, access+refresh rotation, HttpOnly cookies",
      "RBAC (owner/admin/member/viewer) enforced in middleware + per-resource checks",
      "zod validation on all inputs; centralized error handler with consistent error shape",
      "Cursor pagination, filtering, sorting; soft delete; optimistic concurrency (version column)",
      "Transactions for multi-step writes; no N+1 (prove with query logging)",
      "Rate limiting, helmet, CORS config, input sanitization; npm audit clean",
      "pino structured logs with request IDs; /health and /ready endpoints",
      "Unit + integration tests against a real Postgres (testcontainers or compose); >=70% coverage",
      "OpenAPI docs served at /docs; Postman/Bruno collection; README with setup in <5 commands"
    ],
    stretch: ["OAuth login with Google/GitHub (code flow + PKCE)", "File attachments via S3 presigned URLs", "Webhooks with HMAC signing + retries"] },
  { id: "P4", name: "ShortLink — URL shortener + distributed rate limiter", weeks: [7, 8], stack: "Node/TS, Postgres, Redis, k6 or autocannon",
    summary: "A small system with real scaling questions: ID generation, caching, analytics, rate limiting, load testing.",
    deliverables: [
      "Create/redirect endpoints; base62 IDs; collision handling; custom aliases; expiry",
      "Redirect 301 vs 302 decision documented with trade-offs",
      "Redis cache-aside with TTL, negative caching, and stampede protection (single-flight/lock)",
      "Async click analytics (queue or Redis stream) — never block the redirect path",
      "Sliding-window rate limiter implemented as Redis Lua script; per-IP and per-API-key limits",
      "Load test with k6/autocannon: report p50/p95/p99 and RPS before/after cache",
      "EXPLAIN ANALYZE on the slowest query; add index; record before/after in PERF.md",
      "1-page design doc: requirements, capacity estimate, API, schema, bottlenecks"
    ],
    stretch: ["Pre-generated ID ranges (Snowflake-like / ticket server)", "Read replica routing", "Bloom filter for non-existent keys"] },
  { id: "P5", name: "Pulse — real-time chat + notification platform", weeks: [9, 10], stack: "Node/TS, WebSockets, Redis pub/sub, BullMQ or Kafka, Postgres, Nginx",
    summary: "Distributed, event-driven design: horizontal WebSocket scaling, queues, retries, outbox, idempotency. Plus LLD katas and HLD docs.",
    deliverables: [
      "WebSocket server with auth on handshake, rooms, presence, typing indicators, message acks",
      "Messages persisted in Postgres; history API with cursor pagination",
      "Two server instances behind Nginx synced via Redis pub/sub; proven with a 2-client demo",
      "Notification service: producer + workers, retry w/ backoff, DLQ, idempotency keys",
      "Outbox pattern: write to DB + outbox in one transaction -> relay worker -> queue",
      "docker-compose brings the whole system up with one command",
      "HLD doc with architecture diagram (Mermaid/Excalidraw), capacity math, failure modes",
      "LLD katas repo: Parking Lot, Elevator, Vending Machine, Splitwise, ATM, LRU Cache — each with tests + class diagram"
    ],
    stretch: ["Kafka instead of BullMQ", "Presence at scale using Redis TTL heartbeats", "Message ordering guarantees per room"] },
  { id: "P6", name: "Ship It — containerize, CI/CD, deploy, observe", weeks: [11, 11], stack: "Docker, GitHub Actions, Nginx, a VPS or Fly.io/Render/AWS, Prometheus + Grafana",
    summary: "Take P3/P4/P5 from 'works on my machine' to a deployed, monitored service with automated pipelines.",
    deliverables: [
      "Multi-stage, non-root Dockerfiles; images < 200MB; healthchecks; .dockerignore",
      "docker-compose for full local stack (app, Postgres, Redis, worker)",
      "GitHub Actions: lint -> test -> build -> push image to GHCR -> deploy (SSH or platform CLI)",
      "Live HTTPS deployment behind Nginx (Let's Encrypt) with a real domain or subdomain",
      "Zero-downtime or rollback strategy documented and tried once",
      "Prometheus metrics endpoint + Grafana dashboard (RED: rate, errors, duration)",
      "One alert rule defined (e.g. error rate > 5% for 5m)",
      "Local Kubernetes (kind/minikube): deployment + service + ingress + probes for one service"
    ],
    stretch: ["Terraform for the VPS/cloud resources", "Canary or blue/green deploy", "Secrets via SOPS or cloud secret manager"] },
  { id: "P7", name: "DocChat — RAG application with evaluation", weeks: [12, 12], stack: "Node/TS (+ small Python scripts optional), pgvector or Qdrant, an LLM API (Claude/OpenAI), queue worker",
    summary: "A production-shaped RAG pipeline: ingestion, hybrid retrieval, reranking, streaming answers with citations, measured quality.",
    deliverables: [
      "Ingestion pipeline: loaders (PDF/Markdown) -> chunker -> embeddings -> vector index (HNSW) via queue worker",
      "Idempotent re-ingestion (content hash) and chunk metadata (source, page, section)",
      "Hybrid retrieval: vector + keyword (Postgres FTS/BM25) merged with reciprocal-rank fusion",
      "Optional reranking step; top-k tuning documented",
      "Answer endpoint streams tokens (SSE) and returns citations that map to source chunks",
      "Conversation memory with query rewriting for follow-up questions",
      "Eval set of >=30 Q/A pairs; script reports recall@k and an LLM-judged faithfulness score",
      "Prompt-injection guardrail test cases; token/cost logging per request"
    ],
    stretch: ["Tool-using agent (e.g. search + calculator) with a step limit", "Semantic cache for repeated questions", "Fine-grained access control per document"] },
  { id: "P8", name: "TenantLab — flagship rehearsal labs", weeks: [13, 14], stack: "Node/TS, Postgres (RLS), Redis/BullMQ, Vitest",
    summary: "Two small labs that de-risk the hardest parts of the flagship: tenant isolation + RBAC (Lab A) and the outbox + idempotent worker pattern (Lab B).",
    deliverables: [
      "Lab A: two-tenant API with Row-Level Security on 3 tables, a non-superuser app role, and a withTenant() helper using SET LOCAL",
      "Lab A: cross-tenant test that FAILS when you drop an RLS policy (prove the test is real)",
      "Lab A: permission registry + can(actor, action, resource) with a table-driven matrix test (4 roles x 6 actions)",
      "Lab A: append-only audit log enforced by database privileges, plus tenant-scoped full-text search",
      "Lab A: addBusinessMinutes(start, minutes, calendar) with tests across a weekend and a DST change",
      "Lab B: outbox table + relay worker using FOR UPDATE SKIP LOCKED; two relays running never double-publish",
      "Lab B: idempotent consumer (processed_events), retry with backoff, DLQ and a replay command",
      "Lab B: a timeout + circuit breaker around one outbound call, with a test",
      "README: design notes and a list of exactly what you will reuse in Beacon"
    ],
    stretch: ["Compare RLS with schema-per-tenant for the same lab and write a one-page trade-off note", "Add OpenTelemetry tracing across the outbox and worker"] },
  { id: "P9", name: "Capstone — harden, document, present", weeks: [15, 15], stack: "Your best project from P3-P7",
    summary: "Turn your strongest project into an interview centerpiece with real engineering artifacts.",
    deliverables: [
      "3+ ADRs (Architecture Decision Records) explaining key trade-offs",
      "Architecture diagram + sequence diagram for the main flow in the README",
      "Load test report and one documented bottleneck fix",
      "5-minute demo video (problem, architecture, one hard bug, what you'd do next)",
      "Resume bullets (impact-oriented) + 3 STAR stories drawn from the projects",
      "2 full mock interviews completed (1 DSA, 1 system design)"
    ],
    stretch: ["Write a blog post on the hardest problem you solved"] },
  { id: "P10", name: "Beacon — multi-tenant support platform (flagship)", weeks: [16, 21], stack: "TypeScript, Fastify, Postgres (RLS, pgvector), Redis/BullMQ, React, Terraform, AWS (ECS Fargate, RDS, ElastiCache, S3, CloudFront)",
    summary: "The resume project: a multi-tenant support desk with RBAC, queues, SLA automation, webhooks, realtime, AI suggested replies and an AWS deployment. Each part has detailed steps in the Flagship tab.",
    deliverables: [
      "Part 0: product docs, C4 diagrams, at least 4 ADRs; `make dev` works from a clean clone and CI is green",
      "Part 1: Postgres RLS on every tenant table; auth with rotating refresh tokens and reuse detection; invites and org switching",
      "Part 2: permission registry, custom roles per tenant, resource-level policies, matrix tests, append-only audit log",
      "Part 3: ticket state machine, comments, attachments via presigned URLs, search, cursor pagination, idempotency, ETag concurrency, API keys",
      "Part 4: React app with permission-aware navigation, virtualized ticket list, ticket detail, Playwright e2e",
      "Part 5: BullMQ workers, retries, DLQ and replay, transactional outbox, idempotent consumers, email notifications",
      "Part 6: SLA engine with business hours and delayed jobs; automation rules engine with loop prevention and dry-run",
      "Part 7: signed outbound webhooks with SSRF protection and replay; plans, quotas, per-tenant rate limits and queue fairness",
      "Part 8: admin console (roles, API keys, webhooks, rules, SLA, audit, usage)",
      "Part 9: realtime updates over SSE with Redis fan-out, permission filtering, presence",
      "Part 10: tenant-scoped knowledge base, hybrid retrieval, AI suggested replies with citations, cost caps, eval set",
      "Part 11: OpenTelemetry traces, metrics, alerts, SLOs, threat model, automated cross-tenant attack suite, export and deletion jobs",
      "Part 12: k6 load tests on 1M tickets with before/after numbers; chaos drills and a timed restore drill",
      "Part 13: Terraform-provisioned AWS stack with OIDC CI/CD, alarms, cost report and a verified teardown",
      "Part 14: test pyramid, README + docs + 6 ADRs, runbooks, demo video, resume bullets, v1.0.0 tag"
    ],
    stretch: ["Stripe test-mode subscriptions with idempotent webhook handling", "Email-in: create tickets from inbound email (SES + S3 + Lambda)", "Auto scaling for ECS services on queue age or CPU", "Multi-region read replica design doc"] }
];

/* ---------- Weeks (resources, focus, project link, day content) ---------- */
const weeks = [];
function W(o) { weeks.push(o); }

/* ======================= PHASE 1 ======================= */
W({ n: 1, phase: 1, title: "JS Foundations That Seniors Are Judged On", project: "P1",
  focus: "Execution context, closures, this, prototypes, event loop, promises. DSA: Big-O, arrays, hashing. SQL: first contact.",
  resources: [
    ["javascript.info — Part 1 (Functions, Objects, Prototypes, Promises)", "https://javascript.info"],
    ["You Don't Know JS Yet — Scope & Closures, this & Object Prototypes", "https://github.com/getify/You-Dont-Know-JS"],
    ["Philip Roberts — What the heck is the event loop anyway? (YouTube, 26 min)", "https://www.youtube.com/watch?v=8aGhZQkoFbQ"],
    ["Lydia Hallie — JavaScript Visualized (event loop, promises)", "https://dev.to/lydiahallie"],
    ["NeetCode roadmap (DSA)", "https://neetcode.io/roadmap"],
    ["SQLBolt (interactive SQL)", "https://sqlbolt.com"]
  ],
  days: [
    ["Big-O primer + arrays: read the 'Big-O' section of NeetCode course (or Grokking Algorithms ch.1). Solve LC 217 Contains Duplicate, 1 Two Sum, 242 Valid Anagram. Rule: 20 min think, then peek at hints.", "JS", "Execution context & scope: hoisting, TDZ (let/const), scope chain, closures. Write 5 closure examples (counter, once(), private state, loop bug w/ var). Read YDKJS Scope & Closures ch.1-3."],
    ["Hash maps/sets in JS: Map vs Object, Set. Solve LC 49 Group Anagrams, 347 Top K Frequent Elements. Write the complexity of each solution as a comment.", "JS", "`this` binding: default/implicit/explicit/new, arrow functions, call/apply/bind. Implement your own Function.prototype.bind and call. Predict-the-output: 10 `this` puzzles."],
    ["Prefix sums & array tricks. Solve LC 238 Product of Array Except Self, 303 Range Sum Query, 560 Subarray Sum Equals K (hashmap + prefix).", "JS", "Prototypes & classes: [[Prototype]] chain, Object.create, constructor functions, class syntax as sugar, private #fields, static, mixins, instanceof internals. Draw the prototype chain of an array and a class instance."],
    ["Solve LC 128 Longest Consecutive Sequence, 36 Valid Sudoku. Then re-solve LC 49 without notes.", "JS", "Event loop deep dive: call stack, macrotask queue, microtask queue, timers, rAF. Watch the Philip Roberts talk, then do 10 'predict the output' puzzles mixing setTimeout/Promise/async/await."],
    ["Spaced repetition: re-solve anything you got wrong this week. New: LC 53 Maximum Subarray (Kadane), 121 Best Time to Buy and Sell Stock.", "JS", "Promises deep: states, then-chaining, error propagation, finally, Promise.all/allSettled/race/any, unhandled rejections; async/await pitfalls (await in loops, sequential vs parallel, forEach+async trap)."]
  ],
  sat: { learn: ["JS", "Modern JS: destructuring, spread/rest, iterators & iterables protocol, generators, Symbol, Map/WeakMap/WeakSet, Proxy/Reflect, optional chaining, tagged templates. Write a custom iterable and a generator-based range()."],
    dsa: "Arrays workshop: LC 26 Remove Duplicates, 27 Remove Element, 88 Merge Sorted Array, 169 Majority Element, 189 Rotate Array. For each, give brute-force then optimal and state time/space.",
    proj: "P1 kickoff: init repo, ESM, ESLint, and a 20-min Vitest intro (describe/it/expect, vi.fn, vi.useFakeTimers). Implement debounce, throttle (leading/trailing), memoize, curry, compose/pipe with tests (use vi.useFakeTimers)." },
  sun: { proj: "P1: implement EventEmitter (on/off/once/emit, error event), deepClone (cycles, Date, Map, Set), and polyfills for Promise.all, allSettled, race, any. Tests for each.",
    dsa: "Timed mini-contest (75 min): redo LC 238, 49, 128 cold, then 1 new medium: LC 36 variant or 560. Note where you stalled.",
    learn: ["SQL", "SQLBolt lessons 1-12 (SELECT, WHERE, ORDER, LIMIT, JOIN intro). Type every query yourself. Then answer: what is a primary key, a foreign key, NULL semantics?"] }
});

W({ n: 2, phase: 1, title: "Advanced JS II + DSA Patterns + SQL Basics", project: "P1",
  focus: "Async iterators, modules, memory/GC, patterns. DSA: two pointers, sliding window, binary search. SQL: queries & joins.",
  resources: [
    ["javascript.info — Async iterators, Modules, Proxy, Memory", "https://javascript.info"],
    ["V8 blog — Fast properties / Hidden classes", "https://v8.dev/blog"],
    ["Mode SQL Tutorial (Basic + Intermediate)", "https://mode.com/sql-tutorial"],
    ["PG Exercises (Postgres practice)", "https://pgexercises.com"],
    ["Promises/A+ test suite", "https://github.com/promises-aplus/promises-tests"],
    ["NeetCode 150 list", "https://neetcode.io/practice"]
  ],
  days: [
    ["Two pointers: LC 125 Valid Palindrome, 167 Two Sum II, 15 3Sum. Write the 'pattern signature': when do you reach for two pointers?", "JS", "Async iteration & control: for await...of, async generators, AbortController/AbortSignal, timers, microtask starvation. Build an async generator that paginates an API and a cancellable fetch helper."],
    ["LC 11 Container With Most Water, 42 Trapping Rain Water (do 2 solutions: prefix arrays, then two-pointer).", "JS", "Modules & memory: ESM vs CommonJS (live bindings, circularity, top-level await, dynamic import), garbage collection (mark-sweep), WeakRef/FinalizationRegistry, 5 common leak sources. Heap snapshot a leaky script in Chrome DevTools."],
    ["Sliding window: LC 121 (revisit), 3 Longest Substring Without Repeating, 424 Longest Repeating Character Replacement.", "JS", "Patterns in JS: module, factory, observer, pub/sub, strategy via functions, dependency injection by args, immutability, Result/Either-style error handling, custom Error classes with cause."],
    ["LC 567 Permutation in String, 76 Minimum Window Substring (hard — it's OK to need the solution; then re-implement from memory next day).", "SQL", "SQL queries: SELECT/WHERE/GROUP BY/HAVING/ORDER BY, aggregates, DISTINCT, LIKE, IN, BETWEEN, NULL handling. Mode SQL Basic + Intermediate sections."],
    ["LC 239 Sliding Window Maximum (monotonic deque); re-solve 76 from memory.", "SQL", "JOINs: INNER/LEFT/RIGHT/FULL, self-join, subqueries (scalar, IN, EXISTS). SQLBolt joins lessons + PG Exercises 'Joins and Subqueries' (first 10)."]
  ],
  sat: { learn: ["JS", "V8 & performance: parse -> Ignition -> TurboFan, hidden classes/shapes, inline caching, deopts; profiling with Chrome DevTools Performance + Memory tabs and `node --inspect`. Measure a hot loop before/after a shape-stable refactor."],
    dsa: "Binary search intro: LC 704 Binary Search, 74 Search a 2D Matrix, 875 Koko Eating Bananas, 153 Find Min in Rotated Sorted Array, 33 Search in Rotated Sorted Array. Write the loop invariant for each.",
    proj: "P1: LRU cache (Map-based version now; the doubly-linked-list version comes after linked lists on Day 17), asyncPool(limit), retry with exponential backoff + jitter, withTimeout using AbortController." },
  sun: { proj: "P1: implement your own Promise (then/catch/finally, resolution procedure, thenables) and run the Promises/A+ suite. Finish README (complexity table) and coverage >90%. Tag v1.0.",
    dsa: "Timed contest (75 min): LC 3, 15, 33 cold + 1 new medium from sliding window/two pointers.",
    learn: ["SQL", "Install Postgres (Docker: `docker run -e POSTGRES_PASSWORD=pw -p 5432:5432 postgres`) + psql. Do PG Exercises Basic (15) and Joins (10 more). Phase 1 retro: write what's still shaky in NOTES.md."] }
});

/* ======================= PHASE 2 ======================= */
W({ n: 3, phase: 2, title: "Node.js Internals: libuv, Streams, HTTP", project: "P2",
  focus: "Event loop phases, core modules, streams + backpressure, raw HTTP, workers. DSA: linked lists, stacks, queues.",
  resources: [
    ["Node.js official Learn guides", "https://nodejs.org/en/learn"],
    ["Node.js Design Patterns (Casciaro) — Streams, Async chapters", null],
    ["Node docs: Stream, http, worker_threads, events", "https://nodejs.org/docs/latest/api/"],
    ["libuv design overview", "https://docs.libuv.org/en/v1.x/design.html"],
    ["MDN HTTP guide", "https://developer.mozilla.org/en-US/docs/Web/HTTP"],
    ["NeetCode: Linked List / Stack sections", "https://neetcode.io/roadmap"]
  ],
  days: [
    ["Linked lists: LC 206 Reverse Linked List, 21 Merge Two Sorted Lists, 141 Linked List Cycle. Implement a singly linked list class first.", "Node", "Node architecture: V8 + libuv + thread pool, the 6 event-loop phases, process.nextTick vs microtasks vs setImmediate vs setTimeout(0). Predict outputs of 8 snippets, then run them."],
    ["LC 143 Reorder List, 19 Remove Nth Node From End, 2 Add Two Numbers.", "Node", "Core modules: fs/promises, path, os, events, util.promisify, util.parseArgs (CLI flags), Buffer & encodings (utf8/base64/hex), URL, crypto basics (hash, HMAC, randomBytes). Write a script that hashes every file in a folder."],
    ["LC 138 Copy List with Random Pointer, 287 Find the Duplicate Number (Floyd), 146 LRU Cache. Then add the doubly-linked-list + hashmap LRU to jsutils (P1) and benchmark it against your Map version.", "Node", "Streams I: Readable/Writable/Transform/Duplex, object mode, backpressure & highWaterMark, stream.pipeline, async iteration over streams. Write a Transform that uppercases input and pipe through gzip."],
    ["Stacks: LC 20 Valid Parentheses, 155 Min Stack, 150 Evaluate Reverse Polish Notation.", "Node", "HTTP from scratch: build a server with node:http — manual routing, parsing JSON body from the request stream, headers, status codes, keep-alive, streaming responses, chunked encoding."],
    ["Monotonic stack: LC 739 Daily Temperatures, 853 Car Fleet.", "Node", "Concurrency in Node: child_process (spawn/exec/fork), cluster, worker_threads, MessageChannel, SharedArrayBuffer + Atomics intro. When is each right? CPU-bound vs I/O-bound demo with fibonacci."]
  ],
  sat: { learn: ["Backend", "HTTP deep dive: HTTP/1.1 vs 2 vs 3, TLS handshake, DNS resolution, TCP basics, cookies, CORS (preflight), caching headers (ETag, Cache-Control, 304). Use curl -v and browser DevTools Network to observe each."],
    dsa: "Queues/monotonic: LC 84 Largest Rectangle in Histogram, 239 (redo), 22 Generate Parentheses, plus implement Queue with two stacks.",
    proj: "P2 kickoff: CLI scaffold (util.parseArgs or commander). Write a generator script producing a 1GB access-log file. Build the streaming line reader and measure memory with process.memoryUsage()." },
  sun: { proj: "P2: Transform pipeline — parse lines -> filter -> group-by -> top-N; add worker_threads pool processing chunks in parallel; benchmark single vs N workers and record in PERF.md.",
    dsa: "Timed (75 min): LC 206, 146, 84 cold, + 1 unseen medium linked-list/stack problem.",
    learn: ["Backend", "Networking: OSI vs TCP/IP, TCP vs UDP, sockets, ports. Build a tiny TCP chat server with node:net (broadcast to all clients). Notes: what is a connection, a socket, a file descriptor?"] }
});

W({ n: 4, phase: 2, title: "Node II: Reliability, Testing, Profiling + Recursion/Sorting + Advanced SQL", project: "P2",
  focus: "Errors, shutdown, npm, testing, profiling. DSA: recursion, backtracking, sorting, binary search. SQL: windows, CTEs.",
  resources: [
    ["Node.js Best Practices (goldbergyoni)", "https://github.com/goldbergyoni/nodebestpractices"],
    ["Vitest docs / node:test", "https://vitest.dev"],
    ["Clinic.js / 0x flamegraphs", "https://clinicjs.org"],
    ["PG Exercises — Aggregates, Window Functions, Recursive", "https://pgexercises.com"],
    ["Mode SQL — Advanced (window functions)", "https://mode.com/sql-tutorial"],
    ["CMU 15-445 Database Systems (Andy Pavlo) — Lecture 1-2", "https://www.youtube.com/@CMUDatabaseGroup"]
  ],
  days: [
    ["Recursion foundations: LC 50 Pow(x,n), 78 Subsets. Draw the recursion tree for subsets by hand before coding.", "Node", "Reliability: uncaughtException vs unhandledRejection, signal handling (SIGTERM/SIGINT), graceful shutdown (drain connections, close DB), structured logging with pino, exit codes."],
    ["Backtracking template: LC 46 Permutations, 90 Subsets II, 39 Combination Sum.", "Node", "Project hygiene: package.json fields, semver & lockfiles, npm scripts, workspaces, npx, engines, .env handling (dotenv/--env-file), 12-factor config. Create a monorepo with 2 packages."],
    ["LC 40 Combination Sum II, 79 Word Search, 17 Letter Combinations of a Phone Number.", "Node", "Testing: test pyramid, Vitest/node:test, mocks/stubs/spies, fake timers, supertest for HTTP, test isolation. Add tests for P2's router and pipeline."],
    ["Sorting: implement merge sort, quick sort (Lomuto + Hoare), heap sort from scratch. Solve LC 912 Sort an Array and 75 Sort Colors.", "SQL", "Window functions & CTEs: ROW_NUMBER, RANK, LAG/LEAD, running totals, PARTITION BY, WITH, recursive CTEs. PG Exercises: Aggregates + Window Functions + Recursive sets."],
    ["Binary search on answer & rotated arrays: LC 153 (redo), 981 Time Based Key-Value Store, attempt 4 Median of Two Sorted Arrays.", "SQL", "SQL grab-bag: CASE, COALESCE, date/time functions, UNION/INTERSECT/EXCEPT, JSONB operators, generate_series, and Postgres full-text search (tsvector, GIN index, ts_rank) which you will reuse in the RAG project. Write 10 reporting queries over a sample orders dataset."]
  ],
  sat: { learn: ["Node", "Node performance: profiling with --prof / --cpu-prof, clinic flame, autocannon load tests, event-loop lag (perf_hooks monitorEventLoopDelay), GC basics (--trace-gc). Find and fix a deliberately blocking handler."],
    dsa: "Backtracking set: LC 51 N-Queens, 131 Palindrome Partitioning, 22 (redo), 17 (redo). Focus: pruning conditions.",
    proj: "P2: sink aggregates to SQLite/Postgres with batched inserts (try COPY vs multi-row INSERT and compare). Add `export` subcommand. Update PERF.md." },
  sun: { proj: "P2: build the mini HTTP framework on node:http (router with :params, middleware chain `next()`, JSON body parser, error handler, 404). Integration tests with supertest. Graceful shutdown. Tag v1.0.",
    dsa: "Timed (75 min): LC 46, 739, 912 cold + 1 unseen medium backtracking.",
    learn: ["SQL", "DBMS intro: what a DBMS does, relational model, keys (primary/foreign/candidate/composite), ER diagrams, multi-tenancy with a tenant_id column (you need it for P3 next week), ACID overview. Watch CMU 15-445 lecture 1. Phase 2 retro in NOTES.md."] }
});

/* ======================= PHASE 3 ======================= */
W({ n: 5, phase: 3, title: "Backend Engineering I: TypeScript, REST, Auth", project: "P3",
  focus: "TS for Node, REST design, framework middleware, validation, authN/authZ, ORMs. DSA: trees.",
  resources: [
    ["TypeScript Handbook", "https://www.typescriptlang.org/docs/handbook/intro.html"],
    ["Fastify docs (plugins, hooks, validation)", "https://fastify.dev/docs/latest/"],
    ["OWASP Cheat Sheets (Auth, Session, Password Storage)", "https://cheatsheetseries.owasp.org"],
    ["Prisma docs / Drizzle docs", "https://www.prisma.io/docs"],
    ["REST API design — Microsoft API Guidelines", "https://github.com/microsoft/api-guidelines"],
    ["NeetCode: Trees section", "https://neetcode.io/roadmap"]
  ],
  days: [
    ["Trees I: LC 226 Invert Binary Tree, 104 Maximum Depth, 100 Same Tree, 572 Subtree of Another Tree. Implement TreeNode + recursive DFS first.", "Backend", "TypeScript for Node devs: types vs interfaces, generics, unions/narrowing, utility types (Pick/Omit/Partial/Record), `unknown` vs `any`, tsconfig strict, tsx/ts-node. Convert 2 files of P1 to TS."],
    ["LC 543 Diameter of Binary Tree, 110 Balanced Binary Tree, 235 LCA of BST, 102 Level Order Traversal (BFS).", "Backend", "REST design: resource modeling, verbs/idempotency, status codes, error format (RFC 7807), pagination (offset vs cursor), filtering, versioning, OpenAPI spec basics. Write the OpenAPI for TaskBoard first."],
    ["LC 199 Right Side View, 1448 Count Good Nodes, 98 Validate BST.", "Backend", "Fastify/Express deep: lifecycle & middleware/hooks order, plugins & encapsulation, async error handling, schema validation with zod, serialization. Skim NestJS (modules, providers, guards, interceptors, pipes) so you recognise the industry-standard layering. Build a CRUD /tasks in-memory with zod."],
    ["LC 230 Kth Smallest in BST, 105 Construct Binary Tree from Preorder and Inorder.", "Backend", "Authentication: password hashing (argon2/bcrypt, salt, cost), sessions vs JWT trade-offs, access/refresh rotation & reuse detection, cookie flags (HttpOnly, Secure, SameSite), CSRF. Sketch your auth design in docs/auth.md."],
    ["LC 236 LCA of Binary Tree, 124 Binary Tree Max Path Sum (attempt), practice BST delete + inorder iterator.", "Backend", "Authorization & OAuth2/OIDC: RBAC vs ABAC, scopes/claims, OAuth code flow + PKCE, refresh tokens, API keys, service-to-service auth. Diagram the code flow with all redirects."]
  ],
  sat: { learn: ["Backend", "ORMs & data access: Prisma/Drizzle vs Knex vs raw SQL, migrations, transactions, connection pooling, N+1 problem and how to detect it, repository pattern. Build a small CRUD both with an ORM and raw `pg` and compare."],
    dsa: "Trees II: LC 297 Serialize/Deserialize Binary Tree, 124 (redo), 105 (redo), 133 Clone Graph (intro).",
    proj: "P3 kickoff: TS + Fastify + Postgres via docker compose + Prisma schema (users, orgs, memberships, boards, lists, tasks, comments, audit_log). Run migrations + seed script. Draw ERD." },
  sun: { proj: "P3: auth module — register/login/refresh/logout, argon2, JWT access + rotating refresh (stored hashed), RBAC middleware, zod validation, error handler. Tests for auth happy/sad paths.",
    dsa: "Timed (75 min): LC 98, 102, 236 cold + 1 unseen tree medium.",
    learn: ["DevOps", "Docker crash course for local dev: images vs containers, run/exec/logs, volumes, networks, docker compose with Postgres + Redis. (Deeper Docker comes in week 11.)"] }
});

W({ n: 6, phase: 3, title: "Backend Engineering II: Testing, Security, Schema Design, Indexes", project: "P3",
  focus: "Integration testing, OWASP, observability, normalization, indexing. DSA: heaps, tries, intervals, greedy.",
  resources: [
    ["OWASP Top 10", "https://owasp.org/www-project-top-ten/"],
    ["Use The Index, Luke (SQL indexing)", "https://use-the-index-luke.com"],
    ["Testcontainers for Node", "https://node.testcontainers.org"],
    ["pino + OpenTelemetry JS docs", "https://opentelemetry.io/docs/languages/js/"],
    ["Database Design (normalization) — Stanford/CMU slides", null],
    ["NeetCode: Heap, Trie, Intervals, Greedy", "https://neetcode.io/roadmap"]
  ],
  days: [
    ["Heaps: LC 703 Kth Largest in a Stream, 1046 Last Stone Weight, 973 K Closest Points, 215 Kth Largest Element. Implement a binary heap class first.", "Backend", "Integration testing: real Postgres via testcontainers/compose, fixtures & factories, transaction rollback per test, testing auth'd routes, contract tests, flaky-test hygiene."],
    ["LC 621 Task Scheduler, 355 Design Twitter, 295 Find Median from Data Stream (two heaps).", "Backend", "Security: OWASP Top 10 for Node (injection, broken access control, SSRF, mass assignment, XSS, insecure deserialization), helmet, rate limit, secrets handling, `npm audit`, supply-chain basics (lockfile, provenance). API keys done right: prefix + hashed secret, scopes, rotation, show-once."],
    ["Tries: LC 208 Implement Trie, 211 Design Add and Search Words, 212 Word Search II.", "Backend", "Observability basics: structured logs + request IDs (AsyncLocalStorage), metrics vs logs vs traces, OpenTelemetry intro, health vs readiness endpoints. Wire pino + request-id into P3."],
    ["Intervals: LC 56 Merge Intervals, 57 Insert Interval, 435 Non-overlapping Intervals, 252 Meeting Rooms.", "SQL", "Schema design: ER modeling, normalization 1NF-BCNF with examples, when to denormalize, constraints (PK/FK/UNIQUE/CHECK), enums, ON DELETE behavior, soft delete, multi-tenancy patterns (shared schema + tenant_id, schema-per-tenant, database-per-tenant) and an intro to Postgres Row-Level Security (policies, SET LOCAL, non-superuser role)."],
    ["LC 253 Meeting Rooms II. Greedy: LC 55 Jump Game, 45 Jump Game II, 134 Gas Station.", "SQL", "Indexes: B-tree structure, composite index column order, covering/partial indexes, selectivity, EXPLAIN vs EXPLAIN ANALYZE. Use The Index, Luke chapters 1-3. Add 3 indexes to P3 and prove with EXPLAIN."]
  ],
  sat: { learn: ["Backend", "Real-world API concerns: file uploads + S3 presigned URLs, background jobs, email sending, webhooks (HMAC signing, retries, idempotency keys), API versioning/deprecation, ETags/conditional requests, optimistic concurrency (version column, If-Match)."],
    dsa: "Greedy set: LC 846 Hand of Straights, 763 Partition Labels, 678 Valid Parenthesis String, 1899 Merge Triplets. Prove (informally) why greedy works for 2 of them.",
    proj: "P3: Boards/Lists/Tasks CRUD — cursor pagination, filters, soft delete, optimistic concurrency (version column), audit log written in the same transaction, org-scoped access checks." },
  sun: { proj: "P3: tests (unit + integration, >=70% coverage), rate limit + helmet + CORS, OpenAPI docs at /docs, Bruno/Postman collection, README. Detect & fix one N+1. Tag v1.0 — Phase 3 retro.",
    dsa: "Timed (75 min): LC 215, 56, 208 cold + 1 unseen medium (heap or greedy).",
    learn: ["SQL", "Transactions intro: ACID, BEGIN/COMMIT/ROLLBACK, savepoints, what happens on crash (WAL concept). Read Postgres docs 'Transaction Isolation'. Prepare week 7 questions: what is a phantom read?"] }
});

/* ======================= PHASE 4 ======================= */
W({ n: 7, phase: 4, title: "Database Internals + Caching + Graphs", project: "P4",
  focus: "Isolation levels, MVCC, locking, query planner, storage engines, Redis, Mongo. DSA: graphs.",
  resources: [
    ["Designing Data-Intensive Applications (Kleppmann) — ch.3 Storage, ch.7 Transactions", null],
    ["Postgres docs — MVCC, Explicit Locking, EXPLAIN", "https://www.postgresql.org/docs/current/"],
    ["CMU 15-445 lectures (transactions, MVCC, indexes)", "https://www.youtube.com/@CMUDatabaseGroup"],
    ["Redis University / Redis docs", "https://redis.io/learn"],
    ["MongoDB University — Intro", "https://learn.mongodb.com"],
    ["NeetCode: Graphs section", "https://neetcode.io/roadmap"]
  ],
  days: [
    ["Graph basics: adjacency list/matrix, BFS & DFS templates. LC 200 Number of Islands, 695 Max Area of Island, 133 Clone Graph.", "SQL", "Transactions & isolation: read uncommitted/committed/repeatable read/serializable, anomalies (dirty read, non-repeatable, phantom, write skew), MVCC in Postgres. Reproduce 3 anomalies with two psql sessions."],
    ["Multi-source/grid BFS-DFS: LC 417 Pacific Atlantic Water Flow, 130 Surrounded Regions, 994 Rotting Oranges.", "SQL", "Locking: row locks, SELECT ... FOR UPDATE / SKIP LOCKED (job queues!), deadlocks & how to avoid, optimistic vs pessimistic, advisory locks. Simulate a deadlock and read the log."],
    ["Topological sort: LC 207 Course Schedule, 210 Course Schedule II (Kahn + DFS).", "SQL", "Query planner: seq vs index vs bitmap scans, join algorithms (nested loop/hash/merge), statistics & ANALYZE, VACUUM/bloat, pg_stat_statements. Find the 3 slowest queries in P3's test run."],
    ["Union-Find: LC 684 Redundant Connection, 323 Number of Connected Components, 261 Graph Valid Tree.", "SQL", "Storage internals: pages/heap, WAL & crash recovery, B+tree vs LSM-tree (RocksDB/Cassandra), checkpointing, streaming replication, backups & PITR. Notes: when would you choose LSM?"],
    ["LC 127 Word Ladder, then redo 200 and 207 cold. Write the BFS/DFS/Topo/UF cheat sheet.", "SQL", "MongoDB & NoSQL families: document model, embedding vs referencing, indexes, aggregation pipeline, transactions, consistency knobs; key-value, wide-column, graph, time-series — when to pick each vs Postgres."]
  ],
  sat: { learn: ["SQL", "Redis: strings/hashes/lists/sets/sorted sets/streams, TTL, persistence (RDB/AOF), eviction policies, pub/sub, Lua scripting, pipelining, transactions (MULTI) vs Lua. Do the Redis University intro and a leaderboard exercise."],
    dsa: "Shortest paths: LC 743 Network Delay Time (Dijkstra), 787 Cheapest Flights Within K Stops, 778 Swim in Rising Water. Implement Dijkstra with your heap.",
    proj: "P4 kickoff: first read the URL-shortener section of the System Design Primer (base62, ID-generation strategies). Then build ShortLink core — base62 encoding, ID generation (autoincrement + base62 vs random), Postgres schema, create + redirect endpoints (301 vs 302), unique constraint collision handling, custom alias, expiry." },
  sun: { proj: "P4: Redis cache-aside for redirects, TTL, negative caching, stampede protection (single-flight/lock). Async click analytics via Redis Streams (consumer group) so redirects never block. BullMQ comes in Week 8.",
    dsa: "Timed (75 min): LC 207, 200, 743 cold + 1 unseen graph medium.",
    learn: ["Backend", "Caching patterns: cache-aside, read-through, write-through, write-behind, invalidation strategies, TTL jitter, hot keys, cache stampede and single-flight, CDN/browser caching hierarchy. Write a 1-page caching decision guide."] }
});

W({ n: 8, phase: 4, title: "Scaling Data, Distributed Fundamentals, DP Begins", project: "P4",
  focus: "Replication, sharding, CAP, consensus, queues, rate limiting, load testing. DSA: MST + DP 1D/2D.",
  resources: [
    ["DDIA — ch.5 Replication, ch.6 Partitioning, ch.8-9 Distributed trouble & consistency", null],
    ["System Design Primer", "https://github.com/donnemartin/system-design-primer"],
    ["ByteByteGo / Alex Xu — System Design Interview Vol.1 (ch. rate limiter, consistent hashing)", null],
    ["k6 docs", "https://k6.io/docs/"],
    ["Raft visualization", "https://raft.github.io"],
    ["NeetCode: 1-D DP, 2-D DP", "https://neetcode.io/roadmap"]
  ],
  days: [
    ["MST + misc graph: LC 1584 Min Cost to Connect All Points (Prim/Kruskal), 332 Reconstruct Itinerary. Redo 743.", "HLD", "Replication & partitioning: leader-follower, sync vs async, replication lag & read-your-writes, hash vs range partitioning, consistent hashing (implement it in JS), hot partitions, rebalancing."],
    ["DP intro (framework: state, transition, base, order): LC 70 Climbing Stairs, 746 Min Cost Climbing Stairs, 198 House Robber, 213 House Robber II.", "Backend", "Rate limiting: token bucket, leaky bucket, fixed window, sliding window log/counter. Implement 2 in JS in-memory with tests; plan the Redis Lua version."],
    ["LC 5 Longest Palindromic Substring, 647 Palindromic Substrings, 91 Decode Ways, 322 Coin Change.", "HLD", "Distributed fundamentals I: CAP & PACELC, consistency models (strong/causal/eventual), quorums (R+W>N), idempotency, retries with backoff, timeouts, the 8 fallacies of distributed computing."],
    ["LC 152 Max Product Subarray, 139 Word Break, 300 Longest Increasing Subsequence.", "HLD", "Distributed II: consensus (Raft overview), leader election, logical/vector clocks, distributed locks (why Redlock is debated), 2PC vs sagas, exactly-once myths."],
    ["LC 416 Partition Equal Subset Sum, 62 Unique Paths, 1143 Longest Common Subsequence.", "HLD", "Messaging: queue vs log, Kafka (topics/partitions/consumer groups/offsets), at-least-once vs at-most-once, DLQ, ordering, BullMQ (Redis-based) for Node, including delayed and repeatable jobs, cron scheduling and idempotent consumers. Draw how an order-placed event fans out."]
  ],
  sat: { learn: ["Backend", "Performance engineering: load testing with k6/autocannon, latency percentiles (p50/p95/p99), Little's Law, connection pools & PgBouncer, N+1, caching impact, tail latency. Run a baseline on P3."],
    dsa: "DP II: LC 309 Best Time to Buy/Sell with Cooldown, 518 Coin Change II, 494 Target Sum, plus 1143 redo.",
    proj: "P4: distributed rate limiter — sliding window as a Redis Lua script (atomic), middleware, per-IP + per-API-key quotas, 429 + Retry-After headers, tests with two app instances." },
  sun: { proj: "P4: k6 load test (before/after cache), find the bottleneck, EXPLAIN ANALYZE + add index, log everything in PERF.md. Write the 1-page design doc (requirements, estimation, API, schema, scaling plan). Tag v1.0.",
    dsa: "Timed (75 min): LC 322, 300, 1143 cold + 1 unseen DP medium.",
    learn: ["HLD", "Back-of-envelope estimation: QPS, storage/year, bandwidth, cache size, read:write ratios; memorize the 'latency numbers'. Estimate for Twitter, WhatsApp, YouTube. Phase 4 retro in NOTES.md."] }
});

/* ======================= PHASE 5 ======================= */
W({ n: 9, phase: 5, title: "Low-Level Design: SOLID, Patterns, LLD Katas", project: "P5",
  focus: "OOP/SOLID, GoF patterns, LLD interview method, katas. DSA: 2D DP, bit manipulation, math.",
  resources: [
    ["Refactoring Guru — Design Patterns & SOLID", "https://refactoring.guru/design-patterns"],
    ["awesome-low-level-design (LLD problems)", "https://github.com/ashishps1/awesome-low-level-design"],
    ["Head First Design Patterns (book)", null],
    ["Clean Architecture (Martin) — ch. on boundaries", null],
    ["Mermaid live editor (class/sequence diagrams)", "https://mermaid.live"],
    ["NeetCode: Bit Manipulation, Math & Geometry", "https://neetcode.io/roadmap"]
  ],
  days: [
    ["2D DP: LC 72 Edit Distance, 97 Interleaving String, 115 Distinct Subsequences.", "LLD", "OOP & SOLID in TypeScript: encapsulation, composition over inheritance, SRP/OCP/LSP/ISP/DIP each with a bad->good refactor. Refactor a 150-line 'god' OrderService."],
    ["LC 10 Regular Expression Matching (hard), 312 Burst Balloons (hard) — attempt, study editorial, re-implement.", "LLD", "Creational patterns: Factory, Abstract Factory, Builder, Singleton (and why module singletons in Node), Prototype. Implement 3 with tests; note a Node/JS-idiomatic alternative for each."],
    ["Backtracking recap: redo 79, 131, 51 cold. Then LC 140-style thinking: write memoized backtracking for Word Break II.", "LLD", "Structural patterns: Adapter, Decorator, Facade, Proxy, Composite. Implement a logging decorator, a caching proxy, and a payment adapter. Compare with middleware."],
    ["Bit manipulation: LC 136 Single Number, 191 Number of 1 Bits, 338 Counting Bits, 190 Reverse Bits, 268 Missing Number, 371 Sum of Two Integers.", "LLD", "Behavioral patterns: Strategy, Observer, State, Command, Chain of Responsibility, Template Method, Iterator. Build a state-machine Order and a command-based undo/redo."],
    ["Math/matrix: LC 48 Rotate Image, 54 Spiral Matrix, 73 Set Matrix Zeroes, 202 Happy Number, 66 Plus One, 50 Pow(x,n).", "LLD", "LLD interview method: clarify requirements -> core entities -> relationships -> APIs -> patterns -> concurrency/extension. UML class + sequence in Mermaid. Walk through Parking Lot end-to-end and implement it."]
  ],
  sat: { learn: ["Backend", "Real-time on the web: WebSocket handshake (HTTP Upgrade), frames, ping/pong, ws vs socket.io, SSE vs long-polling, reconnection with backoff, backpressure. Build a 30-line echo + broadcast server and a browser client.", 1], extra: ["LLD", "LLD kata set A (code + tests + Mermaid diagram each): Elevator system and Vending Machine, ~30 min each. Compare with a reference solution and note differences.", 1],
    dsa: "Mixed mediums, 4 problems from your 'weak list' (anything you failed or needed hints for). Re-solve cold.",
    proj: "P5 kickoff — Pulse: WebSocket server (ws/socket.io), JWT auth on handshake, rooms, presence, typing, message ack, persistence in Postgres + history API." },
  sun: { proj: "P5: scale WebSockets horizontally — 2 instances behind a minimal Nginx upstream config copied from the docs (Nginx gets a full lesson in Week 11), Redis pub/sub adapter, stateless vs sticky sessions, reconnect with last-event-id, delivery acks and ordering per room. Demo with 2 clients on different instances.",
    dsa: "Timed (75 min): LC 72, 91, 139 cold + 1 unseen medium.",
    learn: ["LLD", "LLD kata set B: Splitwise (35 min) and ATM (25 min), plus a class-design write-up of your LRU Cache from Day 17. Discuss concurrency: what if two requests interleave across an await?"] }
});

W({ n: 10, phase: 5, title: "High-Level Design: The System Design Interview", project: "P5",
  focus: "HLD framework, building blocks, classic designs, event-driven architecture, microservices vs monolith.",
  resources: [
    ["System Design Interview Vol.1 & 2 (Alex Xu)", null],
    ["Hello Interview — system design breakdowns", "https://www.hellointerview.com"],
    ["ByteByteGo YouTube + newsletter", "https://bytebytego.com"],
    ["Gaurav Sen — System Design (YouTube)", "https://www.youtube.com/@gkcs"],
    ["Microservices.io patterns (outbox, saga, CQRS)", "https://microservices.io/patterns/"],
    ["Excalidraw (diagrams)", "https://excalidraw.com"]
  ],
  days: [
    ["Pattern revision: re-solve 4 problems from your weak list (graph + DP). No new problems today — consolidation.", "HLD", "HLD framework: requirements (functional/non-functional) -> estimation -> API -> data model -> high-level diagram -> deep dive -> bottlenecks/trade-offs. Building blocks: L4/L7 load balancers, reverse proxy, API gateway, service discovery."],
    ["Linked-list/heap hards: LC 4 Median of Two Sorted Arrays (redo), 25 Reverse Nodes in k-Group, 23 Merge k Sorted Lists.", "HLD", "CDN, DNS, caching tiers, object storage, blob/metadata split. Design on paper: URL Shortener and Pastebin, then compare against your P4 build — what did you not consider?"],
    ["LC 295 Find Median from Data Stream (redo), 355 Design Twitter (redo), 23 (redo).", "HLD", "Design: News feed / Twitter — fan-out on write vs read vs hybrid, celebrity problem, timeline cache in Redis, ranking hooks. Draw it, list bottlenecks, estimate storage."],
    ["Hard stack/array: LC 84 (redo), 42 (redo), 239 (redo) cold in 60 min.", "HLD", "Design: Chat (WhatsApp) & notifications: WebSockets vs SSE vs long-polling, message storage, delivery receipts, presence, push gateways (APNs/FCM), group fan-out."],
    ["Hard trees/tries: LC 124 (redo), 297 (redo), 212 (redo) cold.", "HLD", "Design: Rate limiter service, distributed ID generator (Snowflake), key-value store (Dynamo-style), Google Drive/Dropbox (chunking, dedupe, sync). One 45-min mock on paper."]
  ],
  sat: { learn: ["HLD", "Event-driven architecture: outbox pattern, CDC (Debezium concept), sagas (orchestration vs choreography), CQRS, event sourcing, idempotent consumers; monolith vs modular monolith vs microservices; circuit breaker, bulkhead, retry budgets."],
    dsa: "LeetCode weekly-contest style: 90 min virtual contest (pick any recent past Weekly Contest, 4 problems). Don't peek; review after.",
    proj: "P5: Notification service — producer + BullMQ/Kafka workers, retry with backoff, DLQ, per-user idempotency keys, delivery status table, admin endpoint to replay DLQ." },
  sun: { proj: "P5: implement the outbox pattern (write message + outbox row in one tx -> relay worker -> queue). docker-compose up runs everything. Write the HLD doc with Mermaid/Excalidraw diagram, capacity math, failure modes. Tag v1.0.",
    dsa: "Timed (75 min): 3 mediums, one from each of: graphs, DP, heap/greedy — cold.",
    learn: ["HLD", "Mock system design (record yourself, 45 min): 'Design Instagram'. Then score yourself with the Hello Interview rubric: requirements, estimation, API, data model, scale, trade-offs. Phase 5 retro in NOTES.md."] }
});

/* ======================= PHASE 6 ======================= */
W({ n: 11, phase: 6, title: "DevOps: Docker, CI/CD, Nginx, K8s Basics, Observability", project: "P6", dsaHrs: 0.5, learnHrs: 1.5,
  focus: "Ship & operate what you built. Linux, Docker, GitHub Actions, Nginx/TLS, Kubernetes fundamentals, AWS basics, Prometheus/Grafana.",
  resources: [
    ["roadmap.sh/devops", "https://roadmap.sh/devops"],
    ["Docker docs — Get started + Best practices", "https://docs.docker.com/get-started/"],
    ["GitHub Actions docs", "https://docs.github.com/en/actions"],
    ["Kubernetes Basics tutorial", "https://kubernetes.io/docs/tutorials/kubernetes-basics/"],
    ["TechWorld with Nana — Docker/K8s/CI-CD (YouTube)", "https://www.youtube.com/@TechWorldwithNana"],
    ["Prometheus + Grafana getting started", "https://prometheus.io/docs/introduction/overview/"],
    ["AWS Cloud Practitioner Essentials (free)", "https://aws.amazon.com/training/"]
  ],
  days: [
    ["Light DSA (30 min): 2 problems from your weak list, cold, timed 15 min each.", "DevOps", "Linux for developers: processes/signals, file permissions, systemd units, ssh keys, curl/grep/awk/sed/jq, ss/dig/netstat, cron, journalctl. Provision a cheap VPS (or local VM) and deploy a systemd service manually."],
    ["Light DSA (30 min): 2 problems, mixed topics, timed.", "DevOps", "Docker deep: image layers & caching, multi-stage builds, non-root user, .dockerignore, healthchecks, networks, volumes, compose profiles. Shrink a Node image from ~1GB to <200MB."],
    ["Light DSA (30 min): 2 problems, mixed topics, timed.", "DevOps", "CI/CD: trunk-based dev, PR checks, GitHub Actions (jobs/matrix/cache/secrets/environments), build+push to GHCR, semantic versioning, deployment strategies (rolling, blue/green, canary)."],
    ["Light DSA (30 min): 2 problems, mixed topics, timed.", "DevOps", "Nginx & TLS: reverse proxy, upstream load balancing, gzip/caching, WebSocket proxying, rate limits, Let's Encrypt (certbot), HTTP security headers. Put your app behind Nginx on the VPS."],
    ["Light DSA (30 min): 2 problems, mixed topics, timed.", "DevOps", "Kubernetes fundamentals: pod, deployment, service, ingress, configmap/secret, probes, resource limits, HPA, namespaces. Run kind/minikube and deploy one service with a readiness probe."]
  ],
  sat: { learn: ["DevOps", "Cloud mental model (AWS-first): regions/AZs, IAM, VPC, EC2, S3, RDS, ALB, ECR, ECS/Fargate vs Lambda, CloudWatch, cost. Map your P5 architecture onto AWS services on paper. This is the preview: you deploy for real in the flagship project (Days 132-135)."],
    dsa: "Pattern sampler: 5 problems, one each from sliding window, binary search, tree, graph, DP — timed 20 min each.",
    proj: "P6: multi-stage non-root Dockerfiles for each service, healthchecks, docker-compose for full stack (app, worker, Postgres, Redis). Measure image sizes." },
  sun: { proj: "P6: GitHub Actions pipeline (lint -> test -> build -> push to GHCR -> deploy via SSH/platform). Nginx + HTTPS in front. Try one rollback. Tag v1.0.",
    dsa: "Timed (60 min): 2 mediums cold (any topic you rate weakest).",
    learn: ["DevOps", "Observability: RED/USE methods, Prometheus metrics (prom-client in Node), Grafana dashboard, logs (Loki) vs traces (OTel/Tempo/Jaeger), SLI/SLO/error budgets, alert design. Add /metrics and a dashboard to your deployed app."] }
});

W({ n: 12, phase: 6, title: "AI/ML for Engineers: LLMs, Embeddings, Vector DBs, RAG, Pipelines", project: "P7", dsaHrs: 0.5, learnHrs: 1.5,
  focus: "How LLMs work (practically), APIs, embeddings, vector search, RAG architecture, evaluation, agents, ML pipelines.",
  resources: [
    ["Anthropic docs — Messages API, tool use, prompt caching, embeddings guidance", "https://docs.anthropic.com"],
    ["Andrej Karpathy — Intro to Large Language Models (YouTube, 1h)", "https://www.youtube.com/watch?v=zjkBMFhNj_g"],
    ["3Blue1Brown — Neural Networks / Transformers series", "https://www.3blue1brown.com/topics/neural-networks"],
    ["Pinecone Learning Center (embeddings, RAG, chunking)", "https://www.pinecone.io/learn/"],
    ["pgvector README / Qdrant docs", "https://github.com/pgvector/pgvector"],
    ["Hamel Husain — Your AI product needs evals", "https://hamel.dev/blog/posts/evals/"],
    ["Andrew Ng — Machine Learning Specialization (optional deeper dive)", "https://www.coursera.org/specializations/machine-learning-introduction"]
  ],
  days: [
    ["Light DSA (30 min): 2 problems, mixed topics, timed.", "AI", "LLM fundamentals: tokens, context window, sampling (temperature/top-p), transformer intuition, pre-training vs fine-tuning vs RLHF, hallucination, prompting patterns, structured output. Watch Karpathy's intro."],
    ["Light DSA (30 min): 2 problems, mixed topics, timed.", "AI", "LLM APIs in Node: messages API, system prompts, streaming (SSE) to a browser, tool/function calling, retries & rate limits, token/cost accounting, prompt caching. Build a streaming CLI chatbot with one tool."],
    ["Light DSA (30 min): 2 problems, mixed topics, timed.", "AI", "Embeddings & vector DBs: embedding models, cosine/dot/L2, dimensionality, chunking strategies (fixed/recursive/semantic), ANN indexes (HNSW vs IVF), pgvector vs Qdrant/Pinecone/Weaviate, metadata filtering. Embed 100 docs and query in pgvector. Also try document loaders (PDF text extraction, Markdown) and compare with Postgres full-text search (tsvector)."],
    ["Light DSA (30 min): 2 problems, mixed topics, timed.", "AI", "RAG architecture: ingest -> chunk -> embed -> index -> retrieve -> rerank -> generate; hybrid search (BM25 + vector, RRF), query rewriting for follow-up questions, conversation memory (last-k turns or rolling summary), HyDE, citations, context stuffing limits, common failure modes (bad chunks, missing context, lost-in-the-middle)."],
    ["Light DSA (30 min): 2 problems, mixed topics, timed.", "AI", "ML basics & pipelines for engineers: supervised vs unsupervised, train/val/test, overfitting, precision/recall/F1, features; scikit-learn quickstart; ML pipelines (data -> train -> eval -> registry -> serve), MLflow, DVC, feature stores, batch vs online inference, drift."]
  ],
  sat: { learn: ["AI", "Evals & agents: golden sets, recall@k/MRR, LLM-as-judge faithfulness, tracing (Langfuse/LangSmith/MLflow), prompt-injection & guardrails, agent loop (plan/act/observe), tool design, MCP overview, cost/latency budgets."],
    dsa: "Pattern sampler: 5 problems cold (your weakest 5 topics), 20 min each.",
    proj: "P7 kickoff — DocChat: loaders (PDF/Markdown), recursive chunker with overlap, embeddings, pgvector table + HNSW index, queue-based ingestion worker with content-hash idempotency." },
  sun: { proj: "P7: retrieval API (vector + Postgres FTS, RRF merge, optional reranker), streaming answer endpoint with citations, follow-up query rewriting. Build the 30-question eval set + script (recall@k + judged faithfulness). Tag v1.0.",
    dsa: "Timed (60 min): 2 mediums cold.",
    learn: ["AI", "Data pipelines: ETL vs ELT, batch vs stream, idempotent & replayable pipelines, orchestration (Airflow/Prefect/Temporal concepts), dbt, warehouse vs lake. Sketch how DocChat ingestion would scale to 10M documents. Phase 6 retro."] }
});

/* ======================= PHASE 7 ======================= */
W({ n: 13, phase: 7, title: "Advanced Backend I: Tenancy, Authorization, API Platform, Job Systems", project: "P8",
  focus: "The backend toolkit the flagship needs: Row-Level Security, authorization models, idempotent API design, job systems and outbox, clean architecture. DSA: advanced structures, strings, graphs, hard DP.",
  resources: [
    ["Postgres Row Security Policies", "https://www.postgresql.org/docs/current/ddl-rowsecurity.html"],
    ["AWS SaaS Architecture Fundamentals (tenant isolation models)", "https://docs.aws.amazon.com/whitepapers/latest/saas-architecture-fundamentals/saas-architecture-fundamentals.html"],
    ["OWASP Authorization Cheat Sheet", "https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html"],
    ["Stripe: idempotency in API design", "https://stripe.com/blog/idempotency"],
    ["BullMQ docs", "https://docs.bullmq.io"],
    ["Transactional outbox pattern", "https://microservices.io/patterns/data/transactional-outbox.html"],
    ["NestJS documentation (module/provider structure)", "https://docs.nestjs.com"]
  ],
  days: [
    ["Segment tree and Fenwick tree intro: implement both for LC 307 Range Sum Query - Mutable. Re-solve one problem from your weak list.", "SQL", "Multi-tenancy and Row-Level Security: pool vs silo vs bridge models; shared schema + tenant_id vs schema-per-tenant vs database-per-tenant. In Postgres enable RLS, write policies with current_setting('app.tenant_id'), use SET LOCAL inside a transaction, and see why superusers and table owners bypass RLS. Build a 3-table demo with two tenants."],
    ["String algorithms: KMP and rolling hash. LC 28 Find the Index of the First Occurrence, 187 Repeated DNA Sequences, 1392 Longest Happy Prefix.", "Backend", "Authorization at scale: RBAC vs ABAC vs ReBAC (the Zanzibar idea), permission registries, tenant-defined custom roles, resource-level rules, permission caching and invalidation, deny by default, 404 vs 403. Audit-log design (append-only, who/what/when/before-after). Sketch the role and permission tables for a support-desk product."],
    ["Advanced graphs: LC 269 Alien Dictionary (topological sort), 1334 Find the City (Floyd-Warshall). Re-solve LC 332 cold.", "Backend", "API platform patterns: idempotency keys (Stripe-style), ETag/If-Match optimistic concurrency, RFC 9457 problem+json, API keys and scopes (prefix + hashed secret, rotation), webhook signing and SSRF defenses, OpenAPI-first design, versioning and deprecation."],
    ["Hard DP: LC 1235 Maximum Profit in Job Scheduling, 354 Russian Doll Envelopes, 1140 Stone Game II (attempt, then study the editorial).", "Backend", "Job systems deep dive: delayed and repeatable jobs, cron vs queue schedulers, retries/backoff/DLQ, the transactional outbox with FOR UPDATE SKIP LOCKED, idempotent consumers, per-tenant fairness, BullMQ vs SQS vs Kafka (when to pick which)."],
    ["Design data structures: LC 380 Insert Delete GetRandom O(1), 460 LFU Cache, attempt 432 All O`one Data Structure.", "LLD", "Clean architecture for backends: layered vs hexagonal, modular-monolith boundaries, DDD tactical basics (entities, value objects, aggregates, domain events), dependency injection, and how NestJS modules map to these ideas. Refactor one TaskBoard (P3) module into controller/service/repository with interfaces."]
  ],
  sat: { learn: ["Backend", "Time, scheduling and rules: IANA time zones and DST pitfalls, injectable clocks, business-hours and SLA arithmetic, json-logic-style rule trees, loop prevention. Implement addBusinessMinutes(start, minutes, calendar) with tests across a weekend and a DST change."],
    dsa: "Mixed timed set (75 min): LC 307, 187, 269 cold + 1 unseen medium.",
    proj: "P8 Lab A (TenantLab): two-tenant API with RLS on 3 tables, a non-superuser app role, withTenant(tenantId, fn) using SET LOCAL, a permission registry + can() with a table-driven matrix test (4 roles x 6 actions), and an append-only audit log enforced by privileges. Your cross-tenant test must fail when you delete a policy." },
  sun: { proj: "P8 Lab B: outbox table, relay worker with SKIP LOCKED (run two relays), idempotent consumer with a processed_events table, retry with backoff, DLQ and a replay command. Write the README notes listing what you will reuse in Beacon.",
    dsa: "Timed (60 min): LC 460, 380, 1235 cold.",
    learn: ["Backend", "Reliability patterns: timeouts, retry budgets, circuit breaker (opossum), bulkheads, load shedding, backpressure, health/readiness, graceful degradation. Add a timeout + circuit breaker to one outbound call in Lab B."] }
});

W({ n: 14, phase: 7, title: "Advanced Backend II: Observability, Search, Flagship Planning", project: "P8",
  focus: "Three short sessions: observability depth, search and read models, and planning the flagship so Day 101 starts smoothly.",
  resources: [
    ["Google SRE book: monitoring distributed systems", "https://sre.google/sre-book/monitoring-distributed-systems/"],
    ["OpenTelemetry JS", "https://opentelemetry.io/docs/languages/js/"],
    ["Postgres full-text search", "https://www.postgresql.org/docs/current/textsearch.html"],
    ["Release It! (book): stability patterns", null]
  ],
  days: [
    ["Mixed review (60 min): re-solve 3 problems from your weak list, cold, 20 min each.", "DevOps", "Observability in depth: structured logs with request and tenant ids, RED/USE metrics, distributed tracing with OpenTelemetry (propagate context through queue payloads), SLOs and burn-rate alerts, Sentry. Instrument Lab B end to end."],
    ["Timed: 2 mediums, one graph and one DP, 25 min each. Log mistakes.", "SQL", "Search and read models: Postgres full-text search (tsvector, GIN, ranking), trigram search, when OpenSearch/Elasticsearch is justified, CQRS-style read models, denormalized projections, cache invalidation. Add tenant-scoped full-text search to Lab A."],
    ["Mini contest (75 min): 3 problems cold from your weakest topics.", "HLD", "Flagship planning: read the Beacon overview in the Flagship tab, write the one-page plan (scope Must/Should/Could, risks, routine), install Docker, pnpm, k6, Terraform and AWS CLI, and create the repo and project board."]
  ]
});

W({ n: 15, phase: 8, title: "Revision, Mocks, Capstone", project: "P9",
  focus: "Consolidate everything, interview practice, polish projects, tell your story.",
  resources: [
    ["Pramp / interviewing.io (free mock interviews)", "https://www.pramp.com"],
    ["Tech Interview Handbook — behavioral + resume", "https://www.techinterviewhandbook.org"],
    ["Your NOTES.md + flashcards (best resource now)", null],
    ["ADR template (MADR)", "https://adr.github.io/madr/"],
    ["Hello Interview — mock interview guides", "https://www.hellointerview.com"]
  ],
  days: [
    ["DSA recap: patterns cheat-sheet review (30 min) + 3 mixed mediums cold (30 min).", "JS", "Revision: JS + Node. 20 rapid-fire interview questions out loud (closures, event loop, prototypes, promises, streams, libuv, clustering). Convert gaps into a one-page cheat sheet. Write ADR #1 for your capstone project."],
    ["DSA: 1 timed hard (30 min) + review editorial; 30 min on re-solving a past failure.", "SQL", "Revision: DBMS/SQL. 15 query challenges (windows, CTEs, joins), then explain aloud: isolation levels, MVCC, index choice, normalization, replication, CAP. Write ADR #2."],
    ["DSA: 3 mediums cold, 20 min each. Log mistakes.", "LLD", "Revision: LLD. Implement a NEW problem (an unseen one such as Meeting Room Booker, Chess, Snake & Ladder or Cab Booking) from scratch in 60 min with a class diagram, patterns and tests. Self-review vs SOLID."],
    ["DSA: 2 mediums + 1 hard cold. Log mistakes.", "HLD", "Revision: HLD. Time-boxed mock (45 min): 'Design YouTube/Netflix' — requirements, estimation, architecture, deep dive on storage/transcoding/CDN. Score yourself; fix the weakest section."],
    ["DSA: mixed 3 problems timed; then review your complete 'weak list'.", "Review", "Behavioral + resume: write 3 STAR stories from P3-P7 (conflict/bug/ownership), resume bullets with metrics, GitHub README polish, LinkedIn headline. Pin your best 3 repos."]
  ],
  final: [
    ["Review", 1.5, "Capstone polish for your strongest study project (Beacon comes next): architecture + sequence diagram in the README, 3 ADRs, load-test report with one documented bottleneck fix, 5-minute demo recording."],
    ["Machine", 1.25, "Frontend machine-coding MOCK (75 min, no AI): pick a problem you have NOT done from the bank (e.g. data table with sort/filter/pagination, drag-drop Kanban, date-range picker). Score yourself with the rubric."],
    ["Machine", 1.25, "Backend machine-coding MOCK (75 min, no AI): pick an unseen problem (e.g. Notification service, Feature-flag service, Ride-sharing matcher). Tests + README required. Score with the rubric."],
    ["DSA", 1, "DSA mock interview (45 min + feedback) with a peer, Pramp or interviewing.io. Talk aloud; practice clarifying questions, brute force first, complexity, dry-run on a test case."],
    ["HLD", 1, "System design mock (45 min) with a peer or mentor, then 15 min feedback. Next block: the 40-day Beacon flagship project (Days 101-140). Afterwards: LeetCode to 300, open source, distributed-systems papers."],
    ["Review", 0.5, "Final review: update NOTES.md, archive flashcards, tick the interview checklist in STUDY_PLAN.md. The 100 study days are done. Take a rest day, then start Beacon."]
  ]
});


/* ======================= PHASE 9: FLAGSHIP BEACON (days 101-140) ======================= */
W({ n: 16, phase: 9, title: "Flagship I: Foundations, Tenancy, Identity, RBAC", project: "P10", flagship: true,
  focus: "Parts 0-2: decisions and docs, monorepo skeleton, row-level-security tenancy, authentication with rotating refresh tokens, RBAC with custom roles, audit log.",
  resources: [
    ["C4 model", "https://c4model.com"],
    ["Postgres Row Security Policies", "https://www.postgresql.org/docs/current/ddl-rowsecurity.html"],
    ["OWASP Authentication Cheat Sheet", "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html"],
    ["CASL authorization library", "https://casl.js.org"]
  ]
});

W({ n: 17, phase: 9, title: "Flagship II: Ticket Domain, Public API, Frontend Core", project: "P10", flagship: true,
  focus: "Parts 3-4: ticket state machine, comments and attachments, search and pagination, idempotent and concurrency-safe API, API keys, React app foundations and ticket screens.",
  resources: [
    ["Stripe: idempotency in API design", "https://stripe.com/blog/idempotency"],
    ["RFC 9457 Problem Details", "https://www.rfc-editor.org/rfc/rfc9457.html"],
    ["TanStack Query", "https://tanstack.com/query/latest"],
    ["Playwright", "https://playwright.dev"]
  ]
});

W({ n: 18, phase: 9, title: "Flagship III: Async Backbone, SLA, Automation, Webhooks, Plans, Admin Console", project: "P10", flagship: true,
  focus: "Parts 5-8: BullMQ workers and the outbox, SLA engine, automation rules, signed webhooks, quotas and fairness, admin console UI.",
  resources: [
    ["BullMQ docs", "https://docs.bullmq.io"],
    ["Transactional outbox pattern", "https://microservices.io/patterns/data/transactional-outbox.html"],
    ["OWASP SSRF Prevention", "https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html"],
    ["react-hook-form", "https://react-hook-form.com"]
  ]
});

W({ n: 19, phase: 9, title: "Flagship IV: Realtime, AI Suggested Replies, Observability, Security", project: "P10", flagship: true,
  focus: "Parts 9-11: SSE with Redis fan-out and presence, tenant-scoped RAG with citations and evals, OpenTelemetry, threat model and cross-tenant attack suite.",
  resources: [
    ["MDN Server-sent events", "https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events"],
    ["pgvector", "https://github.com/pgvector/pgvector"],
    ["OpenTelemetry JS", "https://opentelemetry.io/docs/languages/js/"],
    ["OWASP API Security Top 10", "https://owasp.org/API-Security/"]
  ]
});

W({ n: 20, phase: 9, title: "Flagship V: Data Lifecycle, Performance, Chaos, AWS Deployment", project: "P10", flagship: true,
  focus: "Parts 11-13: export and deletion, k6 load tests and fixes, chaos and restore drills, AWS foundations, Terraform, ECS Fargate, OIDC CI/CD, alarms and cost.",
  resources: [
    ["k6 docs", "https://k6.io/docs/"],
    ["Terraform AWS tutorials", "https://developer.hashicorp.com/terraform/tutorials/aws-get-started"],
    ["Amazon ECS developer guide", "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/"],
    ["AWS Skill Builder", "https://skillbuilder.aws"]
  ]
});

W({ n: 21, phase: 9, title: "Flagship VI: Tests, Documentation, Launch", project: "P10", flagship: true,
  focus: "Part 14: bug bash and test pyramid, README and docs, runbooks and demo data, demo video and resume bullets, launch and interview story pack.",
  resources: [
    ["Tech Interview Handbook: resume", "https://www.techinterviewhandbook.org/resume/"],
    ["Mermaid diagrams", "https://mermaid.js.org"],
    ["MADR (ADR template)", "https://adr.github.io/madr/"]
  ]
});


/* ======================= MACHINE CODING ======================= */
const MC = {
  intro: "Machine-coding rounds give you 90-120 minutes to build a small, working, well-structured app (UI or service) on your own laptop. They are judged on a running demo, clean structure, extensibility and edge cases, not on tricks. You get faster only by doing them timed, so one is scheduled every Sunday.",
  playbook: [
    ["0-10 min: Clarify", "Read the prompt twice. Write 5 must-haves and 3 nice-to-haves. Fix the data model (entities, fields) and the public API (functions, endpoints, or component props) on paper. Ask what happens at the edges (empty, duplicate, concurrent)."],
    ["10-55 min: Vertical slice", "Build the thinnest end-to-end path that runs: one screen or one endpoint that does the main thing. Run it early and keep it running. Do not start with folders, abstractions, or styling."],
    ["55-80 min: Complete features", "Add the rest of the must-haves. Keep functions small, name things after the domain, keep state in one place."],
    ["80-100 min: Edge cases + extensibility", "Validate input, handle errors, add loading/empty/error states (frontend) or idempotency and concurrency handling (backend). Replace a switch/if-chain with a strategy or map if a new variant is likely."],
    ["Last 10-20 min: Prove + explain", "Frontend: keyboard + a11y pass. Backend: 5-8 unit tests on the core. Write a 10-line README: how to run, design decisions, what you would do with more time. Rehearse a 2-minute walkthrough."]
  ],
  rubric: [
    ["Works end to end", "30%", "It runs and demos without manual fixes."],
    ["Code structure & naming", "20%", "Small units, clear responsibilities, domain names, no copy-paste."],
    ["Extensibility", "15%", "Adding a new rule/type/variant is a small change (patterns used where they pay off, not everywhere)."],
    ["Edge cases & validation", "15%", "Bad input, empty states, concurrency/races, failures."],
    ["Tests", "10%", "Backend: unit tests on the core logic. Frontend: at least a few component or logic tests, or a clear manual test list."],
    ["Communication", "10%", "You can explain trade-offs and what you would change."]
  ],
  frontendTips: [
    "Do each problem first in vanilla JS or your usual React setup, then redo the same problem in the other once; interviews accept both, but you must be fluent in one.",
    "No UI libraries unless the prompt allows it. Hand-roll debounce, modal, tabs, focus management.",
    "Always handle: loading, empty, error, disabled, keyboard (Tab/Enter/Esc/arrows) and basic ARIA.",
    "Keep state normalized (ids + maps) for trees, comments, boards; derive everything else.",
    "Mind re-renders and stale async responses (cancel with AbortController or ignore outdated results)."
  ],
  backendTips: [
    "Use Node/TypeScript with plain classes and an in-memory repository behind an interface; add persistence only if asked.",
    "Separate layers: API/controller -> service (rules) -> repository (storage). Inject dependencies so tests can fake them.",
    "Think concurrency: two async requests can interleave at every await. Guard critical sections (locks, atomic updates, idempotency keys).",
    "Model states explicitly (enums, state machines) and make illegal transitions impossible.",
    "Write tests as you go for the core rules; tests double as your demo."
  ],
  frontend: [
    { id: "fe-todo", name: "Todo list with filters and persistence", min: 90, spec: "Add, edit, delete and complete tasks; filter All/Active/Done; clear completed; persist in localStorage; Enter/Esc keyboard handling. Bonus: undo, drag to reorder." },
    { id: "fe-typeahead", name: "Autocomplete / typeahead", min: 90, spec: "Debounced search against a mock async API, result cache, cancel or ignore stale requests, highlight the match, arrow/Enter/Esc navigation, combobox ARIA roles. Bonus: recent searches." },
    { id: "fe-infinite", name: "Infinite-scroll feed with optimistic likes", min: 90, spec: "IntersectionObserver pagination from a mock API; loading, error and retry states; optimistic like with rollback on failure; de-duplicate items. Bonus: windowed rendering." },
    { id: "fe-comments", name: "Nested comments thread", min: 90, spec: "Recursive render, reply, edit, delete, collapse a thread, sort by newest/top, normalized state, 3+ levels deep. Bonus: persistence and vote counts." },
    { id: "fe-explorer", name: "File explorer tree", min: 90, spec: "Recursive folders/files, expand/collapse, add, rename, delete, search with highlight, keyboard navigation. Bonus: drag and drop move." },
    { id: "fe-chatui", name: "AI chat UI with streaming", min: 90, spec: "Stream tokens from a mock SSE endpoint, render markdown, stop and retry, keep scroll anchored to the bottom, optimistic user message, error states. Bonus: message edit, copy code block." },
    { id: "fe-kanban", name: "Kanban board with drag and drop", min: 90, spec: "Columns and cards, add/edit/delete, drag between columns and reorder, persist state, keyboard-accessible move. Bonus: filters and WIP limits." },
    { id: "fe-toast", name: "Toast / notification system", min: 60, spec: "Queue, auto-dismiss, pause on hover, stack positions, promise-based API (toast.success('...')). Bonus: swipe to dismiss." },
    { id: "fe-modal", name: "Accessible modal with focus trap", min: 60, spec: "Open/close, Esc and overlay close, focus trap and return, scroll lock, stackable modals." },
    { id: "fe-tabs", name: "Tabs and accordion components", min: 60, spec: "Keyboard (arrows/Home/End) and ARIA roles, controlled and uncontrolled modes, lazy panel rendering." },
    { id: "fe-stars", name: "Star rating", min: 45, spec: "Hover preview, click to set, half stars, readonly mode, keyboard support." },
    { id: "fe-otp", name: "OTP input", min: 60, spec: "Auto-advance, backspace goes back, paste a full code, numeric only, accessible labels." },
    { id: "fe-table", name: "Data table: sort, filter, paginate", min: 90, spec: "Client-side sort per column, text filter, page size and paging; then a server-side mode with loading state. Bonus: column resize." },
    { id: "fe-tictactoe", name: "Tic-tac-toe (NxN) with undo/redo", min: 90, spec: "Configurable board size, win detection, history with undo/redo, reset. Bonus: simple AI." },
    { id: "fe-snake", name: "Snake game", min: 90, spec: "Canvas or DOM grid, keyboard control, food, growth, collision, score, pause. Bonus: speed levels and high score." },
    { id: "fe-carousel", name: "Image carousel", min: 90, spec: "Prev/next, dots, autoplay with pause on hover, swipe, lazy loading, a11y. Bonus: infinite loop." },
    { id: "fe-progress", name: "Concurrent progress bars", min: 60, spec: "Click to add bars; at most 3 animate at once, the rest queue. Bonus: pause and cancel." },
    { id: "fe-form", name: "Dynamic form builder with validation", min: 90, spec: "Render a form from a JSON schema; required, min/max, regex, cross-field rules; show errors on blur and submit." },
    { id: "fe-tags", name: "Tag input / multi-select chips", min: 90, spec: "Type to filter suggestions, Enter to add, Backspace to remove, no duplicates, keyboard navigation." },
    { id: "fe-sheet", name: "Spreadsheet-lite", min: 120, spec: "Grid of cells, A1 references, SUM and basic formulas, dependent cells recompute, cycle detection." },
    { id: "fe-virtual", name: "Virtualized list (10k rows)", min: 90, spec: "Render only visible rows from scratch with a spacer, variable overscan, smooth scroll. Bonus: variable height." }
  ],
  backend: [
    { id: "be-kv", name: "In-memory key-value store with TTL", min: 90, spec: "get/set/del/expire/ttl, lazy plus periodic expiry, max-size eviction (pluggable LRU/LFU), JSON snapshot to disk, unit tests. Bonus: multi/exec transactions." },
    { id: "be-pubsub", name: "Pub/Sub message broker", min: 90, spec: "Topics, subscribe/unsubscribe, publish, async delivery with a per-subscriber queue, ack/retry, backpressure, replay from an offset. Unit tests." },
    { id: "be-scheduler", name: "Job scheduler with priorities and retries", min: 90, spec: "enqueue(job, priority, delay), worker pool with a concurrency limit, retries with backoff, dead-letter list, graceful shutdown, status API. Tests with fake timers." },
    { id: "be-splitwise", name: "Splitwise", min: 90, spec: "Users, groups, equal/exact/percent splits, per-user balances, simplify debts to minimum transactions, REST API, validation, tests." },
    { id: "be-bms", name: "BookMyShow-lite seat booking", min: 90, spec: "Shows and seats, temporary hold with TTL, confirm and cancel, prevent double-booking under concurrent requests, idempotent confirm. Bonus: pricing strategy." },
    { id: "be-miniredis", name: "Mini Redis over TCP", min: 90, spec: "node:net server with a simple protocol (RESP-lite): PING, GET, SET, DEL, EXPIRE, INCR; multiple clients; a streaming parser that handles partial frames; tests. Bonus: pub/sub." },
    { id: "be-gateway", name: "API gateway lite", min: 90, spec: "Route table, upstream proxying, auth check, per-client rate limit, circuit breaker, retries with timeout, request logging." },
    { id: "be-parking", name: "Parking lot", min: 90, spec: "Levels, vehicle types, ticketing, pricing strategy, concurrent entry, availability API, tests." },
    { id: "be-ratelimiter", name: "Rate limiter library", min: 90, spec: "Fixed window, sliding window and token bucket behind a strategy interface; per-key limits; injectable clock for tests." },
    { id: "be-logger", name: "Logger framework", min: 90, spec: "Levels, transports (console/file), formatters, child loggers with context, async batching." },
    { id: "be-lru", name: "LRU + TTL cache", min: 60, spec: "O(1) get/set with doubly linked list + map, TTL expiry, generics, hit/miss stats." },
    { id: "be-notify", name: "Notification service", min: 120, spec: "Channels (email/SMS/push), templates, user preferences, retries, de-duplication, delivery status." },
    { id: "be-library", name: "Library management", min: 90, spec: "Books and copies, members, borrow/return, due dates and fines, reservations queue." },
    { id: "be-vending", name: "Vending machine", min: 90, spec: "State pattern, inventory, coin handling, change calculation, refunds, admin restock." },
    { id: "be-elevator", name: "Elevator controller", min: 120, spec: "Multiple elevators, request scheduling, state machine, direction handling, emergency stop." },
    { id: "be-snakeladder", name: "Snake and ladder", min: 60, spec: "Configurable board, snakes, ladders, multiple players, dice strategy, winner detection." },
    { id: "be-ride", name: "Ride-sharing matcher", min: 120, spec: "Riders and drivers, nearest-driver matching, ride states, surge pricing strategy, cancellation." },
    { id: "be-flags", name: "Feature flag service", min: 90, spec: "Flags with rules, percentage rollout (stable hashing), targeting by attribute, caching, audit log." },
    { id: "be-coupon", name: "Coupon / discount engine", min: 90, spec: "Rule chain, stacking and exclusivity, usage limits, validity windows, explanation of why a coupon applied." },
    { id: "be-queue", name: "SQS-like queue with visibility timeout", min: 90, spec: "send/receive/delete, visibility timeout, redelivery, DLQ after N receives, long polling." },
    { id: "be-webhook", name: "Webhook delivery system", min: 120, spec: "Register endpoints, HMAC signing, retries with backoff, dead-letter, replay, per-endpoint ordering." },
    { id: "be-query", name: "Mini query engine on JSON arrays", min: 120, spec: "Parse SELECT ... WHERE ... ORDER BY ... LIMIT, evaluate over in-memory rows, basic indexes." },
    { id: "be-undo", name: "Text editor with undo/redo", min: 60, spec: "Command pattern, insert/delete/replace, undo/redo stacks, cursor handling." },
    { id: "be-leaderboard", name: "Leaderboard", min: 60, spec: "Add/update score, top-K, rank of a user, ties, daily/weekly windows." }
  ],
  // Sunday schedule: week -> bank id (1.5 h slot: build the core must-haves, finish bonus items later)
  schedule: { 1: "fe-todo", 2: "be-kv", 3: "fe-typeahead", 4: "be-pubsub", 5: "fe-infinite", 6: "be-scheduler", 7: "fe-comments", 8: "be-splitwise", 9: "be-bms", 10: "fe-explorer", 11: "be-miniredis", 12: "fe-chatui", 13: "be-ratelimiter", 16: "fe-table", 17: "be-webhook", 18: "fe-form", 19: "be-queue", 20: "fe-virtual" }
};
MC.all = [...MC.frontend.map(x => ({ ...x, side: "Frontend" })), ...MC.backend.map(x => ({ ...x, side: "Backend" }))];
const mcText = n => {
  const it = MC.all.find(x => x.id === MC.schedule[n]);
  return `${it.side} machine coding — ${it.name}. ${it.spec} Timebox 90 min: build the must-haves first, no AI, no copy-paste. Follow the playbook in the Machine coding tab, then log time-to-working and what you missed in NOTES.md.`;
};

/* ======================= LEARN-THIS-FIRST MAP (project needs -> day taught) ======================= */
const NEEDS = {
  P1: [["Closures (debounce, memoize, curry)", 1], ["this + bind", 2], ["Hash maps (memoize cache, LRU)", 2], ["Event loop + timers (debounce/throttle)", 4], ["Promises (all/any polyfills, own Promise)", 5], ["Iterators, Map/Set, Proxy (deepClone)", 6], ["Vitest basics + fake timers", 6], ["AbortController + async iteration", 8], ["Observer pattern (EventEmitter)", 10], ["Linked lists + LRU (doubly-linked version)", 17]],
  P2: [["SQL basics + Postgres setup (for the sink)", 14], ["Event loop phases", 15], ["Core modules, Buffers, util.parseArgs", 16], ["Streams + backpressure", 17], ["HTTP server from scratch", 18], ["worker_threads", 19], ["Graceful shutdown + signals", 22], ["Testing with supertest", 24], ["Full-text search (reused later)", 26], ["Profiling + flamegraphs", 27], ["ER diagrams + multi-tenancy (for P3)", 28]],
  P3: [["TypeScript", 29], ["REST design + OpenAPI basics", 30], ["Fastify + zod validation", 31], ["Authentication (hashing, JWT, cookies)", 32], ["Authorization + OAuth", 33], ["ORM, migrations, transactions, N+1", 34], ["Docker compose for local dev", 35], ["Integration testing (testcontainers)", 36], ["Security + rate limiting", 37], ["Logging + request IDs", 38], ["Schema design + normalization", 39], ["Indexes + EXPLAIN", 40], ["Uploads, webhooks, optimistic concurrency", 41]],
  P4: [["Transactions + isolation", 43], ["Locking", 44], ["Query planner", 45], ["ID generation + base62 (primer reading)", 48], ["Redis (data structures, Lua, streams)", 48], ["Caching patterns + stampede protection", 49], ["Replication + consistent hashing", 50], ["Rate limiting algorithms", 51], ["Idempotency + retries", 52], ["Queues + BullMQ", 54], ["Load testing", 55], ["Back-of-envelope estimation (design doc)", 56]],
  P5: [["Redis pub/sub", 48], ["Queues + DLQ", 54], ["SOLID + patterns (for LLD katas)", 57], ["LLD interview method (Parking Lot)", 61], ["WebSockets + real-time", 62], ["HLD framework", 64], ["Chat + notification design", 67], ["Outbox, sagas, event-driven", 69]],
  P6: [["Linux + systemd", 71], ["Docker deep dive", 72], ["CI/CD with GitHub Actions", 73], ["Nginx + TLS", 74], ["Kubernetes basics", 75], ["Cloud preview", 76], ["Observability (Prometheus/Grafana)", 77]],
  P7: [["LLM fundamentals", 78], ["LLM APIs + streaming", 79], ["Embeddings, vector DBs, loaders", 80], ["RAG architecture + query rewriting + memory", 81], ["ML pipelines basics", 82], ["Evals + guardrails", 83], ["Data pipelines", 84]],
  P8: [["Authentication + sessions", 32], ["Authorization + OAuth", 33], ["Multi-tenancy intro + ER (study)", 28], ["Schema design + tenancy patterns + RLS", 39], ["Isolation levels + locking", 43], ["Idempotency + retries", 52], ["Queues, DLQ, delayed jobs", 54], ["Outbox + event-driven", 69], ["RLS + multi-tenancy deep dive", 85], ["Authorization at scale", 86], ["API platform patterns", 87], ["Job systems + outbox", 88], ["Clean architecture", 89], ["Time + rules", 90], ["Reliability patterns", 91]],
  P9: [["Revision of everything + ADRs", 95], ["Behavioral + resume", 99]],
  P10: [["TypeScript + Fastify + zod", 29], ["Authentication + authorization", 32], ["ORM + migrations + transactions", 34], ["Integration testing", 36], ["Security + API keys + rate limiting", 37], ["Schema design, tenancy, RLS", 39], ["Indexes + EXPLAIN", 40], ["Locking + isolation", 43], ["Redis + caching", 48], ["Queues + delayed jobs", 54], ["WebSockets / real-time", 62], ["LLD + patterns", 57], ["Outbox + event-driven", 69], ["Docker + CI/CD", 72], ["Observability basics", 77], ["RAG + embeddings + evals", 80], ["Advanced Backend block (TenantLab)", 85], ["Planning day", 94]]
};
projects.forEach(pr => { pr.needs = NEEDS[pr.id] || []; });

/* ======================= HOW-TO-FOLLOW GUIDE ======================= */
const GUIDE = {
  intro: "Read this once before Day 1. You do not need to be 'ready' for DSA or the projects: the plan teaches in order, and every project lists what to learn first. Your job each day is only to open the tracker, find 'Next up', and do the tasks top to bottom.",
  preflight: [
    ["Set up your tools (1-2 h)", "Install Node 20+ (via nvm or fnm), Git, VS Code, Docker Desktop, and Postgres (via Docker). Create a GitHub account and one repo named `sde90-notes`."],
    ["Create your notebook", "In that repo, create NOTES.md with headings: Concepts, DSA mistakes (weak list), Machine-coding log, Weekly reviews. Everything you learn goes here in your own words."],
    ["Set up LeetCode", "Create a free LeetCode account. Use JavaScript as your language. Bookmark neetcode.io/roadmap and neetcode.io/practice."],
    ["Create your project folder", "Make one folder per project (jsutils, logscope, taskboard, shortlink, pulse, ...). Each gets its own Git repo, tagged v1.0 when done."],
    ["Block time on your calendar", "Pick fixed slots for short sessions (2 h) and the two long sessions. A fixed slot beats motivation. The tracker works with any days you choose."],
    ["Open the tracker and read Week 1", "Open tracker.html, press Continue, read the Week 1 header (focus, project, resources). Then begin Day 1."]
  ],
  shortSession: [
    ["First 5 min", "Open the tracker. Read both tasks. Open the resource for the topic in a tab."],
    ["Hour 1: DSA", "Follow the DSA method below. One topic per day, 2-4 problems. Stop at the hour even if unfinished; carry the unsolved problem to the weak list."],
    ["Hour 2: Learn + build", "Read or watch for about 25 min, then write code for the rest. Every learn task ends with something you built or explained out loud."],
    ["Last 5 min", "Tick the tasks, write 2 lines in NOTES.md (what clicked, what didn't)."]
  ],
  longSession: [
    ["Long session A (about 6.5 h)", "2 h deep-dive learning, 1.5 h DSA patterns, 2.5 h project, 30 min notes and flashcards. Take a 10-min break between blocks."],
    ["Long session B (about 6.5 h)", "2.5 h project, 1.5 h machine-coding problem (timed), 1 h timed DSA, 1 h learning, 30 min weekly review. The machine-coding block is a real timer: when it ends, stop and write your retro."],
    ["If you only have half a day", "Do the learning and the project, skip the extra DSA, and finish the rest in the next short session. Never skip the project or the review."]
  ],
  dsaMethod: [
    ["Start with the pattern, not the problem", "Each day names a topic (e.g. two pointers). Read the 5-minute explanation (NeetCode) first, then attempt problems."],
    ["Think for 20-25 minutes", "Write brute force first, then the optimal idea. Say the time and space complexity out loud. Do not look at hints before 20 minutes."],
    ["Then look, then close the tab", "If you are stuck, read a hint, then the editorial. Close it and write the solution from memory. That second write is where learning happens."],
    ["Re-solve on a schedule", "Re-solve every problem you needed help with after 3 days and again after 7 days. Keep a weak-list table in NOTES.md (problem, pattern, date, status)."],
    ["Total beginner? Day 1 is gentle", "If arrays and loops feel shaky, spend Week 1 on Easy problems only and use the NeetCode explanation videos. The plan's Easy -> Medium ramp is built for this."],
    ["Count problems honestly", "Use the + button in the tracker only when you solved it without the editorial."]
  ],
  projectMethod: [
    ["Before coding: read the spec and the 'learn first' list", "Open the Projects tab. Each project lists the days that teach what you need. If you reach a project early, do those days first."],
    ["Day 1 of a project: skeleton", "Repo, README with the goal, folder structure, one failing test, one command to run it. Commit."],
    ["Build a vertical slice", "Get one feature working end to end before polishing anything. Commit small, often, with clear messages."],
    ["Tick deliverables as you finish them", "The deliverables list is your definition of done. Do not add features that are not on the list until all of it is ticked."],
    ["Finish with README + v1.0 tag", "Add how to run, design decisions, and a PERF.md or DESIGN.md. A project without a README does not count in an interview."],
    ["Stuck for more than 45 minutes?", "Write the problem down in 5 lines, take a walk, then search or ask. If still stuck, simplify the requirement and note it as a known limitation."]
  ],
  weekCycle: [
    ["Short sessions (5 per week)", "Build knowledge: DSA topic + one learning topic."],
    ["Long session A", "Deep dive + DSA patterns + project progress."],
    ["Long session B", "Project finishing + machine coding + timed DSA + weekly review."],
    ["Every week end", "Update the tracker, push code, write the weekly review, and review last week's flashcards (10 min)."]
  ],
  rules: [
    "Days are sessions, not dates. Missing a week for a festival or work just moves 'Next up'; nothing expires.",
    "After a gap of 4+ days, spend 10 minutes re-reading your notes before continuing.",
    "If you are behind, drop the lowest-value task (extra reading, stretch goals), never the project, the machine-coding block or the weekly review.",
    "You do not need to finish every resource. The resource lists are menus. The task text is the requirement.",
    "When a task says 'build', open the editor and type. Watching a tutorial does not count as done.",
    "Take one full rest day each week. Fatigue costs more than a missed session."
  ],
  faq: [
    ["I do not understand a term (Docker, RBAC, indexing, AWS...). Where do I look?", "Open the Concepts tab. Each term has what it is, why we use it, an example and the day the plan teaches it. Search by word or filter by category, and tick Got it when you could explain it yourself."],
    ["Which should I do first, DSA or a project?", "Follow the order inside each day: DSA first (fresh mind), then learning. Projects happen on long sessions. You never choose; the day card is the order."],
    ["Can I skip ahead to the projects?", "Not safely. Open the Projects tab and complete the 'learn first' days for that project; then you can start it."],
    ["I know some of this already. Can I go faster?", "Yes. Do a day in half the time if the topic is familiar, but still do the build and the DSA. Skip nothing in machine coding or projects."],
    ["Should I use AI while learning?", "Use it to explain and to review your finished code. During DSA and machine-coding practice, switch it off, because interviews do."],
    ["What is the flagship project and when do I start it?", "Beacon is the 40-day resume project (Days 101-140) you build after the 100 study days. The Advanced Backend labs on Days 90-91 rehearse its hardest parts, and Day 94 is your planning day. Use the Flagship tab for the step-by-step details of each part."],
    ["How do I know I'm done with a week?", "All tasks ticked, project deliverables for the week ticked, and you wrote the weekly review."]
  ]
};

/* ---------- Build the day array ---------- */
const FLAG = (typeof module !== "undefined") ? require("./flagship-data.js") : window.FLAGSHIP;
const DET = (typeof module !== "undefined") ? require("./flagship-detail.js") : window.FLAGSHIP_DETAIL;
const SD = (typeof module !== "undefined") ? require("./study-detail.js") : window.STUDY_DETAIL;
// Append key ideas / try-it / steps / done-when to a task line (study days 1-100)
const withDetail = (text, e) => {
  let o = text;
  if (e.pts) o += "\n" + e.pts.map(x => "• " + x).join("\n");
  if (e.tryIt) o += "\nTry it (10 min): " + e.tryIt;
  if (e.steps) o += "\nSteps:\n" + e.steps.map((x, i) => `${i + 1}. ${x}`).join("\n");
  if (e.end) o += "\nDone when: " + e.end.replace(/^done when:?\s*/i, "");
  return o;
};
const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const days = [];
let dayNo = 1, flagWeekend = 0;
for (const w of weeks) {
  if (w.flagship) {
    const count = w.n === 21 ? 5 : 7;
    for (let k = 0; k < count; k++) {
      const fd0 = FLAG.dayPlan[dayNo - FLAG.dayRange[0]], det = DET[dayNo];
      const pi = FLAG.parts.findIndex(x => x.id === fd0.part), part = FLAG.parts[pi];
      const fd = { ...fd0, learn: det ? `${fd0.learn}\n${det.pts.map(x => "• " + x).join("\n")}\nTry it (10 min): ${det.tryIt}` : fd0.learn };
      const build = det
        ? `Beacon, Part ${pi}: ${part.title}.\nToday's goal: ${fd0.build}\nSteps:\n${det.steps.map((x, i) => `${i + 1}. ${x}`).join("\n")}\nEnd of day: ${det.end}\nFull part details: Flagship tab, Part ${pi}.`
        : `Beacon, Part ${pi}: ${part.title}. ${fd0.build} Full steps, practices and done-list: Flagship tab, Part ${pi}.`;
      const title = "Beacon: " + fd.title;
      if (k < 5) {
        days.push({ day: dayNo++, week: w.n, dow: DAY_NAMES[k], kind: "weekday", title, part: fd.part,
          tasks: [T(fd.track, 0.5, fd.learn), T("Project", 1.5, build)] });
      } else if (k === 5) {
        days.push({ day: dayNo++, week: w.n, dow: "Sat", kind: "weekend", title, part: fd.part,
          tasks: [T(fd.track, 1, fd.learn), T("Project", 4, build), T("DSA", 1, FLAG.dsaWeekend[flagWeekend++ % FLAG.dsaWeekend.length]), T("Review", 0.5, "Tick the Part " + pi + " checklist items you finished (Flagship tab), commit, and write 3 lines in NOTES.md.")] });
      } else {
        days.push({ day: dayNo++, week: w.n, dow: "Sun", kind: "weekend", title, part: fd.part,
          tasks: [T("Project", 3.5, build), T("Machine", 1.5, mcText(w.n)), T("DSA", 1, FLAG.dsaWeekend[flagWeekend++ % FLAG.dsaWeekend.length]), T("Review", 0.5, "Weekly review: update tracker, push code, write 3 things learned + 1 weak spot to NOTES.md. Plan next week.")] });
      }
    }
    continue;
  }
  const dsaH = w.dsaHrs ?? 1, learnH = w.learnHrs ?? 1;
  for (let i = 0; i < w.days.length; i++) {
    const [dsa, track, learn] = w.days[i];
    days.push({ day: dayNo++, week: w.n, dow: DAY_NAMES[i], kind: "weekday",
      title: learn.split(":")[0],
      tasks: [T("DSA", dsaH, dsa), T(track, learnH, learn)] });
  }
  if (w.final) {
    days.push({ day: dayNo++, week: w.n, dow: "Sat", kind: "weekend", title: "Capstone, Mock Interviews and Machine Coding Mocks",
      tasks: w.final.map(([tr, h, tx]) => T(tr, h, tx)) });
  } else if (w.sat) {
    const satTasks = [T(w.sat.learn[0], w.sat.learn[2] ?? 2, w.sat.learn[1])];
    if (w.sat.extra) satTasks.push(T(w.sat.extra[0], w.sat.extra[2], w.sat.extra[1]));
    satTasks.push(T("DSA", 1.5, w.sat.dsa), T("Project", 2.5, w.sat.proj), T("Review", 0.5, "Notes + flashcards: write 5 cards in your own words for this week's concepts."));
    days.push({ day: dayNo++, week: w.n, dow: "Sat", kind: "weekend", title: "Deep-dive + Build: " + (w.sat.learn[1].split(":")[0]), tasks: satTasks });
    days.push({ day: dayNo++, week: w.n, dow: "Sun", kind: "weekend", title: "Build + Machine Coding + Weekly Review",
      tasks: [T("Project", 2.5, w.sun.proj), T("Machine", 1.5, mcText(w.n)), T("DSA", 1, w.sun.dsa), T(w.sun.learn[0], 1, w.sun.learn[1]), T("Review", 0.5, "Weekly review: update tracker, push code, write 3 things learned + 1 weak spot to NOTES.md. Plan next week.")] });
  }
}
for (const d of days) { const det = SD[d.day]; if (!det || d.day > 100) continue; d.tasks.forEach((t, i) => { if (det[i]) t.text = withDetail(t.text, det[i]); }); }
for (const w of weeks) { w.dayRange = [days.find(d => d.week === w.n).day, days.filter(d => d.week === w.n).slice(-1)[0].day]; delete w.days; delete w.sat; delete w.sun; delete w.final; }

const PLAN = {
  meta: {
    title: "SDE Mastery Plan: 100 study days + 40-day flagship project",
    studyDays: 100, flagshipDays: 40, totalDays: days.length,
    hoursPerWeekday: 2, hoursPerWeekendDay: 6.5,
    tracks: ["DSA", "JS", "Node", "Backend", "SQL", "LLD", "HLD", "DevOps", "Cloud", "AI", "Machine", "Project", "Review"]
  },
  phases, projects, weeks, days, machine: MC, guide: GUIDE, flagship: FLAG
};

if (typeof module !== "undefined") module.exports = PLAN;
if (typeof window !== "undefined") window.PLAN = PLAN;
