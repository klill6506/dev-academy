import { useState, useReducer } from "react";

// ─── Curriculum Data ───────────────────────────────────────────────────
const curriculum = [
  {
    id: "languages",
    title: "Languages & Runtimes",
    subtitle: "The foundation everything runs on",
    color: "#8b5cf6",
    icon: "🔤",
    description: "Every app starts with a language. Understanding what each language is good at helps you pick the right one for the job.",
    lessons: [
      {
        id: "lang-1",
        title: "Python vs JavaScript vs TypeScript",
        summary: "The two ecosystems you'll encounter most, plus the type-safe option",
        content: [
          { type: "text", value: "Almost every web project involves **Python** or **JavaScript** (or both). They serve different roles, and understanding when to reach for each one is fundamental." },
          { type: "comparison", items: [
            { name: "Python", when: "Backend servers, data processing, automation scripts, AI/ML, scientific computing", strengths: "Readable syntax, massive library ecosystem, great for beginners, dominant in data/AI", weaknesses: "Slower execution, not native in browsers, GIL limits true parallelism", example: "Django/Flask web servers, tax calculation engines, PDF generation, data analysis" },
            { name: "JavaScript", when: "Anything that runs in a browser, full-stack web apps, real-time features", strengths: "Runs everywhere (browser + server), huge ecosystem (npm), async by nature, interactive UIs", weaknesses: "Quirky language design, 'callback hell' history, too many frameworks to choose from", example: "React frontends, Node.js APIs, Electron desktop apps, interactive dashboards" },
            { name: "TypeScript", when: "Any JavaScript project that's more than a quick script", strengths: "Catches bugs before runtime with types, better IDE support, self-documenting code", weaknesses: "Extra compilation step, learning curve for type system, slightly more verbose", example: "Any serious React app, Node.js APIs, anything where multiple people touch the code" },
          ]},
          { type: "concept", label: "The practical decision", value: "For a new web app: Python (Django/FastAPI) for the backend + TypeScript (React/Next.js) for the frontend is a very strong default. Python handles your business logic, database, and server. TypeScript handles what users see and interact with. Many of your apps will use both." },
          { type: "text", value: "**What about Rust?** You'll see it mentioned for tools like Tauri (a desktop app framework). Rust is extremely fast and memory-safe, but has a steep learning curve. It's worth knowing it exists — you don't need to learn it yet, but some tools you use are built with it." },
        ],
        quiz: [
          { question: "You need to build a web server that processes tax returns and stores them in a database. Which language is the strongest choice for the backend?", options: ["JavaScript only", "Python — mature backend frameworks and great for data processing", "TypeScript only", "Rust"], answer: 1, explanation: "Python with Django or FastAPI gives you a mature ORM for database work, excellent libraries for PDF generation and data processing, and a huge community. JavaScript/TypeScript can also work (via Node.js), but Python is the stronger default for data-heavy backend work." },
          { question: "Why would you choose TypeScript over plain JavaScript?", options: ["TypeScript runs faster", "TypeScript catches type errors before your code runs, preventing bugs", "TypeScript is a different language entirely", "TypeScript doesn't need Node.js"], answer: 1, explanation: "TypeScript adds a type system on top of JavaScript. When you say a function takes a string and you accidentally pass a number, TypeScript catches that before you even run the code. This prevents an entire class of bugs." },
        ]
      },
      {
        id: "lang-2",
        title: "Node.js, Deno, and Bun",
        summary: "Three ways to run JavaScript outside the browser",
        content: [
          { type: "text", value: "JavaScript was born in the browser. To run it on a server (or desktop), you need a **runtime**. Think of a runtime as the engine that executes your code outside of Chrome or Firefox." },
          { type: "comparison", items: [
            { name: "Node.js", when: "Almost always — it's the default choice for server-side JavaScript", strengths: "Massive ecosystem (npm), battle-tested in production, every JS library supports it, huge community", weaknesses: "Older design decisions (CommonJS vs ESM confusion), no built-in TypeScript support, security not sandboxed by default", example: "Express/Fastify APIs, Next.js apps, Electron apps, CLI tools" },
            { name: "Deno", when: "New projects where you want modern defaults and built-in TypeScript", strengths: "Built-in TypeScript, secure by default (must grant permissions), modern ES module system, built-in formatter/linter", weaknesses: "Smaller ecosystem, some npm packages don't work, fewer tutorials and StackOverflow answers", example: "New API servers, scripts that need TypeScript without config, security-conscious tools" },
            { name: "Bun", when: "You want Node.js compatibility but faster", strengths: "Very fast (written in Zig), drop-in Node.js replacement for most things, built-in bundler and test runner", weaknesses: "Newest of the three, some edge cases with Node.js compatibility, smaller community", example: "Speeding up existing Node.js projects, new projects that want the npm ecosystem but faster" },
          ]},
          { type: "concept", label: "The practical answer", value: "Use Node.js. It's the industry standard, everything supports it, and when you google an error you'll find the answer. Deno and Bun are interesting alternatives, but Node.js is what your tools (React, Next.js, Electron, Vite) expect. You might encounter Bun as a faster drop-in for running scripts." },
          { type: "text", value: "**When you see `node`, `npm`, `npx` in tutorials** — those are all part of the Node.js ecosystem. `node` runs JavaScript files. `npm` installs packages. `npx` runs packages without installing them globally. They come bundled together when you install Node.js." },
        ],
        quiz: [
          { question: "You're starting a new React project. Which JavaScript runtime should you use?", options: ["Deno — it's the newest", "Node.js — it's the standard and all React tooling expects it", "Bun — it's the fastest", "You don't need a runtime for React"], answer: 1, explanation: "React's build tools (Vite, Next.js, Create React App) all expect Node.js. While Bun can often substitute, Node.js is the safe default that every tutorial and tool supports." },
          { question: "What is npm?", options: ["A JavaScript runtime", "A package manager that installs JavaScript libraries", "A web browser", "A programming language"], answer: 1, explanation: "npm (Node Package Manager) is how you install JavaScript libraries. When you run 'npm install react', it downloads React and its dependencies into your project. It comes bundled with Node.js." },
        ]
      },
    ]
  },
  {
    id: "databases",
    title: "Databases",
    subtitle: "Where your data lives",
    color: "#3b82f6",
    icon: "🗄️",
    description: "Every app stores data somewhere. The database you pick affects performance, complexity, and what's possible.",
    lessons: [
      {
        id: "db-1",
        title: "SQLite vs PostgreSQL vs MySQL",
        summary: "The three relational databases you'll actually encounter",
        content: [
          { type: "text", value: "Relational databases store data in tables with rows and columns — like spreadsheets, but with rules and relationships. These three cover 90% of what you'll see in the wild." },
          { type: "comparison", items: [
            { name: "SQLite", when: "Single-user apps, prototypes, mobile apps, desktop apps, small websites", strengths: "Zero setup (it's just a file), comes built into Python, no server to manage, perfect for development", weaknesses: "One writer at a time (no concurrent users), no user accounts/permissions, file-based so no remote access", example: "Your local development database, a desktop tax app's local storage, a personal todo app, quick prototypes" },
            { name: "PostgreSQL", when: "Any app with multiple users, production web apps, complex queries", strengths: "Handles many concurrent users, advanced features (JSON, full-text search, arrays), rock-solid reliability, excellent standards compliance", weaknesses: "Requires a running server, more setup and maintenance, overkill for single-user apps", example: "A CPA firm web app with 20 staff members, any production web application, apps with complex reporting needs" },
            { name: "MySQL", when: "Web apps (especially WordPress/PHP ecosystem), existing projects that already use it", strengths: "Very fast for read-heavy workloads, huge community, lots of hosting support", weaknesses: "Fewer advanced features than PostgreSQL, some SQL standard deviations, replication can be tricky", example: "WordPress sites, legacy web applications, simple CRUD apps" },
          ]},
          { type: "concept", label: "The decision framework", value: "**Just you or a prototype?** → SQLite. Zero config, just start coding.\n**Multiple users or a web app?** → PostgreSQL. It's the modern default for good reason.\n**Inheriting an existing project?** → Use whatever it already uses.\n\nMost developers today default to PostgreSQL for anything beyond prototyping. It's the safe, capable choice." },
          { type: "code", language: "python", label: "Same code, different database (Django)", value: `# In Django, switching databases is a config change — not a code change.

# Development: SQLite (zero setup)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Production: PostgreSQL (handles real traffic)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'cpa_app',
        'USER': 'app_user',
        'HOST': 'db.example.com',
        'PORT': '5432',
    }
}
# Your models, queries, and views stay exactly the same.` },
          { type: "text", value: "**This is one of the beautiful things about ORMs** (Object-Relational Mappers) like Django's. You write your queries in Python, and the ORM translates them to the right SQL dialect. Switch from SQLite to PostgreSQL? Change one config block. Your 500 lines of model code don't change." },
        ],
        quiz: [
          { question: "You're building a desktop app for a single CPA to track their personal clients. Which database?", options: ["PostgreSQL — it's the best", "MySQL — it's the most popular", "SQLite — it's a single-user desktop app, no server needed", "MongoDB — it's flexible"], answer: 2, explanation: "SQLite is perfect here. It's just a file on disk, requires zero setup, and handles single-user read/write workloads great. There's no reason to run a database server for a single-user desktop app." },
          { question: "You're building a web app where 15 staff members at a CPA firm will log in simultaneously. Which database?", options: ["SQLite — it's simpler", "PostgreSQL — it handles multiple concurrent users well", "A spreadsheet", "Redis"], answer: 1, explanation: "Multiple simultaneous users means concurrent reads and writes. PostgreSQL handles this gracefully. SQLite would create bottlenecks because only one process can write at a time." },
        ]
      },
      {
        id: "db-2",
        title: "MongoDB, Redis, and When to Go Non-Relational",
        summary: "Databases that don't use tables — and when they make sense",
        content: [
          { type: "text", value: "Not all data fits neatly into rows and columns. **Non-relational** (NoSQL) databases store data differently. The two you'll encounter most are MongoDB (document store) and Redis (in-memory key-value store)." },
          { type: "comparison", items: [
            { name: "MongoDB", when: "Data that varies in structure, content management, rapid prototyping where the schema isn't settled", strengths: "Flexible schema (each record can have different fields), stores JSON-like documents, easy to get started, scales horizontally", weaknesses: "No joins (relating data across collections is harder), easy to create a mess without discipline, transactions are newer/limited", example: "A CMS where articles have varying metadata, IoT sensor data with different fields per device, product catalogs" },
            { name: "Redis", when: "Caching, session storage, job queues, real-time features, anything that needs to be blazing fast", strengths: "Incredibly fast (everything in RAM), simple key-value interface, pub/sub messaging, built-in data structures", weaknesses: "Data is in memory (limited by RAM), not a primary database (data can be lost on restart unless configured), simple query model", example: "Caching expensive database queries, storing user sessions, Celery task queue broker, rate limiting, real-time leaderboards" },
          ]},
          { type: "concept", label: "The honest truth about MongoDB", value: "For most business applications — especially those dealing with financial data, clients, invoices, and tax returns — a relational database (PostgreSQL) is almost always the better choice. Your data HAS relationships: clients have engagements, engagements have invoices, invoices have line items. Relational databases are built for exactly this.\n\nMongoDB shines when your data genuinely doesn't have a fixed structure. For CPA work, that's rare." },
          { type: "concept", label: "Redis: not a database replacement", value: "Redis isn't competing with PostgreSQL — it complements it. A typical setup: PostgreSQL stores your permanent data (clients, returns, invoices). Redis handles the fast, temporary stuff (caching, sessions, background job queues). When someone says 'we use Redis,' they almost always also have a relational database." },
          { type: "text", value: "**Decision shortcut:** If you're not sure, use PostgreSQL. It can store JSON documents too (with its `jsonb` type), so you get relational structure AND flexibility when you need it. Add Redis when you need caching or background jobs. MongoDB is for genuinely document-oriented data." },
        ],
        quiz: [
          { question: "Your CPA app needs to store client records with names, addresses, EINs, and engagement history. What type of database fits best?", options: ["MongoDB — it's flexible", "Redis — it's fast", "PostgreSQL — the data is clearly relational (clients have engagements, engagements have invoices)", "A flat file"], answer: 2, explanation: "This is textbook relational data. Clients relate to engagements, engagements relate to invoices, invoices relate to line items. PostgreSQL's joins, constraints, and foreign keys make this natural and safe." },
          { question: "What is Redis primarily used for?", options: ["Replacing PostgreSQL", "Fast in-memory caching, session storage, and job queues", "Storing large files", "Building user interfaces"], answer: 1, explanation: "Redis keeps data in RAM for sub-millisecond access. It's used alongside a primary database — caching expensive queries, storing temporary sessions, and powering background job systems like Celery." },
        ]
      },
      {
        id: "db-3",
        title: "Database Migrations & ORMs",
        summary: "How your code talks to the database, and how the database evolves",
        content: [
          { type: "text", value: "You rarely write raw SQL in modern apps. Instead, you use an **ORM** (Object-Relational Mapper) that lets you work with database records as if they were regular code objects. And when your database structure needs to change, **migrations** handle that safely." },
          { type: "comparison", items: [
            { name: "Django ORM", when: "Python/Django projects", strengths: "Batteries included, auto-generates migrations, admin panel for free, mature and well-documented", weaknesses: "Tied to Django, can generate inefficient queries for complex cases, learning curve for advanced features", example: "Client.objects.filter(is_active=True).order_by('name')" },
            { name: "SQLAlchemy", when: "Python projects that aren't Django (Flask, FastAPI)", strengths: "Framework-agnostic, extremely powerful and flexible, handles complex queries well", weaknesses: "More verbose setup, steeper learning curve, migrations via separate tool (Alembic)", example: "session.query(Client).filter(Client.is_active == True).all()" },
            { name: "Prisma", when: "JavaScript/TypeScript projects", strengths: "Excellent TypeScript types from your schema, visual database browser, clean migration system", weaknesses: "Extra build step, Prisma-specific schema language, can be opinionated", example: "prisma.client.findMany({ where: { isActive: true } })" },
            { name: "Drizzle", when: "TypeScript projects wanting SQL-like syntax", strengths: "Lightweight, SQL-like but type-safe, no code generation step, very fast", weaknesses: "Newer (less battle-tested), smaller community, less documentation", example: "db.select().from(clients).where(eq(clients.isActive, true))" },
          ]},
          { type: "concept", label: "Migrations: version control for your database", value: "When you add a column, create a table, or change a field type, a migration file records that change. Anyone on the team can run migrations to get the same database structure. Think of it like Git commits but for your database schema.\n\nRules: Never edit the database by hand. Never delete migration files. Always test migrations on a copy of production data before running them for real." },
          { type: "text", value: "**Which ORM should you use?** It depends on your framework. Django → Django ORM (it's built in). Flask or FastAPI → SQLAlchemy. Next.js or any TypeScript backend → Prisma or Drizzle. The ORM comes with the framework choice, not the other way around." },
        ],
        quiz: [
          { question: "What does an ORM do?", options: ["Speeds up the database", "Lets you work with database records using your programming language instead of raw SQL", "Replaces the need for a database", "Manages your server"], answer: 1, explanation: "An ORM translates between your code (Python objects, TypeScript types) and database tables. Instead of writing SQL strings, you write Client.objects.filter(name='Acme') and the ORM generates the SQL for you." },
          { question: "You're building a FastAPI (Python) backend. Which ORM fits naturally?", options: ["Django ORM — it's the best Python ORM", "SQLAlchemy — it works with any Python framework", "Prisma — it's the most modern", "Drizzle — it's lightweight"], answer: 1, explanation: "Django ORM is tied to Django. Since you're using FastAPI, SQLAlchemy is the standard choice — it's framework-agnostic and works with any Python web framework." },
        ]
      },
    ]
  },
  {
    id: "backend",
    title: "Backend Frameworks",
    subtitle: "The server that powers your app",
    color: "#10b981",
    icon: "⚙️",
    description: "The backend handles business logic, database access, authentication, and API endpoints. Framework choice affects how fast you build and how well it scales.",
    lessons: [
      {
        id: "be-1",
        title: "Python Backends: Django vs Flask vs FastAPI",
        summary: "Three approaches to the same language, very different philosophies",
        content: [
          { type: "text", value: "All three are Python web frameworks, but they have fundamentally different philosophies about how much they should do for you." },
          { type: "comparison", items: [
            { name: "Django", when: "Full web applications with user auth, admin panels, complex data models, CMS-like features", strengths: "Batteries included (auth, admin, ORM, forms, sessions all built in), huge ecosystem, excellent security defaults, great documentation", weaknesses: "Opinionated (do it Django's way), can feel heavy for simple APIs, monolithic by default, learning curve for the full framework", example: "A CPA firm management app, e-commerce site, content management system, any app where you need user accounts + admin panel" },
            { name: "Flask", when: "Simple APIs, microservices, projects where you want to choose your own tools", strengths: "Minimal and flexible, easy to understand the whole framework, pick your own ORM/auth/etc., great for learning", weaknesses: "You assemble everything yourself (auth, ORM, forms, admin), no conventions means inconsistency, security is your responsibility", example: "A simple REST API, a webhook receiver, a microservice that does one thing, learning projects" },
            { name: "FastAPI", when: "Modern APIs, high-performance backends, projects that benefit from auto-generated docs", strengths: "Automatic API documentation, async support (fast!), Python type hints for validation, very modern design", weaknesses: "Newer (less battle-tested than Django), no built-in admin or ORM, you still need SQLAlchemy/etc. for database work", example: "A high-performance API, a backend serving a React/mobile frontend, microservices, ML model serving" },
          ]},
          { type: "concept", label: "The honest recommendation", value: "**Django** is probably your best default for most CPA-related apps. It gives you user authentication, an admin panel, database migrations, form handling, and security features out of the box. That's months of work you don't have to do yourself.\n\n**FastAPI** is great when you're building a pure API (no server-rendered HTML) and want modern Python features.\n\n**Flask** is great for learning or small, focused services." },
          { type: "code", language: "python", label: "The same endpoint in all three", value: `# Django (using Django REST Framework)
class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

# Flask
@app.route('/api/clients')
def get_clients():
    clients = db.session.query(Client).all()
    return jsonify([c.to_dict() for c in clients])

# FastAPI
@app.get('/api/clients', response_model=list[ClientSchema])
async def get_clients(db: Session = Depends(get_db)):
    return db.query(Client).all()

# All three do the same thing. Django gives you the most
# for free; Flask gives you the most control; FastAPI gives
# you the best developer experience for APIs.` },
        ],
        quiz: [
          { question: "You're building a web app where CPA firm staff log in, manage clients, and generate reports. The admin needs to manage users. Which framework?", options: ["Flask — it's simpler", "FastAPI — it's faster", "Django — it has auth, admin, and ORM built in", "Express.js — JavaScript is better"], answer: 2, explanation: "Django gives you user authentication, an admin panel, database ORM, forms, and security defaults out of the box. For a full application with users, roles, and admin features, Django saves you months of building those things yourself." },
          { question: "You're building a lightweight API that takes a PDF, extracts data, and returns JSON. No users, no admin panel. Which framework?", options: ["Django — it's always the best choice", "FastAPI — lightweight, fast, auto-docs, perfect for a focused API", "You don't need a framework for this", "WordPress"], answer: 1, explanation: "FastAPI is ideal for focused APIs. It's lightweight, generates API documentation automatically, and its async support handles file processing well. Django would be overkill for something this focused." },
        ]
      },
      {
        id: "be-2",
        title: "JavaScript Backends: Express, Fastify, and Next.js API Routes",
        summary: "When your backend speaks the same language as your frontend",
        content: [
          { type: "text", value: "If your frontend is React/TypeScript, running JavaScript on the server too means one language across your entire stack. Here are the main options." },
          { type: "comparison", items: [
            { name: "Express.js", when: "Custom Node.js APIs, when you want full control, learning Node.js backends", strengths: "The original Node.js framework, massive ecosystem of middleware, extremely flexible, everyone knows it", weaknesses: "Minimal by default (assemble everything yourself), no TypeScript support built in, callback-style API is dated, no built-in validation", example: "REST APIs, real-time apps with WebSocket, backend for mobile apps" },
            { name: "Fastify", when: "High-performance Node.js APIs, modern Express alternative", strengths: "Very fast, built-in schema validation, plugin system, TypeScript support, structured logging", weaknesses: "Smaller community than Express, some Express middleware doesn't work directly, newer", example: "High-throughput APIs, microservices where performance matters" },
            { name: "Next.js API Routes", when: "You're already using Next.js for your frontend", strengths: "Zero extra setup (API lives with your frontend), server components, full-stack in one project, Vercel deployment", weaknesses: "Coupled to your frontend, not ideal for complex backend logic, limited compared to a dedicated backend framework", example: "Simple CRUD APIs for a Next.js app, form handlers, authentication endpoints" },
          ]},
          { type: "concept", label: "Python backend vs JavaScript backend?", value: "**Use Python (Django/FastAPI)** when: your app is data-heavy, you need an admin panel, you're doing financial calculations, you want batteries-included.\n\n**Use JavaScript/TypeScript (Express/Next.js)** when: your frontend is React and you want one language everywhere, you're building real-time features (chat, live updates), or the team already knows JavaScript better than Python.\n\nBoth are valid. The 'best' choice depends on what your app does and what you're comfortable with." },
          { type: "text", value: "**The full-stack TypeScript trend:** Next.js + Prisma + TypeScript gives you frontend, backend, and database access all in TypeScript. It's very productive for web apps. The tradeoff: you give up Django's admin panel and batteries-included approach." },
        ],
        quiz: [
          { question: "You have a Next.js React frontend and need a few API endpoints for form submissions and data fetching. Where do you put the backend?", options: ["Build a separate Django server", "Build a separate Express server", "Use Next.js API routes — they're built in and live with your frontend", "You don't need a backend"], answer: 2, explanation: "For simple API needs (form handling, data fetching, auth), Next.js API routes keep everything in one project. No separate server to manage. If the backend logic gets very complex, you can always split it out later." },
        ]
      },
    ]
  },
  {
    id: "frontend",
    title: "Frontend & UI",
    subtitle: "What users see and interact with",
    color: "#f59e0b",
    icon: "🎨",
    description: "The frontend is everything the user interacts with — buttons, forms, pages, animations. Framework choice affects developer experience, performance, and maintainability.",
    lessons: [
      {
        id: "fe-1",
        title: "React vs Vue vs Svelte vs Plain HTML",
        summary: "Do you even need a framework? If so, which one?",
        content: [
          { type: "text", value: "Not every project needs a JavaScript framework. The question isn't 'which framework?' — it's 'do I need one at all?'" },
          { type: "comparison", items: [
            { name: "Plain HTML + Tailwind", when: "Static sites, simple forms, server-rendered pages (Django templates), landing pages", strengths: "No build step, no JavaScript complexity, fast page loads, works everywhere, simple to understand", weaknesses: "No reactive UI updates, manual DOM manipulation for interactivity, harder to build complex interactions", example: "Marketing site, blog, simple Django app with server-rendered templates, documentation site" },
            { name: "React", when: "Interactive web apps, complex UIs with lots of state, SPAs, when you want the biggest ecosystem", strengths: "Largest ecosystem and community, most job postings, React Native for mobile, huge component library selection", weaknesses: "Steep learning curve (hooks, state management, build tools), lots of boilerplate, 'JavaScript fatigue' from too many choices", example: "Dashboard apps, complex forms, any app where the UI updates frequently without full page reloads" },
            { name: "Vue", when: "Interactive web apps, progressive enhancement of existing pages, team wants a gentler learning curve", strengths: "Easier to learn than React, great documentation, single-file components are clean, good for gradually adding interactivity", weaknesses: "Smaller ecosystem than React, fewer job postings, some enterprise resistance", example: "Admin dashboards, progressive enhancement of server-rendered pages, team projects with mixed skill levels" },
            { name: "Svelte", when: "Performance-critical UIs, smaller apps, you want less boilerplate", strengths: "No virtual DOM (faster), less code to write, truly reactive, compiles away framework overhead", weaknesses: "Smallest ecosystem of the three, fewer libraries and components, smaller community", example: "Interactive widgets, animations, performance-sensitive UIs, embedded components" },
          ]},
          { type: "concept", label: "The decision tree", value: "**Is the page mostly static content with a few forms?** → Plain HTML + Tailwind + Django templates. Don't add complexity you don't need.\n\n**Does the UI need to update dynamically without page reloads?** → You need a framework. Reach for React (biggest ecosystem) or Vue (easiest to learn).\n\n**Are you building a full single-page application?** → React with Next.js or Vue with Nuxt. These add routing, server rendering, and structure.\n\n**The default:** React. Not because it's the best, but because it has the most components, tutorials, and support." },
          { type: "text", value: "**For your Tailwind Plus components:** They come in React, Vue, and plain HTML versions. So your Tailwind Plus investment works regardless of which framework you choose. That's one less constraint on the decision." },
        ],
        quiz: [
          { question: "You're building a Django app with basic CRUD pages — list clients, edit a client, view a report. Do you need React?", options: ["Yes — React is always better", "No — Django templates with Tailwind CSS handle this perfectly", "Yes — Tailwind requires React", "It depends on the database"], answer: 1, explanation: "For basic CRUD (Create, Read, Update, Delete) pages, Django's template system with Tailwind CSS is simpler and more than sufficient. You'd only add React if you need complex interactivity that can't be done with simple HTML forms." },
          { question: "You're building a tax return preparation interface where multiple form sections update in real-time as the user enters data. Which approach?", options: ["Plain HTML — keep it simple", "React — complex interactive forms with real-time updates are exactly what it's for", "Server-rendered templates", "CSS only"], answer: 1, explanation: "A tax return form with real-time calculations, conditional sections, and instant validation is a highly interactive UI. React (or Vue) handles this kind of stateful, dynamic interface well." },
        ]
      },
      {
        id: "fe-2",
        title: "CSS Approaches: Tailwind vs Bootstrap vs CSS-in-JS",
        summary: "How to style your app without going insane",
        content: [
          { type: "text", value: "CSS (Cascading Style Sheets) controls how your app looks — colors, spacing, fonts, layout. The question is: how do you organize and write your CSS?" },
          { type: "comparison", items: [
            { name: "Tailwind CSS", when: "Your choice — and the right one for your workflow with Tailwind Plus", strengths: "Utility-first (style directly in HTML), consistent design system, great with component frameworks, your Tailwind Plus templates use it", weaknesses: "HTML gets verbose with lots of classes, learning curve for utility names, purists dislike mixing style with markup", example: "<button class=\"bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500\">" },
            { name: "Bootstrap", when: "Quick prototypes, admin panels, when you don't have a designer", strengths: "Pre-built components (navbars, modals, cards), easy to get something decent looking fast, huge community", weaknesses: "Everything looks like Bootstrap, hard to customize deeply, heavier CSS bundle, feels dated", example: "<button class=\"btn btn-primary\">Save</button>" },
            { name: "CSS Modules", when: "React projects that want scoped styles without a library", strengths: "No naming conflicts (styles are scoped to component), plain CSS you already know, no runtime cost", weaknesses: "Extra files to manage, no design system enforced, can lead to inconsistency across components", example: "styles = require Button.module.css → <button className={styles.primary}>" },
            { name: "Plain CSS", when: "Simple projects, learning CSS fundamentals", strengths: "No build tools needed, universal browser support, full control", weaknesses: "Global scope means naming conflicts, no built-in design system, gets messy as projects grow", example: ".btn-primary { background: blue; color: white; padding: 8px 16px; }" },
          ]},
          { type: "concept", label: "Why Tailwind wins for you", value: "You have Tailwind Plus — a professional component library built on Tailwind CSS. This means you get pre-designed, production-quality components that you can customize at the utility class level. You're not starting from scratch or fighting a framework's defaults. Tailwind is the clear choice for your projects." },
          { type: "text", value: "**When you see Bootstrap in existing projects:** Don't rip it out and replace it with Tailwind. That's a massive refactor. Use whatever the project already has. Tailwind is the choice for new projects." },
        ],
        quiz: [
          { question: "Why is Tailwind CSS a particularly good fit for your workflow?", options: ["It's the only CSS framework", "You own Tailwind Plus components, which are built on Tailwind and give you a professional design system", "It's faster than other options", "It doesn't require JavaScript"], answer: 1, explanation: "Tailwind Plus gives you professionally designed components (navigation, forms, layouts) built on Tailwind CSS. Using Tailwind means you can directly use and customize these components in all your projects." },
        ]
      },
      {
        id: "fe-3",
        title: "Build Tools: Vite, Webpack, and Why They Exist",
        summary: "The tools that turn your source code into something browsers can run",
        content: [
          { type: "text", value: "Browsers don't understand React's JSX syntax, TypeScript types, or `import` statements from npm packages. **Build tools** transform your developer-friendly code into plain HTML, CSS, and JavaScript that browsers can run." },
          { type: "comparison", items: [
            { name: "Vite", when: "New projects — it's the modern default", strengths: "Extremely fast development server (near-instant hot reload), simple config, supports React/Vue/Svelte, built-in TypeScript support", weaknesses: "Newer, so some edge cases with older libraries, different from Webpack so some migration work for old projects", example: "npm create vite@latest my-app -- --template react-ts" },
            { name: "Webpack", when: "Existing projects that already use it, complex build requirements", strengths: "Extremely configurable, handles any use case, massive plugin ecosystem, battle-tested", weaknesses: "Complex configuration, slow builds for large projects, configuration can be intimidating", example: "Older React projects, enterprise apps with complex build pipelines" },
            { name: "Next.js / Nuxt (built-in)", when: "You're using Next.js or Nuxt — they handle bundling for you", strengths: "Zero config needed, optimized for the framework, handles code splitting and optimization automatically", weaknesses: "Less control over build details, tied to the framework", example: "npx create-next-app@latest (it just works)" },
          ]},
          { type: "concept", label: "Why this matters to you", value: "You usually don't configure build tools directly — your framework (Next.js, Vite + React) handles it. What matters is understanding why they exist: when you run `npm run dev`, Vite/Webpack is the thing that watches your files, transforms JSX/TypeScript, and refreshes your browser. When you run `npm run build`, it creates optimized files for production." },
          { type: "text", value: "**The practical takeaway:** If starting a new React project, use Vite (`npm create vite@latest`). If using Next.js, it handles everything. Don't touch Webpack unless an existing project already uses it." },
        ],
        quiz: [
          { question: "What does a build tool like Vite actually do?", options: ["Runs your database", "Transforms JSX, TypeScript, and imports into plain HTML/CSS/JS that browsers understand", "Hosts your website", "Manages your Git repository"], answer: 1, explanation: "Browsers can't read JSX (<Button />) or TypeScript (name: string) directly. Vite compiles your source code into standard JavaScript, bundles your npm dependencies, and processes your CSS — producing files browsers can run." },
        ]
      },
    ]
  },
  {
    id: "desktop",
    title: "Desktop Apps",
    subtitle: "When web isn't enough",
    color: "#ec4899",
    icon: "🖥️",
    description: "Sometimes you need an app that runs on Windows/Mac, works offline, or accesses the file system. Here are your options.",
    lessons: [
      {
        id: "desk-1",
        title: "Electron vs Tauri vs PWA",
        summary: "Three approaches to desktop apps, from heavy to lightweight",
        content: [
          { type: "text", value: "Want to build a desktop app? You have a spectrum of options, from \"basically a website in a window\" to \"compiled native-ish application.\"" },
          { type: "comparison", items: [
            { name: "Electron", when: "Full desktop apps that need file system access, system tray, native menus, auto-updates", strengths: "Proven (VS Code, Slack, Discord use it), full Node.js backend, all npm packages available, mature ecosystem", weaknesses: "Large app size (100-150MB — bundles a whole browser), high RAM usage, performance can lag", example: "VS Code, Slack, Discord, Figma Desktop, your tax preparation desktop app" },
            { name: "Tauri", when: "Desktop apps where size and performance matter, newer projects", strengths: "Tiny app size (5-15MB), uses system WebView (no bundled browser), fast, Rust backend is very secure", weaknesses: "Rust backend (steep learning curve), newer ecosystem, fewer plugins/examples, WebView differences across OS", example: "Lightweight desktop tools, apps that need to feel native, security-sensitive applications" },
            { name: "PWA (Progressive Web App)", when: "You want a web app that feels like a desktop app, offline support", strengths: "No separate codebase (it's your web app), installable from the browser, works offline with service workers, auto-updates", weaknesses: "Limited file system access, no system tray, can't do everything a native app can, browser dependency", example: "Twitter's web app, Starbucks ordering, simple tools that work offline" },
          ]},
          { type: "concept", label: "The honest breakdown for your situation", value: "**Electron** is the safe choice. You already know JavaScript/TypeScript and React. Your Tailwind Plus components work directly. The app will be bigger than ideal, but it's proven and has every feature you might need.\n\n**Tauri** is the better technical choice IF you're willing to learn some Rust for the backend. The result is smaller, faster, and more secure. For CPA software handling sensitive data, the security model is appealing.\n\n**PWA** is great if your app is already a web app and you just want it to feel like a desktop app. Limited but zero extra work." },
          { type: "concept", label: "The key architecture concept: main vs renderer", value: "Both Electron and Tauri have the same split: a **backend process** (Node.js in Electron, Rust in Tauri) that can access files, databases, and the OS; and a **frontend process** (your web UI) that's sandboxed like a browser tab. They talk through a message-passing system called IPC. This separation is what keeps things secure — the web UI can't directly read files from disk." },
        ],
        quiz: [
          { question: "You're building a desktop tax preparation app that needs file system access, auto-updates, and offline support. You know React but not Rust. Which framework?", options: ["Tauri — it's technically superior", "Electron — you know the tech stack and it has all the features you need", "PWA — it's the simplest", "Build a native Windows app"], answer: 1, explanation: "Electron lets you use your React + TypeScript skills directly, supports file system access, auto-updates, and offline operation. While Tauri is technically better in size/performance, Electron lets you build with what you know today." },
          { question: "Why are Electron apps typically 100-150MB?", options: ["JavaScript is a large language", "They bundle an entire Chromium browser engine and Node.js runtime", "They include a lot of images", "Windows requires large installers"], answer: 1, explanation: "Electron includes its own copy of Chromium and Node.js with every app. That's why VS Code, Slack, and Discord are all 100MB+. Tauri avoids this by using the operating system's built-in web engine." },
        ]
      },
    ]
  },
  {
    id: "devops",
    title: "DevOps & Infrastructure",
    subtitle: "The plumbing that keeps everything running",
    color: "#06b6d4",
    icon: "🔧",
    description: "DevOps tools handle how your code goes from your laptop to a running server, and how it stays running. This bucket demystifies Docker, Git, CI/CD, and the rest.",
    lessons: [
      {
        id: "ops-1",
        title: "Docker & Docker Compose",
        summary: "Packaging your app so it runs the same everywhere",
        content: [
          { type: "text", value: "Docker packages your application and everything it needs into a standardized unit called a **container**. Think of it like a shipping container — no matter what's inside, it loads and transports the same way." },
          { type: "concept", label: "When you actually need Docker", value: "**You need it when:** Your app has multiple services (web server + database + Redis), you want consistent environments between development and production, or you're deploying to a cloud service that expects containers.\n\n**You don't need it when:** You're building a simple script, a single-file app, or something that runs fine with just `python app.py` or `npm start`. Docker adds complexity — don't use it until you feel the pain it solves." },
          { type: "code", language: "yaml", label: "docker-compose.yml — defining a multi-service app", value: `services:
  web:                           # Your application
    build: .                     # Build from the Dockerfile in current directory
    ports:
      - "8000:8000"              # Expose port 8000
    depends_on:
      - db                       # Start database first

  db:                            # PostgreSQL database
    image: postgres:15           # Use the official image
    volumes:
      - pgdata:/var/lib/postgresql/data  # Persist data
    environment:
      - POSTGRES_PASSWORD=devpass
      - POSTGRES_DB=myapp

  redis:                         # For caching/background jobs
    image: redis:7-alpine

volumes:
  pgdata:                        # Named volume survives restarts` },
          { type: "concept", label: "Images vs Containers vs Volumes", value: "An **image** is a blueprint (recipe). A **container** is a running instance (the actual meal). A **volume** is persistent storage (data that survives when you stop a container). When you `docker compose down`, containers stop but volume data remains. When you `docker compose down -v`, volume data is deleted too — careful with that one." },
          { type: "text", value: "**Docker on Windows:** Docker Desktop runs a lightweight Linux VM behind the scenes. Install it, enable WSL2 (Windows Subsystem for Linux), and Docker commands work in your terminal. It uses more RAM than on Linux, but it works well." },
        ],
        quiz: [
          { question: "Your app is a single Python script that reads a CSV and generates a PDF. Do you need Docker?", options: ["Yes — Docker is always better", "No — just run it with 'python script.py', Docker would add unnecessary complexity", "Yes — for security", "Only on Windows"], answer: 1, explanation: "Docker solves the 'it works on my machine' problem and manages multi-service architectures. A simple script doesn't have those problems. Don't add complexity until you feel the pain it solves." },
          { question: "What happens to your database data when you run 'docker compose down'?", options: ["It's deleted", "It's preserved in the named volume", "It's backed up to the cloud", "It's moved to a different container"], answer: 1, explanation: "Named volumes (like pgdata in the example) persist across container restarts and 'docker compose down'. The data is only deleted if you explicitly remove volumes with 'docker compose down -v'." },
        ]
      },
      {
        id: "ops-2",
        title: "Git, GitHub, and Version Control",
        summary: "Tracking changes and not losing your work",
        content: [
          { type: "text", value: "**Git** tracks every change you make to your code. **GitHub** is a website that hosts your Git repositories online and adds collaboration features. They're separate things — Git is the tool, GitHub is a platform that uses Git." },
          { type: "comparison", items: [
            { name: "Git", when: "Always — every project should use Git from day one", strengths: "Tracks every change, lets you undo mistakes, branch for experiments without risk, industry standard", weaknesses: "Confusing commands and terminology, merge conflicts can be scary at first", example: "git add . → git commit -m 'Add client form' → git push" },
            { name: "GitHub", when: "Any project you want backed up online, collaboration, open source", strengths: "Free hosting, pull requests for code review, Actions for CI/CD, issue tracking, project boards", weaknesses: "Your code is on someone else's server (use private repos), learning the GitHub workflow", example: "Hosting your CPA app code, automated testing on every push, issue tracking" },
            { name: "GitLab / Bitbucket", when: "Alternatives to GitHub, especially in enterprise", strengths: "GitLab has built-in CI/CD and can be self-hosted; Bitbucket integrates with Atlassian tools (Jira)", weaknesses: "Smaller communities than GitHub", example: "Enterprise environments, teams already using Jira/Confluence" },
          ]},
          { type: "concept", label: "The Git commands that matter", value: "You need about 10 commands for daily work:\n\n**git init** — start tracking a project\n**git add .** — stage all changes\n**git commit -m \"message\"** — save a snapshot\n**git push** — upload to GitHub\n**git pull** — download changes from GitHub\n**git branch feature-name** — create a branch\n**git checkout feature-name** — switch to it\n**git merge feature-name** — bring changes back to main\n**git status** — see what's changed\n**git log --oneline** — see history" },
          { type: "text", value: "**The workflow you should use:** Work on `main` for solo projects. When a feature gets complicated, create a branch, work on it, then merge it back. Don't overthink branching strategies until you're working with a team." },
        ],
        quiz: [
          { question: "What's the difference between Git and GitHub?", options: ["They're the same thing", "Git is a version control tool; GitHub is a website that hosts Git repositories", "GitHub is newer and replaced Git", "Git is for individuals; GitHub is for teams"], answer: 1, explanation: "Git runs on your computer and tracks changes to files. GitHub is a web platform where you can store your Git repositories online, collaborate with others, and use features like pull requests and issue tracking." },
        ]
      },
      {
        id: "ops-3",
        title: "CI/CD, Reverse Proxies, and Package Managers",
        summary: "The supporting cast that makes everything work",
        content: [
          { type: "text", value: "These are tools you'll encounter in every serious project. None of them is complicated on its own, but they can be confusing if you don't know what role they play." },
          { type: "comparison", items: [
            { name: "CI/CD (GitHub Actions, etc.)", when: "Automating tests, builds, and deployments whenever you push code", strengths: "Catches bugs automatically, deploys without manual steps, runs tests you might forget to run", weaknesses: "Config files can be finicky, debugging pipeline failures is annoying", example: "Every push to GitHub runs your tests. Every merge to main auto-deploys to production." },
            { name: "Reverse Proxy (Nginx, Caddy)", when: "Production deployments — sits between the internet and your app", strengths: "Handles SSL/HTTPS, serves static files fast, can load-balance across multiple app instances", weaknesses: "Extra configuration to manage, another piece of infrastructure", example: "Nginx receives HTTPS requests on port 443 and forwards them to your Django app on port 8000" },
            { name: "npm / pip / cargo", when: "Installing libraries (always)", strengths: "One command to install dependencies, version locking, reproducible environments", weaknesses: "Dependency conflicts ('dependency hell'), security vulnerabilities in packages, node_modules black hole", example: "npm install react → adds React to your JavaScript project. pip install django → adds Django to your Python project." },
          ]},
          { type: "concept", label: "Package managers by language", value: "**Python:** pip (basic, always available) or Poetry (modern, manages virtual environments too)\n**JavaScript:** npm (default, comes with Node) or yarn/pnpm (faster alternatives)\n**Rust:** cargo (built into the language, universally used)\n\nUse the default for each language unless you have a reason not to. npm for JS, pip for Python." },
          { type: "concept", label: "Reverse proxy: the receptionist analogy", value: "Your app server (Django, Express) runs on a local port like 8000. It's not designed to face the raw internet. A reverse proxy like Nginx sits in front, handles SSL certificates (HTTPS), serves static files (images, CSS) efficiently, and forwards dynamic requests to your app. For development you don't need one. For production you almost always do — though platforms like Vercel and Railway handle this automatically." },
        ],
        quiz: [
          { question: "What does CI/CD automate?", options: ["Writing code", "Testing, building, and deploying your code whenever changes are pushed", "Database management", "User authentication"], answer: 1, explanation: "CI (Continuous Integration) automatically runs your tests when you push code. CD (Continuous Deployment) automatically deploys passing code to production. This catches bugs early and eliminates manual deployment steps." },
          { question: "Which package manager do you use for a Python project?", options: ["npm", "pip", "cargo", "yarn"], answer: 1, explanation: "pip is Python's package manager. npm is for JavaScript. cargo is for Rust. Each language has its own package manager and package registry." },
        ]
      },
    ]
  },
  {
    id: "apis",
    title: "APIs & Authentication",
    subtitle: "How apps talk to each other, and who's allowed in",
    color: "#ef4444",
    icon: "🔌",
    description: "APIs are how your frontend talks to your backend, how your app talks to external services, and how other apps talk to yours. Authentication decides who gets access.",
    lessons: [
      {
        id: "api-1",
        title: "REST vs GraphQL vs WebSockets",
        summary: "Three ways for apps to communicate",
        content: [
          { type: "text", value: "When your React frontend needs data from your Django backend, it makes an API call. The style of that API determines how the conversation works." },
          { type: "comparison", items: [
            { name: "REST", when: "Almost always — it's the default and handles 90% of use cases", strengths: "Simple (uses standard HTTP methods), universally understood, great tooling, cacheable, stateless", weaknesses: "Can over-fetch (get more data than you need) or under-fetch (need multiple requests), no real-time updates", example: "GET /api/clients/42 → returns client data. POST /api/clients → creates a new client. Standard CRUD operations." },
            { name: "GraphQL", when: "Complex UIs that need precise data from many related entities, mobile apps (minimize data transfer)", strengths: "Client asks for exactly the fields it needs, one endpoint handles everything, great for complex nested data", weaknesses: "More complex to set up, caching is harder, can be overkill for simple apps, learning curve", example: "{ client(id: 42) { name, engagements { title, status } } } — one request gets exactly what the UI needs" },
            { name: "WebSockets", when: "Real-time features — chat, live notifications, collaborative editing, live dashboards", strengths: "Bidirectional (server can push to client), instant updates, persistent connection", weaknesses: "More complex than REST, connection management, not needed for most CRUD apps", example: "Live notifications when a colleague finishes a return, real-time dashboard updates, chat" },
          ]},
          { type: "concept", label: "The practical answer", value: "**Use REST.** It handles the vast majority of app needs (listing clients, creating records, fetching reports). It's simple, well-understood, and every tutorial uses it.\n\nAdd **WebSockets** only when you need real-time features (live notifications, collaborative editing). Add **GraphQL** only when your frontend needs are so complex that REST requires too many round-trips. For most CPA apps, REST is all you need." },
        ],
        quiz: [
          { question: "Your CPA app needs to list clients, create new ones, and update existing ones. Which API style?", options: ["GraphQL — it's newer and better", "REST — standard CRUD operations are exactly what it's built for", "WebSockets — for speed", "All three combined"], answer: 1, explanation: "List, create, update, delete — that's textbook CRUD, and REST maps perfectly: GET /clients, POST /clients, PATCH /clients/42, DELETE /clients/42. Simple, well-understood, and sufficient." },
        ]
      },
      {
        id: "api-2",
        title: "Sessions vs JWT vs OAuth vs API Keys",
        summary: "Four ways to prove who you are",
        content: [
          { type: "text", value: "Every app with user accounts needs **authentication** (proving who you are) and **authorization** (deciding what you can do). Here are the main approaches." },
          { type: "comparison", items: [
            { name: "Sessions (cookies)", when: "Traditional web apps where the server renders pages, Django apps", strengths: "Simple to implement (Django does it for you), server controls everything, easy to revoke, well-understood", weaknesses: "Server must store session data, doesn't work well for mobile apps or cross-domain APIs, scales need shared session store", example: "User logs in → Django creates a session → browser gets a cookie → every request includes the cookie → Django knows who you are" },
            { name: "JWT (JSON Web Tokens)", when: "SPAs (React apps), mobile apps, APIs that need stateless auth", strengths: "Stateless (server doesn't store anything), works across domains, good for microservices, contains user info in the token", weaknesses: "Can't easily revoke tokens (they're valid until they expire), tokens can get large, security requires careful implementation", example: "React app logs in → gets a JWT → includes it in every API request header → backend verifies the signature" },
            { name: "OAuth 2.0", when: "'Log in with Google/Microsoft' buttons, accessing third-party APIs on behalf of users", strengths: "Users don't share passwords with your app, standard protocol, enables third-party integrations", weaknesses: "Complex to implement from scratch, many flows for different scenarios, lots of redirects", example: "'Sign in with Google' → redirects to Google → user approves → your app gets a token → you know their email" },
            { name: "API Keys", when: "Server-to-server communication, third-party integrations, simple automation", strengths: "Dead simple (just a string in the header), good for service-to-service, easy to manage", weaknesses: "No user identity (just 'this app has access'), if leaked the key must be rotated, no fine-grained permissions", example: "Your app calls the IRS e-file API with an API key. The key says 'this is XYZ CPA Firm' but not which user." },
          ]},
          { type: "concept", label: "The decision framework", value: "**Django app with server-rendered pages?** → Sessions (built in, just works)\n**React SPA calling a Django/FastAPI backend?** → JWT\n**'Login with Google' feature?** → OAuth 2.0\n**Calling an external API (IRS, payment processor)?** → API key\n\nMany apps use multiple methods. Your CPA app might use sessions for the web UI, JWT for the mobile app, OAuth for 'Login with Microsoft', and API keys for integrating with QuickBooks." },
        ],
        quiz: [
          { question: "You have a Django web app where staff log in through a browser. Which authentication method is simplest?", options: ["JWT — it's more modern", "Sessions — Django handles it automatically with cookies", "OAuth — it's more secure", "API keys"], answer: 1, explanation: "Django's session-based auth is built in and works perfectly for traditional web apps. User logs in, gets a session cookie, done. JWT adds complexity that's only justified for SPAs or mobile apps." },
          { question: "Your React SPA needs to call your Django API. Sessions won't work well here because the frontend and backend are separate. What do you use?", options: ["Sessions anyway", "JWT — stateless tokens that the React app sends with each request", "OAuth — for security", "No authentication"], answer: 1, explanation: "When frontend and backend are separate applications (common with React SPAs), JWT tokens are the standard approach. The React app stores the token and includes it in the Authorization header of every API request." },
        ]
      },
    ]
  },
  {
    id: "deployment",
    title: "Deployment & Hosting",
    subtitle: "Getting your app on the internet",
    color: "#14b8a6",
    icon: "🚀",
    description: "Your app runs on your laptop. Now what? Deployment is how you make it available to users — from simple hosting to running your own server.",
    lessons: [
      {
        id: "dep-1",
        title: "Hosting Options: From Simple to Full Control",
        summary: "Vercel, Railway, Render, VPS, and Windows Server — when to use each",
        content: [
          { type: "text", value: "Hosting options exist on a spectrum from 'I just push code and it works' to 'I manage everything myself.' More control means more work but also more flexibility." },
          { type: "comparison", items: [
            { name: "Vercel", when: "Next.js and static sites, React frontends", strengths: "Zero-config deployment for Next.js, automatic previews for PRs, global CDN, generous free tier", weaknesses: "Primarily for frontend/Next.js, serverless backend has cold starts, can get expensive at scale", example: "Push to GitHub → Vercel builds and deploys automatically → your-app.vercel.app is live" },
            { name: "Railway / Render", when: "Full-stack apps (Django + Postgres), simple 'push to deploy' for any stack", strengths: "Supports any language/framework, managed databases, simple deployment from Git, free tiers available", weaknesses: "Less control than a VPS, can get expensive with scale, free tiers have limitations (sleep after inactivity)", example: "Connect your Django repo → Railway detects it → adds PostgreSQL → deploys automatically" },
            { name: "VPS (DigitalOcean, Linode)", when: "Full control needed, complex setups, cost optimization at scale", strengths: "Full server access (install anything), predictable pricing, no vendor lock-in, run Docker/any software", weaknesses: "You manage everything (updates, security, backups, SSL), requires Linux knowledge, on-call if it breaks", example: "Rent a $12/month server, install Docker, deploy your app with docker compose up -d, configure Nginx + SSL" },
            { name: "Windows Server", when: "Apps that must run on Windows, internal CPA firm tools, .NET applications", strengths: "Familiar Windows environment, Active Directory integration, runs Windows-only software", weaknesses: "More expensive than Linux hosting, fewer deployment tutorials, less common for web apps", example: "Running your Electron app's auto-update server, hosting an internal tool on the firm's Windows Server" },
          ]},
          { type: "concept", label: "Start simple, scale up", value: "For a new web app: start with **Railway or Render**. Push your code, get a database, done. When you need more control or the bills get too high, move to a **VPS with Docker**. The Docker setup from your development machine translates directly to a VPS.\n\n**For internal CPA firm tools** that only firm staff use: a **Windows Server** on the local network or a VPS might make more sense than a cloud platform." },
          { type: "concept", label: "The production checklist (any platform)", value: "Before going live, verify:\n• DEBUG = False (no error details shown to users)\n• Secret keys from environment variables (not hardcoded)\n• HTTPS enforced (SSL certificate)\n• Database backups automated (3-2-1 rule: 3 copies, 2 media types, 1 offsite)\n• Monitoring/alerting set up (know when it's down)\n• Log rotation configured (logs don't fill the disk)" },
        ],
        quiz: [
          { question: "You've built a Django web app and want the simplest path to getting it online with a database. What do you use?", options: ["Buy a Windows Server", "Railway or Render — push your code, get a managed database, done", "Set up a VPS from scratch", "Vercel"], answer: 1, explanation: "Railway and Render give you Git-push deployment with managed PostgreSQL databases. For getting a Django app online quickly, they're hard to beat. You can always move to a VPS later for more control." },
          { question: "When does a VPS make more sense than Railway/Render?", options: ["Always — more control is better", "When you need full control, have complex requirements, or want to optimize costs at scale", "Never — managed platforms are always better", "Only for Windows apps"], answer: 1, explanation: "A VPS gives you a full server to do whatever you want. This matters when you need specific software, complex Docker setups, or when platform costs exceed the cost of managing a server yourself." },
        ]
      },
      {
        id: "dep-2",
        title: "Security & Production Essentials",
        summary: "The non-negotiables before your app goes live, especially for financial data",
        content: [
          { type: "text", value: "For CPA software handling financial data, security isn't optional. Here are the essential practices organized by when they matter." },
          { type: "concept", label: "Environment variables: never hardcode secrets", value: "Database passwords, API keys, secret keys — these NEVER go in your code. They go in environment variables that your deployment platform provides. If you accidentally commit a secret to Git, consider it compromised — rotate it immediately." },
          { type: "code", language: "python", label: "Environment variables in practice", value: `# BAD — secrets in code (anyone with repo access sees them)
SECRET_KEY = 'django-insecure-abc123'
DATABASE_URL = 'postgres://user:realpassword@db.example.com/prod'

# GOOD — secrets from environment variables
import os
SECRET_KEY = os.environ['SECRET_KEY']
DATABASE_URL = os.environ['DATABASE_URL']

# Even better — use django-environ for .env file support
import environ
env = environ.Env()
environ.Env.read_env()  # Reads from .env file in development
SECRET_KEY = env('SECRET_KEY')
DEBUG = env.bool('DEBUG', default=False)` },
          { type: "concept", label: "The OWASP Top 10 (simplified for CPA apps)", value: "The biggest security risks for web apps:\n\n1. **Injection** — Never concatenate user input into SQL queries. Use your ORM.\n2. **Broken auth** — Use strong passwords, session timeouts, multi-factor auth for admin.\n3. **Sensitive data exposure** — Encrypt data in transit (HTTPS) and at rest. Redact PII in logs.\n4. **Security misconfiguration** — DEBUG=False in production. Remove default admin URLs.\n5. **XSS** — Never insert user-provided HTML without escaping it.\n\nDjango protects against most of these by default, but you can still break that protection if you're careless." },
          { type: "text", value: "**Audit logging for CPA apps:** Every access to sensitive data (SSNs, EINs, financial records) should be logged: who accessed it, when, from where. This isn't just good practice — it's professional liability protection. Log the access but never log the actual PII values." },
          { type: "concept", label: "Backup strategy: the 3-2-1 rule", value: "**3 copies** of your data, on **2 different types** of media, with **1 copy offsite**. Automate daily database backups. Upload them to cloud storage. And critically: **test your restores**. A backup you've never restored from is just a hope, not a backup." },
        ],
        quiz: [
          { question: "You accidentally committed a database password to your Git repository. What should you do?", options: ["Delete the commit — problem solved", "Change the password immediately — it's compromised regardless of what you do to the Git history", "It's fine if the repo is private", "Just add it to .gitignore going forward"], answer: 1, explanation: "Once a secret hits Git, even briefly, consider it compromised. Anyone with repo access (now or in the future) could have seen it. Git history preserves deleted commits. Change the password immediately and use environment variables going forward." },
          { question: "Why should you log when someone accesses a client's SSN, but NOT log the SSN itself?", options: ["Logging SSNs would be too slow", "The audit trail shows who accessed what, but if the logs are breached, actual PII isn't exposed", "SSNs are too long for log files", "It's not important to log access"], answer: 1, explanation: "Audit logs may be stored in less secure systems, accessed by support staff, or sent to third-party logging services. Logging 'User X viewed SSN for Client Y at 2:30pm' gives you accountability without making the logs a data breach liability." },
        ]
      },
    ]
  },
];

