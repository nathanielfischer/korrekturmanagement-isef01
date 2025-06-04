/**
 * Login-Seite für das Korrekturmanagement-System
 * Zeigt IU-Logo und Login-Formular in zentriertem Layout
 */

import IuLogo from "@/app/ui/iu-logo.js";
import LoginForm from "@/app/ui/login-form";
import { Suspense } from 'react';

/**
 * Hauptkomponente der Login-Seite
 * @returns {JSX.Element} Zentrierte Login-Seite mit Logo und Formular
 */
export default function LoginPage() {
    return (
        <main className="flex items-center justify-center md:h-screen">
            {/* Container für zentriertes Login-Layout */}
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">

                {/* Logo-Bereich mit Demo-Hinweis */}
                <div className="flex w-full justify-center p-3">
                    <div className="w-32 text-white md:w-36">
                        {/* Demo-Kennzeichnung */}
                        <p className={"basis-full text-red-600 text-xs text-center"}>Studenten Demo</p>
                        <IuLogo />
                    </div>
                </div>

                {/* Login-Formular mit Suspense für Ladezeiten */}
                <Suspense>
                    <LoginForm />
                </Suspense>
            </div>
        </main>
    );
}