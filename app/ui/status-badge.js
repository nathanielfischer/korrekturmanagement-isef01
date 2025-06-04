/**
 * Status-Badge-Komponente mit farbkodierter Darstellung
 * Zeigt den Status einer Meldung mit entsprechenden Farben an
 */

/**
 * Zeigt einen Status als farbiges Badge an
 * @param {Object} props - Komponenten-Props
 * @param {string} props.status - Status-Text ("Offen", "In Bearbeitung", "Erledigt", "Abgelehnt")
 * @returns {JSX.Element} Farbiges Badge mit Status-Text
 */
export default function StatusBadge({ status }) {
    /**
     * Bestimmt die CSS-Klassen basierend auf dem Status
     * @param {string} status - Status-Wert
     * @returns {string} Tailwind CSS-Klassen für Hintergrund und Text
     */
    const getStatusStyles = (status) => {
        switch (status) {
            case "Offen":
                return "bg-yellow-500 text-black"; // Gelb für offene Meldungen
            case "In Bearbeitung":
                return "bg-blue-500 text-white"; // Blau für laufende Bearbeitung
            case "Erledigt":
                return "bg-green-500 text-white"; // Grün für erledigte Meldungen
            case "Abgelehnt":
                return "bg-red-500 text-white"; // Rot für abgelehnte Meldungen
            default:
                return "bg-gray-300 text-black"; // Grau als Fallback
        }
    };

    return (
        <span
            className={`px-3 py-1 md:px-4 md:py-3 rounded-full text-sm font-medium ${getStatusStyles(
                status
            )}`}
        >
            {status}
        </span>
    );
}