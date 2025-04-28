'use client';

import Dropdown from "@/app/ui/neue-meldung/dropdown"

export default function Dropdowns({ faecher, module }) {

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
        </div>
    );
}


