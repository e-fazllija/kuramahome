import ApiService from "@/core/services/ApiService";
import { useAuthStore, type User } from "@/stores/auth";
import { getRealEstateProperty, type RealEstateProperty } from "./properties";
const store = useAuthStore();

export interface RealEstatePropertyListItem {
  Id: number;
  CreationDate: string;
  UpdateDate?: string;
  Status: string;
  Auction: boolean;
  Sold: boolean;
  Town: string;
  Price: number;
  Category: string;
  Typology: string;
  AgencyId?: string;
  AddressLine?: string;
  AssignmentEnd?: string;
  CommercialSurfaceate?: number;
  Region?: string;
  StateOfTheProperty?: string;
  FirstPhotoUrl?: string;
}

export interface RealEstatePropertyListResponse {
  Data: RealEstatePropertyListItem[];
  Total: number;
}

export interface Agency {
  Id: string;
  Name: string;
  UserName: string;
  name: string; // Alias per compatibilità con il template
  id: string; // Alias per compatibilità con il template
  // Aggiungi altri campi se necessario
}

export interface AgencyListResponse {
  Data: Agency[];
  Total: number;
}

export interface Agent {
  Id: string;
  Name: string;
  LastName: string;
  Email?: string;
  PhoneNumber?: string;
  MobilePhone?: string;
  Address?: string;
  Town?: string;
  Region?: string;
  AgencyId?: string;
  Color?: string;
  CreationDate?: string;
  UpdateDate?: string;
  EmailConfirmed?: boolean;
  // Aggiungi altri campi se necessario
}

export interface Customer {
  Id: number;
  Name: string;
  LastName: string;
  CreationDate: string;
  Seller: boolean;
  Buyer: boolean;
  AgencyId?: string;
  // Aggiungi altri campi se necessario
}

export interface CustomerListResponse {
  Data: Customer[];
  Total: number;
}

export interface AgentListResponse {
  Data: Agent[];
    Total: number;
}

export interface CalendarEvent {
  Id: number;
  ApplicationUserId: string;
  NomeEvento: string;
  Type: string;
  CustomerId?: number;
  RealEstatePropertyId?: number;
  RequestId?: number;
  DescrizioneEvento?: string;
  LuogoEvento?: string;
  Color?: string;
  DataInizioEvento: string;
  DataFineEvento: string;
  Confirmed: boolean;
  Cancelled: boolean;
  Postponed: boolean;
  CreationDate?: string;
}

export interface CalendarListResponse {
  Data: CalendarEvent[];
    Total: number;
}

export interface DashboardDetails {
    RealEstatePropertyHomeDetails?: RealEstatePropertyHomeDetails;
    RequestHomeDetails?: RequestHomeDetails;
    TotalCustomers?: number;
    TotalBuyers?: number;
    TotalSellers?: number;
    TotalAgents?: number;
    TotalAppointments?: number;
    TotalConfirmedAppointments?: number;
}

export interface RealEstatePropertyHomeDetails {
    Total?: number;
    TotalSale?: number;
    TotalRent?: number;
    TotalLastMonth?: number;
    TotalCreatedPerMonth?: Object;
    DistinctByTownSale?: Object;
    DistinctByTownRent?: Object;
    DistinctByTypeSale?: Object;
    DistinctByTypeRent?: Object;
    MaxAnnual?: number;
    MinAnnual?: number;
}

export interface RequestHomeDetails {
    Total?: number;
    TotalArchived?: number;
    TotalClosed?: number;
    TotalActive?: number;
    TotalLastMonth?: number;
    TotalSale?: number;
    TotalRent?: number;
    TotalCreatedPerMonth?: Object;
    DistinctByTownSale?: Object;
    DistinctByTownRent?: Object;
    DistinctByTypeSale?: Object;
    DistinctByTypeRent?: Object;
    MaxAnnual?: number;
    MinAnnual?: number;
}

const getDetails = (agencyId?: string, year?: number): Promise<DashboardDetails> => {
    // Passa sempre agencyId, anche se vuoto, per evitare errori di validazione
    const agencyParam = agencyId || '';
    const yearParam = year ? `&year=${year}` : '';
    return ApiService.get(`Generic/GetAdminHomeDetails?agencyId=${agencyParam}${yearParam}`, "")
        .then(({ data }) => {
            const result = data as Partial<DashboardDetails>
            return result;
        })
        .catch(({ response }) => {
            store.setError(response.data.Message, response.status);
            return undefined;
        });
};

