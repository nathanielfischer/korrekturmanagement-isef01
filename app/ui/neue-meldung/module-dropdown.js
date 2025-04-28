'use client';

import Dropdown from "@/app/ui/neue-meldung/dropdown"

export default function Dropdowns({ faecher, module, quellen }) {

    return (
        <div>
            <Dropdown
                items={faecher}
                heading={"Fach"}
            />

            <Dropdown
                items={module}
                heading={"Modul"}
            />

            <Dropdown
                items={quellen}
                heading={"Quelle"}
            />
        </div>
    );
}


