import RedirectButton from '@/app/ui/dashboard/neue-meldung-button';



export default function Dashboard() {


  return (
    <div>
      <div className="flex justify-end mb-4">
        <RedirectButton />
      </div>


      <div className="overflow-x-auto rounded-lg border-light-grey">
        <table className="min-w-full border-collapse border">
          <thead>
            <tr className="bg-light-grey">
              <th className="px-6 py-3 text-left text-sm font-medium">Spalte 1</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Spalte 2</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Spalte 3</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            <tr>
              <td className="px-6 py-4 border-b border-light-grey text-sm" colSpan="3">
                <div>
                  <div className="flex justify-between">
                    <div>Meldung 1 - Titel</div>
                    <div>Status</div>
                  </div>
                  <div className="text-gray-500 text-xs">Zusätzliche Information</div>
                </div>
              </td>
            </tr>

            <tr>
              <td className="px-6 py-4 border-b border-light-grey text-sm">Meldung 2</td>
              <td className="px-6 py-4 border-b border-light-grey text-sm">Titel</td>
              <td className="px-6 py-4 border-b border-light-grey text-sm">Status</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}