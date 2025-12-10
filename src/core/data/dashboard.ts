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
  City: string;
  Price: number;
  Category: string;
  Typology: string;
  AgencyId?: string;
  AddressLine?: string;
  AssignmentEnd?: string;
  CommercialSurfaceate?: number;
  State?: string;
  StateOfTheProperty?: string;
  FirstPhotoUrl?: string;
}

export interface RealEstatePropertyListResponse {
  Data: RealEstatePropertyListItem[];
  Total: number;
}

export interface Agency {
  Id: string;
  Name?: string;
  FirstName?: string;
  LastName?: string;
  UserName: string;
  Email?: string;
  name: string; // Alias per compatibilità con il template
  id: string; // Alias per compatibilità con il template
  EmailConfirmed?: boolean;
  CreationDate?: string;
  // Aggiungi altri campi se necessario
}

export interface AgencyListResponse {
  Data: Agency[];
  Total: number;
}

export interface Agent {
  Id: string;
  FirstName?: string;
  LastName?: string;
  Name?: string;
  Email?: string;
  PhoneNumber?: string;
  MobilePhone?: string;
  Address?: string;
  City?: string;
  Province?: string;
  AgencyId?: string;
  Color?: string;
  CreationDate?: string;
  UpdateDate?: string;
  EmailConfirmed?: boolean;
  // Aggiungi altri campi se necessario
}

export interface Customer {
  Id: number;
  FirstName?: string;
  LastName?: string;
  Name?: string;
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
  UserId: string;
  EventName?: string;
  Type: string;
  CustomerId?: number;
  RealEstatePropertyId?: number;
  RequestId?: number;
  EventDescription?: string;
  EventLocation?: string;
  Color?: string;
  EventStartDate?: string;
  EventEndDate?: string;
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
    DistinctByCitySale?: Object;
    DistinctByTownSale?: Object;
    DistinctByCityRent?: Object;
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
    DistinctByCitySale?: Object;
    DistinctByTownSale?: Object;
    DistinctByCityRent?: Object;
    DistinctByTownRent?: Object;
    DistinctByTypeSale?: Object;
    DistinctByTypeRent?: Object;
    MaxAnnual?: number;
    MinAnnual?: number;
}

// Nuova interfaccia per la risposta aggregata
export interface DashboardAggregatedData {
    RealEstatePropertyHomeDetails: RealEstatePropertyHomeDetails;
    RequestHomeDetails: RequestHomeDetails;
    TotalCustomers: number;
    TotalBuyers: number;
    TotalSellers: number;
    TotalAgents: number;
    TotalAppointments: number;
    TotalConfirmedAppointments: number;
    AvailableProperties: RealEstatePropertyListItem[];
    SoldProperties: RealEstatePropertyListItem[];
    Agents: Agent[];
    Agencies: Agency[];
    Customers: Customer[];
    CalendarEvents: CalendarEvent[];
    Requests: RequestListItem[];
}


// ===== INTERFACCE RICHIESTE =====
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

