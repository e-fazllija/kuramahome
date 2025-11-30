import type { RealEstateProperty } from "./properties";
import type { User } from "@/stores/auth";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface AgentData {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
}

interface FlyerOptions {
  property: RealEstateProperty;
  currentUser: User;
  availableUsers?: User[];
}

export interface FlyerData {
  property: RealEstateProperty;
  mainPhoto?: { Url: string; Id: number };
  secondPhoto?: { Url: string; Id: number };
  agentData: AgentData;
  priceText: string;
  priceReducedText?: string;
  propertyCode: string;
  fullAddress: string;
  description: string;
  features: string[];
  detailCards: Array<{ icon: string; value: string }>;
}

/**
 * Utility per escapare HTML e prevenire XSS
 */
const escapeHtml = (text: string | number | undefined | null): string => {
  if (text === null || text === undefined) return '';
  const str = String(text);
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return str.replace(/[&<>"']/g, (m) => map[m]);
};

/**
 * Genera i dati dell'agente per la locandina
 */
const getAgentData = (
  property: RealEstateProperty,
  currentUser: User,
  availableUsers: User[] = []
): AgentData => {
  const agent = property.User || availableUsers.find((u: User) => u.Id === property.AgentId);
  
  // Cerca l'agenzia di riferimento dell'agente (AdminId punta all'agenzia)
  let agencyAddress = '';
  let agencyCity = '';
  
  if (agent?.AdminId) {
    const agency = availableUsers.find((u: User) => u.Id === agent.AdminId && u.Role === 'Agency');
    if (agency) {
      agencyAddress = agency.Address || '';
      agencyCity = agency.City || '';
    }
  }
  
  return {
    name: agent
      ? `${agent.FirstName || ''} ${agent.LastName || ''}`.trim()
      : currentUser?.FirstName && currentUser?.LastName
      ? `${currentUser.FirstName} ${currentUser.LastName}`
      : '',
    phone: agent?.MobilePhone?.toString() || agent?.PhoneNumber?.toString() || currentUser?.MobilePhone?.toString() || currentUser?.PhoneNumber?.toString() || '',
    email: agent?.Email || currentUser?.Email || '',
    address: agencyAddress || agent?.Address || currentUser?.Address || '',
    city: agencyCity || agent?.City || currentUser?.City || '',
  };
};

/**
 * Prepara tutti i dati necessari per la locandina
 */
export const prepareFlyerData = (options: FlyerOptions): FlyerData => {
  const { property, currentUser, availableUsers = [] } = options;

  // Ordina le foto secondo il campo Position (ordine di visualizzazione)
  // Se Position non è disponibile, usa l'Id come fallback
  const sortedPhotos = property.Photos
    ? [...property.Photos].sort((a, b) => {
        const posA = (a as any).Position !== undefined ? (a as any).Position : (a.Id || 0);
        const posB = (b as any).Position !== undefined ? (b as any).Position : (b.Id || 0);
        return posA - posB;
      })
    : [];
  
  // Ottieni le foto (almeno 2: prima e seconda secondo l'ordine di visualizzazione)
  const mainPhoto = sortedPhotos[0] || null;
  const secondPhoto = sortedPhotos[1] || sortedPhotos[0] || null;

  // Dati agente
  const agentData = getAgentData(property, currentUser, availableUsers);

  // Formatta il prezzo
  const priceText =
    property.Price === -1 || property.Price === 0
      ? 'Trattativa riservata'
      : `€ ${property.Price.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  // Formatta il prezzo ribassato (se presente)
  const priceReducedText =
    property.PriceReduced && property.PriceReduced > 0 && property.PriceReduced !== property.Price
      ? `€ ${property.PriceReduced.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      : undefined;

  // Codice immobile
  const propertyCode = property.Id ? property.Id.toString().padStart(5, '0') : '';

  // Indirizzo completo
  const fullAddress = [property.AddressLine, property.Location, property.City, property.State, property.PostCode]
    .filter(Boolean)
    .join(', ');

  // Descrizione troncata (primi 500 caratteri)
  const description = property.Description?.substring(0, 500) || '';

  // Caratteristiche principali
  const features: string[] = [];
  if (property.CommercialSurfaceate) features.push(`${property.CommercialSurfaceate} m²`);
  if (property.Bedrooms) features.push(`${property.Bedrooms} camere`);
  if (property.Bathrooms) features.push(`${property.Bathrooms} bagni`);
  if (property.ParkingSpaces) features.push(`${property.ParkingSpaces} posti auto`);
  if (property.MQGarden) features.push(`Giardino ${property.MQGarden} m²`);

  // Dettagli in formato card con icone - ordine fisso: metriquadri, camere, bagni, posti auto, riscaldamento, classe energetica
  const detailCards: Array<{ icon: string; value: string }> = [];
  
  // 1. Metriquadri
  detailCards.push({
    icon: 'size',
    value: property.CommercialSurfaceate ? `${property.CommercialSurfaceate} m²` : 'N/D'
  });
  
  // 2. Camere
  detailCards.push({
    icon: 'home-2',
    value: property.Bedrooms ? `${property.Bedrooms} camere` : 'N/D'
  });
  
  // 3. Bagni
  detailCards.push({
    icon: 'drop',
    value: property.Bathrooms ? `${property.Bathrooms} bagni` : 'N/D'
  });
  
  // 4. Posti auto
  detailCards.push({
    icon: 'car',
    value: property.ParkingSpaces ? `${property.ParkingSpaces} posti auto` : 'N/D'
  });
  
  // 5. Riscaldamento
  detailCards.push({
    icon: 'thermometer',
    value: property.Heating || 'N/D'
  });
  
  // 6. Classe energetica
  detailCards.push({
    icon: 'sun',
    value: property.EnergyClass ? `Classe ${property.EnergyClass}` : 'N/D'
  });

  return {
    property,
    mainPhoto: mainPhoto ? { Url: mainPhoto.Url, Id: mainPhoto.Id } : undefined,
    secondPhoto: secondPhoto && secondPhoto.Url !== mainPhoto?.Url ? { Url: secondPhoto.Url, Id: secondPhoto.Id } : undefined,
    agentData,
    priceText,
    priceReducedText,
    propertyCode,
    fullAddress,
    description: description + (property.Description && property.Description.length > 500 ? '...' : ''),
    features,
    detailCards,
  };
};

/**
 * CSS per la locandina (da usare nella pagina Vue)
 */
export const flyerStyles = `
  .property-flyer-container {
    display: flex;
    flex-direction: column;
    width: 210mm;
    min-height: 297mm;
    margin: 0 auto;
    background: white;
    color: #333;
    line-height: 1.6;
    font-family: 'Arial', sans-serif;
  }

  .property-flyer-header {
    position: relative;
    width: 100%;
    height: 140mm;
    overflow: hidden;
  }

  .property-flyer-header img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .property-flyer-badge {
    position: absolute;
    top: 10mm;
    left: 10mm;
    background: rgba(0, 119, 204, 0.9);
    color: white;
    padding: 8px 16px;
    border-radius: 4px;
    font-weight: bold;
    font-size: 14pt;
  }

  .property-flyer-price {
    position: absolute;
    bottom: 10mm;
    right: 10mm;
    background: rgba(255, 255, 255, 0.95);
    padding: 12px 24px;
    border-radius: 4px;
    font-size: 24pt;
    font-weight: bold;
    color: #0077CC;
  }

  .property-flyer-content {
    padding: 10mm 15mm;
    flex: 1;
  }

  .property-flyer-title {
    font-size: 22pt;
    font-weight: bold;
    color: #333;
    margin-bottom: 8px;
    line-height: 1.2;
  }

  .property-flyer-code {
    font-size: 12pt;
    color: #666;
    margin-bottom: 8px;
  }

  .property-flyer-address {
    font-size: 14pt;
    color: #333;
    margin-bottom: 12px;
  }

  .property-flyer-description {
    font-size: 11pt;
    color: #555;
    margin-bottom: 15mm;
    text-align: justify;
  }

  .property-flyer-details-section {
    display: flex;
    gap: 10mm;
    margin-bottom: 10mm;
  }

  .property-flyer-second-photo {
    width: 80mm;
    height: 60mm;
    object-fit: cover;
    border-radius: 4px;
    flex-shrink: 0;
  }

  .property-flyer-details {
    flex: 1;
  }

  .property-flyer-details h3 {
    font-size: 14pt;
    font-weight: bold;
    color: #333;
    margin-bottom: 8px;
    border-bottom: 2px solid #0077CC;
    padding-bottom: 4px;
  }

  .property-flyer-features {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
    font-size: 11pt;
  }

  .property-flyer-feature {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .property-flyer-footer {
    padding: 8mm 15mm;
    background: #f5f5f5;
    border-top: 3px solid #0077CC;
    margin-top: auto;
  }

  .property-flyer-footer-title {
    font-size: 14pt;
    font-weight: bold;
    color: #333;
    margin-bottom: 8px;
  }

  .property-flyer-footer-info {
    font-size: 11pt;
    color: #555;
    line-height: 1.8;
  }

  @media print {
    @page {
      size: A4;
      margin: 0;
    }

    body {
      width: 210mm;
      margin: 0;
    }

    .property-flyer-container {
      page-break-inside: avoid;
    }

    .no-print {
      display: none !important;
    }
  }
`;

/**
 * Genera HTML completo per la stampa (per retrocompatibilità)
 */
export const generateFlyerHTML = (options: FlyerOptions): string => {
  const flyerData = prepareFlyerData(options);
  const { property, mainPhoto, secondPhoto, agentData, priceText, propertyCode, fullAddress, description, features } = flyerData;

  return `
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Locandina Immobile ${propertyCode}</title>
  <style>${flyerStyles}</style>
</head>
<body>
  <div class="property-flyer-container" id="flyer-content">
    <div class="property-flyer-header">
      ${mainPhoto
        ? `<img src="${escapeHtml(mainPhoto.Url)}" alt="${escapeHtml(property.Title || 'Immobile')}" onerror="this.style.display='none'">`
        : '<div style="background: #e0e0e0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: #999;">Nessuna foto disponibile</div>'}
      <div class="property-flyer-badge">${escapeHtml(property.Status || 'Vendita')}</div>
      <div class="property-flyer-price">${escapeHtml(priceText)}</div>
    </div>
    
    <div class="property-flyer-content">
      <h1 class="property-flyer-title">${escapeHtml(property.Title || 'Immobile')}</h1>
      ${propertyCode ? `<div class="property-flyer-code">Codice: ${propertyCode}</div>` : ''}
      ${fullAddress ? `<div class="property-flyer-address">📍 ${escapeHtml(fullAddress)}</div>` : ''}
      
      ${description ? `<div class="property-flyer-description">${escapeHtml(description)}</div>` : ''}
      
      <div class="property-flyer-details-section">
        ${secondPhoto
          ? `<img src="${escapeHtml(secondPhoto.Url)}" alt="Foto immobile" class="property-flyer-second-photo" onerror="this.style.display='none'">`
          : ''}
        <div class="property-flyer-details">
          <h3>Dettagli</h3>
          <div class="property-flyer-features">
            ${features.length > 0 ? features.map(f => `<div class="property-flyer-feature">• ${escapeHtml(f)}</div>`).join('') : ''}
            ${property.Category ? `<div class="property-flyer-feature">• Categoria: ${escapeHtml(property.Category)}</div>` : ''}
            ${property.Typology ? `<div class="property-flyer-feature">• Tipologia: ${escapeHtml(property.Typology)}</div>` : ''}
            ${property.EnergyClass ? `<div class="property-flyer-feature">• Classe energetica: ${escapeHtml(property.EnergyClass)}</div>` : ''}
            ${property.StateOfTheProperty ? `<div class="property-flyer-feature">• Stato: ${escapeHtml(property.StateOfTheProperty)}</div>` : ''}
            ${property.YearOfConstruction ? `<div class="property-flyer-feature">• Anno costruzione: ${property.YearOfConstruction}</div>` : ''}
          </div>
        </div>
      </div>
    </div>
    
    <div class="property-flyer-footer">
      ${agentData.name ? `<div class="property-flyer-footer-title">${escapeHtml(agentData.name)}</div>` : ''}
      <div class="property-flyer-footer-info">
        ${agentData.address && agentData.city ? `${escapeHtml(agentData.address)}, ${escapeHtml(agentData.city)}<br>` : ''}
        ${agentData.phone ? `📞 ${escapeHtml(agentData.phone)}<br>` : ''}
        ${agentData.email ? `✉️ ${escapeHtml(agentData.email)}` : ''}
      </div>
    </div>
  </div>
</body>
</html>
  `;
};

/**
 * Apre la locandina in una nuova finestra per la stampa
 */
export const printFlyer = (options: FlyerOptions): void => {
  const flyerHtml = generateFlyerHTML(options);

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    throw new Error('Impossibile aprire la finestra di stampa. Permetti i popup nel browser.');
  }

  printWindow.document.write(flyerHtml);
  printWindow.document.close();

  // Attendi il caricamento delle immagini prima di stampare
  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 500);
  };
};

