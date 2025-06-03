# StudyBuddy

StudyBuddy is a collaborative platform for students to find, plan, and learn together. This project is built with [Next.js](https://nextjs.org) and uses [PocketBase](https://pocketbase.io) as the backend.

---

## Setup Pocketbase

To get started with StudyBuddy, you need to have [Node.js](https://nodejs.org) installed on your machine.

First, start the docker container for PocketBase:

```bash
docker compose up --build
```

Next, create a SuperUser in PocketBase with the URL provided in the terminal output.

Then, import the schema from the file `pb_schema` into your PocketBase instance. You can do this by using the PocketBase Admin UI under 'Settings' -> 'Import Collections'.

After setting up the Schema, you can import the backup data from the file `pb_backup.zip` (normally you should see the import automaticly) into your PocketBase instance. This will populate your database with initial data. You can do this under 'Settings' -> 'Backups' -> 'Uopload Backup' or if you see the Backup.zip already there, just click on the button in the UI and type the name of the ZIP, then LogIn with the following Credentials:
`tba145919@stud.gibb.ch` and password `Password1234`.

## Setup Next.js

After setting up PocketBase and being able to access the admin UI, you can set up the Next.js application.

```bash
npm install

npm run dev
```

Then, start the Next.js development server:

```bash
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## PocketBase Configuration

# PocketBase URL

PB_URL="http://localhost:8090"

# Public PocketBase URL for client-side requests

NEXT_PUBLIC_PB_URL="http://localhost:8090"

# Public URL for accessing user avatars and files

NEXT*PUBLIC_PB_URL_PICTURES="http://localhost:8090/api/files/\_pb_users_auth*"
```
