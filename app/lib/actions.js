'use server';

import { signIn, auth } from '@/auth';
import { AuthError } from 'next-auth';
import { getUserIdByEmail, getVerantwortlichenByModul } from "@/app/lib/database";
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'


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
            //TODO: Error: email already existing
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


//TODO: Funktion testen
// Datum und meldung_id werden automatisch von Postgres vergeben!
export async function createMeldung(prevState, formData) {
    // gets the ID of the current user
    const user_id = await getLoggedInUsersId();

    // gets the Verantwortlichen for the selected Modul
    const verantwortlicherData = await getVerantwortlichenByModul(formData.get('Modul'));
    console.log(verantwortlicherData);
    
    
    if (!verantwortlicherData) {
        return {
            message: 'Fehler: Kein Verantwortlicher für dieses Modul gefunden.',
        };
    }

    const status = "Offen";

    // Prepare data for insertion into the database
    const { titel, typ, fach, modul, quelle, beschreibung } = {
        titel: formData.get("titel"),
        typ: formData.get("Typ"),
        fach: formData.get("Fach"),
        modul: formData.get('Modul'),
        quelle: formData.get('Quelle'),
        beschreibung: formData.get('beschreibung')
    };

    // Validate required fields
    if (!titel || !typ || !fach || !modul || !quelle || !beschreibung) {
        return {
            message: 'Fehler: Bitte alle Felder ausfüllen.',
        };
    }

    // Insert data into the database
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

    // Revalidate the cache and redirect the user.
    revalidatePath('/dashboard');
    redirect('/dashboard');
}

export async function getLoggedInUser() {
    'use server';
    try {
        const userData = await auth();
        return userData;
    } catch (error) {
        throw error;
    }
}

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