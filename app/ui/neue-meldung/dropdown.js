'use client';

import { DocumentChartBarIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getModuleByFach } from "@/app/lib/database";


export default function Dropdown({ items, heading }) {
    // bring the state here
    const [selectedItem, setSelectedItem] = useState("");
    const router = useRouter();

    // useEffect will append the query param whenever the state changes
    useEffect(() => {
        router.push(`?${heading.toLowerCase()}=${selectedItem}`);
    }, [selectedItem]);


    return (
        <div className="mb-4 mt-4">
            <label htmlFor="konto_id" className="mb-2 block text-sm font-medium">
                {heading} auswählen
            </label>
            <div className="relative">
                <select
                    id={heading}
                    name={heading}
                    className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    aria-describedby="customer-error"
                    defaultValue={'DEFAULT'}
                    required
                    onChange={(e) => {
                        if (heading === "Fach") {
                            setSelectedItem(e.currentTarget.value);
                        }
                    }}
                    
                >
                    <option value='DEFAULT' disabled hidden>
                        {heading} auswählen
                    </option>

                    {items.map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}

                </select>
                <DocumentChartBarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
        </div>
    );
}


async function updateModulList() {
    const module = await getModuleByFach("Informatik");
}
