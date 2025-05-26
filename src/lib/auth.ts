// lib/auth.ts
export function verifyToken(token: string): boolean {
  // Dummy JWT-Check
  return token === 'valid-token';
}
