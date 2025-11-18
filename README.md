# FocusFlow 📸

A full-stack project management and client-invoicing portal for freelance photographers. Built with Next.js, TypeScript, Prisma, and Supabase.

### About This Project

As a photographer myself, I know that managing clients, projects, editing status, and payments is a messy process involving spreadsheets, notebooks, and separate invoicing apps. **FocusFlow** is my solution to this problem.

It's a single, all-in-one application that allows a photographer to:

* Manage their full client list.
* Create and track projects for each client.
* Update project status (e.g., "Booked," "Editing," "Review").
* Set an invoice amount.
* Send a unique "Gated Link" to a client.
* Clients can view a "Sneak Peek" bento grid of their photos.
* Clients can pay the invoice directly via **Razorpay** to unlock their full gallery download.

### Tech Stack

This project is a modern, full-stack, type-safe application.

* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Backend:** Next.js API Route Handlers
* **Database:** [PostgreSQL](https://www.postgresql.org/) (hosted on [Supabase](https://supabase.com/))
* **ORM:** [Prisma](https://www.prisma.io/) (for 100% type-safe database queries)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Auth:** [NextAuth.js](https://next-auth.js.org/) (Google Login)
* **Payments:** [Razorpay](https://razorpay.com/) (Integrated Gateway & Webhooks)

### Current Status (Phase 7 Complete)

The project is fully functional, secure, and deployed. It supports the entire lifecycle from project creation to client payment and delivery.

**✅ Features Implemented:**

**Backend & Database:**
* **Database Schema:** Full relational schema designed in Prisma for `User`, `Client`, and `Project`. Added fields for `deliveryLink` and `sampleImageUrls`.
* **Live Database:** A live Postgres database is provisioned and hosted on Supabase, using connection pooling for Vercel.
* **Prisma Client:** A type-safe, singleton client is implemented.
* **Backend API:** A complete RESTful API (`GET`, `POST`, `UPDATE`, `DELETE`) for Clients and Projects.
* **Payment API:** Implemented `/api/checkout` to create Razorpay orders securely.
* **Webhooks:** Implemented `/api/webhook/razorpay` to verify signatures and automatically update project status to "PAID" in the database.
* **Security:** All API routes are protected with server-side session checks.

**Frontend (UI) & Data Flow:**
* **Authentication:** Full Google Login integration with NextAuth.js.
* **Multi-Page Dashboard:** Protected admin dashboard for managing clients and projects.
* **Client Portal:** A public-facing, dynamic page (`/client/[id]`) that renders different views based on payment status (Locked vs. Unlocked).
* **Payment Integration:** Integrated Razorpay's standard checkout modal for seamless payments.
* **Pro UX:** Implemented optimistic UI updates, loading states, error handling, and `router.refresh()` for instant feedback.

**DevOps & Deployment:**
* **Vercel Deployment:** The app is live on Vercel with all environment variables configured.
* **Production Config:** Fixed Google OAuth callback URLs and database connection pooling issues for a stable production build.

### Getting Started

To run this project locally, you will need to:

1.  Clone the repository.
2.  Run `npm install` to install all dependencies.
3.  Create your own Supabase account and a new Postgres database.
4.  Create a `.env` file in the root and add your `DATABASE_URL`, `GOOGLE_ID`, `GOOGLE_SECRET`, `NEXTAUTH_SECRET`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, and `RAZORPAY_WEBHOOK_SECRET`.
5.  Run `npm run db:migrate` to push the schema to your database.
6.  Run `npm run dev` to start the development server.

### Next Steps (Roadmap)

* **Phase 8: UI/UX Polish**
    * Overhaul the design to match a clean, modern aesthetic (Glassmorphism/Minimalist).
    * Implement a consistent design system with custom fonts and colors.
    * Add a "Home" dashboard with revenue stats and charts.