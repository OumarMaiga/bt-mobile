/**
 * Formater le prix
 * @param price 
 * @returns 
 */
export const priceFormat = (price: number) => {
    return new Intl.NumberFormat("fr-FR").format(price) + " CFA";
}

/**
 * Formater la durée en heures et minutes
 * @param secondes 
 * @returns 
 */
export function formatDuration(secondes: number): string {
    const hours = Math.floor(secondes / 3600)
    const minutes = Math.floor((secondes % 3600) / 60)
    if (hours === 0) {
        return `${minutes}m`
    }
    return `${hours}h ${minutes}m`
}

/**
 * Formater le kilometrage
 * @param distance en kilometres
 * @returns 
 */
export function formatDistance(distance: number): string {
    if (distance < 1) {
        return `${Math.round(distance * 1000)} m`
    }
    return `${distance} km`
}

/**
 * Mettre la première lettre en majuscule
 * @param value 
 * @returns 
 */
export const toFirstUpperCase = (value: string): string => {
  return value
    .trim()
    .replace(/^./, (char) => char.toUpperCase())
}

/**
 * Format phonenumber
 * @param phonenumber 
 * @returns ex: 71 12 34 56 ou +223 71 12 34 56
 */
export const formatPhoneNumber = (phonenumber: string): string => {
    const cleaned = phonenumber.replace(/\D/g, ''); // Supprimer les caractères non numériques
    let formatted = cleaned;
    if (cleaned.length === 8) {
        formatted = cleaned.replace(/(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4');
    } else if (cleaned.length === 11) {
        formatted = cleaned.replace(/(\d{3})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
    }
    return formatted;
}