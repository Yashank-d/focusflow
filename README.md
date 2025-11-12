# FocusFlow 📸

A full-stack project management and client-invoicing portal for freelance photographers. Built with Next.js, TypeScript, Prisma, and Supabase.

### About This Project

As a photographer myself, I know that managing clients, projects, editing status, and payments is a messy process involving spreadsheets, notebooks, and separate invoicing apps. **FocusFlow** is my solution to this problem.

It's a single, all-in-one application that allows a photographer to:

* Manage their full client list.
* Create and track projects for each client.
* Update project status (e.g., "Booked," "Editing," "Review").
* Set an invoice amount.
* (Coming Soon) Upload photos to a secure, gated gallery.
* (Coming Soon) Send a unique link to a client, who can only view their photos *after* they have paid the invoice.

### Tech Stack

This project is a modern, full-stack, type-safe application.

* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Backend:** Next.js API Route Handlers
* **Database:** [PostgreSQL](https://www.postgresql.org/) (hosted on [Supabase](https://supabase.com/))
* **ORM:** [Prisma](https://www.prisma.io/) (for 100% type-safe database queries)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Auth:** [NextAuth.js](https://next-auth.js.org/) *(Coming Soon)*
* **File Storage:** [Supabase Storage](https://supabase.com/storage) *(Coming Soon)*

### Current Status (Phase 2 In Progress)

The project has a complete, functional backend and a "Create" / "Read" (CR) admin dashboard.

**✅ Features Implemented:**

**Backend & Database:**

* **Database Schema:** Full relational schema designed in Prisma for `User`, `Client`, and `Project`.
* **Live Database:** A live Postgres database is provisioned and hosted on Supabase.
* **Database Migrations:** A full migration history is set up.
* **Prisma Client:** A type-safe, singleton client is implemented (`/src/lib/db.ts`).
* **Backend API:** A complete, functional RESTful API is built.
    * `GET /api/clients`: Fetches all clients for a user.
    * `POST /api/clients`: Creates a new client with validation.
    * `GET /api/projects`: Fetches all projects (and includes their related client data).
    * `POST /api/projects`: Creates a new project linked to a specific client.
* **Security:** The database connection string is secured using environment variables (`.env`).

**Frontend (UI) & Data Flow:**

* **Server Components:** Built the main dashboard page using **Next.js Server Components** for fast, server-side data fetching.
* **Efficient Data Fetching:** Data is fetched *directly* in Server Components (bypassing HTTP) for maximum performance.
* **Reusable Components:** Created reusable, styled UI components like **ProjectCard** using **Tailwind CSS**.
* **Client Components:** Developed interactive **Client Components** (using `"use client";`) for all user-driven actions.
* **Interactive Modals:** Built "Create Client" and "Create Project" modals using **`useState`** for state management.
* **Client-Side Data Fetching:** Implemented data fetching within a Client Component (using **`useEffect`**) to populate the "Assign to Client" dropdown.
* **Professional UX:** Implemented a full user feedback loop with **loading states**, **API error handling** (shown in the UI), and seamless data revalidation using **`router.refresh()`** (no full-page reloads).

### Getting Started

To run this project locally, you will need to:

1.  Clone the repository.
2.  Run `npm install` to install all dependencies.
3.  Create your own Supabase account and a new Postgres database.
4.  Create a `.env` file in the root and add your `DATABASE_URL` connection string.
5.  Run `npm run db:migrate` to push the schema to your database.
6.  Run `npm run dev` to start the development server.

### Next Steps (Roadmap)

* **Phase 2 (Continued): Finish CRUD**
    * Implement **"Update" (U)** functionality (e.g., an "Edit Project" modal to change a project's `status`).
    * Implement **"Delete" (D)** functionality (e.g., "Delete" buttons on projects and clients).
* **Phase 2 (Polish):**
    * Refactor forms to use **react-hook-form** and **zod** for advanced, schema-based validation.
* **Phase 3: Auth & Client Portal**
    * Implement `NextAuth.js` for secure photographer login.
    * Add `Supabase Storage` for file uploads.
    * Build the dynamic, client-facing "payment gate" page (`/client/[projectId]`).