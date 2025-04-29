'use client';

import { redirect } from 'next/navigation';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';

export default function NeueMeldungButton({ className }) {


    return (
        <Button onClick={() => redirect('/dashboard/neue-meldung')} className={className}>
            <PlusCircleIcon className="ml-auto lg:mr-2 h-5 w-5 text-gray-50" /> 
            <span className="hidden lg:inline">Neue Meldung</span>
        </Button>
    );
}
