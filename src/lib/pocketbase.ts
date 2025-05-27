import PocketBase from 'pocketbase';

export const pb = new PocketBase(process.env.PB_URL!);

// Persist auth store across server/client by using cookies:
// In server components this reads cookies automatically; in client you’ll sync manually.