// ===== HELPER FUNCTIONS =====
// Helper: verifica se un immobile è disponibile (in carico)
const isPropertyAvailable = (property: RealEstatePropertyListItem): boolean => {
    const now = new Date();
    const assignmentEnd = property.AssignmentEnd ? new Date(property.AssignmentEnd) : null;
    
    // Immobile disponibile se: Sold === false AND AssignmentEnd > oggi
    return property.Sold === false && assignmentEnd !== null && assignmentEnd > now;
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
        const city = property.City || 'Non specificato';
        zoneCount[city] = (zoneCount[city] || 0) + 1;
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
            // Usa EventStartDate per determinare il mese
            const startDate = new Date(appointment.EventStartDate);
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

// ===== API MAP DATA (Widget13) =====
// Modelli leggeri per ottimizzare il trasferimento dati
export interface MapAgency {
    Id: string;
    UserName: string;
    AdminId?: string;
    Address?: string;
    City?: string;
    Province?: string;
    ZipCode?: string;
    PhoneNumber?: string;
    Email?: string;
}

export interface MapAgent {
    Id: string;
    FirstName?: string;
    LastName?: string;
}

export interface MapData {
    TotalAgencies: number;
    TotalAgents: number;
    Agencies: MapAgency[];
    Agents: MapAgent[];
}

export interface Widget3Data {
    Months: string[];
    PropertiesData: {
        Sale: Record<string, number>;
        Rent: Record<string, number>;
        Auction: Record<string, number>;
    };
    SoldPropertiesData: {
        Sale: Record<string, number>;
        Rent: Record<string, number>;
        Auction: Record<string, number>;
    };
    CommissionsMonthlyData: Record<string, number>;
    TotalCommissionsPortfolio: number;
    TotalCommissionsEarned: number;
}

export interface PropertiesData {
    Sale: Record<string, number>;
    Rent: Record<string, number>;
    Auction: Record<string, number>;
}

export interface Widget3Data {
    Months: string[];
    PropertiesData: PropertiesData;
    SoldPropertiesData: PropertiesData;
    CommissionsMonthlyData: Record<string, number>;
    TotalCommissionsPortfolio: number;
    TotalCommissionsEarned: number;
}

export interface TopAgencyItem {
    Id: string;
    Name: string;
    Location: string;
    Properties: number;
    Customers: number;
    Requests: number;
    SoldProperties: number;
    Appointments: number;
    Commissions: number;
}

export interface TopAgenciesData {
    Agencies: TopAgencyItem[];
}

export interface TopAgentItem {
    Id: string;
    Name: string;
    Location: string;
    SoldProperties: number;
    LoadedProperties: number;
    Requests: number;
    Appointments: number;
    Commissions: number;
}

export interface TopAgentsData {
    Agents: TopAgentItem[];
}

export interface TopZoneItem {
    Name: string;
    Count: number;
    Percentage: number;
}

export interface TopZonesData {
    PropertiesZones: TopZoneItem[];
    RequestsZones: TopZoneItem[];
}

export interface TopTypologyItem {
    Name: string;
    Count: number;
    Percentage: number;
}

export interface TopTypologiesData {
    CategoriesPortfolio: TopTypologyItem[];
    CategoriesRequests: TopTypologyItem[];
}

export interface TopEarningItem {
    Id: string;
    Title: string;
    AddressLine: string;
    City: string;
    UserFirstName: string;
    Price: number;
    EffectiveCommission: number;
}

export interface TopEarningsData {
    Portfolio: TopEarningItem[];
    SalesYear: TopEarningItem[];
    TotalPortfolioCommission: number;
    TotalSalesYearCommission: number;
}

export interface AnalyticsData {
    Requests: RequestsAnalyticsData;
    Properties: PropertiesAnalyticsData;
    Customers: CustomersAnalyticsData;
    Appointments: AppointmentsAnalyticsData;
}

export interface RequestsAnalyticsData {
    Total: number;
    MonthlyData: Record<string, number>;
    ClosedData: Record<string, number>;
}

export interface PropertiesAnalyticsData {
    Total: number;
    MonthlyData: Record<string, number>;
    SoldData: Record<string, number>;
}

export interface CustomersAnalyticsData {
    Total: number;
    MonthlyData: Record<string, number>;
    BuyersData: Record<string, number>;
}

export interface AppointmentsAnalyticsData {
    Total: number;
    MonthlyData: Record<string, number>;
    ConfirmedData: Record<string, number>;
}

export interface ExpiringAssignmentItem {
    Id: number;
    Title: string;
    AddressLine: string;
    City: string;
    AssignmentEnd: string;
    DaysUntilExpiry: number;
}

export interface ExpiringAssignmentsData {
    Properties: ExpiringAssignmentItem[];
    Total: number;
    ExpiredProperties: ExpiringAssignmentItem[];
    TotalExpired: number;
}

const getMapData = (agencyId?: string, year?: number): Promise<MapData> => {
    const agencyParam = agencyId ? `agencyId=${encodeURIComponent(agencyId)}` : '';
    const yearParam = year ? `year=${year}` : '';
    
    // Costruisci i parametri della query
    const params = [agencyParam, yearParam].filter(p => p).join('&');
    const queryString = params ? `?${params}` : '';
    
    return ApiService.get(`Dashboard/GetMapData${queryString}`, "")
        .then(({ data }) => {
            return data as MapData;
        })
        .catch(({ response }) => {
            store.setError(response?.data?.Message || 'Errore nel caricamento dei dati della mappa', response?.status);
            throw new Error('Errore nel caricamento dei dati della mappa');
        });
    };

const getWidget3Data = (agencyId?: string, year?: number): Promise<Widget3Data> => {
    const agencyParam = agencyId ? `agencyId=${encodeURIComponent(agencyId)}` : '';
    const yearParam = year ? `year=${year}` : '';
    
    const params = [agencyParam, yearParam].filter(p => p).join('&');
    const queryString = params ? `?${params}` : '';
    
    return ApiService.get(`Dashboard/GetWidget3Data${queryString}`, "")
        .then(({ data }) => {
            return data as Widget3Data;
        })
        .catch(({ response }) => {
            store.setError(response?.data?.Message || 'Errore nel caricamento dei dati Widget3', response?.status);
            throw new Error('Errore nel caricamento dei dati Widget3');
        });
};

const getTopAgenciesData = (year?: number, sortBy?: string, sortOrder?: string): Promise<TopAgenciesData> => {
    const params: string[] = [];
    
    if (year) params.push(`year=${year}`);
    if (sortBy) params.push(`sortBy=${encodeURIComponent(sortBy)}`);
    if (sortOrder) params.push(`sortOrder=${encodeURIComponent(sortOrder)}`);
    
    const queryString = params.length > 0 ? `?${params.join('&')}` : '';
    
    return ApiService.get(`Dashboard/GetTopAgenciesData${queryString}`, "")
        .then(({ data }) => {
            return data as TopAgenciesData;
        })
        .catch(({ response }) => {
            store.setError(response?.data?.Message || 'Errore nel caricamento dei dati Top Agenzie', response?.status);
            throw new Error('Errore nel caricamento dei dati Top Agenzie');
        });
};

const getTopAgentsData = (year?: number, sortBy?: string, sortOrder?: string): Promise<TopAgentsData> => {
    const params: string[] = [];
    
    if (year) params.push(`year=${year}`);
    if (sortBy) params.push(`sortBy=${encodeURIComponent(sortBy)}`);
    if (sortOrder) params.push(`sortOrder=${encodeURIComponent(sortOrder)}`);
    
    const queryString = params.length > 0 ? `?${params.join('&')}` : '';
    
    return ApiService.get(`Dashboard/GetTopAgentsData${queryString}`, "")
        .then(({ data }) => {
            return data as TopAgentsData;
        })
        .catch(({ response }) => {
            store.setError(response?.data?.Message || 'Errore nel caricamento dei dati Top Agenti', response?.status);
            throw new Error('Errore nel caricamento dei dati Top Agenti');
        });
};

const getTopZonesData = (): Promise<TopZonesData> => {
    return ApiService.get(`Dashboard/GetTopZonesData`, "")
        .then(({ data }) => {
            return data as TopZonesData;
        })
        .catch(({ response }) => {
            store.setError(response?.data?.Message || 'Errore nel caricamento dei dati Top Zone', response?.status);
            throw new Error('Errore nel caricamento dei dati Top Zone');
        });
};

const getTopTypologiesData = (): Promise<TopTypologiesData> => {
    return ApiService.get(`Dashboard/GetTopTypologiesData`, "")
        .then(({ data }) => {
            return data as TopTypologiesData;
        })
        .catch(({ response }) => {
            store.setError(response?.data?.Message || 'Errore nel caricamento dei dati Top Tipologie', response?.status);
            throw new Error('Errore nel caricamento dei dati Top Tipologie');
        });
};

const getTopEarningsData = (year?: number): Promise<TopEarningsData> => {
    const params: string[] = [];
    if (year) params.push(`year=${year}`);
    const queryString = params.length > 0 ? `?${params.join('&')}` : '';

    return ApiService.get(`Dashboard/GetTopEarningsData${queryString}`, "")
        .then(({ data }) => {
            return data as TopEarningsData;
        })
        .catch(({ response }) => {
            store.setError(response?.data?.Message || 'Errore nel caricamento dei dati Top Guadagni', response?.status);
            throw new Error('Errore nel caricamento dei dati Top Guadagni');
        });
};

const getAnalyticsData = (year: number, agencyId?: string): Promise<AnalyticsData> => {
    const params: string[] = [`year=${year}`];
    if (agencyId) params.push(`agencyId=${encodeURIComponent(agencyId)}`);
    const queryString = `?${params.join('&')}`;

    return ApiService.get(`Dashboard/GetAnalyticsData${queryString}`, "")
        .then(({ data }) => {
            return data as AnalyticsData;
        })
        .catch(({ response }) => {
            store.setError(response?.data?.Message || 'Errore nel caricamento dei dati Analytics', response?.status);
            throw new Error('Errore nel caricamento dei dati Analytics');
        });
};

const getExpiringAssignments = (daysThreshold?: number): Promise<ExpiringAssignmentsData> => {
    const params: string[] = [];
    if (daysThreshold) params.push(`daysThreshold=${daysThreshold}`);
    const queryString = params.length > 0 ? `?${params.join('&')}` : '';

    return ApiService.get(`Dashboard/GetExpiringAssignments${queryString}`, "")
        .then(({ data }) => {
            return data as ExpiringAssignmentsData;
        })
        .catch(({ response }) => {
            store.setError(response?.data?.Message || 'Errore nel caricamento delle scadenze incarichi', response?.status);
            throw new Error('Errore nel caricamento delle scadenze incarichi');
        });
};

export { 
    // API dashboard
    getMapData,
    getWidget3Data,
    getTopAgenciesData,
    getTopAgentsData,
    getTopZonesData,
    getTopTypologiesData,
    getTopEarningsData,
    getAnalyticsData,
    getExpiringAssignments,
    
    // Funzioni di processing per grafici e statistiche
    processPropertiesForChart, 
    processSoldPropertiesForChart, 
    processTypologyDistribution, 
    processTopZones, 
    processAgentsRanking, 
    processCalendarEvents, 
    processRequestsForChart, 
    processAppointmentsForChart, 
    processAgentsForChart, 
    processAgenciesForChart, 
    processCustomersForChart, 
    
    // Helper functions
    isPropertyAvailable 
}
