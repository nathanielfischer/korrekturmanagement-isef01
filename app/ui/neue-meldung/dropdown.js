'use client';

import { DocumentChartBarIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

/**
 * Dropdown-Komponente für die Auswahl verschiedener Optionen
 * @param {Array} items - Array mit den Auswahlmöglichkeiten
 * @param {string} heading - Überschrift/Bezeichnung des Dropdowns
 * @returns {JSX.Element} Styled Dropdown-Menü
 */
export default function Dropdown({ items, heading }) {
    // State für ausgewähltes Element
    const [selectedItem, setSelectedItem] = useState("");
    const router = useRouter();

    // Aktualisiere URL-Parameter bei Änderung der Auswahl
    useEffect(() => {
        router.push(`?${heading.toLowerCase()}=${selectedItem}`);
    }, [selectedItem]);

    return (
        <div className="mb-4 mt-4">
            {/* Label für das Dropdown-Menü */}
            <label htmlFor="konto_id" className="mb-2 block text-sm font-medium">
                {heading} auswählen
            </label>
            <div className="relative">
                {/* Dropdown Select-Element mit Icon */}
                <select
                    id={heading}
                    name={heading}
                    className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 indent-10 text-sm outline-2 placeholder:text-gray-500"
                    aria-describedby="customer-error"
                    defaultValue={'DEFAULT'}
                    required
                    onChange={(e) => {
                        // Aktualisiere nur bei Fach-Auswahl den State
                        if (heading === "Fach") {
                            setSelectedItem(e.currentTarget.value);
                        }
                    }}
                >
                    {/* Standard Placeholder Option */}
                    <option value='DEFAULT' disabled hidden>
                        {heading} auswählen
                    </option>

                    {/* Dynamische Generierung der Optionen */}
                    {items.map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
                {/* Dekoratives Icon */}
                <DocumentChartBarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
        </div>
    );
}