// Helper: verifica se un immobile è disponibile (in carico)
const isPropertyAvailable = (property: RealEstatePropertyListItem): boolean => {
    const now = new Date();
    const assignmentEnd = property.AssignmentEnd ? new Date(property.AssignmentEnd) : null;
    
    // Immobile disponibile se: Sold === false AND AssignmentEnd > oggi
    return property.Sold === false && assignmentEnd !== null && assignmentEnd > now;
};

const getRealEstateProperties = (agencyId?: string, year?: number): Promise<RealEstatePropertyListResponse> => {
    // Passa sempre agencyId, anche se vuoto, per evitare errori di validazione
    const agencyParam = agencyId || 'all';
    const yearParam = year ? `&year=${year}` : '';
    const url = `RealEstateProperty/GetList?currentPage=0&agencyId=${agencyParam}&filterRequest=&contract=&priceFrom=0&priceTo=0&category=&typologie=&town=${yearParam}`;
    
    // Non filtriamo per sold nell'API, lo faremo lato client considerando anche AssignmentEnd
    return ApiService.get(url, "")
        .then(({ data }) => {
            const response = data as RealEstatePropertyListResponse;
            
            // Filtra lato client per anno (se specificato) e disponibilità
            let filteredData = response.Data;
            
            // Filtro 1: Anno (basato su CreationDate)
            if (year) {
                filteredData = filteredData.filter(property => {
                    const creationDate = new Date(property.CreationDate);
                    return creationDate.getFullYear() === year;
                });
            }
            
            // Filtro 2: Disponibilità (Sold=false AND AssignmentEnd > oggi)
            filteredData = filteredData.filter(isPropertyAvailable);
            
            response.Data = filteredData;
            response.Total = response.Data.length;
            return response;
        })
        .catch(({ response }) => {
            store.setError(response.data.Message, response.status);
            return undefined;
        });
};

const getAgencies = (): Promise<AgencyListResponse> => {
    return ApiService.get(`Agencies/Get?currentPage=0&filterRequest=`, "")
        .then(({ data }) => {
            const response = data as AgencyListResponse;
            // Mappa i dati per compatibilità con il template
            response.Data = response.Data.map(agency => ({
                ...agency,
                name: agency.UserName, // Usa UserName come nome visualizzato
                id: agency.Id
            }));
            return response;
        })
        .catch(({ response }) => {
            store.setError(response.data.Message, response.status);
            return undefined;
        });
};

const getAgents = (agencyId?: string, year?: number): Promise<AgentListResponse> => {
    // Passa sempre agencyId, anche se vuoto, per evitare errori di validazione
    const agencyParam = agencyId || 'all';
    const yearParam = year ? `&year=${year}` : '';
    return ApiService.get(`Agents/Get?currentPage=0&agencyId=${agencyParam}${yearParam}`, "")
        .then(({ data }) => {
            return data as AgentListResponse;
        })
        .catch(({ response }) => {
            store.setError(response.data.Message, response.status);
            return undefined;
        });
};

const getSoldProperties = (agencyId?: string, year?: number): Promise<RealEstatePropertyListResponse> => {
    // Passa sempre agencyId, anche se vuoto, per evitare errori di validazione
    const agencyParam = agencyId || 'all';
    const yearParam = year ? `&year=${year}` : '';
    const url = `RealEstateProperty/GetList?currentPage=0&agencyId=${agencyParam}&filterRequest=&contract=&priceFrom=0&priceTo=0&category=&typologie=&town=&sold=true${yearParam}`;
    
    return ApiService.get(url, "")
        .then(({ data }) => {
            return data as RealEstatePropertyListResponse;
        })
        .catch(({ response }) => {
            store.setError(response.data.Message, response.status);
            return undefined;
        });
};

