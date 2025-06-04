/**
 * Hauptseite (Root-Page) der Korrekturmanagement-Anwendung
 * Zeigt IU-Logo, Willkommensnachricht und Logout-Button
 */

import IuLogo from "@/app/ui/iu-logo.js";
import LogoutButton from "@/app/ui/logout-button.js";

/**
 * Home-Komponente der Startseite
 * @returns {JSX.Element} Zentrierte Startseite mit Logo und Navigation
 */
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <IuLogo />
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="tracking-[-.01em]">
            Temporäre Startseite im Projekt.
          </li>
        </ol>
        <LogoutButton />
      </main>
    </div>
  );
}
