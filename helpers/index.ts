/**
 * Formater le prix
 * @param price 
 * @returns 
 */
export const priceFormat = (price: number) => {
    
    let priceFormat = price.toLocaleString('fr-FR', {style:'currency', currency: 'XOF'});

    priceFormat = priceFormat.replace(/,00\s/, '');

    return priceFormat;
}