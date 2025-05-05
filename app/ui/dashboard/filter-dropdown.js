'use client';

/**
 * Eine Dropdown-Komponente für Filteroptionen
 * @param {Object} props - Die Komponenten-Props
 * @param {string} props.heading - Die Überschrift/Label für das Dropdown
 * @param {string[]} props.filterArray - Array mit den Filteroptionen
 * @param {string} props.currentValue - Der aktuelle Wert des Dropdowns
 * @param {function} props.onFilterChange - Callback-Funktion, die aufgerufen wird, wenn sich der Filter ändert
 * @returns {JSX.Element} Eine Select-Komponente mit Filteroptionen
 */
export default function FilterDropdown({ heading, filterArray, currentValue, onFilterChange }) {
  return (
    <select
      id={heading}
      name={heading}
      className="px-2 py-1 text-sm"
      value={currentValue || 'DEFAULT'}
      onChange={(e) => onFilterChange(heading, e.target.value)}
    >
      <option value="DEFAULT" disabled hidden>{heading}</option>
      <option value="">Alle</option>
      {filterArray?.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}
