import RedirectButton from '@/app/ui/dashboard/redirect-button';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

export default function Dashboard() {

  

  return (
    <div>
        <RedirectButton />

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
              <td className="px-6 py-4 border-b border-gray-200 text-sm">Daten 1</td>
              <td className="px-6 py-4 border-b border-gray-200 text-sm">Daten 2</td>
              <td className="px-6 py-4 border-b border-gray-200 text-sm">Daten 3</td>
            </tr>
            <tr>
              <td className="px-6 py-4 border-b border-gray-200 text-sm">Daten 4</td>
              <td className="px-6 py-4 border-b border-gray-200 text-sm">Daten 5</td>
              <td className="px-6 py-4 border-b border-gray-200 text-sm">Daten 6</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}
