/**
 * Registrierungs-Formular mit Name, E-Mail und Passwort-Eingabe
 * Verwendet Server Actions für Benutzer-Erstellung
 */

'use client';

import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import { useFormStatus } from 'react-dom';
import { useActionState } from 'react';
import { createNewUser } from "@/app/lib/actions";
import Link from 'next/link';

/**
 * Hauptkomponente des Registrierungs-Formulars
 * @returns {JSX.Element} Formular mit Name, E-Mail, Passwort und Registrierungs-Button
 */
export default function SignUpForm() {
  // State für Fehlerbehandlung und Formular-Status
  const [errorMessage, formAction, isPending] = useActionState(createNewUser, undefined);

  return (
    <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
      <form action={formAction} className="space-y-3">
        <div className="">
          {/* Formular-Überschrift */}
          <h1 className={`mb-3 text-2xl`}>
            Neuen Account erstellen
          </h1>
          <div className="w-full">
            {/* Name und E-Mail Eingabefelder */}
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="name"
              >
                Name
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Vor- und Nachname"
                  required
                  minLength={4}
                />
                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Deine Email Adresse"
                  required
                />
                <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            {/* Passwort Eingabefeld */}
            <div className="mt-4">
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="password"
              >
                Passwort
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Passwort erstellen"
                  required
                  minLength={6}
                />
                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>
          <SignUpButton />
          {/* Fehlerbereich */}
          <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            {errorMessage && (
              <>
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-500">{errorMessage}</p>
              </>
            )}
          </div>
        </div>
      </form>

      {/* Link zum Login */}
      <Link href="/auth/login">
        <p className='mb-3 text-xs font-medium text-gray-900 text-center '>In bestehen Account anmelden</p>
      </Link>
    </div>
  );
}

/**
 * Registrierungs-Button mit Ladezustand
 * @returns {JSX.Element} Button mit Pfeil-Icon und Pending-Status
 */
function SignUpButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      Account erstellen <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}