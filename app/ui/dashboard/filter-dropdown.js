'use client';

/**
 * Eine Dropdown-Komponente für Filteroptionen
 * @param {Object} props - Die Komponenten-Props
 * @param {string} props.heading - Die Überschrift/Label für das Dropdown
 * @param {string[]} props.filterArray - Array mit den Filteroptionen
 * @returns {JSX.Element} Eine Select-Komponente mit Filteroptionen
 */
export default function FilterDropdown({ heading, filterArray }) {
    return (
        <select
            id={heading}
            name={heading}
            className="px-2 py-1 text-sm"
            defaultValue={'DEFAULT'}
        >
            <option value="DEFAULT" disabled hidden>{heading}</option>
            {filterArray?.map((item) => (
                <option key={item.toLowerCase()} value={item.toLowerCase()}>
                    {item}
                </option>
            ))}
        </select>
    );
}
