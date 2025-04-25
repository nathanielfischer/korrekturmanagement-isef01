'use server';

import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';

export async function getUserIdByEmail(email) {
    noStore();
    try {
        const data = await sql`
            SELECT user_id FROM users
            WHERE email = ${email}
        `;
        return data.rows[0];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch UserIdByEmail.');
    }
}

//TODO: Datum ?? + Funktion testen
//Modul als input
export async function getVerantwortlichenByModul(modul) {
    noStore();
    try {
        const data = await sql`
            SELECT module.modul, users.name
            FROM module
            INNER JOIN users ON module.verantwortlicher = users.user_id
            WHERE module.modul = ${modul}
        `;
        return data.rows[0];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch Verantwortlichen by Modul.');
    }
}