// ─── State Management ──────────────────────────────────────────────────
const initialState = {
  currentLesson: "lang-1",
  completedLessons: {},
  quizResults: {},
  sidebarOpen: true,
  showQuiz: false,
  quizAnswers: {},
  quizSubmitted: false,
  view: "lesson",
};

function reducer(state, action) {
  switch (action.type) {
    case "SELECT_LESSON":
      return { ...state, currentLesson: action.id, showQuiz: false, quizAnswers: {}, quizSubmitted: false, view: "lesson" };
    case "TOGGLE_SIDEBAR":
      return { ...state, sidebarOpen: !state.sidebarOpen };
    case "START_QUIZ":
      return { ...state, showQuiz: true, quizAnswers: {}, quizSubmitted: false, view: "quiz" };
    case "ANSWER_QUIZ":
      return { ...state, quizAnswers: { ...state.quizAnswers, [action.index]: action.answer } };
    case "SUBMIT_QUIZ": {
      const lesson = findLesson(state.currentLesson);
      const correct = lesson.quiz.filter((q, i) => state.quizAnswers[i] === q.answer).length;
      const total = lesson.quiz.length;
      const passed = correct / total >= 0.7;
      return {
        ...state,
        quizSubmitted: true,
        quizResults: { ...state.quizResults, [state.currentLesson]: { correct, total, passed } },
        completedLessons: passed ? { ...state.completedLessons, [state.currentLesson]: true } : state.completedLessons,
      };
    }
    case "COMPLETE_LESSON":
      return { ...state, completedLessons: { ...state.completedLessons, [state.currentLesson]: true } };
    case "SHOW_DASHBOARD":
      return { ...state, view: "dashboard" };
    default:
      return state;
  }
}

