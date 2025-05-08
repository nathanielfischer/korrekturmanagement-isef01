'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import FilterDropdown from './filter-dropdown';
import NeueMeldungButton from './neue-meldung-button';
import { useState } from 'react';

export default function FilterSection({ statusArray, typArray, faecherArray, moduleArray }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterChange = (filterType, value) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(filterType.toLowerCase(), value);
    } else {
      params.delete(filterType.toLowerCase());
    }
    router.push(`/dashboard?${params.toString()}`);
  };

  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="mb-6 mt-2 bg-light-grey rounded-lg">
      {/* Header mit Toggle Button für Mobile und NeueMeldungButton */}
      <div className="flex justify-between items-center mb-2">
        <div className="md:hidden w-full">
          <button 
            onClick={toggleFilters}
            className="flex items-center justify-between w-full bg-white px-4 py-2 rounded-lg"
          >
            <span>Filter</span>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        <div className="hidden md:block md:flex-grow">
          {/* Platzhalter für Desktop */}
        </div>
        <div className="md:ml-auto ml-4">
          <NeueMeldungButton />
        </div>
      </div>

      {/* Filteroptionen - auf Mobile nur sichtbar, wenn geöffnet */}
      <div className={`${isFilterOpen ? 'block' : 'hidden'} md:block mt-4`}>
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
      </div>
    </div>
  );
}