/**
 * Converte un'immagine in base64 usando fetch (più affidabile per CORS)
 */
const imageToBase64 = async (url: string): Promise<string> => {
  try {
    // Prova prima con fetch usando 'no-cors' per evitare problemi CORS con storage locale
    let response: Response;
    try {
      response = await fetch(url, {
        mode: 'no-cors', // Per storage locale che potrebbe non avere CORS
        credentials: 'omit',
      });
      
      if (!response.ok && response.type !== 'opaque') {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (fetchError) {
      // Se no-cors non funziona, prova con cors
      try {
        response = await fetch(url, {
          mode: 'cors',
          credentials: 'include', // Include credenziali per storage autenticato
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (corsError) {
        // Se anche CORS fallisce, usa canvas
        throw new Error('Fetch fallito, userò canvas');
      }
    }
    
    const blob = await response.blob();
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        if (base64String && base64String.startsWith('data:')) {
          resolve(base64String);
        } else {
          throw new Error('FileReader non ha restituito un data URL valido');
        }
      };
      reader.onerror = () => {
        reject(new Error('Errore nella lettura del blob'));
      };
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.warn('Errore nel fetch dell\'immagine, provo con canvas:', url, error);
    
    // Fallback: usa canvas con l'immagine già caricata nel DOM
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      let resolved = false;
      
      img.onload = () => {
        if (resolved) return;
        resolved = true;
        
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Impossibile creare contesto canvas'));
            return;
          }
          ctx.drawImage(img, 0, 0);
          const base64 = canvas.toDataURL('image/png');
          
          // Verifica che non sia tainted
          if (!base64 || base64.length < 100) {
            reject(new Error('Canvas risultante vuoto o tainted'));
            return;
          }
          
          resolve(base64);
        } catch (canvasError) {
          reject(canvasError);
        }
      };
      
      img.onerror = () => {
        if (resolved) return;
        resolved = true;
        reject(new Error(`Errore nel caricamento dell'immagine: ${url}`));
      };
      
      // Prova prima senza crossOrigin, poi con
      img.src = url;
      
      // Timeout dopo 10 secondi
      setTimeout(() => {
        if (!resolved) {
          resolved = true;
          reject(new Error(`Timeout nel caricamento dell'immagine: ${url}`));
        }
      }, 10000);
    });
  }
};

