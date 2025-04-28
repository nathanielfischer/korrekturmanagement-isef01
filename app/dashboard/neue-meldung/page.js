import { getFaecher, getModuleByFach, getQuellen } from "@/app/lib/database";
import Dropdowns from "../../ui/neue-meldung/module-dropdown";

// export const dynamic = "force-dynamic";

export default async function NeueMeldung( {searchParams}) {
    // Fächer Auswahl
    const faecher = await getFaecher();

    // Module aus searchParams Auswahl
    //TODO: handle Leerzeichen !!!!!!!!!!!!!!!!!!!!!!!!!!!
    const params = await searchParams;
    const selectedFach = params.fach;
    const module = await getModuleByFach(selectedFach);

    // Quelle Auswahl
    const quellen = await getQuellen();

    // Typ Auswahl


    return (
        <div>
            <Dropdowns
                faecher={faecher}
                module ={module}
                quellen={quellen}
            />
        </div>
    );
}
