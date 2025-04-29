export default function StatusBadge({ status }) {
    const getStatusStyles = (status) => {
        switch (status) {
            case "Offen":
                return "bg-yellow-500 text-black";
            case "In Bearbeitung":
                return "bg-blue-500 text-white";
            case "Erledigt":
                return "bg-green-500 text-white";
            case "Abgelehnt":
                return "bg-red-500 text-white";
            default:
                return "bg-gray-300 text-black";
        }
    };

    return (
        <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyles(
                status
            )}`}
        >
            {status}
        </span>
    );
}