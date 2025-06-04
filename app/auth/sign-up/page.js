/**
 * Registrierungs-Seite für das Korrekturmanagement-System
 * Zeigt IU-Logo und Registrierungs-Formular in zentriertem Layout
 */

import IuLogo from "@/app/ui/iu-logo.js";
import SignUpForm from '@/app/ui/sign-up-form';
import { Suspense } from 'react';

/**
 * Hauptkomponente der Registrierungs-Seite
 * @returns {JSX.Element} Zentrierte Sign-Up-Seite mit Logo und Formular
 */
export default function SignUpPage() {
    return (
        <main className="flex items-center justify-center md:h-screen">
            {/* Container für zentriertes Registrierungs-Layout */}
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">

                {/* Logo-Bereich mit Demo-Hinweis */}
                <div className="flex w-full justify-center p-3">
                    <div className="w-32 text-white md:w-36">
                        {/* Demo-Kennzeichnung */}
                        <p className={"basis-full text-red-600 text-xs text-center"}>Studenten Demo</p>
                        <IuLogo />
                    </div>
                </div>

                {/* Registrierungs-Formular mit Suspense für Ladezeiten */}
                <Suspense>
                    <SignUpForm />
                </Suspense>
            </div>
        </main>
    );
}