function findLesson(id) {
  for (const phase of curriculum) {
    const found = phase.lessons.find(l => l.id === id);
    if (found) return found;
  }
  return null;
}

function findPhase(lessonId) {
  return curriculum.find(p => p.lessons.some(l => l.id === lessonId));
}

// ─── Components ────────────────────────────────────────────────────────

function ProgressRing({ progress, size = 36, stroke = 3, color }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (progress / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#1e293b" strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round" style={{ transition: "stroke-dashoffset 0.5s ease" }} />
    </svg>
  );
}

function Sidebar({ state, dispatch }) {
  const totalLessons = curriculum.reduce((sum, p) => sum + p.lessons.length, 0);
  const completed = Object.keys(state.completedLessons).length;
  const pct = Math.round((completed / totalLessons) * 100);

  return (
    <div style={{
      width: state.sidebarOpen ? 300 : 0,
      minWidth: state.sidebarOpen ? 300 : 0,
      background: "#0f172a",
      borderRight: "1px solid #1e293b",
      overflow: "hidden",
      transition: "all 0.3s ease",
      display: "flex",
      flexDirection: "column",
    }}>
      <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid #1e293b" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 8,
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, fontWeight: 800, color: "#fff",
          }}>DA</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.01em" }}>Dev Academy</div>
            <div style={{ fontSize: 11, color: "#64748b", marginTop: 1 }}>The Development Landscape</div>
          </div>
        </div>
        <button onClick={() => dispatch({ type: "SHOW_DASHBOARD" })} style={{
          width: "100%", background: "#1e293b", border: "none", borderRadius: 8, padding: "10px 12px",
          cursor: "pointer", display: "flex", alignItems: "center", gap: 10, transition: "background 0.2s"
        }}
        onMouseEnter={e => e.currentTarget.style.background = "#334155"}
        onMouseLeave={e => e.currentTarget.style.background = "#1e293b"}>
          <ProgressRing progress={pct} color="#3b82f6" />
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#e2e8f0" }}>{pct}% Complete</div>
            <div style={{ fontSize: 11, color: "#64748b" }}>{completed} of {totalLessons} lessons</div>
          </div>
        </button>
      </div>

      <div style={{ flex: 1, overflow: "auto", padding: "12px 0" }}>
        {curriculum.map(phase => {
          const phaseCompleted = phase.lessons.filter(l => state.completedLessons[l.id]).length;
          const phasePct = Math.round((phaseCompleted / phase.lessons.length) * 100);
          return (
            <div key={phase.id} style={{ marginBottom: 4 }}>
              <div style={{ padding: "8px 20px", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 14 }}>{phase.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: phase.color, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    {phase.title}
                  </div>
                </div>
                <span style={{ fontSize: 10, color: "#64748b" }}>{phasePct}%</span>
              </div>
              {phase.lessons.map(lesson => {
                const isActive = state.currentLesson === lesson.id;
                const isDone = state.completedLessons[lesson.id];
                const quizResult = state.quizResults[lesson.id];
                return (
                  <button key={lesson.id}
                    onClick={() => dispatch({ type: "SELECT_LESSON", id: lesson.id })}
                    style={{
                      width: "100%", border: "none", textAlign: "left", cursor: "pointer",
                      padding: "8px 20px 8px 40px",
                      background: isActive ? "#1e293b" : "transparent",
                      borderLeft: isActive ? `2px solid ${phase.color}` : "2px solid transparent",
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = "#1e293b50" }}
                    onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent" }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 13, width: 18, textAlign: "center", color: isDone ? "#10b981" : "#64748b" }}>
                        {isDone ? "✓" : quizResult && !quizResult.passed ? "○" : "·"}
                      </span>
                      <div>
                        <div style={{ fontSize: 13, color: isActive ? "#f1f5f9" : isDone ? "#94a3b8" : "#cbd5e1", fontWeight: isActive ? 600 : 400 }}>
                          {lesson.title}
                        </div>
                        <div style={{ fontSize: 11, color: "#475569", marginTop: 1 }}>{lesson.summary}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CodeBlock({ language, label, value }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  };
  return (
    <div style={{ margin: "16px 0", borderRadius: 8, overflow: "hidden", border: "1px solid #1e293b" }}>
      <div style={{
        background: "#1e293b", padding: "8px 14px",
        display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 500 }}>{label || language}</span>
        <button onClick={handleCopy} style={{
          background: "none", border: "1px solid #334155", color: "#94a3b8",
          padding: "3px 10px", borderRadius: 4, fontSize: 11, cursor: "pointer", transition: "all 0.2s"
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = "#64748b"; e.currentTarget.style.color = "#e2e8f0" }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "#334155"; e.currentTarget.style.color = "#94a3b8" }}>
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre style={{
        background: "#0c0f1a", padding: 16, margin: 0, overflow: "auto",
        fontSize: 13, lineHeight: 1.6, color: "#e2e8f0",
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
      }}>
        <code>{value}</code>
      </pre>
    </div>
  );
}

function ConceptCard({ label, value }) {
  return (
    <div style={{
      margin: "16px 0", padding: "16px 20px", borderRadius: 8,
      background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
      borderLeft: "3px solid #3b82f6",
    }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: "#3b82f6", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ fontSize: 14, color: "#cbd5e1", lineHeight: 1.7, whiteSpace: "pre-line" }}>{value}</div>
    </div>
  );
}

function ComparisonTable({ items }) {
  return (
    <div style={{ margin: "20px 0", display: "flex", flexDirection: "column", gap: 12 }}>
      {items.map((item, i) => (
        <div key={i} style={{
          background: "#0f172a", border: "1px solid #1e293b", borderRadius: 10, padding: 20,
          transition: "border-color 0.2s",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 10 }}>
            <h4 style={{ fontSize: 16, fontWeight: 700, color: "#f1f5f9", margin: 0 }}>{item.name}</h4>
          </div>
          <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 12, lineHeight: 1.5 }}>
            <strong style={{ color: "#64748b" }}>Use when:</strong> {item.when}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 10 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#10b981", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Strengths</div>
              <div style={{ fontSize: 13, color: "#cbd5e1", lineHeight: 1.6 }}>{item.strengths}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#f59e0b", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Weaknesses</div>
              <div style={{ fontSize: 13, color: "#cbd5e1", lineHeight: 1.6 }}>{item.weaknesses}</div>
            </div>
          </div>
          {item.example && (
            <div style={{ fontSize: 12, color: "#64748b", borderTop: "1px solid #1e293b", paddingTop: 8 }}>
              <strong>Example:</strong> {item.example}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function LessonView({ state, dispatch }) {
  const lesson = findLesson(state.currentLesson);
  const phase = findPhase(state.currentLesson);
  if (!lesson) return null;

  const isCompleted = state.completedLessons[lesson.id];
  const quizResult = state.quizResults[lesson.id];
  const allLessons = curriculum.flatMap(p => p.lessons);
  const currentIdx = allLessons.findIndex(l => l.id === lesson.id);
  const nextLesson = allLessons[currentIdx + 1];
  const prevLesson = allLessons[currentIdx - 1];

  return (
    <div style={{ maxWidth: 780, margin: "0 auto", padding: "40px 40px 80px" }}>
      <div style={{ fontSize: 12, color: "#64748b", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ color: phase.color }}>{phase.icon} {phase.title}</span>
        <span>›</span>
        <span>{lesson.title}</span>
      </div>

      <h1 style={{ fontSize: 28, fontWeight: 700, color: "#f1f5f9", marginBottom: 6, letterSpacing: "-0.02em" }}>
        {lesson.title}
      </h1>
      <p style={{ fontSize: 15, color: "#94a3b8", marginBottom: 32 }}>{lesson.summary}</p>

      {lesson.content.map((block, i) => {
        if (block.type === "text") {
          return <p key={i} style={{ fontSize: 15, color: "#cbd5e1", lineHeight: 1.8, marginBottom: 16 }}
            dangerouslySetInnerHTML={{ __html: block.value.replace(/\*\*(.*?)\*\*/g, '<strong style="color:#f1f5f9">$1</strong>').replace(/`(.*?)`/g, '<code style="background:#1e293b;padding:2px 6px;border-radius:4px;font-size:13px;color:#93c5fd">$1</code>') }} />;
        }
        if (block.type === "code") return <CodeBlock key={i} language={block.language} label={block.label} value={block.value} />;
        if (block.type === "concept") return <ConceptCard key={i} label={block.label} value={block.value} />;
        if (block.type === "comparison") return <ComparisonTable key={i} items={block.items} />;
        return null;
      })}

      <div style={{ marginTop: 40, paddingTop: 24, borderTop: "1px solid #1e293b", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", gap: 8 }}>
          {prevLesson && (
            <button onClick={() => dispatch({ type: "SELECT_LESSON", id: prevLesson.id })}
              style={{ background: "#1e293b", color: "#94a3b8", border: "none", padding: "10px 16px", borderRadius: 8, fontSize: 13, cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#334155"; e.currentTarget.style.color = "#e2e8f0" }}
              onMouseLeave={e => { e.currentTarget.style.background = "#1e293b"; e.currentTarget.style.color = "#94a3b8" }}>
              ← Previous
            </button>
          )}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {!isCompleted && !lesson.quiz.length && (
            <button onClick={() => dispatch({ type: "COMPLETE_LESSON" })}
              style={{ background: "#1e293b", color: "#10b981", border: "1px solid #10b981", padding: "10px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
              Mark Complete ✓
            </button>
          )}
          {lesson.quiz.length > 0 && (
            <button onClick={() => dispatch({ type: "START_QUIZ" })}
              style={{
                background: isCompleted ? "#1e293b" : "#3b82f6",
                color: isCompleted ? "#3b82f6" : "#fff",
                border: isCompleted ? "1px solid #3b82f6" : "none",
                padding: "10px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer",
              }}>
              {quizResult ? (quizResult.passed ? "Retake Quiz" : "Try Again") : "Take Quiz"}
            </button>
          )}
          {nextLesson && (
            <button onClick={() => dispatch({ type: "SELECT_LESSON", id: nextLesson.id })}
              style={{ background: "#1e293b", color: "#94a3b8", border: "none", padding: "10px 16px", borderRadius: 8, fontSize: 13, cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#334155"; e.currentTarget.style.color = "#e2e8f0" }}
              onMouseLeave={e => { e.currentTarget.style.background = "#1e293b"; e.currentTarget.style.color = "#94a3b8" }}>
              Next →
            </button>
          )}
        </div>
      </div>

      {quizResult && (
        <div style={{
          marginTop: 16, padding: "12px 16px", borderRadius: 8,
          background: quizResult.passed ? "#052e16" : "#451a03",
          border: `1px solid ${quizResult.passed ? "#166534" : "#92400e"}`,
        }}>
          <span style={{ fontSize: 13, color: quizResult.passed ? "#86efac" : "#fbbf24" }}>
            {quizResult.passed ? "✓ Passed!" : "Not quite —"} {quizResult.correct}/{quizResult.total} correct
          </span>
        </div>
      )}
    </div>
  );
}

function QuizView({ state, dispatch }) {
  const lesson = findLesson(state.currentLesson);
  if (!lesson) return null;

  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "40px 40px 80px" }}>
      <button onClick={() => dispatch({ type: "SELECT_LESSON", id: state.currentLesson })}
        style={{ background: "none", border: "none", color: "#64748b", fontSize: 13, cursor: "pointer", marginBottom: 20, padding: 0 }}>
        ← Back to lesson
      </button>

      <h2 style={{ fontSize: 22, fontWeight: 700, color: "#f1f5f9", marginBottom: 8 }}>
        Quiz: {lesson.title}
      </h2>
      <p style={{ fontSize: 14, color: "#94a3b8", marginBottom: 32 }}>
        {state.quizSubmitted
          ? `You got ${state.quizResults[state.currentLesson]?.correct} out of ${lesson.quiz.length} correct.${state.quizResults[state.currentLesson]?.passed ? " Lesson marked complete!" : " You need 70% to pass."}`
          : `${lesson.quiz.length} questions · 70% to pass`
        }
      </p>

      {lesson.quiz.map((q, qi) => {
        const selected = state.quizAnswers[qi];
        const isCorrect = selected === q.answer;
        const showResult = state.quizSubmitted;

        return (
          <div key={qi} style={{
            marginBottom: 24, padding: 20, borderRadius: 10, background: "#0f172a",
            border: `1px solid ${showResult ? (isCorrect ? "#166534" : "#92400e") : "#1e293b"}`,
          }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0", marginBottom: 14 }}>
              {qi + 1}. {q.question}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {q.options.map((opt, oi) => {
                const isSelected = selected === oi;
                const isAnswer = oi === q.answer;
                let bg = "#1e293b", border = "1px solid #334155", color = "#cbd5e1";
                if (showResult && isAnswer) { bg = "#052e16"; border = "1px solid #166534"; color = "#86efac"; }
                else if (showResult && isSelected && !isCorrect) { bg = "#451a03"; border = "1px solid #92400e"; color = "#fbbf24"; }
                else if (isSelected) { bg = "#1e3a5f"; border = "1px solid #3b82f6"; color = "#93c5fd"; }

                return (
                  <button key={oi} disabled={state.quizSubmitted}
                    onClick={() => dispatch({ type: "ANSWER_QUIZ", index: qi, answer: oi })}
                    style={{
                      background: bg, border, color, padding: "10px 14px", borderRadius: 6,
                      fontSize: 13, textAlign: "left", cursor: state.quizSubmitted ? "default" : "pointer",
                      transition: "all 0.15s", opacity: state.quizSubmitted && !isSelected && !isAnswer ? 0.5 : 1,
                    }}>
                    {opt}
                  </button>
                );
              })}
            </div>
            {showResult && (
              <div style={{ marginTop: 12, padding: "10px 14px", background: "#1e293b", borderRadius: 6, fontSize: 13, color: "#94a3b8", lineHeight: 1.6 }}>
                {q.explanation}
              </div>
            )}
          </div>
        );
      })}

      {!state.quizSubmitted && (
        <button
          disabled={Object.keys(state.quizAnswers).length < lesson.quiz.length}
          onClick={() => dispatch({ type: "SUBMIT_QUIZ" })}
          style={{
            background: Object.keys(state.quizAnswers).length < lesson.quiz.length ? "#334155" : "#3b82f6",
            color: Object.keys(state.quizAnswers).length < lesson.quiz.length ? "#64748b" : "#fff",
            border: "none", padding: "12px 28px", borderRadius: 8, fontSize: 14, fontWeight: 600,
            cursor: Object.keys(state.quizAnswers).length < lesson.quiz.length ? "not-allowed" : "pointer",
          }}>
          Submit Answers
        </button>
      )}
    </div>
  );
}

function Dashboard({ state, dispatch }) {
  const totalLessons = curriculum.reduce((sum, p) => sum + p.lessons.length, 0);
  const completed = Object.keys(state.completedLessons).length;
  const pct = Math.round((completed / totalLessons) * 100);
  const totalQuizzes = curriculum.reduce((sum, p) => sum + p.lessons.filter(l => l.quiz.length > 0).length, 0);
  const quizzesPassed = Object.values(state.quizResults).filter(r => r.passed).length;

  return (
    <div style={{ maxWidth: 780, margin: "0 auto", padding: "40px 40px 80px" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, color: "#f1f5f9", marginBottom: 6 }}>Your Progress</h1>
      <p style={{ fontSize: 15, color: "#94a3b8", marginBottom: 32 }}>The development landscape — organized by what each tool does and when to use it.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 40 }}>
        {[
          { label: "Overall", value: `${pct}%`, sub: `${completed}/${totalLessons} lessons` },
          { label: "Quizzes Passed", value: `${quizzesPassed}/${totalQuizzes}`, sub: "70% to pass" },
          { label: "Buckets", value: `${curriculum.length}`, sub: "technology categories" },
        ].map((stat, i) => (
          <div key={i} style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 10, padding: 20 }}>
            <div style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>{stat.label}</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: "#f1f5f9" }}>{stat.value}</div>
            <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{stat.sub}</div>
          </div>
        ))}
      </div>

      {curriculum.map(phase => {
        const phaseCompleted = phase.lessons.filter(l => state.completedLessons[l.id]).length;
        const phasePct = Math.round((phaseCompleted / phase.lessons.length) * 100);
        return (
          <div key={phase.id} style={{
            marginBottom: 20, background: "#0f172a", border: "1px solid #1e293b",
            borderRadius: 10, padding: 24, borderLeft: `3px solid ${phase.color}`
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#f1f5f9" }}>{phase.icon} {phase.title}</div>
                <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 2 }}>{phase.subtitle}</div>
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: phase.color }}>{phasePct}%</div>
            </div>
            <div style={{ background: "#1e293b", borderRadius: 4, height: 6, marginBottom: 16 }}>
              <div style={{ background: phase.color, borderRadius: 4, height: 6, width: `${phasePct}%`, transition: "width 0.5s ease" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {phase.lessons.map(lesson => {
                const done = state.completedLessons[lesson.id];
                const quiz = state.quizResults[lesson.id];
                return (
                  <button key={lesson.id}
                    onClick={() => dispatch({ type: "SELECT_LESSON", id: lesson.id })}
                    style={{
                      background: "#1e293b", border: "none", borderRadius: 6, padding: "10px 12px",
                      textAlign: "left", cursor: "pointer", transition: "all 0.15s", opacity: done ? 0.7 : 1,
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "#334155"}
                    onMouseLeave={e => e.currentTarget.style.background = "#1e293b"}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontSize: 12, color: done ? "#10b981" : "#64748b" }}>{done ? "✓" : "○"}</span>
                      <span style={{ fontSize: 13, color: done ? "#94a3b8" : "#e2e8f0" }}>{lesson.title}</span>
                    </div>
                    {quiz && (
                      <div style={{ fontSize: 11, color: "#64748b", marginLeft: 18, marginTop: 2 }}>
                        Quiz: {quiz.correct}/{quiz.total}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Main App ──────────────────────────────────────────────────────────
export default function DevAcademy() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div style={{
      display: "flex", height: "100vh", width: "100vw",
      background: "#0a0e1a", color: "#e2e8f0",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      overflow: "hidden",
    }}>
      <Sidebar state={state} dispatch={dispatch} />

      <button
        onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
        style={{
          position: "fixed", top: 12, left: state.sidebarOpen ? 308 : 8,
          zIndex: 50, background: "#1e293b", border: "1px solid #334155",
          color: "#94a3b8", width: 28, height: 28, borderRadius: 6,
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, transition: "left 0.3s ease",
        }}>
        {state.sidebarOpen ? "‹" : "›"}
      </button>

      <div style={{ flex: 1, overflow: "auto" }}>
        {state.view === "dashboard" && <Dashboard state={state} dispatch={dispatch} />}
        {state.view === "lesson" && <LessonView state={state} dispatch={dispatch} />}
        {state.view === "quiz" && <QuizView state={state} dispatch={dispatch} />}
      </div>
    </div>
  );
}
