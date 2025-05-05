'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import FilterDropdown from './filter-dropdown';
import NeueMeldungButton from './neue-meldung-button';

export default function FilterSection({ statusArray, typArray, faecherArray, moduleArray }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (filterType, value) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(filterType.toLowerCase(), value);
    } else {
      params.delete(filterType.toLowerCase());
    }
    router.push(`/dashboard?${params.toString()}`);
  };

  return (
    <div className="mb-4 bg-light-grey rounded-lg p-4">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
          <FilterDropdown
            heading="Status"
            filterArray={statusArray}
            currentValue={searchParams.get('status') || ''}
            onFilterChange={handleFilterChange}
          />
          <FilterDropdown
            heading="Typ"
            filterArray={typArray}
            currentValue={searchParams.get('typ') || ''}
            onFilterChange={handleFilterChange}
          />
          <FilterDropdown
            heading="Fach"
            filterArray={faecherArray}
            currentValue={searchParams.get('fach') || ''}
            onFilterChange={handleFilterChange}
          />
          <FilterDropdown
            heading="Modul"
            filterArray={moduleArray}
            currentValue={searchParams.get('modul') || ''}
            onFilterChange={handleFilterChange}
          />
        </div>
        <div className="md:ml-auto">
          <NeueMeldungButton />
        </div>
      </div>
    </div>
  );
}