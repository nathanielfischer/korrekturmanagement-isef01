'use server';

import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { faecherToArray, moduleToArray } from "@/app/lib/helper";

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

//TODO: Funktion testen
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


// Erhält alle Fächer aus der Datenbank
export async function getFaecher() {
    noStore();
    try {
        const data = await sql`
            SELECT faecher.fach
            FROM faecher 
        `;
        return faecherToArray(data.rows);
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch Verantwortlichen by Modul.');
    }
}

// Erhält alle Module für ein bestimmtes Fach aus der Datenbank
export async function getModuleByFach(fach) {
    noStore();
    try {
        const data = await sql`
            SELECT module.modul
                FROM faecher_module fd 
            INNER JOIN module ON module.modul = fd.modul
                WHERE fd.fach = ${fach}
        `;
        return moduleToArray(data.rows);
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch Verantwortlichen by Modul.');
    }
}

