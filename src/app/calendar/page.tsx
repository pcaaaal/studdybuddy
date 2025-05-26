export default function CalendarPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Calendar</h1>
            <div className="bg-white rounded shadow p-6 text-gray-700">
                <p className="mb-4">
                    Kalenderfunktionen kommen bald. In Zukunft kannst du hier Termine planen,
                    synchronisieren und Gruppenaktivitäten sehen.
                </p>
                <div className="grid grid-cols-7 gap-2 text-center text-sm">
                    {Array.from({ length: 30 }).map((_, i) => (
                        <div key={i} className="p-2 border rounded">
                            {i + 1}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
