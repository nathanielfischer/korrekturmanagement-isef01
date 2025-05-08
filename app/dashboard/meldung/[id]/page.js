import { getMeldungById } from '@/app/lib/database';
import { notFound } from 'next/navigation';
import StatusBadge from '@/app/ui/status-badge';
import StatusDropdown from '@/app/ui/meldung/status-dropdown';
import { Fragment } from 'react';
import { Button } from '@/app/ui/button';
import Link from 'next/link';

/**
 * @description Zeigt die detaillierte Ansicht einer einzelnen Meldung an
 * @param {Object} props - Die Komponenten-Props
 * @param {Object} props.params - URL-Parameter
 * @param {string} props.params.id - Die ID der anzuzeigenden Meldung
 * @returns {Promise<JSX.Element>} Die gerenderte Meldungsdetailansicht
 */
export default async function MeldungPage({ params }) {
    const { id } = await params;
    const meldung = await getMeldungById(id);

    if (!meldung) {
        notFound();
    }

    return (
        <Fragment>
            <div className="rounded-lg p-3 md:p-0">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-2xl font-semibold mb-2">
                            #{meldung.meldung_id} - {meldung.titel}
                        </h1>
                        <div className="text-gray-500">
                            {new Date(meldung.datum).toLocaleDateString('de-DE', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric'
                            })}
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <StatusBadge status={meldung.status} />
                    </div>
                </div>

                <hr className="border-gray-200 mb-4 w-full" />

                <div className="grid grid-cols-1 gap-6 mb-4">
                    <div>
                        <dl className="grid grid-cols-[120px_1fr] gap-2">
                            <dt className="text-gray-600">Fach:</dt>
                            <dd>{meldung.fach}</dd>
                            <dt className="text-gray-600">Modul:</dt>
                            <dd>{meldung.modul}</dd>
                            <dt className="text-gray-600">Quelle:</dt>
                            <dd>{meldung.quelle}</dd>
                            <dt className="text-gray-600">Typ:</dt>
                            <dd>{meldung.typ}</dd>
                            <dt className="text-gray-600">Verantwortlich:</dt>
                            <dd className="whitespace-nowrap">{meldung.verantwortlicher_name}</dd>
                        </dl>
                    </div>
                </div>

                <div>
                    <hr className="border-gray-200 mb-5" />
                    <div className="bg-white rounded p-4 whitespace-pre-wrap">
                        {meldung.beschreibung}
                    </div>
                </div>
                
                <div className="flex justify-end mt-5 gap-4">
                    <Link href="/dashboard">
                        <Button>Zurück</Button>
                    </Link>
                    <StatusDropdown currentStatus={meldung.status} meldungId={meldung.meldung_id} />
                </div>
            </div>
        </Fragment>
    );
}