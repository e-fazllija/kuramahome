/**
 * Trasforma una stringa in Title Case (prima lettera maiuscola per ogni parola)
 * Esempio: "mario rossi" -> "Mario Rossi"
 * 
 * @param text - Il testo da trasformare
 * @returns Il testo con la prima lettera maiuscola per ogni parola
 */
export function toTitleCase(text: string): string {
  if (!text || typeof text !== 'string') {
    return text;
  }
  
  return text
    .toLowerCase()
    .split(' ')
    .map(word => {
      if (word.length === 0) return word;
      // Gestisce anche le parole con apostrofi (es: "d'italia" -> "D'Italia")
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ')
    .trim();
}

/**
 * Trasforma solo la prima lettera di una stringa in maiuscola
 * Esempio: "mario rossi" -> "Mario rossi"
 * 
 * @param text - Il testo da trasformare
 * @returns Il testo con solo la prima lettera maiuscola
 */
export function capitalize(text: string): string {
  if (!text || typeof text !== 'string') {
    return text;
  }
  
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

/**
 * Trasforma un testo in Title Case, ma preserva alcuni caratteri speciali e parole comuni
 * Utile per indirizzi, nomi di città, ecc.
 * 
 * @param text - Il testo da trasformare
 * @returns Il testo formattato
 */
export function smartTitleCase(text: string): string {
  if (!text || typeof text !== 'string') {
    return text;
  }
  
  // Parole che dovrebbero rimanere minuscole (preposizioni, articoli, ecc.)
  const lowercaseWords = ['di', 'da', 'del', 'della', 'dei', 'delle', 'in', 'su', 'per', 'con', 'e', 'o', 'la', 'le', 'il', 'lo', 'gli'];
  
  return text
    .toLowerCase()
    .split(' ')
    .map((word, index) => {
      if (word.length === 0) return word;
      
      // La prima parola è sempre maiuscola
      if (index === 0) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      
      // Se è una preposizione/articolo, resta minuscola
      if (lowercaseWords.includes(word.toLowerCase())) {
        return word.toLowerCase();
      }
      
      // Altrimenti prima lettera maiuscola
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ')
    .trim();
}


