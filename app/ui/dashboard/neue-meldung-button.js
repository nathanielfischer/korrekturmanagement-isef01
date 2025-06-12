/**
 * Button-Komponente zur Navigation zur "Neue Meldung" Seite
 * Responsive Design mit Icon und Text
 */

'use client';

import { redirect } from 'next/navigation';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';

/**
 * Button zum Erstellen einer neuen Meldung
 * @param {Object} props - Komponenten-Props
 * @param {string} props.className - Zusätzliche CSS-Klassen
 * @returns {JSX.Element} Button mit Plus-Icon und Text
 */
export default function NeueMeldungButton({ className }) {

    return (
        <Button onClick={() => redirect('/dashboard/neue-meldung')} className={className}>
            {/* Plus-Icon - immer sichtbar */}
            <PlusCircleIcon className="ml-auto md:mr-2 h-5 w-5 text-gray-50" /> 
            {/* Text - nur auf großen Bildschirmen sichtbar */}
            <span className="hidden md:inline">Neue Meldung</span>
        </Button>
    );
}
