import NeueMeldungButton from '@/app/ui/dashboard/neue-meldung-button';
import StatusBadge from '@/app/ui/status-badge';
import FilterDropdown from '@/app/ui/dashboard/filter-dropdown';
import { getFaecher, getModule, getMeldungen } from '@/app/lib/database';

export default async function Dashboard() {
  const statusArray = ["Offen", "In Bearbeitung", "Erledigt", "Abgelehnt"];
  const typArray = ["Fehler", "Ergänzung", "Sonstiges"];
  const faecherArray = await getFaecher();
  const moduleArray = await getModule();
  const meldungen = await getMeldungen();

  return (
    <div>
      <div className="overflow-x-auto rounded-lg border-light-grey">
        <table className="min-w-full border-collapse border">
          <thead>
            <tr className="bg-light-grey">
              <th className="px-6 py-3 text-sm font-medium w-full">
                <div className="flex justify-between items-center">
                  <div className="flex gap-4">
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
                  <div className="ml-auto">
                    <NeueMeldungButton />
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {meldungen.map((meldung) => (
              <tr key={meldung.meldung_id}>
                <td className="px-6 py-4 border-b border-light-grey text-sm" colSpan="3">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="mb-1 text-base">#{meldung.meldung_id} - {meldung.titel}</div>
                      <div className="text-gray-500 text-xs">
                        {new Date(meldung.datum).toLocaleDateString('de-DE', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric'
                        })} - {meldung.fach} - {meldung.modul} - {meldung.typ} - {meldung.verantwortlicher_name}
                      </div>
                    </div>
                    <StatusBadge status={meldung.status} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}