'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcrypt';
import { getUserIdByEmail, getVerantwortlichenByModul } from '@/app/lib/database';

/**
 * Authentifizierung des Benutzers
 * @param {Object} prevState - Vorheriger Zustand
 * @param {FormData} formData - Formulardaten mit E-Mail und Passwort
 * @returns {string|undefined} Fehlermeldung oder undefined bei Erfolg
 */
export async function authenticate(prevState, formData) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

/**
 * Neuen Benutzer erstellen
 * @param {Object} prevState - Vorheriger Zustand
 * @param {FormData} formData - Formulardaten mit Name, E-Mail und Passwort
 */
export async function createNewUser(prevState, formData) {
    const { name, email, password } = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    };

    console.log(name);

    try {
        // await signIn('credentials', formData);
        const userId = await getUserIdByEmail(email);

        if (!userId) {
            // if no existing user with this email
            const hashedPassword = await bcrypt.hash(password, 10);


            await sql`
                INSERT INTO users (name, email, password)
                VALUES (${name}, ${email}, ${hashedPassword})
            `;

        } else {
            console.log('User already exists');
            return {
                message: 'Fehler: E-Mail-Adresse bereits vergeben.',
            };
        }

    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }

    revalidatePath('/auth/login');
    redirect('/auth/login');
}


/**
 * Neue Meldung erstellen
 * Datum und meldung_id werden automatisch von Postgres vergeben!
 * @param {Object} prevState - Vorheriger Zustand
 * @param {FormData} formData - Formulardaten der Meldung
 * @returns {Object} Fehlermeldung oder undefined bei Erfolg
 */
export async function createMeldung(prevState, formData) {
    // Erhält die ID des aktuell angemeldeten Benutzers
    const user_id = await getLoggedInUsersId();

    // Erhält den Verantwortlichen für das ausgewählte Modul
    const verantwortlicherData = await getVerantwortlichenByModul(formData.get('Modul'));
    console.log(verantwortlicherData);


    if (!verantwortlicherData) {
        return {
            message: 'Fehler: Kein Verantwortlicher für dieses Modul gefunden.',
        };
    }

    // Status ist bei Erstellung einer Meldung standardmäßig "Offen"
    const status = "Offen";

    // Daten aus dem Formular extrahieren
    const { titel, typ, fach, modul, quelle, beschreibung } = {
        titel: formData.get("titel"),
        typ: formData.get("Typ"),
        fach: formData.get("Fach"),
        modul: formData.get('Modul'),
        quelle: formData.get('Quelle'),
        beschreibung: formData.get('beschreibung')
    };

    // Überprüfen, ob alle erforderlichen Felder ausgefüllt sind
    if (!titel || !typ || !fach || !modul || !quelle || !beschreibung) {
        return {
            message: 'Fehler: Bitte alle Felder ausfüllen.',
        };
    }

    // Datenbankabfrage zur Erstellung der Meldung
    try {
        await sql`
            INSERT INTO meldungen (titel, fach, modul, quelle, beschreibung, autor, status, typ, verantwortlicher)
            VALUES (${titel}, ${fach}, ${modul}, ${quelle}, ${beschreibung}, ${user_id}, ${status}, ${typ}, ${verantwortlicherData.user_id})
        `;
    } catch (error) {
        console.error('Database Error:', error);
        return {
            message: 'Fehler in der Datenbank: ' + error.message,
        };
    }

    // Pfad zur Seite "/dashboard" neu validieren und weiterleiten
    revalidatePath('/dashboard');
    redirect('/dashboard');
}


/**
 * Benutzerinformationen des aktuell angemeldeten Benutzers abrufen
 * @returns {Object} Benutzerinformationen
 * @throws {Error} Bei Fehlern während der Authentifizierung
 */
export async function getLoggedInUser() {
    'use server';
    try {
        const userData = await auth();
        return userData;
    } catch (error) {
        throw error;
    }
}

/**
 * Benutzer-ID des aktuell angemeldeten Benutzers abrufen
 * @returns {string} Benutzer-ID
 * @throws {Error} Bei Fehlern während der Authentifizierung
 */
export async function getLoggedInUsersId() {
    try {
        const user = await auth();
        let user_id = await getUserIdByEmail(user.user.email);
        user_id = user_id.user_id
        return user_id;
    } catch (error) {
        throw error;
    }
}

/**
 * Status einer Meldung ändern
 * @param {string} meldungId - ID der zu aktualisierenden Meldung
 * @param {string} newStatus - Neuer Status der Meldung
 * @returns {Object} Fehlermeldung oder undefined bei Erfolg
 */
export async function changeStatus(meldungId, newStatus) {
    try {
        await sql`
            UPDATE meldungen
            SET status = ${newStatus}
            WHERE meldung_id = ${meldungId}
        `;
        revalidatePath('/dashboard');
    } catch (error) {
        return {
            message: 'Fehler beim Aktualisieren des Status: ' + error.message,
        };
    }
}