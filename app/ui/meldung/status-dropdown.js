'use client';

import { useFormStatus } from 'react-dom';
import { changeStatus } from '@/app/lib/actions';
import { Button } from '@/app/ui/button';

/**
 * StatusDropdown Komponente
 * Ermöglicht das Ändern des Status einer Meldung über ein Dropdown-Menü
 * das als Button dargestellt wird
 * 
 * @param {string} currentStatus - Der aktuelle Status der Meldung
 * @param {string} meldungId - Die ID der Meldung, deren Status geändert werden soll
 * @param {string} className - Zusätzliche CSS-Klassen für das select-Element
 * @returns {JSX.Element} Ein Dropdown-Menü zur Statusänderung als Button
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
            <div className="relative inline-block">
                <select 
                    name="status"
                    defaultValue="" 
                    onChange={(e) => e.target.form.requestSubmit()}
                    className={`absolute w-full h-full opacity-0 cursor-pointer z-10 ${pending ? 'pointer-events-none' : ''}`}
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
                <Button disabled={pending} className={className}>
                    {pending ? 'Wird aktualisiert...' : 'Status aktualisieren'}
                </Button>
            </div>
        </form>
    );
}