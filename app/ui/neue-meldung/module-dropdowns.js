'use client';

import Dropdown from "@/app/ui/neue-meldung/dropdown"
import { Button } from "@/app/ui/button";
import Link from "next/link";
import { useActionState } from 'react';
import { createMeldung } from '@/app/lib/actions';

export default function Dropdowns({ faecher, module, quellen, typen }) {
    const [errorMessage, formAction, isPending] = useActionState(createMeldung, undefined);

    return (
        // Render the form for creating a new "Meldung" with dropdowns and input fields
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

function SaveButton({ isPending }) {
    return (
        <Button className="mt-4" aria-disabled={isPending}>
            {isPending ? 'Wird gespeichert...' : 'Speichern'}
        </Button>
    );
}

function CancelButton() {
    return (
        <Link href="/dashboard">
            <Button className="mt-4 mr-5">
                Abbrechen
            </Button>
        </Link>
    );
}


