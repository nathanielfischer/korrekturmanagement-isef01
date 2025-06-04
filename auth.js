/**
 * NextAuth Konfiguration mit Credentials Provider für E-Mail/Passwort-Authentifizierung
 */

import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { sql } from '@vercel/postgres';
import { z } from 'zod';
import { authConfig } from './auth.config';

/**
 * Lädt Benutzer aus der Datenbank basierend auf E-Mail
 * @param {string} email - Benutzer E-Mail
 * @returns {Promise<Object|undefined>} Benutzerobjekt oder undefined
 */
async function getUser(email) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

// NextAuth Konfiguration mit Credentials Provider
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        // Validiere E-Mail und Passwort (min. 6 Zeichen)
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          // Lade Benutzer aus Datenbank
          const user = await getUser(email);
          if (!user) return null;

          // Vergleiche Passwort mit Hash
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});
