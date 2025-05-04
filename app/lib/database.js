'use server';

import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { faecherToArray, moduleToArray, quellenToArray, typenToArray } from '@/app/lib/helper';

/**
 * Benutzer-ID anhand der E-Mail-Adresse abrufen
 * @param {string} email - E-Mail-Adresse des Benutzers
 * @returns {Object} Benutzer-ID oder undefined
 */
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

/**
 * Verantwortlichen für ein bestimmtes Modul finden
 * @param {string} modul - Modulbezeichnung (z.B. 'ISEF01')
 * @returns {Object} Benutzer-ID des Verantwortlichen
 */
export async function getVerantwortlichenByModul(modul) {
    noStore();
    try {
        const data = await sql`
            SELECT users.user_id
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


// //TODO: nicht getestet!
// export async function getUserNameById(id) {
//     noStore();
//     try {
//         const data = await sql`
//             SELECT users.name
//             FROM users
//             WHERE users.user_id = ${id}
//         `;
//         return data.rows[0];
//     } catch (error) {
//         console.error('Database Error:', error);
//         throw new Error('Failed to fetch UserName by Id.');
//     }
// }


/**
 * Alle verfügbaren Fächer aus der Datenbank abrufen
 * @returns {Array} Liste der Fächer
 */
export async function getFaecher() {
    noStore();
    try {
        const data = await sql`
            SELECT faecher.fach
            FROM faecher 
            ORDER BY faecher.fach ASC
        `;
        return faecherToArray(data.rows);
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch Verantwortlichen by Modul.');
    }
}

/**
 * Module für ein bestimmtes Fach abrufen
 * @param {string} fach - Bezeichnung des Fachs (z.B. 'Informatik')
 * @returns {Array} Liste der Module
 */
export async function getModuleByFach(fach) {
    noStore();

    try {
        const data = await sql`
            SELECT module.modul
                FROM faecher_module fd 
            INNER JOIN module ON module.modul = fd.modul
                WHERE fd.fach = ${fach}
            ORDER BY module.modul ASC
        `;
        return moduleToArray(data.rows);
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch Verantwortlichen by Modul.');
    }
}

/**
 * Alle Quellen aus der Datenbank abrufen
 * @returns {Array} Liste der Quellen
 */
export async function getQuellen() {
    noStore();
    try {
        const data = await sql`
            SELECT quellen.quelle
            FROM quellen
            ORDER BY quellen.quelle ASC
        `;
        return quellenToArray(data.rows);
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch Verantwortlichen by Modul.');
    }
}

/**
 * Alle Typen aus der Datenbank abrufen
 * @returns {Array} Liste der Typen
 */
export async function getTypen() {
    noStore();
    try {
        const data = await sql`
            SELECT typen.typ
            FROM typen
            ORDER BY typen.typ ASC
        `;
        return typenToArray(data.rows);
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch Typen.');
    }
}

/**
 * Alle Module aus der Datenbank abrufen
 * @returns {Array} Liste der Module
 */
export async function getModule() {
    noStore();
    try {
        const data = await sql`
            SELECT module.modul
            FROM module
            ORDER BY module.modul ASC
        `;
        return moduleToArray(data.rows);
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch Module.');
    }
}

/**
 * Alle Meldungen mit zugehöriger Verantwortlicher Person abrufen
 * @returns {Array} Liste aller Meldungen mit Metadaten
 */
export async function getMeldungen() {
    noStore();
    try {
        const data = await sql`
            SELECT 
                meldungen.meldung_id, 
                meldungen.titel, 
                meldungen.datum, 
                meldungen.fach, 
                meldungen.modul, 
                meldungen.typ,
                meldungen.status,
                users.name as verantwortlicher_name
            FROM meldungen
            INNER JOIN users ON meldungen.verantwortlicher = users.user_id
            ORDER BY meldungen.meldung_id DESC
        `;
        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch Meldungen.');
    }
}

/**
 * Eine spezifische Meldung anhand ihrer ID abrufen
 * @param {string} id - Die ID der Meldung
 * @returns {Object} Meldung mit allen Details
 */
export async function getMeldungById(id) {
    noStore();
    try {
        const data = await sql`
            SELECT 
                meldungen.meldung_id,
                meldungen.titel,
                meldungen.datum,
                meldungen.fach,
                meldungen.modul,
                meldungen.quelle,
                meldungen.typ,
                meldungen.status,
                meldungen.beschreibung,
                users.name as verantwortlicher_name
            FROM meldungen
            INNER JOIN users ON meldungen.verantwortlicher = users.user_id
            WHERE meldungen.meldung_id = ${id}
        `;
        return data.rows[0];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch Meldung by ID.');
    }
}
