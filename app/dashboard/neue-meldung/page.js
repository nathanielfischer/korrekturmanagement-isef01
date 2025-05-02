import { getFaecher, getModuleByFach, getQuellen, getTypen } from "@/app/lib/database";
import Dropdowns from "../../ui/neue-meldung/module-dropdowns";

// Dynamisches Rendering deaktiviert um Caching zu ermöglichen
// export const dynamic = "force-dynamic";

/**
 * NeueMeldung Komponente - Ermöglicht das Erstellen einer neuen Fehlermeldung
 * @param {Object} searchParams - URL Parameter für die Filterung der Module
 * @returns {JSX.Element} Seite mit Formular für neue Meldungen
 */
export default async function NeueMeldung({ searchParams }) {
    // Lade alle verfügbaren Fächer aus der Datenbank
    const faecher = await getFaecher();

    // Erhalte den Namen des ausgewählten Fachs aus den URL Parametern
    // und lade die entsprechenden Module aus der Datenbank
    const params = await searchParams;
    const selectedFach = params.fach;
    const module = await getModuleByFach(selectedFach);

    // Lade Auswahlmöglichkeiten für Fehlerquellen aus der Datenbank
    const quellen = await getQuellen();

    // Lade verfügbare Fehlertypen aus der Datenbank
    const typen = await getTypen();

    return (
        <div>
            <Dropdowns
                faecher={faecher}
                module={module}
                quellen={quellen}
                typen={typen}
            />
        </div>
    );
}
