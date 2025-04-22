'use server';

import { signIn, auth } from '@/auth';
import { AuthError } from 'next-auth';
import { getUserIdByEmail } from "@/app/lib/database";
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

export async function createDataPoint(prevState, formData) {
    // gets the ID of the current user
    const user_id = await getLoggedInUsersId();

    const status = "Offen";

    // Prepare data for insertion into the database
    const { typ, fach, modul, quelle, beschreibung } = {
        typ: formData.get("typ"),
        fach: formData.get("fach"),
        modul: formData.get('modul'),
        quelle: formData.get('quelle'),
        beschreibung: formData.get('beschreibung')
    };

    // date = new Date(date).toISOString().split('T')[0];

    // Insert data into the database
    try {
        await sql`
            INSERT INTO daten (fach, modul, quelle, beschreibung, autor, status, typ)
            VALUES (${fach}, ${modul}, ${quelle}, ${beschreibung}, ${user_id}, ${status}, ${typ})
        `;
    } catch (error) {
        // If a database error occurs, return a more specific error.
        return {
            message: 'Fehler in der Datenbank: Daten nicht gespeichert.',
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