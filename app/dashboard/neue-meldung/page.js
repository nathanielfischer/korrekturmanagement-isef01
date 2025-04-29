import { getFaecher, getModuleByFach, getQuellen, getTypen } from "@/app/lib/database";
import Dropdowns from "../../ui/neue-meldung/module-dropdowns";

// export const dynamic = "force-dynamic";

export default async function NeueMeldung({ searchParams }) {
    // Fächer Auswahl
    const faecher = await getFaecher();

    // Module aus searchParams Auswahl
    const params = await searchParams;
    const selectedFach = params.fach;
    const module = await getModuleByFach(selectedFach);

    // Quelle Auswahl
    const quellen = await getQuellen();

    // Typ Auswahl
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
