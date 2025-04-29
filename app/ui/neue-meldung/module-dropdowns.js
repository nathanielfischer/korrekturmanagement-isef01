'use client';

import Dropdown from "@/app/ui/neue-meldung/dropdown"
import { Button } from "@/app/ui/button";
import Link from "next/link";

export default function Dropdowns({ faecher, module, quellen, typen }) {

    return (
        <div className="p-4 md:p-0">
            <div className="mb-4">
                <label htmlFor="customInput" className="block text-sm font-medium text-gray-700">
                    Titel eingeben
                </label>
                <input
                    type="text"
                    id="customInput"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Titel eingeben..."
                    required
                />
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
                <label htmlFor="descriptionInput" className="block text-sm font-medium text-gray-700">
                    Beschreibung eingeben
                </label>
                <textarea
                    id="descriptionInput"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Beschreibung eingeben..."
                    rows="4"
                    required
                ></textarea>
            </div>

            <div className="flex justify-end">
                <CancelButton />
                <SaveButton />
            </div>


        </div>
    );
}

function SaveButton() {
    // const { pending } = useFormStatus();

    return (
        <Button className="mt-4 ">
            Speichern
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