/**
 * Converte un'immagine già caricata nel DOM in base64 (evita problemi CORS)
 */
const convertLoadedImageToBase64 = (img: HTMLImageElement): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Impossibile creare contesto canvas'));
        return;
      }
      
      ctx.drawImage(img, 0, 0);
      const base64 = canvas.toDataURL('image/png');
      
      if (base64 && base64.startsWith('data:')) {
        resolve(base64);
      } else {
        reject(new Error('Canvas risultante non valido'));
      }
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Converte le immagini usando quelle originali già caricate nel DOM
 * Questo evita problemi di CORS perché le immagini sono già caricate
 */
const convertImagesToBase64UsingOriginal = async (
  element: HTMLElement,
  originalImages: Map<string, HTMLImageElement>
): Promise<void> => {
  const images = element.querySelectorAll('img');
  const conversionPromises: Promise<void>[] = [];
  
  console.log(`Trovate ${images.length} immagini da convertire usando immagini originali`);
  
  for (const img of Array.from(images)) {
    const src = img.getAttribute('src') || img.src || '';
    if (!src || src.startsWith('data:') || src.startsWith('blob:')) {
      console.log(`Immagine già in base64: ${src.substring(0, 50)}...`);
      continue;
    }
    
    console.log(`Tentativo conversione: ${src.substring(0, 80)}...`);
    
    // Usa l'immagine originale già caricata se disponibile
    const originalImg = originalImages.get(src);
    
    const promise = (originalImg && originalImg.complete && originalImg.naturalWidth > 0)
      ? convertLoadedImageToBase64(originalImg)
          .then((base64) => {
            console.log(`✓ Conversione riuscita usando immagine originale: ${src.substring(0, 50)}...`);
            img.src = base64;
            img.setAttribute('src', base64);
            img.crossOrigin = 'anonymous';
            
            // Attendi che l'immagine base64 sia caricata
            return new Promise<void>((resolve) => {
              if (img.complete) {
                resolve();
              } else {
                const timeout = setTimeout(() => resolve(), 2000);
                img.onload = () => {
                  clearTimeout(timeout);
                  resolve();
                };
                img.onerror = () => {
                  clearTimeout(timeout);
                  resolve();
                };
              }
            });
          })
          .catch((error) => {
            console.error(`✗ Errore conversione usando originale: ${src.substring(0, 50)}...`, error);
            // Fallback: prova con imageToBase64
            return imageToBase64(src).then((base64) => {
              if (base64 && base64.startsWith('data:')) {
                img.src = base64;
                img.setAttribute('src', base64);
              }
            });
          })
      : imageToBase64(src)
          .then((base64) => {
            if (base64 && base64.startsWith('data:')) {
              console.log(`✓ Conversione riuscita: ${src.substring(0, 50)}...`);
              img.src = base64;
              img.setAttribute('src', base64);
              img.crossOrigin = 'anonymous';
              
              return new Promise<void>((resolve) => {
                if (img.complete) {
                  resolve();
                } else {
                  const timeout = setTimeout(() => resolve(), 5000);
                  img.onload = () => {
                    clearTimeout(timeout);
                    resolve();
                  };
                  img.onerror = () => {
                    clearTimeout(timeout);
                    resolve();
                  };
                }
              });
            } else {
              console.error(`✗ Conversione fallita: ${src.substring(0, 50)}...`);
            }
          })
          .catch((error) => {
            console.error(`✗ Errore conversione: ${src.substring(0, 50)}...`, error);
          });
    
    conversionPromises.push(promise);
  }
  
  await Promise.all(conversionPromises);
  await new Promise(resolve => setTimeout(resolve, 1000));
};