const getCalendarEvents = (agencyId?: string, year?: number): Promise<CalendarListResponse> => {
    // Se agencyId è vuoto, non passare il parametro o usa un valore di default
    const queryParams = agencyId ? `?agencyId=${agencyId}` : '';
    const yearParam = year ? `${agencyId ? '&' : '?'}year=${year}` : '';
    return ApiService.get(`Calendar/Get${queryParams}${yearParam}`, "")
        .then(({ data }) => {
            return data as CalendarListResponse;
        })
        .catch(({ response }) => {
            if (response && response.data) {
                store.setError(response.data.Message || 'Errore nel caricamento degli appuntamenti', response.status);
            }
            return undefined;
        });
};

export interface RequestListItem {
  Id: number;
  CreationDate: string;
  Status: string;
  Archived: boolean;
  Closed: boolean;
  AgencyId?: string;
}

export interface RequestListResponse {
  Data: RequestListItem[];
  Total: number;
}

const getRequests = (agencyId?: string, year?: number): Promise<RequestListResponse> => {
    // Se agencyId è vuoto, non passare il parametro
    const agencyParam = agencyId ? `&agencyId=${agencyId}` : '';
    const yearParam = year ? `&year=${year}` : '';
    return ApiService.get(`Requests/Get?currentPage=0${agencyParam}&filterRequest=${yearParam}`, "")
        .then(({ data }) => {
            return data as RequestListResponse;
        })
        .catch(({ response }) => {
            if (response && response.data) {
                store.setError(response.data.Message || 'Errore nel caricamento delle richieste', response.status);
            }
            return undefined;
        });
};

const getCustomers = (agencyId?: string, year?: number): Promise<CustomerListResponse> => {
    // L'API richiede sempre agencyId, usiamo 'all' quando non specificato
    const agencyParam = agencyId || 'all';
    const yearParam = year ? `&year=${year}` : '';
    const url = `Customers/Get?currentPage=0&agencyId=${agencyParam}&filterRequest=${yearParam}`;
    
    return ApiService.get(url, "")
        .then(({ data }) => {
            return data as CustomerListResponse;
        })
        .catch(({ response }) => {
            if (response && response.data) {
                store.setError(response.data.Message || 'Errore nel caricamento dei clienti', response.status);
            }
            return undefined;
        });
};

// Funzione per ottenere tutti i clienti di tutte le agenzie
const getAllCustomers = async (): Promise<CustomerListResponse> => {
    try {
        // Prima ottieni la lista delle agenzie
        const agenciesResponse = await getAgencies();
        if (!agenciesResponse || !agenciesResponse.Data) {
            return { Data: [], Total: 0 };
        }
        
        // Chiama l'API per ogni agenzia
        const allCustomers: Customer[] = [];
        let totalCustomers = 0;
        
        for (const agency of agenciesResponse.Data) {
            try {
                const customersResponse = await getCustomers(agency.id);
                if (customersResponse && customersResponse.Data) {
                    allCustomers.push(...customersResponse.Data);
                    totalCustomers += customersResponse.Total || 0;
                }
            } catch (error) {
                // Ignora errori per singole agenzie
            }
        }
        
        return {
            Data: allCustomers,
            Total: totalCustomers
        };
        
    } catch (error) {
        return { Data: [], Total: 0 };
    }
};

