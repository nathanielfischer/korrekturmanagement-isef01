'use server';

import { signIn, auth } from '@/app/auth';
import { AuthError } from 'next-auth';
import { getUserIdByEmail } from "@/app/lib/database";
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';


export async function authenticate(prevState, formData) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Falsche Anmeldedaten.';
                default:
                    return 'Etwas ist schiefgelaufen.';
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
        switch (error.type) {
            case 'CredentialsSignin':
                return 'Invalid credentials.';
            default:
                return 'Something went wrong.';
        }
        throw error;
    }

    revalidatePath('/auth/login');
    redirect('/auth/login');
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