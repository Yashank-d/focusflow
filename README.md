# 📸 **FocusFlow — A Modern Client & Project Manager for Photographers**

A production-grade project management and client delivery platform built for freelance photographers.
Manage clients, track projects, send sneak peeks, and collect payments — all from a clean, modern dashboard.

> **Built with Next.js 16, TypeScript, Prisma, Supabase, TailwindCSS & Razorpay.**

---

## 🚀 **Live Demo**

🔗 **[https://focusflowproject.vercel.app/](https://focusflowproject.vercel.app/)**

---

## ✨ **What is FocusFlow?**

Photographers usually juggle WhatsApp, Google Drive, Notion, and payment links.
**FocusFlow** solves this by giving you one single place to manage everything:

* Clients
* Projects
* Editing status
* Sneak peek images
* Final delivery links
* Payments via Razorpay

It’s a real-world, production-ready SaaS-style tool — great for personal use and for showcasing your frontend engineering skills.

---

## 🧠 **Core Features**

### 📂 **Client Management**

* Add, edit, delete clients
* Auto-link clients to projects
* Beautiful glassmorphism UI

### 📸 **Project Management**

* Create/Edit/Delete projects
* Status pipeline: **BOOKED → EDITING → FINALS READY → PAID**
* Add invoice amount
* Add sneak peek images (3 recommended)
* Add final delivery Google Drive link

### 🎯 **Client Portal**

Each project generates a unique public page:

```
/client/[projectId]
```

Clients can:

* View sneak peek gallery
* View invoice amount
* Pay through Razorpay
* Unlock final delivery link after payment

### 💰 **Razorpay Payment Integration**

* Secure order creation
* Payment verification
* Webhook signature validation
* Auto-updates project status to `"PAID"`

### 🔐 **Authentication**

* Google Login via NextAuth.js
* All dashboard routes protected
* Public client pages do not require auth

### 🎨 **Modern UI**

* TailwindCSS + custom UI components
* Smooth modals using `createPortal()`
* GlassCard, GlassInput, GradientButton
* Skeleton & loading states
* Fully mobile responsive

---

## 🛠️ **Tech Stack**

| Category   | Technology                  |
| ---------- | --------------------------- |
| Framework  | **Next.js 16 (App Router)** |
| Language   | **TypeScript**              |
| Database   | **PostgreSQL (Supabase)**   |
| ORM        | **Prisma**                  |
| Styles     | **Tailwind CSS**            |
| Auth       | **NextAuth.js**             |
| Payments   | **Razorpay + Webhooks**     |
| Deployment | **Vercel**                  |

---

## 📁 **Folder Structure**

```
src/
 ├─ app/
 │   ├─ dashboard/
 │   ├─ clients/
 │   ├─ projects/
 │   └─ client/[projectId]/
 │
 ├─ components/
 │   └─ ui/
 │       ├─ GlassCard.tsx
 │       ├─ GlassInput.tsx
 │       ├─ GradientButton.tsx
 │       └─ PageHeader.tsx
 │
 ├─ lib/
 │   ├─ db.ts
 │   ├─ auth.ts
 │   ├─ client-service.ts
 │   ├─ project-service.ts
 │   ├─ razorpay.ts
 │   └─ validations.ts
 │
 ├─ prisma/
 │   └─ schema.prisma
 │
 └─ types/
     └─ index.ts
```

---

## ⚙️ **Running Locally**

### 1️⃣ Clone the repo

```bash
git clone https://github.com/Yashank-d/focusflow.git
cd focusflow
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create `.env` file

```
DATABASE_URL=your_supabase_postgres_url
NEXTAUTH_SECRET=your_secret

GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx

RAZORPAY_KEY_ID=xxx
RAZORPAY_KEY_SECRET=xxx
RAZORPAY_WEBHOOK_SECRET=xxx
NEXT_PUBLIC_RAZORPAY_KEY_ID=xxx
```

### 4️⃣ Push Prisma schema

```bash
npx run db:migrate
```

### 5️⃣ Run dev server

```bash
npm run dev
```

---

## 📦 **Deploying to Vercel**

The project is fully optimized for Vercel:

* Supabase connection pooling
* Serverless function-safe Prisma client
* Configured callbacks for Google OAuth
* Razorpay webhooks supported

Deploy:

```bash
vercel --prod
```

---

## 🚧 **Roadmap / Future Features**

* Dashboard analytics (revenue, trends, project stats)
* Toast notifications
* Light/dark mode
* File drag-and-drop upload for sneak peeks
* Stripe support (optional)
* Email notifications for clients

---

## 🤝 **Contributing**

PRs and improvements are welcome!
Open issues or new feature requests anytime.

---

## 📄 **License**

MIT License.

---
