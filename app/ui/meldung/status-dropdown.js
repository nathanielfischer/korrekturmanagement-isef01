'use client';

import { useFormStatus } from 'react-dom';
import { changeStatus } from '@/app/lib/actions';

/**
 * StatusDropdown Komponente
 * Ermöglicht das Ändern des Status einer Meldung über ein Dropdown-Menü
 * 
 * @param {string} currentStatus - Der aktuelle Status der Meldung
 * @param {string} meldungId - Die ID der Meldung, deren Status geändert werden soll
 * @param {string} className - Zusätzliche CSS-Klassen für das select-Element
 * @returns {JSX.Element} Ein Dropdown-Menü zur Statusänderung
 */
export default function StatusDropdown({ currentStatus, meldungId, className }) {
    // Hook für den Ladezustand des Formulars
    const { pending } = useFormStatus();

    // Verfügbare Status-Optionen mit Standardauswahl
    const statusOptions = [
        { value: "", label: "Status aktualisieren", disabled: true },
        { value: "Offen", label: "Offen" },
        { value: "In Bearbeitung", label: "In Bearbeitung" },
        { value: "Erledigt", label: "Erledigt" },
        { value: "Abgelehnt", label: "Abgelehnt" }
    ];

    return (
        <form action={async (formData) => {
            const status = formData.get('status');
            await changeStatus(meldungId, status);
        }}>
            <select 
                name="status"
                defaultValue="" // Setzt "Status aktualisieren" als Standardauswahl
                onChange={(e) => e.target.form.requestSubmit()} // Automatisches Absenden bei Änderung
                className={`rounded-md border border-gray-200 py-2 px-3 text-sm ${className || ''}`}
                disabled={pending}
            >
                {statusOptions.map((option) => (
                    <option 
                        key={option.value} 
                        value={option.value}
                        disabled={option.disabled}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        </form>
    );
}