# StudyBuddy

StudyBuddy is a collaborative platform for students to find, plan, and learn together. This project is built with [Next.js](https://nextjs.org) and uses [PocketBase](https://pocketbase.io) as the backend.

---

## Getting Started

First, clone the repository and install the dependencies:

```bash
git clone https://github.com/your-username/studybuddy.git
cd studybuddy
npm install
# or
yarn install
```

Run the development server:

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Project Structure

```
src/
├── app/                # Next.js app directory
│   ├── (main)/         # Main app pages (e.g., home, calendar, profile)
│   ├── api/            # API routes
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
├── components/         # Reusable UI components
│   ├── ui/             # UI-specific components (e.g., buttons, inputs)
│   ├── calendar/       # Calendar-related components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and PocketBase integration
│   ├── pocketbase.ts   # PocketBase client setup
│   ├── collections/    # PocketBase collection helpers
├── middleware.ts       # Middleware for Next.js
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## PocketBase Configuration

# PocketBase URL
PB_URL="http://localhost:8090"

# Public PocketBase URL for client-side requests
NEXT_PUBLIC_PB_URL="http://localhost:8090"

# Public URL for accessing user avatars and files
NEXT_PUBLIC_PB_URL_PICTURES="http://localhost:8090/api/files/_pb_users_auth_"