const processPropertiesForChart = (properties: RealEstatePropertyListItem[], year?: number) => {
    const now = new Date();
    const targetYear = year || now.getFullYear();
    
    // Genera tutti i 12 mesi dell'anno selezionato
    const yearMonths = [];
    
    for (let i = 0; i < 12; i++) {
        const date = new Date(targetYear, i, 1);
        const monthKey = date.toLocaleDateString('it-IT', { month: 'short', year: '2-digit' });
        yearMonths.push({
            key: monthKey,
            year: date.getFullYear(),
            month: date.getMonth()
        });
    }

    // Raggruppa i dati per mese e status - immobili inseriti per categoria
    const chartData = {
        sale: {} as Record<string, number>,      // Status = "Vendita"
        rent: {} as Record<string, number>,      // Status = "Affitto"
        auction: {} as Record<string, number>    // Auction = true
    };

    // Inizializza tutti i 12 mesi con 0
    yearMonths.forEach(month => {
        chartData.sale[month.key] = 0;
        chartData.rent[month.key] = 0;
        chartData.auction[month.key] = 0;
    });

    // Processa ogni immobile - analizza CreationDate, Status e Auction
    properties.forEach(property => {
        const creationDate = new Date(property.CreationDate);
        const propertyMonth = creationDate.toLocaleDateString('it-IT', { month: 'short', year: '2-digit' });
        
        // Verifica se è nell'anno selezionato
        const isInSelectedYear = yearMonths.some(month => 
            month.year === creationDate.getFullYear() && 
            month.month === creationDate.getMonth()
        );

        if (isInSelectedYear) {
            // Raggruppa per Status e Aste
            if (property.Auction === true) {
                // Se è un'asta, conta come asta
                chartData.auction[propertyMonth] = (chartData.auction[propertyMonth] || 0) + 1;
            } else if (property.Status === 'Vendita') {
                // Se è vendita, conta come vendita
                chartData.sale[propertyMonth] = (chartData.sale[propertyMonth] || 0) + 1;
            } else if (property.Status === 'Affitto') {
                // Se è affitto, conta come affitto
                chartData.rent[propertyMonth] = (chartData.rent[propertyMonth] || 0) + 1;
            }
        }
    });

    return {
        months: yearMonths.map(m => m.key),
        data: chartData
    };
};

const processSoldPropertiesForChart = (properties: RealEstatePropertyListItem[], year?: number) => {
    const now = new Date();
    const targetYear = year || now.getFullYear();
    const yearMonths = [];
    
    // Genera tutti i 12 mesi dell'anno selezionato
    for (let i = 0; i < 12; i++) {
        const date = new Date(targetYear, i, 1);
        const monthKey = date.toLocaleDateString('it-IT', { month: 'short', year: '2-digit' });
        yearMonths.push({
            key: monthKey,
            year: date.getFullYear(),
            month: date.getMonth()
        });
    }

    // Raggruppa i dati per mese e status - immobili venduti per categoria
    const chartData = {
        sale: {} as Record<string, number>,      // Status = "Vendita" + Sold = true
        rent: {} as Record<string, number>,      // Status = "Affitto" + Sold = true
        auction: {} as Record<string, number>    // Auction = true + Sold = true
    };

    // Inizializza tutti i 12 mesi con 0
    yearMonths.forEach(month => {
        chartData.sale[month.key] = 0;
        chartData.rent[month.key] = 0;
        chartData.auction[month.key] = 0;
    });

    // Processa ogni immobile venduto - solo quelli venduti (Sold = true)
    properties.forEach(property => {
        // Solo immobili venduti
        if (property.Sold) {
            // Usa UpdateDate se disponibile, altrimenti CreationDate
            let dateToUse = null;
            if (property.UpdateDate && property.UpdateDate !== "0001-01-01T00:00:00") {
                dateToUse = new Date(property.UpdateDate);
            } else {
                dateToUse = new Date(property.CreationDate);
            }
            
            const propertyMonth = dateToUse.toLocaleDateString('it-IT', { month: 'short', year: '2-digit' });
        
            // Verifica se è nell'anno selezionato
            const isInSelectedYear = yearMonths.some(month => 
                month.year === dateToUse.getFullYear() && 
                month.month === dateToUse.getMonth()
            );

            if (isInSelectedYear) {
                // Raggruppa per Status e Aste
                if (property.Auction === true) {
                    // Se è un'asta venduta, conta come asta
                    chartData.auction[propertyMonth] = (chartData.auction[propertyMonth] || 0) + 1;
                } else if (property.Status === 'Vendita') {
                    // Se è vendita venduta, conta come vendita
                    chartData.sale[propertyMonth] = (chartData.sale[propertyMonth] || 0) + 1;
                } else if (property.Status === 'Affitto') {
                    // Se è affitto venduto, conta come affitto
                    chartData.rent[propertyMonth] = (chartData.rent[propertyMonth] || 0) + 1;
                }
            }
        }
    });

    return {
        months: yearMonths.map(m => m.key),
        data: chartData
    };
};



