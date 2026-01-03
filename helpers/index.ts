/**
 * Formater le prix
 * @param price 
 * @returns 
 */
export const priceFormat = (price: number) => {
    
    let priceFormat = price.toLocaleString('fr-FR', {style:'currency', currency: 'XOF'})

    priceFormat = priceFormat.replace(/,00\s/, '')

    return priceFormat
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
