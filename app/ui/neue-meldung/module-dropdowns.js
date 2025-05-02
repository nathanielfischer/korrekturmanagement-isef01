'use client';

import Dropdown from "@/app/ui/neue-meldung/dropdown"
import { Button } from "@/app/ui/button";
import Link from "next/link";
import { useActionState } from 'react';
import { createMeldung } from '@/app/lib/actions';

/**
 * Hauptkomponente für das Formular zur Erstellung einer neuen Fehlermeldung
 * @param {Array} faecher - Liste der verfügbaren Fächer
 * @param {Array} module - Liste der Module für das ausgewählte Fach
 * @param {Array} quellen - Liste der möglichen Quellen
 * @param {Array} typen - Liste der Typen
 * @returns {JSX.Element} Formular mit Dropdown-Menüs und Eingabefeldern
 */
export default function Dropdowns({ faecher, module, quellen, typen }) {
    // State für Formular-Übermittlung und Fehlermeldungen
    const [errorMessage, formAction, isPending] = useActionState(createMeldung, undefined);

    return (
        <form action={formAction}>
            <div className="p-4 md:p-0">
                <div className="mb-4">
                    <label htmlFor="titel" className="mb-2 block text-sm font-medium">
                        Titel eingeben
                    </label>
                    <div className="relative">
                        <input
                            id="titel"
                            name="titel"
                            type="text"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                            placeholder="Titel eingeben..."
                            required
                        />
                    </div>
                </div>

                <Dropdown
                    items={faecher}
                    heading={"Fach"}
                />

                <Dropdown
                    items={module}
                    heading={"Modul"}
                />

                <Dropdown
                    items={quellen}
                    heading={"Quelle"}
                />

                <Dropdown
                    items={typen}
                    heading={"Typ"}
                />

                <div className="mb-4">
                    <label htmlFor="beschreibung" className="mb-2 block text-sm font-medium">
                        Beschreibung eingeben
                    </label>
                    <div className="relative">
                        <textarea
                            id="beschreibung"
                            name="beschreibung"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                            placeholder="Beschreibung eingeben..."
                            rows="4"
                            required
                        ></textarea>
                    </div>
                </div>

                <div aria-live="polite" aria-atomic="true">
                    {errorMessage?.message && (
                        <p className="mt-2 text-sm text-red-500">{errorMessage.message}</p>
                    )}
                </div>

                <div className="flex justify-end">
                    <CancelButton />
                    <SaveButton isPending={isPending} />
                </div>
            </div>
        </form>
    );
}

/**
 * Button-Komponente zum Speichern des Formulars
 * @param {boolean} isPending - Status der Formular-Übermittlung
 * @returns {JSX.Element} Speichern-Button mit Ladezustand
 */
function SaveButton({ isPending }) {
    return (
        <Button className="mt-4" aria-disabled={isPending}>
            {isPending ? 'Wird gespeichert...' : 'Speichern'}
        </Button>
    );
}

/**
 * Button-Komponente zum Abbrechen der Eingabe
 * @returns {JSX.Element} Abbrechen-Button mit Link zur Dashboard
 */
function CancelButton() {
    return (
        <Link href="/dashboard">
            <Button className="mt-4 mr-5">
                Abbrechen
            </Button>
        </Link>
    );
}