/**
 * Attende che tutte le immagini siano caricate
 */
const waitForImages = (element: HTMLElement): Promise<void> => {
  const images = element.querySelectorAll('img');
  const imagePromises: Promise<void>[] = [];
  
  images.forEach((img) => {
    if (img.complete && img.naturalHeight !== 0) {
      // Immagine già caricata
      return;
    }
    
    const promise = new Promise<void>((resolve) => {
      img.onload = () => resolve();
      img.onerror = () => resolve(); // Continua anche se fallisce
      // Timeout dopo 10 secondi
      setTimeout(() => resolve(), 10000);
    });
    imagePromises.push(promise);
  });
  
  return Promise.all(imagePromises).then(() => {});
};

/**
 * Converte tutte le immagini dell'elemento in base64
 * IMPORTANTE: Sostituisce direttamente l'attributo src
 */
const convertImagesToBase64 = async (element: HTMLElement): Promise<void> => {
  const images = element.querySelectorAll('img');
  const conversionResults: Array<{success: boolean; src: string; error?: string}> = [];
  const conversionPromises: Promise<void>[] = [];
  
  console.log(`Trovate ${images.length} immagini da convertire`);
  
  for (const img of Array.from(images)) {
    const src = img.getAttribute('src') || img.src || '';
    if (!src || src.startsWith('data:') || src.startsWith('blob:')) {
      console.log(`Immagine già in base64 o vuota: ${src.substring(0, 50)}...`);
      continue; // Già in base64 o blob o vuoto
    }
    
    console.log(`Tentativo conversione immagine: ${src.substring(0, 80)}...`);
    
    const promise = imageToBase64(src)
      .then((base64) => {
        // Verifica che la conversione sia riuscita
        if (base64 && base64.startsWith('data:')) {
          console.log(`✓ Conversione riuscita: ${src.substring(0, 50)}... -> base64 (${base64.length} caratteri)`);
          
          // Sostituisci l'attributo src direttamente
          img.src = base64;
          img.setAttribute('src', base64);
          img.crossOrigin = 'anonymous';
          
          // Attendi che la nuova immagine sia caricata
          return new Promise<void>((resolve) => {
            if (img.complete && img.naturalWidth > 0) {
              conversionResults.push({success: true, src: src});
              resolve();
            } else {
              const timeout = setTimeout(() => {
                conversionResults.push({success: true, src: src}); // Consideriamo comunque successo
                resolve();
              }, 10000);
              
              img.onload = () => {
                clearTimeout(timeout);
                conversionResults.push({success: true, src: src});
                resolve();
              };
              
              img.onerror = () => {
                clearTimeout(timeout);
                conversionResults.push({success: false, src: src, error: 'Errore nel caricamento dopo conversione'});
                resolve();
              };
            }
          });
        } else {
          // La conversione è fallita, base64 contiene ancora l'URL originale
          console.error(`✗ Conversione fallita per: ${src.substring(0, 50)}..., risultato: ${base64 ? base64.substring(0, 50) + '...' : 'null'}`);
          conversionResults.push({success: false, src: src, error: 'Conversione fallita, URL non convertito'});
        }
      })
      .catch((error) => {
        const errorMsg = error instanceof Error ? error.message : String(error);
        console.error(`✗ Errore nella conversione: ${src.substring(0, 50)}...`, errorMsg);
        conversionResults.push({success: false, src: src, error: errorMsg});
      });
    
    conversionPromises.push(promise);
  }
  
  // Attendi che tutte le conversioni siano complete
  await Promise.all(conversionPromises);
  
  // Log dei risultati
  const failed = conversionResults.filter(r => !r.success);
  const success = conversionResults.filter(r => r.success);
  console.log(`Conversioni completate: ${success.length} riuscite, ${failed.length} fallite`);
  if (failed.length > 0) {
    console.error('Immagini non convertite:', failed.map(f => ({src: f.src.substring(0, 80), error: f.error})));
  }
  
  // Aspetta che le immagini convertite vengano caricate nel DOM
  await new Promise(resolve => setTimeout(resolve, 1000));
};