const processTypologyDistribution = (properties: RealEstatePropertyListItem[]) => {
    const typologyCount: Record<string, number> = {};
    
    // Raggruppa per tipologia
    properties.forEach(property => {
        const typology = property.Typology || 'Non specificato';
        typologyCount[typology] = (typologyCount[typology] || 0) + 1;
    });
    
    // Ordina per quantità (decrescente)
    const sortedEntries = Object.entries(typologyCount)
        .sort(([,a], [,b]) => b - a);
    
    // Converte in formato compatibile con Widget4 mantenendo l'ordine
    const chartData: Record<string, number> = { 'Total': 0 };
    sortedEntries.forEach(([name, value]) => {
        chartData[name] = value;
        chartData['Total'] += value;
    });
    
    return chartData;
};

const processTopZones = (properties: RealEstatePropertyListItem[]) => {
    const zoneCount: Record<string, number> = {};
    
    // Raggruppa per città/zone
    properties.forEach(property => {
        const town = property.Town || 'Non specificato';
        zoneCount[town] = (zoneCount[town] || 0) + 1;
    });
    
    // Ordina per quantità (decrescente) e prendi i primi 5
    const topZones = Object.entries(zoneCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([name, count], index) => {
            const total = properties.length;
            const percentage = ((count / total) * 100).toFixed(1);
            return {
                name,
                count,
                percentage: parseFloat(percentage),
                position: index + 1
            };
        });
    
    return topZones;
};

