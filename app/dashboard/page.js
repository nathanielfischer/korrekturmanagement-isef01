import { getFaecher, getModule, getMeldungenFiltered, getModuleByFach } from '@/app/lib/database';
import FilterSection from '@/app/ui/dashboard/filter-section';
import StatusBadge from '@/app/ui/status-badge';
import Link from 'next/link';

export default async function Dashboard({ searchParams }) {
  // Vorgegebene Arrays für die verschiedenen Filter-Dropdowns
  const statusArray = ["Offen", "In Bearbeitung", "Erledigt", "Abgelehnt"];
  const typArray = ["Ergänzung", "Fehler", "Verbesserungsvorschlag"];
  const faecherArray = await getFaecher();
  
  const params = await searchParams;
  
  // Hole die Module basierend auf dem ausgewählten Fach
  const moduleArray = params.fach 
    ? await getModuleByFach(params.fach)
    : await getModule();

  // Hole die Filter aus den URL-Parametern
  const filter = {
    status: params.status || '',
    typ: params.typ || '',
    fach: params.fach || '',
    modul: params.modul || ''
  };
  

  const meldungen = await getMeldungenFiltered(filter);

  return (
    <div>
      <div className="p-2 md:p-4">
        <FilterSection 
          statusArray={statusArray}
          typArray={typArray}
          faecherArray={faecherArray}
          moduleArray={moduleArray}
        />
        
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
                    <div className="mb-2 text-base font-medium flex items-center space-between md:block">
                      <div className="flex-1 break-words pr-2">
                        #{meldung.meldung_id} - {meldung.titel}
                      </div>
                      <span className="inline-flex md:hidden whitespace-nowrap">
                        <StatusBadge status={meldung.status} />
                      </span>
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
                  <div className="md:ml-4 hidden md:block">
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