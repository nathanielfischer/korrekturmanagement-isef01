import NeueMeldungButton from '@/app/ui/dashboard/neue-meldung-button';
import StatusBadge from '@/app/ui/status-badge';
import FilterDropdown from '@/app/ui/dashboard/filter-dropdown';
import { getFaecher, getModule, getMeldungen, getMeldungenFiltered } from '@/app/lib/database';
import Link from 'next/link';

export default async function Dashboard() {
  // Vorgegebene Arrays für die verschiedenen Filter-Dropdowns
  const statusArray = ["Offen", "In Bearbeitung", "Erledigt", "Abgelehnt"];
  const typArray = ["Fehler", "Ergänzung", "Sonstiges"];
  const faecherArray = await getFaecher();
  const moduleArray = await getModule();
  const meldungen = await getMeldungenFiltered(
    {
      status: '',
      typ: '',
      fach: '',
      modul: ''
    }
  );

  return (
    <div>
      {/* Container mit responsivem Padding */}
      <div className="p-2 md:p-4">
        {/* Filter-Bereich */}
        <div className="mb-4 bg-light-grey rounded-lg p-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
              <FilterDropdown
                heading="Status"
                filterArray={statusArray}
              />
              <FilterDropdown
                heading="Typ"
                filterArray={typArray}
              />
              <FilterDropdown
                heading="Fach"
                filterArray={faecherArray}
              />
              <FilterDropdown
                heading="Modul"
                filterArray={moduleArray}
              />
            </div>
            <div className="md:ml-auto">
              <NeueMeldungButton />
            </div>
          </div>
        </div>

        {/* Meldungsliste */}
        <div className="space-y-4">
          {meldungen.map((meldung) => (
            <Link 
              key={meldung.meldung_id}
              href={`/dashboard/meldung/${meldung.meldung_id}`}
              className="block bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="p-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                  <div className="flex-1">
                    <div className="text-base font-medium">
                      #{meldung.meldung_id} - {meldung.titel}
                    </div>
                    <div className="text-gray-500 text-sm mt-1">
                      {new Date(meldung.datum).toLocaleDateString('de-DE', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                      })} - {meldung.typ}
                    </div>
                    <div className="text-gray-500 text-sm mt-1">
                      {meldung.fach} - {meldung.modul}
                    </div>
                    <div className="text-gray-500 text-sm mt-1">
                      {meldung.verantwortlicher_name}
                    </div>
                  </div>
                  <div className="md:ml-4">
                    <StatusBadge status={meldung.status} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}