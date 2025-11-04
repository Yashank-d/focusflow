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

### Current Status (Week 1 / 3)

The project is currently in **Phase 1: Backend Complete.**

**✅ Features Implemented:**

* **Database Schema:** Full relational schema designed in Prisma for `User`, `Client`, and `Project`.

* **Live Database:** A live Postgres database is provisioned and hosted on Supabase.

* **Database Migrations:** A full migration history is set up.

* **Prisma Client:** A type-safe, singleton client is implemented (`/src/lib/db.ts`).

* **Backend API:** A complete, functional RESTful API is built.

  * `GET /api/clients`: Fetches all clients for a user.

  * `POST