// Funzione rimossa - non utilizzata

    const processAgentsRanking = (agents: Agent[], type: 'customers' | 'requests' | 'sales' = 'customers') => {
        if (!agents || agents.length === 0) {
            return [];
        }

        // Restituisce solo i dati reali degli agenti senza simulazioni
        const agentsWithCount = agents.map((agent) => {
            let name = `${agent.Name} ${agent.LastName}`;
            
            // Nessun dato simulato - solo dati reali
            return {
                id: agent.Id,
                name: name,
                count: 0 // Zero perché non abbiamo dati reali di performance
            };
        });

        return agentsWithCount;
    };

    const processCalendarEvents = (events: CalendarEvent[]) => {
        if (!events || events.length === 0) {
            return {
                total: 0,
                confirmed: 0
            };
        }

        // Conta gli appuntamenti totali (quelli con CreationDate)
        const totalAppointments = events.filter(event => 
            event.CreationDate && !event.Cancelled
        ).length;

        // Conta gli appuntamenti confermati
        const confirmedAppointments = events.filter(event => 
            event.Confirmed && !event.Cancelled
        ).length;

        return {
            total: totalAppointments,
            confirmed: confirmedAppointments
        };
    };

    const processRequestsForChart = (requests: RequestListItem[], year?: number) => {
        const now = new Date();
        const targetYear = year || now.getFullYear();
        const yearMonths = [];
        
        // Genera tutti i 12 mesi dell'anno selezionato
        for (let i = 0; i < 12; i++) {
            const date = new Date(targetYear, i, 1);
            const monthKey = date.toLocaleDateString('it-IT', { month: 'short', year: '2-digit' });
            yearMonths.push({
                key: monthKey,
                year: date.getFullYear(),
                month: date.getMonth()
            });
        }

        // Raggruppa i dati per mese
        const chartData = {
            inserted: {} as Record<string, number>,
            closed: {} as Record<string, number>
        };

        // Inizializza tutti i 12 mesi con 0
        yearMonths.forEach(month => {
            chartData.inserted[month.key] = 0;
            chartData.closed[month.key] = 0;
        });

        // Processa ogni richiesta
        requests.forEach(request => {
            const creationDate = new Date(request.CreationDate);
            const requestMonth = creationDate.toLocaleDateString('it-IT', { month: 'short', year: '2-digit' });
            
            // Verifica se è nell'anno selezionato
            const isInSelectedYear = yearMonths.some(month => 
                month.year === creationDate.getFullYear() && 
                month.month === creationDate.getMonth()
            );

            if (isInSelectedYear) {
                // Conta tutte le richieste inserite
                chartData.inserted[requestMonth] = (chartData.inserted[requestMonth] || 0) + 1;
                
                // Conta solo le richieste chiuse/evase
                if (request.Closed) {
                    chartData.closed[requestMonth] = (chartData.closed[requestMonth] || 0) + 1;
                }
            }
        });

        return {
            months: yearMonths.map(m => m.key),
            data: chartData,
            total: requests.length
        };
    };

    const processAppointmentsForChart = (appointments: CalendarEvent[], year?: number) => {
        const now = new Date();
        const targetYear = year || now.getFullYear();
        const yearMonths = [];
        
        // Genera tutti i 12 mesi dell'anno selezionato
        for (let i = 0; i < 12; i++) {
            const date = new Date(targetYear, i, 1);
            const monthKey = date.toLocaleDateString('it-IT', { month: 'short', year: '2-digit' });
            yearMonths.push({
                key: monthKey,
                year: date.getFullYear(),
                month: date.getMonth()
            });
        }

        // Raggruppa i dati per mese
        const chartData = {
            fixed: {} as Record<string, number>,
            confirmed: {} as Record<string, number>
        };

        // Inizializza tutti i 12 mesi con 0
        yearMonths.forEach(month => {
            chartData.fixed[month.key] = 0;
            chartData.confirmed[month.key] = 0;
        });

        // Processa ogni appuntamento
        appointments.forEach(appointment => {
            // Usa DataInizioEvento per determinare il mese
            const startDate = new Date(appointment.DataInizioEvento);
            const appointmentMonth = startDate.toLocaleDateString('it-IT', { month: 'short', year: '2-digit' });
            
            // Verifica se è nell'anno selezionato
            const isInSelectedYear = yearMonths.some(month => 
                month.year === startDate.getFullYear() && 
                month.month === startDate.getMonth()
            );

            if (isInSelectedYear && !appointment.Cancelled) {
                // Conta tutti gli appuntamenti fissati (non cancellati)
                chartData.fixed[appointmentMonth] = (chartData.fixed[appointmentMonth] || 0) + 1;
                
                // Conta solo gli appuntamenti confermati
                if (appointment.Confirmed) {
                    chartData.confirmed[appointmentMonth] = (chartData.confirmed[appointmentMonth] || 0) + 1;
                }
            }
        });

        return {
            months: yearMonths.map(m => m.key),
            data: chartData
        };
    };

    const processAgenciesForChart = (agencies: any[], year?: number) => {
        const now = new Date();
        const targetYear = year || now.getFullYear();
        const last6Months = [];
        
        // Genera i mesi dell'anno selezionato (ultimi 6 mesi)
        for (let i = 5; i >= 0; i--) {
            const date = new Date(targetYear, now.getMonth() - i, 1);
            const monthKey = date.toLocaleDateString('it-IT', { month: 'short', year: '2-digit' });
            last6Months.push({
                key: monthKey,
                year: date.getFullYear(),
                month: date.getMonth()
            });
        }

        // Raggruppa i dati per mese
        const chartData = {
            monthlyData: {} as Record<string, number>
        };

        // Inizializza tutti i mesi con 0
        last6Months.forEach(month => {
            chartData.monthlyData[month.key] = 0;
        });

        // Processa ogni agenzia
        agencies.forEach((agency) => {
            // Se CreationDate è valido (non 0001-01-01), usalo
            if (agency.CreationDate && agency.CreationDate !== "0001-01-01T00:00:00") {
                const creationDate = new Date(agency.CreationDate);
                const agencyMonth = creationDate.toLocaleDateString('it-IT', { month: 'short', year: '2-digit' });
                
                // Verifica se è negli ultimi 6 mesi
                const isInLast6Months = last6Months.some(month => 
                    month.year === creationDate.getFullYear() && 
                    month.month === creationDate.getMonth()
                );

                if (isInLast6Months) {
                    chartData.monthlyData[agencyMonth] = (chartData.monthlyData[agencyMonth] || 0) + 1;
                }
            }
            // Altrimenti, se EmailConfirmed è true, considera l'agenzia come "attiva" nel mese corrente
            else if (agency.EmailConfirmed) {
                const currentMonth = now.toLocaleDateString('it-IT', { month: 'short', year: '2-digit' });
                chartData.monthlyData[currentMonth] = (chartData.monthlyData[currentMonth] || 0) + 1;
            }
        });

        return chartData;
    };

    const processAgentsForChart = (agents: Agent[], year?: number) => {
        const now = new Date();
        const targetYear = year || now.getFullYear();
        const yearMonths = [];
        
        // Genera tutti i 12 mesi dell'anno selezionato
        for (let i = 0; i < 12; i++) {
            const date = new Date(targetYear, i, 1);
            const monthKey = date.toLocaleDateString('it-IT', { month: 'short', year: '2-digit' });
            yearMonths.push({
                key: monthKey,
                year: date.getFullYear(),
                month: date.getMonth()
            });
        }

        // Raggruppa i dati per mese
        const chartData = {
            monthlyData: {} as Record<string, number>
        };

        // Inizializza tutti i 12 mesi con 0
        yearMonths.forEach(month => {
            chartData.monthlyData[month.key] = 0;
        });

        // Processa ogni agente
        agents.forEach(agent => {
            // Usa CreationDate se valida, altrimenti UpdateDate, altrimenti salta
            let dateToUse = null;
            
            if (agent.CreationDate && agent.CreationDate !== "0001-01-01T00:00:00") {
                dateToUse = new Date(agent.CreationDate);
            } else if (agent.UpdateDate && agent.UpdateDate !== "0001-01-01T00:00:00") {
                dateToUse = new Date(agent.UpdateDate);
            }
            
            if (dateToUse) {
                const agentMonth = dateToUse.toLocaleDateString('it-IT', { month: 'short', year: '2-digit' });
                
                // Verifica se è nell'anno selezionato
                const isInSelectedYear = yearMonths.some(month => 
                    month.year === dateToUse.getFullYear() && 
                    month.month === dateToUse.getMonth()
                );

                if (isInSelectedYear) {
                    chartData.monthlyData[agentMonth] = (chartData.monthlyData[agentMonth] || 0) + 1;
                }
            }
        });

        return chartData;
    };

    const processCustomersForChart = (customers: Customer[], year?: number) => {
        const now = new Date();
        const targetYear = year || now.getFullYear();
        const yearMonths = [];
        
        // Genera tutti i 12 mesi dell'anno selezionato
        for (let i = 0; i < 12; i++) {
            const date = new Date(targetYear, i, 1);
            const monthKey = date.toLocaleDateString('it-IT', { month: 'short', year: '2-digit' });
            yearMonths.push({
                key: monthKey,
                year: date.getFullYear(),
                month: date.getMonth()
            });
        }

        // Raggruppa i dati per mese
        const chartData = {
            seller: {} as Record<string, number>,
            buyer: {} as Record<string, number>
        };

        // Inizializza tutti i 12 mesi con 0
        yearMonths.forEach(month => {
            chartData.seller[month.key] = 0;
            chartData.buyer[month.key] = 0;
        });

        // Processa ogni cliente
        customers.forEach((customer) => {
            const creationDate = new Date(customer.CreationDate);
            const customerMonth = creationDate.toLocaleDateString('it-IT', { month: 'short', year: '2-digit' });
            
            // Verifica se è nell'anno selezionato
            const isInSelectedYear = yearMonths.some(month => 
                month.year === creationDate.getFullYear() && 
                month.month === creationDate.getMonth()
            );

            if (isInSelectedYear) {
                // Se è venditore (Seller = true, Buyer = false)
                if (customer.Seller && !customer.Buyer) {
                    chartData.seller[customerMonth] = (chartData.seller[customerMonth] || 0) + 1;
                }
                // Se è acquirente (Buyer = true, Seller = false)
                else if (customer.Buyer && !customer.Seller) {
                    chartData.buyer[customerMonth] = (chartData.buyer[customerMonth] || 0) + 1;
                }
                // Se è sia venditore che acquirente (entrambi true)
                else if (customer.Seller && customer.Buyer) {
                    chartData.seller[customerMonth] = (chartData.seller[customerMonth] || 0) + 1;
                    chartData.buyer[customerMonth] = (chartData.buyer[customerMonth] || 0) + 1;
                }
            }
        });

        return chartData;
    };

    export { getDetails, getRealEstateProperties, getAgencies, getAgents, getSoldProperties, getCalendarEvents, getRequests, getCustomers, getAllCustomers, processPropertiesForChart, processSoldPropertiesForChart, processTypologyDistribution, processTopZones, processAgentsRanking, processCalendarEvents, processRequestsForChart, processAppointmentsForChart, processAgentsForChart, processAgenciesForChart, processCustomersForChart, isPropertyAvailable }