/**
 * Genera il PDF della locandina e lo apre per la stampa
 */
export const printFlyerPDF = async (elementId: string = 'flyer-content'): Promise<void> => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Elemento con id "${elementId}" non trovato`);
  }

  try {
    // Clona l'elemento per non modificare quello originale
    const clonedElement = element.cloneNode(true) as HTMLElement;
    clonedElement.style.position = 'absolute';
    clonedElement.style.left = '-9999px';
    clonedElement.style.top = '0';
    document.body.appendChild(clonedElement);
    
    try {
      // Attendi che tutte le immagini siano caricate prima di generare il canvas
      console.log('Attendo il caricamento delle immagini...');
      await waitForImages(clonedElement);
      console.log('Immagini caricate');
      
      // Aspetta che tutto sia renderizzato
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Converte HTML in canvas
      // Usiamo allowTaint: true per permettere immagini cross-origin
      // Poi useremo toBlob() invece di toDataURL() per gestire il canvas tainted
      console.log('Generazione canvas con html2canvas...');
      const canvas = await html2canvas(clonedElement, {
        scale: 2,
        useCORS: true, // Prova a usare CORS se disponibile
        logging: false,
        backgroundColor: '#ffffff',
        allowTaint: true, // Permettiamo taint per immagini cross-origin, useremo toBlob()
        removeContainer: true,
        imageTimeout: 15000,
        foreignObjectRendering: false,
      });
      
      console.log('Canvas generato:', {
        width: canvas.width,
        height: canvas.height,
      });
      
      // Rimuovi il clone
      document.body.removeChild(clonedElement);
      
      // Converte il canvas in base64, gestendo il caso di canvas tainted
      let imgData: string;
      try {
        // Prova prima con toDataURL (funziona se il canvas non è tainted)
        imgData = canvas.toDataURL('image/png');
        console.log('Canvas convertito in base64 con toDataURL');
      } catch (taintedError) {
        // Se il canvas è tainted, usa toBlob() invece
        console.warn('Canvas tainted, uso toBlob() per convertire...');
        try {
          const blob = await new Promise<Blob>((resolve, reject) => {
            canvas.toBlob((blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error('toBlob restituito null'));
              }
            }, 'image/png', 1.0);
          });
          
          // Converti blob in base64 usando FileReader
          imgData = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              const result = reader.result as string;
              if (result && result.startsWith('data:')) {
                resolve(result);
              } else {
                reject(new Error('FileReader non ha restituito un data URL valido'));
              }
            };
            reader.onerror = () => reject(new Error('Errore nella lettura del blob'));
            reader.readAsDataURL(blob);
          });
          
          console.log('Canvas convertito in base64 usando toBlob()');
        } catch (blobError) {
          throw new Error(`Impossibile esportare il canvas. Le immagini potrebbero avere problemi di CORS. Errore: ${blobError instanceof Error ? blobError.message : String(blobError)}`);
        }
      }
      
      // Crea PDF - Dimensioni A4 (singola pagina)
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      
      // Calcola le dimensioni dell'immagine mantenendo le proporzioni
      const imgAspectRatio = canvas.width / canvas.height;
      let finalWidth = pageWidth;
      let finalHeight = pageHeight;
      
      // Scala l'immagine per adattarsi all'intera pagina A4
      // Mantiene le proporzioni e si adatta all'altezza della pagina
      const widthToFitHeight = pageHeight * imgAspectRatio;
      const heightToFitWidth = pageWidth / imgAspectRatio;
      
      if (widthToFitHeight <= pageWidth) {
        // L'immagine si adatta per altezza
        finalWidth = widthToFitHeight;
        finalHeight = pageHeight;
      } else {
        // L'immagine si adatta per larghezza
        finalWidth = pageWidth;
        finalHeight = heightToFitWidth;
      }
      
      // Centra l'immagine nella pagina
      const xOffset = (pageWidth - finalWidth) / 2;
      const yOffset = (pageHeight - finalHeight) / 2;
      
      // Aggiungi l'immagine scalata a una singola pagina A4
      pdf.addImage(imgData, 'PNG', xOffset, yOffset, finalWidth, finalHeight);

      // Genera blob del PDF
      const pdfBlob = pdf.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      
      // Apri il PDF in una nuova finestra
      const printWindow = window.open(pdfUrl, '_blank');
      
      if (!printWindow) {
        URL.revokeObjectURL(pdfUrl);
        throw new Error('Impossibile aprire la finestra di stampa. Permetti i popup nel browser.');
      }

      // Attendi che il PDF sia caricato e apri il dialogo di stampa
      // Nota: window.print() potrebbe non funzionare automaticamente su tutti i browser
      // L'utente potrebbe dover stampare manualmente dalla finestra aperta
      const attemptPrint = () => {
        try {
          printWindow.focus();
          // Prova a stampare dopo un breve delay per permettere il caricamento
          setTimeout(() => {
            try {
              printWindow.print();
            } catch (printError) {
              // Se print() non funziona, l'utente dovrà stampare manualmente
              console.warn('Impossibile aprire automaticamente il dialogo di stampa. Stampa manualmente dalla finestra aperta.');
            }
          }, 1000);
        } catch (error) {
          console.warn('Errore durante il tentativo di stampa automatica:', error);
        }
      };

      // Prova la stampa quando la finestra è pronta
      if (printWindow.document) {
        printWindow.document.addEventListener('load', attemptPrint);
      }
      
      // Fallback: prova comunque dopo un delay
      setTimeout(attemptPrint, 1500);
      
      // Pulisci l'URL object dopo un po' (dopo che il PDF è stato caricato)
      setTimeout(() => {
        URL.revokeObjectURL(pdfUrl);
      }, 10000);
    } catch (error) {
      // Rimuovi il clone in caso di errore
      if (clonedElement.parentNode) {
        document.body.removeChild(clonedElement);
      }
      throw error;
    }
  } catch (error) {
    throw new Error(`Errore durante la generazione del PDF: ${error}`);
  }
};

/**
 * Genera e scarica il PDF della locandina
 */
export const downloadFlyerPDF = async (elementId: string = 'flyer-content'): Promise<void> => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Elemento con id "${elementId}" non trovato`);
  }

  try {
    // Clona l'elemento per non modificare quello originale
    const clonedElement = element.cloneNode(true) as HTMLElement;
    clonedElement.style.position = 'absolute';
    clonedElement.style.left = '-9999px';
    clonedElement.style.top = '0';
    clonedElement.style.width = element.offsetWidth + 'px';
    clonedElement.style.height = element.offsetHeight + 'px';
    document.body.appendChild(clonedElement);
    
    try {
      // Attendi che tutte le immagini siano caricate prima di generare il canvas
      console.log('Attendo il caricamento delle immagini...');
      await waitForImages(clonedElement);
      console.log('Immagini caricate');
      
      // Aspetta che tutto sia renderizzato
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Converte HTML in canvas
      // Usiamo allowTaint: true per permettere immagini cross-origin
      // Poi useremo toBlob() invece di toDataURL() per gestire il canvas tainted
      console.log('Generazione canvas con html2canvas...');
      const canvas = await html2canvas(clonedElement, {
        scale: 2,
        useCORS: true, // Prova a usare CORS se disponibile
        logging: false,
        backgroundColor: '#ffffff',
        allowTaint: true, // Permettiamo taint per immagini cross-origin, useremo toBlob()
        removeContainer: true,
        imageTimeout: 15000,
        foreignObjectRendering: false,
      });
      
      console.log('Canvas generato:', {
        width: canvas.width,
        height: canvas.height,
      });
      
      // Rimuovi il clone
      document.body.removeChild(clonedElement);
      
      // Converte il canvas in base64, gestendo il caso di canvas tainted
      let imgData: string;
      try {
        // Prova prima con toDataURL (funziona se il canvas non è tainted)
        imgData = canvas.toDataURL('image/png');
        console.log('Canvas convertito in base64 con toDataURL');
      } catch (taintedError) {
        // Se il canvas è tainted, usa toBlob() invece
        console.warn('Canvas tainted, uso toBlob() per convertire...');
        try {
          const blob = await new Promise<Blob>((resolve, reject) => {
            canvas.toBlob((blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error('toBlob restituito null'));
              }
            }, 'image/png', 1.0);
          });
          
          // Converti blob in base64 usando FileReader
          imgData = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              const result = reader.result as string;
              if (result && result.startsWith('data:')) {
                resolve(result);
              } else {
                reject(new Error('FileReader non ha restituito un data URL valido'));
              }
            };
            reader.onerror = () => reject(new Error('Errore nella lettura del blob'));
            reader.readAsDataURL(blob);
          });
          
          console.log('Canvas convertito in base64 usando toBlob()');
        } catch (blobError) {
          throw new Error(`Impossibile esportare il canvas. Le immagini potrebbero avere problemi di CORS. Errore: ${blobError instanceof Error ? blobError.message : String(blobError)}`);
        }
      }
      
      // Crea PDF - Dimensioni A4 (singola pagina)
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      
      // Calcola le dimensioni dell'immagine mantenendo le proporzioni
      const imgAspectRatio = canvas.width / canvas.height;
      let finalWidth = pageWidth;
      let finalHeight = pageHeight;
      
      // Scala l'immagine per adattarsi all'intera pagina A4
      // Mantiene le proporzioni e si adatta all'altezza della pagina
      const widthToFitHeight = pageHeight * imgAspectRatio;
      const heightToFitWidth = pageWidth / imgAspectRatio;
      
      if (widthToFitHeight <= pageWidth) {
        // L'immagine si adatta per altezza
        finalWidth = widthToFitHeight;
        finalHeight = pageHeight;
      } else {
        // L'immagine si adatta per larghezza
        finalWidth = pageWidth;
        finalHeight = heightToFitWidth;
      }
      
      // Centra l'immagine nella pagina
      const xOffset = (pageWidth - finalWidth) / 2;
      const yOffset = (pageHeight - finalHeight) / 2;
      
      // Aggiungi l'immagine scalata a una singola pagina A4
      pdf.addImage(imgData, 'PNG', xOffset, yOffset, finalWidth, finalHeight);

      // Scarica il PDF
      const propertyCode = element.getAttribute('data-property-code') || 'immobile';
      const propertyTitle = element.getAttribute('data-property-title') || 'Immobile';
      const fileName = `Locandina_${propertyCode}_${propertyTitle.replace(/[^a-z0-9]/gi, '_')}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      // Rimuovi il clone in caso di errore
      if (clonedElement.parentNode) {
        document.body.removeChild(clonedElement);
      }
      throw error;
    }
  } catch (error) {
    throw new Error(`Errore durante la generazione del PDF: ${error}`);
  }
};

/**
 * Genera il testo per WhatsApp
 */
export const getWhatsAppText = (options: FlyerOptions): string => {
  const { property } = options;
  const propertyCode = property.Id ? property.Id.toString().padStart(5, '0') : '';
  const priceText =
    property.Price === -1 || property.Price === 0
      ? 'Trattativa riservata'
      : `€ ${property.Price.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const fullAddress = [property.AddressLine, property.Location, property.City, property.State]
    .filter(Boolean)
    .join(', ');

  let text = `🏠 *${property.Title || 'Immobile'}*\n\n`;
  
  if (propertyCode) {
    text += `Codice: ${propertyCode}\n`;
  }
  
  if (fullAddress) {
    text += `📍 ${fullAddress}\n`;
  }
  
  text += `💰 ${priceText}\n\n`;

  if (property.CommercialSurfaceate) {
    text += `Superficie: ${property.CommercialSurfaceate} m²\n`;
  }

  if (property.Bedrooms || property.Bathrooms) {
    const parts = [];
    if (property.Bedrooms) parts.push(`${property.Bedrooms} camere`);
    if (property.Bathrooms) parts.push(`${property.Bathrooms} bagni`);
    text += parts.join(' | ') + '\n';
  }

  if (property.Description) {
    const shortDesc = property.Description.substring(0, 200);
    text += `\n${shortDesc}${property.Description.length > 200 ? '...' : ''}\n`;
  }

  return encodeURIComponent(text);
};

/**
 * Genera il testo per l'email
 */
export const getEmailText = (options: FlyerOptions): { subject: string; body: string } => {
  const { property } = options;
  const propertyCode = property.Id ? property.Id.toString().padStart(5, '0') : '';
  const propertyTitle = property.Title || 'Immobile';

  const subject = `Locandina Immobile - ${propertyTitle}`;

  const fullAddress = [property.AddressLine, property.Location, property.City, property.State]
    .filter(Boolean)
    .join(', ');

  let body = `Gentile Cliente,\n\n`;
  body += `In allegato troverai la locandina dell'immobile:\n\n`;
  body += `🏠 ${propertyTitle}\n`;
  
  if (propertyCode) {
    body += `Codice: ${propertyCode}\n`;
  }
  
  if (fullAddress) {
    body += `📍 ${fullAddress}\n`;
  }
  
  body += `\n`;
  body += `Ti prego di trovare in allegato il PDF della locandina completa.\n\n`;
  body += `Cordiali saluti`;

  return { subject, body };
};
