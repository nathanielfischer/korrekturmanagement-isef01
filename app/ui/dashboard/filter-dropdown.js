'use client';

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
