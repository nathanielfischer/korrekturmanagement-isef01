import { getFaecher, getModuleByFach } from "@/app/lib/database";
import Dropdowns from "../../ui/neue-meldung/module-dropdown";

// export const dynamic = "force-dynamic";

export default async function NeueMeldung( {searchParams}) {
    const faecher = await getFaecher();

    const params = await searchParams;
    const selectedFach = params.fach;
    //TODO: handle Leerzeichen !!!!!!!!!!!!!!!!!!!!!!!!!!!
    
    const module = await getModuleByFach(selectedFach);


    return (
        <div>
            <Dropdowns
                faecher={faecher}
                module ={module}
            />

            {/* {fach !== "" ?
                <Dropdown
                    items={module}
                    heading={"Modul"}
                />
                : ""} */}


        </div>
    );
}
