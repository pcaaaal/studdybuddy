# StudyBuddy

StudyBuddy is a collaborative platform for students to find, plan, and learn together. This project is built with [Next.js](https://nextjs.org) and uses [PocketBase](https://pocketbase.io) as the backend.

---

## Getting Started

To get started with StudyBuddy, you need to have [Node.js](https://nodejs.org) and [PocketBase](https://pocketbase.io) installed on your machine.




```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## PocketBase Configuration

# PocketBase URL
PB_URL="http://localhost:8090"

# Public PocketBase URL for client-side requests
NEXT_PUBLIC_PB_URL="http://localhost:8090"

# Public URL for accessing user avatars and files
NEXT_PUBLIC_PB_URL_PICTURES="http://localhost:8090/api/files/_pb_users_auth_"