
export const formatToISODate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mois (commence à 0)
    const day = String(date.getDate()).padStart(2, '0'); // Jour
    return `${year}-${month}-${day}`;
};


/**
 * Convertit la date de départ en une date lisible,
 * en fonction de la date de départ.
 * @param departureDate Date de départ au format ISO (ex: 2026-01-02T15:30:00.000Z)
 * @returns Date formatée (ex: "Ven 13 Jan 12:00")
 */
export function formatToStringDate(departureDate: Date) {
    const baseDate = new Date(departureDate)
    const now = new Date()
    let dateFormated: string

    // Format lisible : Ven 13 Jan 2025 12:00
    if(baseDate.getFullYear() !== now.getFullYear()) {
        dateFormated = baseDate.toLocaleDateString("fr-FR", {
            weekday: "short",
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        })
    } else {
        dateFormated = baseDate.toLocaleDateString("fr-FR", {
            weekday: "short",
            day: "2-digit",
            month: "short",
            hour: "2-digit",
            minute: "2-digit"
        })
    }
    return dateFormated;
}