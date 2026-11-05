/* FLAGSHIP PROJECT: BEACON (Days 101-140). Loaded by plan-data.js (Node: require, browser: window.FLAGSHIP). */
const FLAGSHIP = {
  "name": "Beacon",
  "tagline": "A multi-tenant customer-support platform with RBAC, queues, SLA automation, webhooks, realtime updates and AI-suggested replies, deployed on AWS.",
  "why": [
    "It is a real product category (Zendesk/Freshdesk), so recruiters instantly understand the problem and judge the engineering, not the idea.",
    "It forces the hard backend topics every senior interview probes: tenant isolation, authorization models, async processing, idempotency, delayed jobs, rate limiting, observability.",
    "It has a real frontend (React dashboard), so you can show full-stack range, which is your edge as a frontend developer.",
    "It ends in a live, monitored AWS deployment created from Terraform, which most portfolio projects never reach."
  ],
  "scopeGuide": [
    [
      "Must have (resume-defining)",
      "Tenancy with RLS, auth with refresh rotation, RBAC with custom roles, tickets + comments + attachments, queue workers with retries/DLQ, outbox, SLA timers, webhooks, observability, AWS deploy with CI/CD."
    ],
    [
      "Should have",
      "Automation rules engine, plan quotas, realtime updates, tenant-scoped AI suggested replies with eval set, public API with API keys."
    ],
    [
      "Could cut if behind",
      "Stripe test-mode billing, presence indicators, visual rule builder (keep a JSON editor), saved views, CloudFront for the web app (serve it from the API), chaos drills beyond one."
    ]
  ],
  "stack": [
    [
      "Language / runtime",
      "TypeScript (strict), Node 20+"
    ],
    [
      "API",
      "Fastify (or NestJS if you want the most common enterprise structure) as a modular monolith"
    ],
    [
      "Workers",
      "Separate worker process (same codebase) using BullMQ locally and SQS-compatible design for AWS"
    ],
    [
      "Database",
      "PostgreSQL with Row-Level Security, Drizzle or Prisma, pgvector, full-text search"
    ],
    [
      "Cache / pub-sub",
      "Redis (rate limits, idempotency keys, realtime fan-out, BullMQ)"
    ],
    [
      "Storage / mail (local)",
      "MinIO (S3-compatible), Mailpit (SMTP catcher)"
    ],
    [
      "Frontend",
      "React + Vite + TypeScript, TanStack Query, Radix/shadcn UI, Playwright e2e"
    ],
    [
      "Testing",
      "Vitest, supertest, testcontainers, Playwright, k6"
    ],
    [
      "Observability",
      "pino, OpenTelemetry, Prometheus metrics, Sentry, Grafana/CloudWatch"
    ],
    [
      "Infra",
      "Docker, Terraform, AWS (VPC, RDS, ElastiCache, ECS Fargate, ALB, S3, CloudFront, SQS/SES, Secrets Manager), GitHub Actions with OIDC"
    ]
  ],
  "repo": [
    "beacon/",
    "  apps/api        (HTTP API, auth, RBAC, REST + public API)",
    "  apps/worker     (queue consumers, schedulers, outbox relay)",
    "  apps/web        (React dashboard)",
    "  packages/shared (types, zod schemas, permission registry, event contracts)",
    "  infra/terraform (AWS modules: network, data, ecs, edge)",
    "  docs/           (architecture, ADRs, runbooks, API, security, performance)",
    "  docker-compose.yml, Makefile, .github/workflows/"
  ],
  "components": [
    [
      "API service",
      "Stateless HTTP. Validates input, authenticates, authorizes, runs domain services, writes to Postgres in a tenant-scoped transaction, writes events to the outbox."
    ],
    [
      "Worker service",
      "Consumes queues: email, webhooks, SLA timers, automations, embeddings, AI replies. Idempotent handlers, retries with backoff, DLQ."
    ],
    [
      "Postgres",
      "Source of truth. Every table has tenant_id and RLS. Outbox, audit log, usage counters live here."
    ],
    [
      "Redis",
      "Rate limiting, idempotency keys, BullMQ queues, pub/sub for realtime fan-out."
    ],
    [
      "Object storage",
      "Attachments via presigned URLs, never through the API."
    ],
    [
      "Web app",
      "React SPA with RBAC-aware routes and live ticket updates."
    ],
    [
      "Edge",
      "ALB with HTTPS, CloudFront for static assets."
    ]
  ],
  "resumeBullets": [
    "Designed and built Beacon, a multi-tenant support-desk SaaS (TypeScript, Fastify, PostgreSQL, Redis, React) serving isolated tenants through Postgres row-level security, verified by an automated cross-tenant access test suite covering every endpoint.",
    "Implemented RBAC with tenant-defined custom roles and resource-level policies, plus an append-only audit log; permission matrix covered by table-driven tests.",
    "Built an asynchronous backbone (BullMQ workers, transactional outbox, idempotent consumers, DLQ and replay) that processes email, webhook and SLA jobs with at-least-once delivery and per-tenant fairness.",
    "Created an SLA engine with business-hours calendars and delayed jobs, and a rules-automation engine with loop prevention; sustained N req/s at p95 under X ms in k6 load tests on 1M tickets.",
    "Shipped tenant-scoped AI suggested replies (hybrid retrieval over pgvector + full-text search, citations, PII redaction, per-tenant cost caps) with a 30-question evaluation set reporting recall@k and faithfulness.",
    "Provisioned the platform on AWS with Terraform (VPC, RDS, ElastiCache, ECS Fargate, ALB, S3/CloudFront) and zero-stored-credential CI/CD via GitHub Actions OIDC; OpenTelemetry traces, alarms and a documented backup-restore drill."
  ],
  "demoScript": [
    "Sign up two organizations (Acme and Globex) and show that Acme cannot see Globex data, even by guessing IDs.",
    "Invite an agent, show the role limits, then create a custom role in the admin UI and watch the UI adapt.",
    "Create a ticket by email-in or API key, watch it appear live in another browser tab.",
    "Show an SLA timer breach firing an automation (assign + notify) and the delivery appearing in the webhook log, then replay a failed webhook.",
    "Open a ticket and use an AI suggested reply with citations from the knowledge base; show the cost cap and PII redaction.",
    "Show the Grafana/CloudWatch dashboard and one distributed trace from API to worker.",
    "Show `terraform apply` structure and the one-click GitHub Actions deploy."
  ],
  "talkingPoints": [
    "Why row-level security instead of schema-per-tenant, and when you would switch.",
    "How refresh-token rotation with reuse detection works and what it protects against.",
    "Why the outbox pattern exists and how it avoids dual-write bugs.",
    "How you guarantee idempotency across retries (keys, unique constraints, processed-events table).",
    "How you stop one tenant from starving the queue (per-tenant concurrency, weighted fairness).",
    "What you would change to scale 100x (read replicas, partitioning by tenant, moving workers to SQS, extracting services)."
  ],
  "parts": [
    {
      "id": "pt0",
      "title": "Discovery, architecture and decisions",
      "days": [
        101,
        102
      ],
      "goal": "Decide what you are building and how, before writing feature code. A senior engineer ships documents and a walking skeleton first.",
      "build": [
        "docs/product.md: problem, 3 personas (owner, agent, customer), 12 user stories, explicit non-goals",
        "docs/architecture.md: C4 context + container diagrams (Mermaid), data-flow for 'customer emails -> ticket -> SLA -> notification'",
        "ADR-001 modular monolith, ADR-002 tenancy model (shared schema + tenant_id + RLS), ADR-003 queue technology, ADR-004 auth approach",
        "Monorepo skeleton: apps/api, apps/worker, apps/web, packages/shared; docker-compose with Postgres, Redis, MinIO, Mailpit",
        "CI pipeline: install, lint, typecheck, test on every PR"
      ],
      "how": [
        "Write the problem statement and personas first (30 min). Cut features until the Must list in the scope guide is all that remains.",
        "Draw the C4 context and container diagrams in Mermaid; keep each diagram to 8 boxes or fewer.",
        "For each ADR use the MADR template: context, options (at least 2), decision, consequences. Be honest about downsides.",
        "Create the pnpm workspace; add TypeScript project references, ESLint, Prettier, Husky pre-commit and commitlint (Conventional Commits).",
        "Add zod-validated environment config in packages/shared so every app fails fast on a bad env.",
        "Write `make dev` that starts compose + api + worker + web. Add a /health endpoint and one test so CI is green on day 1."
      ],
      "practices": [
        "Architecture Decision Records for every non-obvious choice; reviewers read these before code.",
        "12-factor configuration: everything environment-specific comes from env vars, validated at boot.",
        "Trunk-based development: short-lived branches, small PRs, conventional commit messages, squash-merge.",
        "CI is green before features start; a broken main is the highest-priority bug.",
        "Keep a CHANGELOG and tag releases with semver."
      ],
      "done": [
        "docs/ has product, architecture and 4 ADRs",
        "`make dev` brings the whole stack up from a clean clone",
        "CI runs lint, typecheck and tests on a PR and passes",
        "Env validation fails with a readable message when a variable is missing"
      ],
      "pitfalls": [
        "Starting with microservices (a modular monolith is faster to build and easier to explain).",
        "Over-designing diagrams; they should take less than an hour."
      ],
      "resources": [
        [
          "C4 model",
          "https://c4model.com"
        ],
        [
          "MADR (ADR template)",
          "https://adr.github.io/madr/"
        ],
        [
          "12-factor app",
          "https://12factor.net"
        ],
        [
          "Conventional Commits",
          "https://www.conventionalcommits.org"
        ]
      ]
    },
    {
      "id": "pt1",
      "title": "Tenancy and identity",
      "days": [
        103,
        105
      ],
      "goal": "Make tenant isolation a property of the database, not a convention developers must remember. Then build authentication that survives a security review.",
      "build": [
        "Tables: organizations, users, memberships (user + org + role), sessions, invites; tenant_id on every business table",
        "Postgres Row-Level Security policies on every tenant table, using a per-transaction setting for the current tenant",
        "Tenant context: AsyncLocalStorage carries tenant and user from the request; a DB helper opens a transaction and runs `SET LOCAL app.tenant_id`",
        "Auth: register, login, argon2id password hashing, short-lived access JWT, rotating refresh tokens with reuse detection, logout and logout-all",
        "Email verification, password reset, invite acceptance, org switching (a user can belong to many orgs)",
        "Login throttling and lockout; auth events written to the audit log"
      ],
      "how": [
        "Model users globally and permissions per organization through memberships; never put role on the user row.",
        "Write a migration that enables RLS and adds `USING (tenant_id = current_setting('app.tenant_id')::uuid)` policies. Connect the app as a non-superuser role, because superusers bypass RLS.",
        "Create `withTenant(tenantId, fn)` which begins a transaction, runs SET LOCAL, executes fn(tx) and commits. Forbid raw pool access outside it via lint rule or code review.",
        "Hash passwords with argon2id (tuned parameters). Store only a hash of refresh tokens; each refresh issues a new token and marks the old one used. If a used token reappears, revoke the whole token family.",
        "Send verification and reset links via Mailpit locally; tokens are random 32 bytes, stored hashed, single use, expiring in 15-60 minutes.",
        "Add per-IP and per-account rate limits to /auth routes; return the same response for 'unknown email' and 'wrong password'.",
        "Write the isolation test: create two tenants, loop over every route and every ID in tenant A, call as tenant B, assert 404."
      ],
      "practices": [
        "Defense in depth: RLS in the database plus tenant checks in code; tests prove both.",
        "Never log tokens, passwords or full emails; redact in the logger config.",
        "Uniform error responses on auth to avoid user enumeration.",
        "Short access tokens in memory, refresh token in an HttpOnly Secure SameSite cookie.",
        "Security-sensitive actions (password change, role change, session revoke) always write an audit event."
      ],
      "done": [
        "Cross-tenant test suite fails if any table lacks an RLS policy",
        "Refresh-token reuse revokes the family (covered by a test)",
        "Invite, verify and reset flows work end to end via Mailpit",
        "A user in two orgs can switch org and sees only that org's data"
      ],
      "pitfalls": [
        "Connecting as the table owner or a superuser, which silently disables RLS.",
        "Forgetting SET LOCAL inside a transaction when using a connection pool (use SET LOCAL, never plain SET).",
        "Putting roles in the JWT and trusting them for the token lifetime."
      ],
      "resources": [
        [
          "Postgres Row Security Policies",
          "https://www.postgresql.org/docs/current/ddl-rowsecurity.html"
        ],
        [
          "OWASP Authentication Cheat Sheet",
          "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html"
        ],
        [
          "AWS SaaS Architecture Fundamentals (tenant isolation)",
          "https://docs.aws.amazon.com/whitepapers/latest/saas-architecture-fundamentals/saas-architecture-fundamentals.html"
        ]
      ]
    },
    {
      "id": "pt2",
      "title": "RBAC, resource policies and audit log",
      "days": [
        106,
        107
      ],
      "goal": "Build authorization the way real products do: a permission registry, tenant-defined roles, and resource-level rules, all testable as a matrix.",
      "build": [
        "Permission registry in packages/shared (e.g. ticket:read, ticket:assign, role:manage) used by API and UI",
        "Default roles (owner, admin, agent, viewer) plus tenant-defined custom roles stored in the database",
        "Policy function can(actor, action, resource) with resource-level rules (agents edit tickets assigned to them or their team)",
        "Authorization middleware and a `requirePermission` helper used on every route",
        "Append-only audit_log table (actor, action, target, before/after, request id, IP) with an API to browse it",
        "Roles admin API and a permission-matrix test suite"
      ],
      "how": [
        "Define permissions as constants in one file; roles are sets of permissions; memberships link users to roles.",
        "Implement `can()` as a pure function that takes a loaded actor (permissions + team ids) and a resource, so it is trivially unit testable. CASL is a good library choice if you prefer not to hand-roll it.",
        "Load permissions once per request and cache them in Redis keyed by membership + role version; bump the version when a role changes.",
        "Add `requirePermission('ticket:assign')` as a route-level guard; for resource rules call `can()` in the service after loading the resource.",
        "Write audit entries from the service layer (not controllers) inside the same transaction as the change so they cannot drift.",
        "Make audit_log append-only: revoke UPDATE and DELETE for the app role, and add a trigger that raises on attempts.",
        "Generate the matrix test from a table: for each role x action x resource-state, expect allow/deny."
      ],
      "practices": [
        "Deny by default; an action not listed in a role is forbidden.",
        "Authorization is checked on the server for every request; the UI hiding a button is only convenience.",
        "Return 404 (not 403) when the actor should not even know a resource exists.",
        "Audit logs record who did what, when, from where, and the change; they are immutable.",
        "Keep permission names stable; they are part of your public contract."
      ],
      "done": [
        "Matrix test covers at least 4 roles x 10 actions",
        "Owner can create a custom role and assign it; effect is immediate (cache version bump)",
        "Every state-changing endpoint writes an audit entry",
        "Attempting to update or delete an audit row fails at the database"
      ],
      "pitfalls": [
        "Scattering role checks (`if role === 'admin'`) through the code instead of permissions.",
        "Caching permissions with no invalidation path."
      ],
      "resources": [
        [
          "CASL authorization library",
          "https://casl.js.org"
        ],
        [
          "OWASP Authorization Cheat Sheet",
          "https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html"
        ],
        [
          "Open Policy Agent (for comparison)",
          "https://www.openpolicyagent.org"
        ]
      ]
    },
    {
      "id": "pt3",
      "title": "Ticket domain, API contract and public API",
      "days": [
        108,
        112
      ],
      "goal": "Build the core product with production-grade API behavior: state machine, search, pagination, idempotency, concurrency control and API keys.",
      "build": [
        "Tickets with per-tenant numbering, status state machine (new, open, pending, solved, closed, reopen), priority, assignee, tags, requester",
        "Comments (public replies and internal notes), @mentions, activity timeline built from events",
        "Attachments with presigned upload/download to S3-compatible storage, size and type validation, virus-scan hook point",
        "List/search: cursor pagination, filters, full-text search, composite indexes, saved views (optional)",
        "API conventions: RFC 7807 problem+json errors, Idempotency-Key support, ETag/If-Match optimistic concurrency, /v1 versioning, OpenAPI generated from zod schemas",
        "API keys with scopes, rotation, per-key rate limits and usage log, exposed as a public REST API"
      ],
      "how": [
        "Day 108: model the status transitions as a table of allowed moves and enforce them in one domain function; reject illegal moves with a clear error. Use a per-tenant counter row (locked with FOR UPDATE) or a sequence table for ticket numbers.",
        "Day 109: store comments as rows, attachments as metadata rows pointing to object keys; generate presigned PUT URLs with content-length limits; confirm upload with a second call; scan asynchronously via a queue job.",
        "Day 110: add `(tenant_id, status, updated_at desc, id)` style indexes; implement keyset pagination using an opaque cursor; add a tsvector column with a GIN index and rank results. Run EXPLAIN ANALYZE on the 3 hottest queries and write the findings in docs/performance.md.",
        "Day 111: implement an idempotency middleware (hash of key + route + body, store response for 24 h); add `version` column and return ETag; PATCH requires If-Match; map errors to problem+json; generate OpenAPI and publish /docs.",
        "Day 112: API keys are shown once, stored as a hash with a visible prefix (bk_live_ab12...); scopes map to permissions; rate limit per key with a Redis sliding window; log usage per key per day."
      ],
      "practices": [
        "Business rules live in a service layer, not in route handlers or the ORM models.",
        "Every list endpoint is paginated; there are no unbounded queries.",
        "Writes are idempotent where clients may retry (POST with Idempotency-Key).",
        "Errors are machine-readable (problem+json with a stable `type`) and never leak internals.",
        "Secrets (API keys) are hashed at rest and shown once.",
        "Database migrations are forward-only, reviewed, and safe to run while the app is live (add columns nullable, backfill, then constrain)."
      ],
      "done": [
        "State machine rejects illegal transitions (tests list all)",
        "Two concurrent PATCHes with the same ETag: one succeeds, one gets 412",
        "Retrying a POST with the same Idempotency-Key does not create a second ticket",
        "Search + filter + pagination on 100k seeded tickets stays under 100 ms server time",
        "An API key with a read scope cannot create a ticket"
      ],
      "pitfalls": [
        "Offset pagination on large tables.",
        "Trusting the file extension instead of verifying content type and size.",
        "Storing API keys in plaintext."
      ],
      "resources": [
        [
          "Stripe: idempotency in API design",
          "https://stripe.com/blog/idempotency"
        ],
        [
          "RFC 9457 Problem Details",
          "https://www.rfc-editor.org/rfc/rfc9457.html"
        ],
        [
          "Use The Index, Luke (keyset pagination)",
          "https://use-the-index-luke.com/no-offset"
        ],
        [
          "Postgres full-text search",
          "https://www.postgresql.org/docs/current/textsearch.html"
        ]
      ]
    },
    {
      "id": "pt4",
      "title": "Frontend application",
      "days": [
        113,
        114
      ],
      "goal": "Turn the API into a polished, accessible, permission-aware dashboard. This is where your frontend experience becomes a differentiator.",
      "build": [
        "React + Vite + TypeScript app shell: routing, layout, org switcher, login/refresh flow",
        "API client generated from OpenAPI; TanStack Query for caching, retries and optimistic updates",
        "Permission-aware UI: routes, buttons and menus driven by the /me permissions list",
        "Ticket list (virtualized, URL-synced filters, keyboard navigation) and ticket detail (timeline, composer, internal notes, attachments)",
        "Admin screens (minimal forms): roles, API keys, webhooks, rules (JSON editor), knowledge base",
        "Playwright e2e for login, create ticket, reply, permission denied"
      ],
      "how": [
        "Keep the access token in memory and rely on the HttpOnly refresh cookie; add an Axios/fetch interceptor that refreshes once on 401 and queues concurrent requests.",
        "Generate typed hooks from the OpenAPI spec so the UI breaks at compile time when the API changes.",
        "Model server state in TanStack Query and UI state locally; sync filters to the URL so views are shareable.",
        "Implement optimistic updates for status, assignee and tags with rollback on error.",
        "Virtualize the ticket list (TanStack Virtual) and add j/k/enter shortcuts.",
        "Use Radix primitives (shadcn) for menus, dialogs and tabs to get focus management and ARIA right.",
        "Write 4-6 Playwright tests against the docker-compose stack and run them in CI."
      ],
      "practices": [
        "Accessibility is a requirement: keyboard paths, focus rings, labels, contrast checks (axe in Playwright).",
        "Errors, empty states and loading states are designed, not afterthoughts.",
        "No business rules in the client; the client reflects server decisions.",
        "Bundle and route-level code splitting; measure with Lighthouse.",
        "Typed boundaries: all API data parsed with zod at the edge in dev builds."
      ],
      "done": [
        "A new user can sign up, create an org, invite an agent and handle a ticket entirely in the UI",
        "Hiding/disabling follows permissions, and forced requests still get 403/404 from the API",
        "Playwright suite is green in CI",
        "axe reports no serious violations on the main screens"
      ],
      "pitfalls": [
        "Spending the whole time on styling; use a component library and move on.",
        "Storing tokens in localStorage."
      ],
      "resources": [
        [
          "TanStack Query",
          "https://tanstack.com/query/latest"
        ],
        [
          "TanStack Virtual",
          "https://tanstack.com/virtual/latest"
        ],
        [
          "shadcn/ui + Radix",
          "https://ui.shadcn.com"
        ],
        [
          "Playwright",
          "https://playwright.dev"
        ]
      ]
    },
    {
      "id": "pt5",
      "title": "Asynchronous backbone: queues, outbox, notifications",
      "days": [
        115,
        116
      ],
      "goal": "Move everything slow or unreliable out of the request path and make it reliable: retries, idempotency, ordering where needed, and no lost events.",
      "build": [
        "Worker app with BullMQ queues (email, webhooks, sla, automation, embeddings, ai) and a secured Bull Board",
        "Retry with exponential backoff and jitter, dead-letter handling, manual replay endpoint",
        "Transactional outbox: domain events written in the same transaction as the change; relay worker publishes them",
        "Event envelope: id, type, version, tenant_id, occurred_at, payload, trace id; contracts in packages/shared",
        "Idempotent consumers with a processed_events table",
        "Notification service: email templates, per-user preferences, send via Mailpit locally (SES later)"
      ],
      "how": [
        "Create `outbox(id, tenant_id, type, payload, created_at, published_at)`. In the same DB transaction as a ticket change, insert the event row.",
        "Relay: loop `SELECT ... WHERE published_at IS NULL ORDER BY id FOR UPDATE SKIP LOCKED LIMIT 100`, enqueue each event, then mark published. Run two relays to prove SKIP LOCKED works.",
        "Consumers check `processed_events(consumer, event_id)` with a unique constraint inside the handler's transaction so retries are harmless.",
        "Set per-queue defaults: attempts 5, backoff exponential 2s with jitter, removeOnComplete with a limit, and move to a failed set (DLQ) afterwards.",
        "Handle SIGTERM: stop accepting jobs, wait for in-flight work, close connections, exit 0.",
        "Email: render with a template engine, include an unsubscribe/preferences link, store a delivery record per message."
      ],
      "practices": [
        "At-least-once delivery plus idempotent handlers is the practical standard; do not promise exactly-once.",
        "Jobs carry IDs, not whole objects; the worker loads fresh state.",
        "Every queue has a DLQ, an alert on its depth, and a replay procedure in the runbook.",
        "Correlate API request, event and job with the same trace/request id.",
        "Keep handlers small and side-effect-aware; wrap external calls with timeouts."
      ],
      "done": [
        "Killing the worker mid-job and restarting completes the job exactly once from the user's perspective",
        "Two relay instances do not double-publish events",
        "A failing email job lands in the DLQ after 5 attempts and can be replayed",
        "Creating a ticket produces an outbox event and a notification without blocking the request"
      ],
      "pitfalls": [
        "Publishing to the queue directly from the request handler (dual-write).",
        "Retrying non-idempotent side effects.",
        "Unbounded retry loops."
      ],
      "resources": [
        [
          "BullMQ docs",
          "https://docs.bullmq.io"
        ],
        [
          "Transactional outbox pattern",
          "https://microservices.io/patterns/data/transactional-outbox.html"
        ],
        [
          "Postgres SKIP LOCKED explained",
          "https://www.postgresql.org/docs/current/sql-select.html#SQL-FOR-UPDATE-SHARE"
        ]
      ]
    },
    {
      "id": "pt6",
      "title": "SLA engine and automation rules",
      "days": [
        117,
        118
      ],
      "goal": "Build the features that make a support desk valuable: time-based guarantees and customer-defined automation, both safe and testable.",
      "build": [
        "SLA policies per tenant and priority (first-response and resolution targets) with business-hours calendars and time zones",
        "Due-time calculation, pause while status is pending, and delayed jobs for warning and breach",
        "Escalation actions (notify, reassign, raise priority) and SLA status visible on tickets",
        "Automation rules as JSON: trigger (event type), conditions (AND/OR tree), actions (assign, tag, set priority, notify, call webhook)",
        "Rule evaluator with dry-run/test mode, execution log, loop prevention (max depth, per-ticket dedupe)"
      ],
      "how": [
        "Represent business hours as weekly intervals in the tenant's IANA time zone; write `addBusinessMinutes(start, minutes, calendar)` as a pure function with an injectable clock and test across DST changes and holidays.",
        "On ticket events recompute SLA due times, delete and reschedule delayed jobs (job id = ticket + sla type so reschedule is idempotent).",
        "Breach handler re-checks that the ticket is still breaching (state may have changed) before acting.",
        "Rules: validate with a zod schema, version the schema, and store the rule JSON. The evaluator is a recursive function over the condition tree with a whitelist of fields and operators (never eval).",
        "Actions run through the same service layer as human actions so permissions, audit and events behave identically (actor = 'automation:rule-id').",
        "Prevent loops: tag each event with an automation depth; drop events beyond depth 3; record why in the execution log."
      ],
      "practices": [
        "Time is an injected dependency; no `Date.now()` inside business logic.",
        "Delayed jobs must tolerate being late, duplicated or stale; always re-validate on execution.",
        "Rule engines are data-driven and sandboxed: no dynamic code execution.",
        "Explainability: every automation execution records the matched conditions and actions taken.",
        "Property-based or table-driven tests for date arithmetic."
      ],
      "done": [
        "SLA due time is correct across a DST change and over a weekend (tests)",
        "A ticket moving to pending pauses the SLA and resumes correctly",
        "A rule that triggers itself stops at the depth limit and logs it",
        "Dry-run shows what a rule would do without side effects"
      ],
      "pitfalls": [
        "Computing durations with raw milliseconds across time zones.",
        "Letting automations bypass authorization and audit."
      ],
      "resources": [
        [
          "Temporal API / date-fns-tz for time zones",
          "https://date-fns.org"
        ],
        [
          "json-logic (a model for JSON rule trees)",
          "https://jsonlogic.com"
        ]
      ]
    },
    {
      "id": "pt7",
      "title": "Webhooks, plans, quotas and tenant fairness",
      "days": [
        119,
        120
      ],
      "goal": "Add the integration and commercial features of a SaaS and protect the platform from noisy tenants and abusive endpoints.",
      "build": [
        "Outbound webhooks: endpoint registry, event subscriptions, HMAC-SHA256 signing with timestamp, retries, delivery log, manual replay, auto-disable after repeated failure",
        "SSRF protection for customer-supplied URLs",
        "Plans (free, pro, enterprise) with limits (seats, tickets per month, API rate, AI credits) and usage metering",
        "Per-tenant rate limiting by plan; quota enforcement with clear 429/402 responses",
        "Per-tenant fairness in queues (concurrency caps and weighted scheduling)",
        "Optional: Stripe test-mode subscriptions with idempotent webhook handling"
      ],
      "how": [
        "Sign `timestamp.payload` with a per-endpoint secret; send `X-Beacon-Signature` and `X-Beacon-Timestamp`; document verification and replay-window checks.",
        "Deliver from a queue with a 10 s timeout, exponential retry over about 24 h, store status code, latency and a truncated response body.",
        "SSRF: resolve DNS yourself, reject private, loopback and link-local ranges, pin the resolved IP for the request, disallow redirects to private ranges.",
        "Meter usage with Redis counters (INCR with monthly keys) flushed to Postgres by a periodic job; enforce soft limits (warn) and hard limits (block).",
        "Rate limit key = tenant + plan tier using the Redis sliding-window script from Week 8.",
        "Fairness: give each tenant its own BullMQ group or limiter so one tenant's 50k jobs cannot starve others; test with a flood tenant and a normal tenant.",
        "If using Stripe: verify the webhook signature, store event IDs to ignore duplicates, and treat Stripe as the source of truth for subscription state."
      ],
      "practices": [
        "Treat outbound HTTP to customer URLs as hostile: timeouts, size limits, no internal network access.",
        "Webhook receivers must verify signatures and timestamps; document this for your customers.",
        "Usage data is counted once and reconcilable; keep an idempotency key per metered event.",
        "Show limits and usage in the UI before enforcement surprises customers.",
        "Feature flags per tenant for gradual rollout."
      ],
      "done": [
        "A webhook to an internal IP is rejected",
        "Failing endpoints are retried, logged, and auto-disabled after N failures; replay works",
        "A free-plan tenant hits its API rate limit while a pro tenant does not",
        "A flooding tenant does not delay a normal tenant's email jobs beyond a documented bound"
      ],
      "pitfalls": [
        "Following redirects blindly.",
        "Counting usage inside the request path with no atomicity.",
        "Using one global queue with no fairness."
      ],
      "resources": [
        [
          "Stripe webhooks guide",
          "https://docs.stripe.com/webhooks"
        ],
        [
          "OWASP SSRF Prevention",
          "https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html"
        ],
        [
          "GitHub webhook signature docs (reference design)",
          "https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries"
        ]
      ]
    },
    {
      "id": "pt8",
      "title": "Admin console: roles, rules, webhooks, keys, audit",
      "days": [
        121,
        121
      ],
      "goal": "Expose the platform's power through safe, usable admin screens. This is where a frontend specialist shows product sense.",
      "build": [
        "Role editor with a permission matrix (checkbox grid grouped by area)",
        "API keys screen: create, show once with copy button, rotate, revoke, last-used time",
        "Webhooks screen: endpoints, subscriptions, delivery log with status/latency, one-click replay",
        "SLA policy editor and automation rules editor (JSON editor with schema validation + dry-run result panel)",
        "Usage and plan page (quotas, AI credits, upgrade prompt) and an audit-log viewer with filters"
      ],
      "how": [
        "Generate forms from your zod schemas with react-hook-form + a zod resolver so validation rules live in one place (packages/shared).",
        "Use a JSON editor (CodeMirror or Monaco) configured with the rule JSON schema; show errors inline and disable Save until valid.",
        "Show secrets once: after creation display in a dialog with a copy button and a warning; afterwards show only the prefix.",
        "Use server-side pagination and filters for logs; keep filter state in the URL.",
        "Use confirm dialogs for destructive actions (revoke key, delete role) that state what will happen; make them keyboard accessible.",
        "Disable or hide actions based on permissions, but keep the API as the source of truth and show a clear 'you do not have access' state on 403."
      ],
      "practices": [
        "Destructive and irreversible actions require explicit confirmation and are audited.",
        "Never render secrets after creation; mask by default.",
        "Empty, loading and error states are designed for every admin table.",
        "Admin pages are covered by at least one Playwright test each.",
        "Copy the language of the product consistently ('Revoke', not 'Delete' for keys)."
      ],
      "done": [
        "A tenant owner can create a custom role, assign it, and the agent's UI changes after a refresh",
        "A rule can be edited, dry-run, saved and seen in the execution log",
        "A failed webhook can be replayed from the UI",
        "All admin screens pass axe with no serious violations"
      ],
      "pitfalls": [
        "Building a visual drag-and-drop rule builder (JSON editor + dry run is enough).",
        "Showing API keys again after creation."
      ],
      "resources": [
        [
          "react-hook-form",
          "https://react-hook-form.com"
        ],
        [
          "CodeMirror 6",
          "https://codemirror.net"
        ],
        [
          "Zod",
          "https://zod.dev"
        ]
      ]
    },
    {
      "id": "pt9",
      "title": "Realtime updates and presence",
      "days": [
        122,
        123
      ],
      "goal": "Make the dashboard feel live without breaking tenant isolation or horizontal scaling.",
      "build": [
        "SSE (or WebSocket) endpoint authenticated with the same session, subscribed to tenant-scoped channels",
        "Redis pub/sub fan-out so any API instance can notify clients connected to another instance",
        "Permission-filtered events (agents only receive tickets they can read)",
        "Presence: 'Priya is viewing this ticket' using Redis keys with TTL heartbeats",
        "Reconnect with Last-Event-ID and UI cache updates via TanStack Query",
        "Presence UI chip and live-updating ticket list in the web app"
      ],
      "how": [
        "Publish a compact event (type + ids) to `tenant:{id}:events` after commit (from the outbox relay); never send full objects with sensitive data.",
        "On the SSE connection, subscribe to the tenant channel, check `can(actor, 'ticket:read', ticketId)` before forwarding, and send heartbeat comments every 20 s.",
        "Support reconnect by keeping a short Redis stream per tenant and replaying from Last-Event-ID.",
        "In the UI, on an event invalidate or patch the matching query cache entry instead of refetching everything.",
        "Presence: SETEX `presence:ticket:{id}:{user}` 30 s refreshed by a heartbeat; list with SCAN or a sorted set."
      ],
      "practices": [
        "Realtime is a hint to refetch, not the source of truth.",
        "Same authorization rules apply to streams as to REST.",
        "Back off reconnects with jitter to avoid thundering herds.",
        "Limit connections per user and per tenant."
      ],
      "done": [
        "Two browser tabs on different API instances both update live",
        "A user without access to a ticket never receives its events (test)",
        "Killing the API instance causes a clean reconnect and replay"
      ],
      "pitfalls": [
        "Forwarding unfiltered tenant-wide events to every user.",
        "Holding unbounded per-connection buffers."
      ],
      "resources": [
        [
          "MDN Server-sent events",
          "https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events"
        ],
        [
          "Redis Streams",
          "https://redis.io/docs/latest/develop/data-types/streams/"
        ]
      ]
    },
    {
      "id": "pt10",
      "title": "AI suggested replies (tenant-scoped RAG)",
      "days": [
        124,
        126
      ],
      "goal": "Add a genuinely useful AI feature while treating tenant data security, cost and quality as engineering problems.",
      "build": [
        "Knowledge base: articles CRUD per tenant with versions",
        "Ingestion worker: chunk, embed (queue job), store in pgvector with tenant_id; re-embed on edit using a content hash",
        "Hybrid retrieval: pgvector similarity + Postgres full-text search merged with reciprocal-rank fusion, always filtered by tenant",
        "Suggested reply endpoint: retrieval, prompt with ticket context and citations, streaming response to the agent UI; agent edits and sends (human in the loop)",
        "Guardrails: PII redaction before sending to the model, prompt-injection defenses for ticket text, per-tenant AI credit cap, request logging with token counts",
        "Evaluation: 30 question/answer pairs per sample tenant, script reporting recall@k and faithfulness"
      ],
      "how": [
        "Add `kb_chunks(tenant_id, article_id, content, embedding vector, content_hash)` with RLS and an HNSW index; query with `WHERE tenant_id = $1` through the RLS-scoped connection so a bug cannot cross tenants.",
        "Chunk by headings then size with overlap; store the heading path as metadata.",
        "Retrieval returns top 20 from each source; fuse; optionally rerank; keep top 5 with article ids for citations.",
        "Prompt structure: system rules (answer only from context, say 'not sure' otherwise), untrusted ticket content in a clearly delimited block, KB snippets in another; ask for citations by id.",
        "Redact emails, phone numbers and card-like numbers before the call; keep a mapping to restore if needed.",
        "Debit AI credits in the same transaction that records the usage row; refuse politely at zero.",
        "Build the eval script: for each question, check if the expected article is in the top-k and ask a judge model whether the answer is supported by the retrieved text."
      ],
      "practices": [
        "Tenant isolation applies to embeddings too; vector search must run inside the RLS boundary.",
        "AI output is a draft for a human; never auto-send in v1.",
        "Log prompts and responses carefully (redacted), with token counts and latency for cost control.",
        "Treat ticket text as untrusted input; instructions inside it must not change system behavior.",
        "Measure quality with an evaluation set before and after every prompt or retrieval change."
      ],
      "done": [
        "A query from tenant A never retrieves tenant B chunks (test with planted canary text)",
        "Suggested reply streams to the UI with clickable citations",
        "Eval script outputs recall@5 and faithfulness for the sample tenants",
        "AI credits decrement and block at zero"
      ],
      "pitfalls": [
        "Doing vector search outside the RLS-scoped connection.",
        "Embedding on every save with no hashing, which wastes money."
      ],
      "resources": [
        [
          "pgvector",
          "https://github.com/pgvector/pgvector"
        ],
        [
          "Hamel Husain: Your AI product needs evals",
          "https://hamel.dev/blog/posts/evals/"
        ],
        [
          "OWASP Top 10 for LLM applications",
          "https://owasp.org/www-project-top-10-for-large-language-model-applications/"
        ],
        [
          "Anthropic docs",
          "https://docs.anthropic.com"
        ]
      ]
    },
    {
      "id": "pt11",
      "title": "Observability, security hardening and data lifecycle",
      "days": [
        127,
        129
      ],
      "goal": "Make the system operable and defensible: you can see what it is doing, prove tenants are isolated, and handle privacy requests.",
      "build": [
        "OpenTelemetry traces from API through queue to worker with tenant and request ids; Prometheus metrics (RED, queue depth, SLA breaches); Sentry for errors",
        "Dashboards, 3 alerts and written SLOs",
        "Threat model (STRIDE) and an OWASP API Top 10 checklist with evidence per item",
        "Automated cross-tenant attack suite that iterates every route; dependency, container and SAST scanning in CI",
        "Security headers, strict CORS, CSP; secrets scanning pre-commit",
        "Tenant data export job (zip to S3 with signed link) and tenant deletion with a grace period and audit"
      ],
      "how": [
        "Day 127: add the OTel SDK with auto-instrumentation, propagate trace context into job payloads and webhook deliveries, export to a local collector + Grafana; define RED metrics; configure Sentry with PII scrubbing; add 3 alerts with runbook stubs.",
        "Day 128: write the STRIDE table (threat, mitigation, test); generate the cross-tenant suite from the router's route list and assert 404/403 for every route; add npm audit, CodeQL and Trivy to CI; add gitleaks as a pre-commit hook.",
        "Day 129: implement export (async job, zip, S3 presigned link, expires in 24 h) and deletion (soft delete, 14-day grace, hard-delete job with audit) with tests; review the audit log for gaps."
      ],
      "practices": [
        "Instrument first, optimize second; every performance claim has a measurement.",
        "Alert on symptoms (error rate, latency, queue age), not causes (CPU).",
        "No PII or secrets in logs, traces or error reports.",
        "Security checks run in CI, not once at the end.",
        "Write a runbook for each alert: what it means, how to confirm, how to fix."
      ],
      "done": [
        "A single trace shows request -> outbox -> worker -> webhook",
        "Cross-tenant suite covers every route and runs in CI",
        "Export and deletion jobs work and are tested",
        "STRIDE table and OWASP API checklist are committed with links to tests"
      ],
      "pitfalls": [
        "Logging request bodies.",
        "Writing the threat model after the code and finding nothing."
      ],
      "resources": [
        [
          "OpenTelemetry JS",
          "https://opentelemetry.io/docs/languages/js/"
        ],
        [
          "OWASP API Security Top 10",
          "https://owasp.org/API-Security/"
        ],
        [
          "Google SRE book: monitoring",
          "https://sre.google/sre-book/monitoring-distributed-systems/"
        ],
        [
          "gitleaks",
          "https://github.com/gitleaks/gitleaks"
        ]
      ]
    },
    {
      "id": "pt12",
      "title": "Load testing, performance and chaos drills",
      "days": [
        130,
        131
      ],
      "goal": "Replace guesses with numbers: find the real bottlenecks, fix them, and prove the system survives failures.",
      "build": [
        "Seed script producing 1M tickets, 5M comments across 200 tenants",
        "k6 scenarios: read-heavy, mixed, spike, and a noisy-tenant scenario",
        "Fixes for the top 3 bottlenecks (indexes, N+1, connection pool or PgBouncer, caching)",
        "Chaos drills: kill worker mid-job, restart Redis, restart Postgres, delay the network",
        "Backup and point-in-time restore drill with measured recovery time",
        "docs/performance.md with before/after tables and graphs"
      ],
      "how": [
        "Day 130: write the seeder with batched inserts or COPY; run EXPLAIN on the top queries first; run k6 with ramping arrival rate, record p50/p95/p99 and error rate; fix one bottleneck at a time and re-measure.",
        "Day 130: try a Redis cache for hot reads and verify invalidation by tests, and verify pool sizing (max connections vs CPU) with PgBouncer in transaction mode (check RLS still works with SET LOCAL).",
        "Day 131: run each chaos drill separately, write expected vs observed behaviour, fix what broke (timeouts, retries, health checks), then restore a backup into a fresh database and time it."
      ],
      "practices": [
        "Always run load tests against production-like data volumes and hardware limits.",
        "Change one thing at a time and keep the evidence.",
        "Set explicit timeouts everywhere; no unbounded waits.",
        "Test the recovery procedure, not just the backup.",
        "Publish numbers with the test conditions so others can reproduce them."
      ],
      "done": [
        "docs/performance.md shows at least 3 improvements with before/after numbers",
        "A flooding tenant does not push other tenants above the documented p95",
        "Each chaos drill has an outcome and a fix or documented limitation",
        "Restore time measured and written down"
      ],
      "pitfalls": [
        "Load testing an empty database.",
        "Using session-level SET with a transaction-mode pooler."
      ],
      "resources": [
        [
          "k6 docs",
          "https://k6.io/docs/"
        ],
        [
          "PgBouncer",
          "https://www.pgbouncer.org"
        ],
        [
          "Postgres EXPLAIN",
          "https://www.postgresql.org/docs/current/using-explain.html"
        ]
      ]
    },
    {
      "id": "pt13",
      "title": "Deploy to AWS with Terraform and CI/CD",
      "days": [
        132,
        135
      ],
      "goal": "Run Beacon in the cloud with infrastructure as code, least-privilege IAM, no stored credentials in CI, monitoring and a one-command teardown.",
      "build": [
        "Day 132 learning day: IAM, VPC, security groups, RDS, ECS Fargate, ALB, S3, Secrets Manager hands-on in the console (then recreate with Terraform)",
        "Budget and billing alarm created first; root account locked with MFA",
        "Terraform (remote state): VPC across 2 AZs, public/private subnets, security groups",
        "RDS Postgres, ElastiCache Redis, S3 buckets, SQS (optional), Secrets Manager, ECR",
        "ECS Fargate services for api and worker, ALB with HTTPS (ACM), migrations as a one-off task, web app on S3 + CloudFront",
        "GitHub Actions with OIDC role assumption: build, test, push to ECR, deploy staging then production with approval",
        "CloudWatch dashboards and alarms; cost report; `terraform destroy` verified"
      ],
      "how": [
        "Days 132-133: create the AWS account safely (Budgets first, IAM Identity Center or a named admin user, MFA). Bootstrap an S3 bucket for Terraform state with locking, then write modules: network, data, ecs.",
        "Keep RDS and ElastiCache in private subnets; allow access only from the ECS task security group; keep DB credentials in Secrets Manager and inject them as ECS task secrets.",
        "Use small instance sizes, single-AZ for the demo, and VPC endpoints or a single NAT while testing; destroy at the end of each session to avoid cost.",
        "Days 134-135: create the ECS cluster, task definitions (task role vs execution role), services behind the ALB with health checks, and a separate worker service with no load balancer.",
        "Run DB migrations as a one-off ECS task in the pipeline before updating services; deploy with rolling update and a circuit-breaker rollback.",
        "Create the GitHub OIDC provider and a deploy role limited to your repo and branch; remove any long-lived access keys.",
        "Add alarms: 5xx rate, unhealthy targets, queue age, RDS CPU/storage; send to an SNS email topic."
      ],
      "practices": [
        "Everything is in Terraform; the console is for looking, not changing.",
        "Least-privilege IAM; separate roles for CI deploy, task execution and task runtime.",
        "No secrets in the repo, in images or in CI variables; use Secrets Manager and OIDC.",
        "Staging mirrors production; promote the same image, do not rebuild.",
        "Tag all resources (project, env, owner) and review cost weekly.",
        "Immutable, versioned container images; never deploy `latest`."
      ],
      "done": [
        "`terraform apply` from scratch produces a working environment; `terraform destroy` leaves nothing billable",
        "A push to main deploys to staging automatically; production requires approval",
        "The running stack is reachable over HTTPS and passes the smoke test",
        "At least 3 alarms exist and one was triggered on purpose"
      ],
      "pitfalls": [
        "Forgetting NAT gateways and idle load balancers cost money.",
        "Running RDS in a public subnet.",
        "Broad IAM policies copied from tutorials."
      ],
      "resources": [
        [
          "Terraform AWS tutorials",
          "https://developer.hashicorp.com/terraform/tutorials/aws-get-started"
        ],
        [
          "Amazon ECS developer guide",
          "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/"
        ],
        [
          "GitHub OIDC with AWS",
          "https://docs.github.com/en/actions/security-for-github-actions/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services"
        ],
        [
          "AWS Well-Architected",
          "https://aws.amazon.com/architecture/well-architected/"
        ],
        [
          "AWS Skill Builder",
          "https://skillbuilder.aws"
        ]
      ]
    },
    {
      "id": "pt14",
      "title": "Test pyramid, documentation, launch and story",
      "days": [
        136,
        140
      ],
      "goal": "Package the work so a recruiter or interviewer understands it in five minutes and an engineer can verify it in thirty.",
      "build": [
        "Complete test pyramid: unit, integration (testcontainers), API contract tests, Playwright e2e; coverage report and a bug-bash list closed",
        "README with a one-paragraph pitch, screenshots/GIF, architecture diagram, feature list, tech stack, how to run locally and how to deploy",
        "docs/: architecture, tenancy, RBAC model, queue and outbox flow, SLA engine, security (threat model), performance results, runbooks, ADR index",
        "Seed/demo script that creates two sample tenants with realistic data",
        "Public demo URL (or a recorded walkthrough if you tear the stack down for cost)",
        "5-minute demo video following the demo script",
        "Resume bullets, LinkedIn post or blog article, and an interview story pack"
      ],
      "how": [
        "Day 136: run a bug bash: use the product as a new tenant for an hour, file issues, fix the severity-1 and 2 items; make sure the test pyramid covers the happy path and top 10 failure modes.",
        "Review the repo as a stranger: can you run it in 5 commands? Fix the README until yes.",
        "Add Mermaid diagrams for the request path, the async flow and the tenancy model; link ADRs from the README.",
        "Record the demo following the script; keep it under 5 minutes; narrate the problem, then show features, then one hard engineering decision.",
        "Prepare a 10-minute system-design walkthrough of Beacon and rehearse the talking points and 'what I would change to scale 100x'.",
        "Update the resume bullets with real numbers from your load tests; pin the repo; write a short blog post about the hardest bug.",
        "Tag v1.0.0, write release notes, and file the known limitations as GitHub issues."
      ],
      "practices": [
        "Documentation is part of the product; outdated docs are worse than none.",
        "Show evidence: tests, benchmarks, dashboards and diagrams beat adjectives.",
        "Be explicit about limitations and next steps; it signals seniority.",
        "Keep a clean git history (conventional commits, meaningful PRs)."
      ],
      "done": [
        "A stranger can run the project from the README in under 10 minutes",
        "Demo video recorded and linked",
        "Resume has 4-6 Beacon bullets with numbers",
        "You can walk through the architecture and 3 trade-offs without notes"
      ],
      "pitfalls": [
        "Leaving a half-working demo up; prefer a recorded walkthrough over a broken URL.",
        "Claiming scale you did not measure."
      ],
      "resources": [
        [
          "Tech Interview Handbook: resume",
          "https://www.techinterviewhandbook.org/resume/"
        ],
        [
          "Mermaid diagrams",
          "https://mermaid.js.org"
        ]
      ]
    }
  ],
  "dayPlan": [
    {
      "part": "pt0",
      "track": "HLD",
      "title": "Product spec and architecture",
      "learn": "Read the C4 model intro and the MADR template. Skim how Zendesk/Freshdesk structure tickets, roles and SLAs.",
      "build": "Write docs/product.md (problem, 3 personas, 12 user stories, non-goals), the C4 context + container diagrams in Mermaid, and ADR-001 (modular monolith) and ADR-002 (tenancy model). Draw the ERD v1 for orgs, users, memberships, tickets."
    },
    {
      "part": "pt0",
      "track": "DevOps",
      "title": "Repo, tooling and walking skeleton",
      "learn": "pnpm workspaces, TypeScript project references, Husky + commitlint, 12-factor config.",
      "build": "Create the monorepo (apps/api, apps/worker, apps/web, packages/shared), docker-compose (Postgres, Redis, MinIO, Mailpit), zod-validated env, /health endpoint, one test, `make dev`, and a CI workflow (lint, typecheck, test). Add ADR-003 (queue tech) and ADR-004 (auth)."
    },
    {
      "part": "pt1",
      "track": "SQL",
      "title": "Multi-tenant schema and row-level security",
      "learn": "Re-read your TenantLab notes: Postgres RLS, SET LOCAL, why superusers bypass RLS, AsyncLocalStorage for request context.",
      "build": "Create organizations, users, memberships tables and tenant_id on business tables; enable RLS with policies; connect as a non-superuser app role; implement withTenant(tenantId, fn); write the first cross-tenant isolation test."
    },
    {
      "part": "pt1",
      "track": "Backend",
      "title": "Authentication I: passwords, JWT, rotating refresh",
      "learn": "OWASP authentication cheat sheet; refresh-token rotation and reuse detection.",
      "build": "Implement register/login with argon2id, short-lived access JWT, refresh token rotation with token families and reuse detection, sessions table, logout and logout-all, secure cookie setup. Tests for the reuse-detection path."
    },
    {
      "part": "pt1",
      "track": "Backend",
      "title": "Authentication II: verification, reset, invites, org switching",
      "learn": "Single-use hashed tokens, user-enumeration-safe responses, login throttling strategies.",
      "build": "Add email verification, password reset, invite creation and acceptance, org switching, auth rate limits and lockout, audit events for sensitive actions. Verify all emails in Mailpit."
    },
    {
      "part": "pt2",
      "track": "Backend",
      "title": "RBAC model and policy engine",
      "learn": "RBAC vs ABAC, CASL or a hand-rolled policy function, permission caching with versioned invalidation.",
      "build": "Permission registry in packages/shared, default roles + tenant custom roles, can(actor, action, resource), requirePermission middleware, resource-level rules (agents edit own/team tickets), roles admin API. Start the permission-matrix tests."
    },
    {
      "part": "pt2",
      "track": "Backend",
      "title": "Audit log, matrix tests and review",
      "learn": "Immutable audit logs, DB triggers and privileges to enforce append-only.",
      "build": "Append-only audit_log written in the same transaction as each change; finish the table-driven matrix tests; browse API for audits. Review Parts 0-2 against their done lists and fix gaps. Update the repo README."
    },
    {
      "part": "pt3",
      "track": "Backend",
      "title": "Ticket schema and state machine",
      "learn": "Modeling state machines; per-tenant sequence numbers; event/timeline tables.",
      "build": "Tickets table, status transition table and domain function that rejects illegal moves, per-tenant ticket numbers, timeline events, create/get/update endpoints with permission checks and audit. Table-driven tests for transitions."
    },
    {
      "part": "pt3",
      "track": "Backend",
      "title": "Comments and attachments",
      "learn": "S3 presigned URLs, upload validation, why files must not pass through the API.",
      "build": "Comments (public and internal notes) with mentions, attachment metadata, presigned PUT/GET against MinIO with size/type limits, confirm-upload step, async scan job hook. Tests with MinIO in compose."
    },
    {
      "part": "pt3",
      "track": "SQL",
      "title": "Search, filters and cursor pagination",
      "learn": "Keyset pagination, composite index design, Postgres tsvector + GIN.",
      "build": "Filtered list endpoint with opaque cursor, composite indexes, full-text search with ranking, optional saved views. Seed 100k tickets; run EXPLAIN ANALYZE on the 3 hottest queries and write findings in docs/performance.md."
    },
    {
      "part": "pt3",
      "track": "Backend",
      "title": "API contract: errors, idempotency, concurrency",
      "learn": "RFC 9457 problem details, Stripe-style idempotency keys, ETag/If-Match.",
      "build": "Problem+json error handler, Idempotency-Key middleware (Redis + DB), version column with ETag and If-Match (412 on conflict), /v1 prefix, OpenAPI generated from zod, /docs. Concurrency and retry tests."
    },
    {
      "part": "pt3",
      "track": "Backend",
      "title": "API keys and the public API",
      "learn": "API key design (prefix + hashed secret), scopes, rotation, per-key rate limiting.",
      "build": "Create/rotate/revoke API keys (shown once, hashed at rest), scope-to-permission mapping, per-key sliding-window rate limit, usage log, public endpoints for tickets. Postman/Bruno collection. Review Part 3's done list."
    },
    {
      "part": "pt4",
      "track": "Project",
      "title": "Frontend foundations and auth flow",
      "learn": "OpenAPI client generation, TanStack Query patterns, access token in memory + refresh cookie.",
      "build": "Vite + React + TS app shell, routing, login/refresh with request queueing on 401, org switcher, permission-aware navigation from /me, generated API client, base UI kit (shadcn/Radix), error boundaries. Playwright login test."
    },
    {
      "part": "pt4",
      "track": "Project",
      "title": "Ticket list and detail",
      "learn": "Virtualized lists, optimistic updates with rollback, keyboard shortcuts, axe accessibility checks.",
      "build": "Virtualized ticket list with URL-synced filters and j/k/enter shortcuts, ticket detail (timeline, composer, internal notes, attachments), optimistic status/assignee changes. Playwright e2e for create + reply + permission denied."
    },
    {
      "part": "pt5",
      "track": "Backend",
      "title": "Queue infrastructure and workers",
      "learn": "BullMQ concepts: queues, workers, retries, backoff, DLQ patterns, graceful shutdown.",
      "build": "apps/worker with queues (email, webhook, sla, automation, embeddings, ai), retry/backoff/jitter defaults, DLQ handling and replay endpoint, secured Bull Board, SIGTERM handling, queue metrics. Test killing the worker mid-job."
    },
    {
      "part": "pt5",
      "track": "Backend",
      "title": "Outbox, domain events and notifications",
      "learn": "Transactional outbox, FOR UPDATE SKIP LOCKED, idempotent consumers.",
      "build": "Outbox table, relay worker with SKIP LOCKED, event envelope contracts in packages/shared, processed_events table for idempotency, email notification service with templates and user preferences via Mailpit. Run two relays to prove no double publish."
    },
    {
      "part": "pt6",
      "track": "Backend",
      "title": "SLA engine and business hours",
      "learn": "Time zones and DST pitfalls, injectable clocks, delayed jobs with deterministic job ids.",
      "build": "SLA policies per tenant/priority, business-hours calendar, addBusinessMinutes pure function with tests (weekend, DST, holiday), delayed jobs for warning and breach that re-validate on execution, pause on pending, escalation actions."
    },
    {
      "part": "pt6",
      "track": "Backend",
      "title": "Automation rules engine",
      "learn": "Rule trees (json-logic style), safe evaluators, loop prevention strategies.",
      "build": "Rule JSON schema (trigger, AND/OR conditions, actions), evaluator with field/operator whitelist, actions through the normal service layer as an automation actor, depth-limited loop prevention, dry-run mode, execution log, tests including a self-triggering rule."
    },
    {
      "part": "pt7",
      "track": "Backend",
      "title": "Outbound webhooks",
      "learn": "Webhook signing and replay windows, SSRF defenses, retry schedules.",
      "build": "Endpoint registry and subscriptions, HMAC-SHA256 signature + timestamp headers, delivery worker with timeout and exponential retry, delivery log, manual replay, auto-disable after repeated failures, SSRF guard that blocks private ranges. Tests including an internal-IP rejection."
    },
    {
      "part": "pt7",
      "track": "Backend",
      "title": "Plans, quotas and tenant fairness",
      "learn": "Usage metering with atomic counters, per-tenant queue fairness, feature flags.",
      "build": "Plans and limits, Redis usage counters flushed to Postgres, plan-based rate limits (429) and quota errors (402), per-tenant queue concurrency, a flood-tenant vs normal-tenant fairness test, tenant feature flags. Optional: Stripe test-mode subscription with idempotent webhook handler."
    },
    {
      "part": "pt8",
      "track": "Project",
      "title": "Admin console screens",
      "learn": "Schema-driven forms (react-hook-form + zod), JSON editors with schema validation, show-once secrets UX.",
      "build": "Role editor with permission matrix, API keys screen, webhooks and delivery log with replay, SLA policy and automation rule editors (JSON + dry run), usage/plan page and audit-log viewer. Playwright test for each screen's main action."
    },
    {
      "part": "pt9",
      "track": "Backend",
      "title": "Realtime backend: SSE, Redis fan-out, replay",
      "learn": "SSE vs WebSocket, Redis pub/sub fan-out, Last-Event-ID replay.",
      "build": "SSE endpoint with session auth, tenant-scoped Redis channels fed by the outbox relay, permission filtering of events, replay from a short Redis stream, connection limits. Prove with two API instances."
    },
    {
      "part": "pt9",
      "track": "Project",
      "title": "Realtime UI and presence",
      "learn": "Cache patching in TanStack Query, reconnect with jitter, presence with TTL heartbeats.",
      "build": "UI subscribes to events and patches the query cache, reconnect with backoff, presence chip (who is viewing this ticket) with Redis TTL heartbeats, tests for a user without access never receiving events."
    },
    {
      "part": "pt10",
      "track": "AI",
      "title": "Knowledge base and embeddings pipeline",
      "learn": "Chunking strategies, embedding cost control with content hashes, pgvector HNSW with tenant filters.",
      "build": "KB article CRUD with versions, ingestion queue job (chunk, embed, store with tenant_id and RLS), re-embed only when content hash changes, HNSW index, retrieval function. Canary test: tenant A text never appears for tenant B."
    },
    {
      "part": "pt10",
      "track": "AI",
      "title": "AI suggested replies with citations",
      "learn": "Hybrid retrieval and reciprocal-rank fusion, prompt-injection defenses, redaction.",
      "build": "Hybrid retrieval (vector + FTS) inside the RLS boundary, suggested-reply endpoint with streaming and citations, PII redaction, injection-safe prompt layout, agent UI panel with 'insert draft' and citations."
    },
    {
      "part": "pt10",
      "track": "AI",
      "title": "AI evaluation, cost caps and guardrails",
      "learn": "Eval sets, LLM-as-judge, per-tenant budget enforcement.",
      "build": "Build the 30-question eval set per sample tenant and a script reporting recall@5 and faithfulness, per-tenant AI credit cap with transactional debit, logging of token counts and latency (redacted), prompt-injection test cases, and a short AI design doc."
    },
    {
      "part": "pt11",
      "track": "DevOps",
      "title": "Observability: traces, metrics, errors",
      "learn": "OpenTelemetry context propagation through queues, RED metrics, alert design, SLOs.",
      "build": "OTel SDK with trace context carried in job payloads, Prometheus metrics (RED, queue depth, SLA breaches), Sentry with scrubbing, Grafana dashboards, 3 alerts with runbook stubs, written SLOs."
    },
    {
      "part": "pt11",
      "track": "Backend",
      "title": "Security hardening and threat model",
      "learn": "STRIDE threat modeling, OWASP API Top 10, supply-chain scanning.",
      "build": "STRIDE table with mitigations and tests, automated cross-tenant suite over every route, CI scanning (npm audit, CodeQL, Trivy), gitleaks, security headers/CORS/CSP, audit review."
    },
    {
      "part": "pt11",
      "track": "Backend",
      "title": "Data lifecycle: export and deletion",
      "learn": "Privacy requests, soft and hard delete, grace periods, signed downloads.",
      "build": "Tenant data export job (zip to S3 with signed link) and tenant deletion with grace period and hard-delete job, audit entries, tests and a runbook. Review Parts 8-11 done lists."
    },
    {
      "part": "pt12",
      "track": "Backend",
      "title": "Load testing and performance fixes",
      "learn": "Latency percentiles, Little's law, connection pools, PgBouncer.",
      "build": "Seed 1M tickets, run k6 read/mixed/spike scenarios, fix top 3 bottlenecks (indexes, N+1, pool/PgBouncer, caching), re-measure and record before/after in docs/performance.md."
    },
    {
      "part": "pt12",
      "track": "Backend",
      "title": "Chaos drills and recovery",
      "learn": "Failure injection, timeouts, backups and point-in-time recovery.",
      "build": "Kill the worker mid-job, restart Redis, restart Postgres, add network delay; fix what breaks; restore a backup into a fresh DB and time it; document outcomes and limitations."
    },
    {
      "part": "pt13",
      "track": "Cloud",
      "title": "AWS foundations: account safety, IAM, VPC, ECS concepts",
      "learn": "AWS Cloud Practitioner Essentials (free, Skill Builder): regions, IAM roles vs users, VPC subnets and security groups, RDS, ECS Fargate, ALB, S3, Secrets Manager, cost traps (NAT, idle ALB).",
      "build": "Create the AWS account safely (budget alarm and MFA first, no root use, SSO or named admin user). Click through a VPC, an RDS instance, an S3 bucket and an ECS cluster in the console on a throwaway basis, then delete them."
    },
    {
      "part": "pt13",
      "track": "Cloud",
      "title": "Terraform: network and data layer",
      "learn": "Terraform state, modules, workspaces; private subnets; security-group-to-security-group rules.",
      "build": "Bootstrap the S3 remote state, write modules for network (2-AZ VPC), data (RDS, ElastiCache, S3, ECR, Secrets Manager) and apply to a dev environment; verify access only from inside the VPC."
    },
    {
      "part": "pt13",
      "track": "Cloud",
      "title": "ECS Fargate services, ALB and HTTPS",
      "learn": "ECS task role vs execution role, health checks, rolling deploys with circuit breaker.",
      "build": "ECS Fargate api + worker services, ALB + ACM HTTPS, migrations as a one-off task, web on S3 + CloudFront, secrets injected from Secrets Manager, smoke test through the public URL."
    },
    {
      "part": "pt13",
      "track": "Cloud",
      "title": "CI/CD with OIDC, alarms and cost",
      "learn": "GitHub OIDC trust policy, environment approvals, CloudWatch alarms and SNS.",
      "build": "GitHub Actions with OIDC (build, test, ECR push, deploy staging, approval for prod), CloudWatch alarms for 5xx, unhealthy targets and queue age, trigger one alarm on purpose, record the Cost Explorer view, then terraform destroy and verify nothing is billable."
    },
    {
      "part": "pt14",
      "track": "Project",
      "title": "Test pyramid and bug bash",
      "learn": "Test strategy: what to test at which level; flaky-test hygiene.",
      "build": "Use Beacon as a brand-new tenant for an hour and file issues; fix severity 1-2 bugs; complete unit, integration, contract and Playwright tests; publish a coverage report and a short test strategy doc."
    },
    {
      "part": "pt14",
      "track": "Review",
      "title": "Documentation and diagrams",
      "learn": "How reviewers read a README; Mermaid diagrams; ADR index.",
      "build": "README with pitch, GIF, architecture diagram, request path and async flow diagrams, run and deploy instructions; docs index; 6+ ADRs; security and performance docs linked from the README."
    },
    {
      "part": "pt14",
      "track": "Review",
      "title": "Runbooks, seed data and demo environment",
      "learn": "Runbook structure: symptoms, impact, diagnosis, fix, prevention.",
      "build": "One runbook per alert, a seed script for two demo tenants with realistic data, a demo environment (or a recorded walkthrough if you tear the stack down), known-limitation issues filed."
    },
    {
      "part": "pt14",
      "track": "Review",
      "title": "Demo video and resume bullets",
      "learn": "Storytelling: problem, constraints, decisions, results.",
      "build": "Record the 5-minute demo following the demo script, write 4-6 resume bullets with real numbers from your load tests, tag v1.0.0 with release notes."
    },
    {
      "part": "pt14",
      "track": "Review",
      "title": "Launch, interview story pack and retro",
      "learn": "Rehearsal: 10-minute architecture walkthrough, trade-offs, scaling 100x.",
      "build": "Publish a LinkedIn post or blog article, rehearse the walkthrough and talking points, prepare STAR stories from the project, final retro, and plan next steps (AWS Solutions Architect Associate, open source, deeper distributed systems)."
    }
  ],
  "dsaWeekend": [
    "Timed (45 min): 2 mediums from your weak list, then write down the pattern you missed.",
    "Timed (45 min): 1 unseen medium + 1 hard attempt. Review the editorial next session.",
    "Timed (45 min): graphs or DP medium cold, then re-solve one old failure.",
    "Timed (45 min): 2 mediums, one array/string and one tree. Say the complexity out loud.",
    "Timed (45 min): LeetCode weekly-contest style, 2 problems.",
    "Timed (45 min): heap/greedy medium + one backtracking problem.",
    "Timed (45 min): weak-list re-solves only. Aim for clean, fast code.",
    "Timed (45 min): 1 unseen medium + a mock explanation to a rubber duck.",
    "Timed (45 min): 2 mediums cold, then re-solve one failure from earlier weeks.",
    "Timed (45 min): graph or DP medium + a design-data-structure problem."
  ],
  "dayRange": [
    101,
    140
  ]
};

if (typeof module !== "undefined") module.exports = FLAGSHIP;
if (typeof window !== "undefined") window.FLAGSHIP = FLAGSHIP;
