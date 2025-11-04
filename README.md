FocusFlow 📸

A full-stack project management and client-invoicing portal for freelance photographers. Built with Next.js, TypeScript, Prisma, and Supabase.

About This Project

As a photographer myself, I know that managing clients, projects, editing status, and payments is a messy process involving spreadsheets, notebooks, and separate invoicing apps. FocusFlow is my solution to this problem.

It's a single, all-in-one application that allows a photographer to:

Manage their full client list.

Create and track projects for each client.

Update project status (e.g., "Booked," "Editing," "Review").

Set an invoice amount.

(Coming Soon) Upload photos to a secure, gated gallery.

(Coming Soon) Send a unique link to a client, who can only view their photos after they have paid the invoice.

Tech Stack

This project is a modern, full-stack, type-safe application.

Framework: Next.js (App Router)

Language: TypeScript

Backend: Next.js API Route Handlers

Database: PostgreSQL (hosted on Supabase)

ORM: Prisma (for 100% type-safe database queries)

Styling: Tailwind CSS

Auth: NextAuth.js (Coming Soon)

File Storage: Supabase Storage (Coming Soon)

Current Status (Week 1 / 3)

The project is currently in Phase 1: Backend Complete.

✅ Features Implemented:

Database Schema: Full relational schema designed in Prisma for User, Client, and Project.

Live Database: A live Postgres database is provisioned and hosted on Supabase.

Database Migrations: A full migration history is set up.

Prisma Client: A type-safe, singleton client is implemented (/src/lib/db.ts).

Backend API: A complete, functional RESTful API is built.

GET /api/clients: Fetches all clients for a user.

POST /api/clients: Creates a new client.

GET /api/projects: Fetches all projects (and includes their related client data).

POST /api/projects: Creates a new project linked to a specific client.

Security: The database connection string is secured using environment variables (.env).

Getting Started

To run this project locally, you will need to:

Clone the repository.

Run npm install to install all dependencies.

Create your own Supabase account and a new Postgres database.

Create a .env file in the root and add your DATABASE_URL connection string.

Run npm run db:migrate to push the schema to your database.

Run npm run dev to start the development server.

Next Steps (Roadmap)

Phase 2: Admin Dashboard (UI)

Build the React frontend for the photographer's dashboard.

Create components to consume the APIs we just built.

Build forms (with react-hook-form and zod) to create new clients and projects from the UI.

Phase 3: Auth & Client Portal

Implement NextAuth.js for secure photographer login.

Add Supabase Storage for file uploads.

Build the dynamic, client-facing "payment gate" page (/client/[projectId]).
