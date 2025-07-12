# Shohoz Bibaho Admin Dashboard

Shohoz Bibaho Admin Dashboard is an admin panel for managing the Shohoz Bibaho matrimony platform. It allows administrators to manage users, biodata, dynamic pages, and more, all from a modern, responsive interface.

## Features

- **Authentication:** Secure login for admin users
- **Dashboard:** Overview and quick access to management features
- **User Management:**
  - Manage regular users and admin users
  - Edit, delete, and view user details
- **Biodata Management:**
  - View and manage user biodata (profiles)
  - Approve or reject biodata for matchmaking
- **Dynamic Page Management:**
  - Create, edit, and delete custom frontend pages
- **Settings:** (Coming soon) Account and platform settings
- **Protected Routes:** Middleware ensures only authenticated users can access admin features
- **Responsive UI:** Modern, responsive design with sidebar navigation and header
- **Notifications:** Toast notifications for actions and errors

## Tech Stack

- **Next.js** (App Router)
- **React** (with hooks)
- **Redux Toolkit** (state management)
- **Tailwind CSS** (styling)
- **Zod** (form validation)
- **React Hook Form** (form handling)
- **Radix UI** (UI primitives)
- **Axios** (API requests)
- **SweetAlert2** (alerts)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the dashboard by modifying files in `src/app/`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
