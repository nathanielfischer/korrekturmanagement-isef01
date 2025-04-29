'use client';

import { redirect } from 'next/navigation';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';

export default function RedirectButton({ className }) {


    return (
        <Button onClick={() => redirect('/dashboard/neue-meldung')} className={className}>
            <PlusCircleIcon className="ml-auto mr-2 h-5 w-5 text-gray-50" /> Neue Meldung
        </Button>
    );
}
