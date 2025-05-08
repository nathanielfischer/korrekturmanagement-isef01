'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import FilterDropdown from './filter-dropdown';
import NeueMeldungButton from './neue-meldung-button';
import { useState } from 'react';

/**
 * FilterSection Komponente
 * 
 * Diese Komponente stellt den Filterbereich im Dashboard dar. Sie ermöglicht es dem Benutzer,
 * Meldungen nach Status, Typ, Fach und Modul zu filtern. Die Filterauswahl wird in der URL
 * als Suchparameter gespeichert, wodurch die Filter auch nach einem Seitenneuladen
 * bestehen bleiben.
 * 
 * @param {Object} props - Die Props für die Komponente
 * @param {Array} props.statusArray - Array mit möglichen Statuswerten
 * @param {Array} props.typArray - Array mit möglichen Typen von Meldungen
 * @param {Array} props.faecherArray - Array mit verfügbaren Fächern
 * @param {Array} props.moduleArray - Array mit verfügbaren Modulen
 * @returns {JSX.Element} Die gerenderte FilterSection Komponente
 */
export default function FilterSection({ statusArray, typArray, faecherArray, moduleArray }) {
  const router = useRouter();                    // Next.js Router für Navigation
  const searchParams = useSearchParams();        // Zugriff auf die aktuellen URL-Parameter
  const [isFilterOpen, setIsFilterOpen] = useState(false); // State für mobile Filter-Anzeige

  /**
   * Aktualisiert die URL-Parameter basierend auf den gewählten Filteroptionen
   * 
   * @param {string} filterType - Art des Filters (status, typ, fach oder modul)
   * @param {string} value - Der ausgewählte Filterwert
   */
  const handleFilterChange = (filterType, value) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(filterType.toLowerCase(), value); // Setze den entsprechenden Parameter
    } else {
      params.delete(filterType.toLowerCase());     // Lösche den Parameter, wenn kein Wert gewählt
    }
    router.push(`/dashboard?${params.toString()}`); // Navigiere zur URL mit aktualisierten Parametern
  };

  /**
   * Schaltet die Sichtbarkeit des Filterbereichs auf mobilen Geräten um
   */
  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="mb-6 mt-2 md:mt-0 bg-light-grey rounded-lg">
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