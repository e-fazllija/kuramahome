<template>
  <!--begin::Agencies Map Widget-->
  <div class="card card-xl-stretch mb-xl-10 map-widget-container">
    <!--begin::Card Header with Filters and Stats-->
    <div class="card-header widget-13-header">
      <!--begin::Unified Controls Row-->
      <div class="row align-items-center widget-13-unified-row my-0 g-4 justify-content-between">
        <!--begin::Filters Group-->
        <div v-if="!isAgent" class="col-12 col-md-6 d-flex flex-nowrap align-items-stretch gap-4 widget-13-filters-group">
          <!--begin::Year Filter-->
          <div class="widget-13-filter-badge">
            <div class="d-flex flex-column align-items-center mb-2">
              <span class="text-muted fs-7 fw-semibold">Filtro Anno</span>
            </div>
            <select 
              v-model="selectedYear" 
              class="widget-13-filter-select"
              @change="onYearChange"
            >
              <option :value="null">Corrente</option>
              <option 
                v-for="year in availableYears.filter(y => y !== null)" 
                :key="year" 
                :value="year"
              >
                {{ year }}
              </option>
            </select>
          </div>
          <!--end::Year Filter-->
          
          <!--begin::Agency Filter-->
          <div class="widget-13-filter-badge">
            <div class="d-flex flex-column align-items-center mb-2">
              <span class="text-muted fs-7 fw-semibold">{{ isAdmin ? 'Filtro Agenzia' : 'Filtro Agente' }}</span>
            </div>
            <select 
              v-model="selectedAgency" 
              class="widget-13-filter-select"
              :disabled="isAgency"
              @change="onAgencyChange"
            >
              <option value="all">Tutti</option>
              <optgroup v-if="isAdmin" label="Agenzie">
                <option 
                  v-for="agency in agenciesList" 
                  :key="agency.id || (agency as any).Id" 
                  :value="`agency_${agency.id || (agency as any).Id}`"
                >
                  {{ agency.UserName || agency.userName || agency.name || 'Agenzia' }}
                </option>
              </optgroup>
              <optgroup label="Agenti">
                <option 
                  v-for="agent in agentsList" 
                  :key="(agent as any).Id || (agent as any).id" 
                  :value="`agent_${(agent as any).Id || (agent as any).id}`"
                >
                  {{ (agent as any).FirstName || (agent as any).firstName || '' }} {{ (agent as any).LastName || (agent as any).lastName || '' }}
                </option>
              </optgroup>
            </select>
          </div>
          <!--end::Agency Filter-->
        </div>
        <!--end::Filters Group-->
        
        <!--begin::Group Name and Totals-->
        <div :class="['col-12', isAgent ? 'col-md-12' : 'col-md-6', 'd-flex align-items-center', isAgent ? 'justify-content-center' : 'justify-content-end', 'gap-4 widget-13-group-info']">
          <div class="d-flex align-items-center gap-3 widget-13-group-badge">
            <div class="widget-13-group-icon">
              <i class="fas fa-users text-primary"></i>
            </div>
            <div class="d-flex flex-column">
              <span class="text-muted fs-7 fw-semibold mb-1">Gruppo</span>
              <span class="fw-bold fs-6 text-gray-800">{{ adminName }}</span>
            </div>
          </div>
          <div class="d-flex gap-4 widget-13-totals">
            <div class="d-flex flex-column align-items-center widget-13-total-item">
              <span class="text-muted fs-8 mb-1">Agenzie</span>
              <span class="fw-bold fs-4 text-primary widget-13-counter">{{ animatedTotalAgencies }}</span>
            </div>
            <div class="widget-13-total-divider"></div>
            <div class="d-flex flex-column align-items-center widget-13-total-item">
              <span class="text-muted fs-8 mb-1">Agenti</span>
              <span class="fw-bold fs-4 text-primary widget-13-counter">{{ animatedTotalAgents }}</span>
            </div>
          </div>
        </div>
        <!--end::Group Name and Totals-->
      </div>
      <!--end::Unified Controls Row-->
    </div>
    <!--end::Card Header-->
    
    <!--begin::Card Body with Map-->
    <div class="card-body p-0 position-relative">
      <div ref="mapContainer" id="leaflet-map" class="leaflet-map-container"></div>
    </div>
    <!--end::Card Body-->
  </div>
  <!--end::Agencies Map Widget-->
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted, onUnmounted } from "vue";
import type { PropType } from "vue";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Agency {
  id: string;
  name: string;
  address: string;
  city: string;
  province: string;
  zipCode?: string;
  phone?: string;
  color?: string;
  Address?: string;
  City?: string;
  Province?: string;
  ZipCode?: string;
  PhoneNumber?: string;
  Color?: string;
  UserName?: string;
  userName?: string;
  Email?: string;
  email?: string;
}

export default defineComponent({
  name: "widget-13",
  props: {
    agenciesList: {
      type: Array as PropType<Agency[]>,
      default: () => []
    },
    agentsList: {
      type: Array as PropType<any[]>,
      default: () => []
    },
    totalAgencies: {
      type: Number,
      default: 0
    },
    totalAgents: {
      type: Number,
      default: 0
    },
    adminName: {
      type: String,
      default: ''
    },
    isAgent: {
      type: Boolean,
      default: false
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    isAgency: {
      type: Boolean,
      default: false
    },
    initialAgencyFilter: {
      type: String,
      default: undefined
    }
  },
  emits: ['agency-select', 'filter-change'],
  setup(props, { emit }) {
    // Map reference
    const mapContainer = ref<HTMLElement | null>(null);
    let map: L.Map | null = null;
    const markers: L.Marker[] = [];

    // Use totali dalle props (vengono dalla chiamata API)
    const totalAgencies = computed(() => props.totalAgencies || 0);
    const totalAgents = computed(() => props.totalAgents || 0);

    // Animated counters (start from 0 and animate to actual value)
    const animatedTotalAgencies = ref(0);
    const animatedTotalAgents = ref(0);

    // Animation function
    const animateCounter = (target: number, current: { value: number }, duration: number = 1500) => {
      const start = current.value;
      const increment = target - start;
      const steps = 60; // 60 frames
      const stepDuration = duration / steps;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        current.value = Math.floor(start + increment * easeOut);

        if (step >= steps) {
          current.value = target;
          clearInterval(timer);
        }
      }, stepDuration);
    };

    // Watch for changes in totals and animate
    watch([totalAgencies, totalAgents], ([newAgencies, newAgents]) => {
      animateCounter(newAgencies, animatedTotalAgencies, 1500);
      animateCounter(newAgents, animatedTotalAgents, 1500);
    }, { immediate: true });

    // Filters state
    const currentYear = new Date().getFullYear();
    const availableYears = computed(() => {
      const years: (number | null)[] = [null]; // Prima opzione: "Corrente" (null)
      for (let i = 0; i < 6; i++) {
        years.push(currentYear - i);
      }
      return years;
    });

    const selectedYear = ref<number | null>(null); // Default: "Corrente"
    // Inizializza selectedAgency con initialAgencyFilter se fornito, altrimenti 'all'
    const selectedAgency = ref<string>(props.initialAgencyFilter || 'all');

    // Filter change handlers
    const onYearChange = () => {
      emit('filter-change', {
        year: selectedYear.value, // null = "Corrente", number = anno specifico
        agency: selectedAgency.value
      });
    };

    const onAgencyChange = () => {
      emit('filter-change', {
        year: selectedYear.value,
        agency: selectedAgency.value
      });
    };

    // Get main agency coordinates (first agency or agency with specific criteria)
    const getMainAgencyCoords = (): [number, number] => {
      if (props.agenciesList.length === 0) {
        return [41.9, 12.5]; // Default to Lazio province
      }

      // Use the first agency as main agency
      const mainAgency = props.agenciesList[0];
      const address = mainAgency.Address || mainAgency.address || '';
      const city = mainAgency.City || mainAgency.city || '';
      const province = mainAgency.Province || mainAgency.province || '';

      // Try to geocode the main agency
      if (address && city) {
        // For synchronous use, we'll use fallback coordinates
        const normalizedCity = normalizeCityName(city).toLowerCase();
        
        // Check if we have coordinates in our fallback database
        const fallbackCoords = getCityFallbackCoords(city);
        if (fallbackCoords[0] !== 42.5 || fallbackCoords[1] !== 13.0) { // Not default coordinates
          return fallbackCoords;
        }
      }

      return [41.9, 12.5]; // Default to Lazio province
    };

    // Initialize Leaflet map
    const initMap = () => {
      if (!mapContainer.value) return;

      // Get main agency coordinates
      const mainCoords = getMainAgencyCoords();

      // Create map centered on main agency (initial view, will be adjusted by addAgencyMarkers)
      // Disabilitare tutte le interazioni per tutti gli utenti
      map = L.map(mapContainer.value, {
        center: mainCoords,
        zoom: 9.56, // Initial zoom, will be adjusted based on visible agencies
        zoomControl: false, // Disabilitato per tutti
        scrollWheelZoom: false, // Disabilitato per tutti
        doubleClickZoom: false, // Disabilitato per tutti
        dragging: false, // Disabilitato per tutti
        touchZoom: false, // Disabilitato per tutti
        boxZoom: false, // Disabilitato per tutti
        keyboard: false // Disabilitato per tutti
      });

      // Add colorful and vibrant map tiles (CartoDB Voyager)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors, © CARTO',
        maxZoom: 20
      }).addTo(map);

      // Add agency markers
      addAgencyMarkers();
    };

    // Normalize city names by replacing hyphens and underscores with spaces
    const normalizeCityName = (cityName: string): string => {
      return cityName
        .replace(/_/g, ' ')  // Replace underscores with spaces
        .replace(/-/g, ' ')  // Replace hyphens with spaces
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .trim();             // Remove leading/trailing spaces
    };

    // Normalize province names (handle abbreviations)
    const normalizeProvince = (province: string): string => {
      const normalized = normalizeCityName(province).toUpperCase();
      
      // Map of province abbreviations to full names
      const provinceMap: Record<string, string> = {
        'RM': 'ROMA',
        'VT': 'VITERBO',
        'LT': 'LATINA',
        'FR': 'FROSINONE',
        'RI': 'RIETI',
        'PG': 'PERUGIA',
        'TR': 'TERNI',
        'AN': 'ANCONA',
        'MC': 'MACERATA',
        'AP': 'ASCOLI PICENO',
        'PS': 'PESARO',
        'AQ': 'L\'AQUILA',
        'TE': 'TERAMO',
        'CH': 'CHIETI'
      };
      
      return provinceMap[normalized] || normalized;
    };

    // Geocode address using Nominatim (OpenStreetMap)
    const geocodeLocation = async (city: string, province?: string, zipCode?: string): Promise<[number, number] | null> => {
      try {
        // Normalize names
        const normalizedCity = normalizeCityName(city);
        const normalizedProvince = province ? normalizeProvince(province) : '';
        const normalizedZip = zipCode ? zipCode.trim() : '';
        
        // Compose the most precise query using ZIP, city and province
        let fullAddress;
        if (normalizedZip && normalizedProvince) {
          fullAddress = `${normalizedZip} ${normalizedCity}, ${normalizedProvince}, Italia`;
        } else if (normalizedZip) {
          fullAddress = `${normalizedZip} ${normalizedCity}, Italia`;
        } else if (normalizedProvince) {
          fullAddress = `${normalizedCity}, ${normalizedProvince}, Italia`;
        } else {
          fullAddress = `${normalizedCity}, Italia`;
        }
        const encodedAddress = encodeURIComponent(fullAddress);
        
        // Use Nominatim API (OpenStreetMap geocoding service)
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}&limit=1`,
          {
            headers: {
              'User-Agent': 'KuramaHome Dashboard'
            }
          }
        );
        
        if (!response.ok) return null;
        
        const data = await response.json();
        
        if (data && data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);
          return [lat, lon];
        }
        
        return null;
      } catch (error) {
        return null;
      }
    };

    // Fallback coordinates for major cities in central Italy
    const getCityFallbackCoords = (city: string): [number, number] => {
      // Normalize the city name for lookup
      const normalizedCity = normalizeCityName(city).toLowerCase();
      
      const cityCoordinates: Record<string, [number, number]> = {
        'roma': [41.9028, 12.4964],
        'perugia': [43.1107, 12.3908],
        'ancona': [43.6158, 13.5189],
        'l\'aquila': [42.3506, 13.3995],
        'aquila': [42.3506, 13.3995],
        'terni': [42.5634, 12.6425],
        'rieti': [42.4045, 12.8567],
        'latina': [41.4675, 12.9036],
        'frosinone': [41.6398, 13.3531],
        'viterbo': [42.4214, 12.1036],
        'macerata': [43.3003, 13.4531],
        'ascoli piceno': [42.8531, 13.5786],
        'ascoli': [42.8531, 13.5786],
        'pesaro': [43.9112, 12.9131],
        'teramo': [42.6589, 13.7039],
        'chieti': [42.3511, 14.1679],
        'civitavecchia': [42.0927, 11.7963],
        'pomezia': [41.6717, 12.5014],
        'anzio': [41.4511, 12.6297],
        'velletri': [41.6867, 12.7781],
        'tivoli': [41.9628, 12.7989],
        'fiumicino': [41.7669, 12.2388],
        'zagarolo': [41.8408, 12.8317],
        'colleferro': [41.7283, 13.0033],
        'palestrina': [41.8394, 12.8911],
        'san cesareo': [41.8192, 12.8003], // Comune di San Cesareo (RM)
        'guidonia montecelio': [41.9944, 12.7236],
        'guidonia': [41.9944, 12.7236] // Comune di Guidonia Montecelio
      };

      // Exact match
      if (cityCoordinates[normalizedCity]) {
        return cityCoordinates[normalizedCity];
      }
      
      // Partial match
      for (const [cityName, coords] of Object.entries(cityCoordinates)) {
        if (normalizedCity.includes(cityName) || cityName.includes(normalizedCity)) {
          return coords;
        }
      }
      
      // Default to central Italy
      return [42.5, 13.0];
    };

    // Check if two geographic points are close (increased threshold for better separation)
    const areMarkersClose = (coords1: [number, number], coords2: [number, number]): boolean => {
      const latDiff = Math.abs(coords1[0] - coords2[0]);
      const lonDiff = Math.abs(coords1[1] - coords2[1]);
      return latDiff < 0.08 && lonDiff < 0.08; // ~8km threshold for better tooltip separation
    };

    // Get best tooltip direction to avoid overlap with existing markers
    const getBestTooltipDirection = (coords: [number, number], existingCoords: [number, number][]): 'top' | 'bottom' | 'left' | 'right' => {
      const directions: ('top' | 'bottom' | 'left' | 'right')[] = ['top', 'right', 'bottom', 'left'];
      
      // Count nearby markers in each direction with weighted scoring
      const directionScores = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      };

      existingCoords.forEach(existingCoord => {
        if (areMarkersClose(coords, existingCoord)) {
          const latDiff = existingCoord[0] - coords[0];
          const lonDiff = existingCoord[1] - coords[1];
          const distance = Math.sqrt(latDiff * latDiff + lonDiff * lonDiff);
          
          // Weight by distance (closer markers have higher impact)
          const weight = Math.max(1, 5 - distance * 50);
          
          // Determine which direction has the existing marker
          if (Math.abs(latDiff) > Math.abs(lonDiff)) {
            if (latDiff > 0) directionScores.top += weight; // Marker is above
            else directionScores.bottom += weight; // Marker is below
          } else {
            if (lonDiff > 0) directionScores.right += weight; // Marker is to the right
            else directionScores.left += weight; // Marker is to the left
          }
        }
      });

      // Find direction with fewest markers (least congested)
      let bestDirection: 'top' | 'bottom' | 'left' | 'right' = 'top';
      let minScore = Infinity;
      
      for (const dir of directions) {
        if (directionScores[dir] < minScore) {
          minScore = directionScores[dir];
          bestDirection = dir;
        }
      }

      // If all directions are equally congested, prefer top and right for better readability
      if (minScore === directionScores.top || minScore === directionScores.right) {
        return minScore === directionScores.top ? 'top' : 'right';
      }

      return bestDirection;
    };

    // Add markers for agencies
    const addAgencyMarkers = async () => {
      if (!map) return;

      // Clear existing markers
      markers.forEach(marker => marker.remove());
      markers.length = 0;

      // Show all agencies
      const visibleAgencies = props.agenciesList;

      const existingCoords: [number, number][] = [];
      const allCoords: [number, number][] = []; // Store all coordinates for bounds calculation
      
      // Array of distinct colors for markers
      const markerColors = [
        '#e74c3c', // Rosso vivace
        '#3498db', // Blu
        '#2ecc71', // Verde
        '#f39c12', // Arancione
        '#9b59b6', // Viola
        '#1abc9c', // Turchese
        '#e67e22', // Arancione scuro
        '#34495e', // Blu scuro
        '#e91e63', // Rosa
        '#00bcd4', // Ciano
        '#8bc34a', // Verde chiaro
        '#ff9800', // Arancione
        '#795548', // Marrone
        '#607d8b', // Grigio blu
        '#ff5722'  // Rosso arancione
      ];

      // Process each visible agency
      for (let index = 0; index < visibleAgencies.length; index++) {
        const agency = visibleAgencies[index];
        const city = agency.City || agency.city || '';
        const province = agency.Province || agency.province || '';
        const zipCode = agency.ZipCode || agency.zipCode || '';
        const agencyName = agency.UserName || agency.userName || agency.name || 'Agency';
        
        let coords: [number, number] | null = null;

        // Try to geocode using city, province and zip code
        if (city) {
          coords = await geocodeLocation(city, province, zipCode);

          if (!coords && province) {
            coords = await geocodeLocation(city, province);
          }

          if (!coords) {
            coords = await geocodeLocation(city);
          }

          // Add small delay to respect rate limits
          await new Promise(resolve => setTimeout(resolve, 200));
        }

        // Fallback to city coordinates if geocoding fails
        if (!coords && city) {
          coords = getCityFallbackCoords(city);
        }

        // Ultimate fallback
        if (!coords) {
          coords = [42.5, 13.0];
        }

        // Assign color from array
        const color = markerColors[index % markerColors.length];
        const markerSize = 26;
        const borderWidth = 4;
        
        // Custom icon with agency color and selection highlight
        const customIcon = L.divIcon({
          className: 'custom-marker',
          html: `
            <div style="
              background-color: ${color}; 
              width: ${markerSize}px; 
              height: ${markerSize}px; 
              border-radius: 50%; 
              border: ${borderWidth}px solid white; 
              box-shadow: 0 3px 12px rgba(0,0,0,0.35);
              transition: all 0.3s ease;
            "></div>
          `,
          iconSize: [markerSize, markerSize],
          iconAnchor: [markerSize / 2, markerSize / 2]
        });

        const marker = L.marker(coords, { icon: customIcon }).addTo(map!);
        
        // Add coordinates to existing list for future reference
        existingCoords.push(coords);
        allCoords.push(coords); // Store for bounds calculation
        
        // Create popup content with UserName and address
        const userName = agency.UserName || agency.userName || agency.name || 'Agency';
        const fullAddressParts = [
          zipCode || '',
          city || '',
          province || ''
        ].filter(part => part && part.length > 0);

        const fullAddress = fullAddressParts.join(' ').trim();
        
        const popupContent = `
          <div style="min-width: 220px; text-align: left;">
            <h4 style="margin: 0 0 8px 0; color: ${color}; font-weight: bold; font-size: 14px;">${userName}</h4>
            <p style="margin: 4px 0; font-size: 12px; color: #666;"><strong>📍</strong> ${fullAddress || 'Località non disponibile'}</p>
            ${agency.PhoneNumber || agency.phone ? `<p style="margin: 4px 0; font-size: 12px;"><strong>📞</strong> ${agency.PhoneNumber || agency.phone}</p>` : ''}
            ${agency.Email || agency.email ? `<p style="margin: 4px 0; font-size: 12px;"><strong>✉️</strong> ${agency.Email || agency.email}</p>` : ''}
          </div>
        `;
        
        // Bind popup with details
        marker.bindPopup(popupContent, {
          closeButton: false,
          autoClose: false,
          closeOnClick: false,
          className: 'custom-popup-hover',
          offset: [0, -15],
          maxWidth: 280
        });
        
        // Show popup on hover (solo visualizzazione, nessuna interazione)
        marker.on('mouseover', () => {
          marker.openPopup();
        });
        
        marker.on('mouseout', () => {
          marker.closePopup();
        });
        
        // Disabilitare click sui marker (nessuna interazione)
        // marker.on('click', () => {
        //   marker.openPopup();
        //   selectAgency(agency);
        // });

        markers.push(marker);
      }
      
      // Adjust map view based on number of visible agencies
      if (allCoords.length > 0) {
        if (allCoords.length === 1) {
          // Single agency: center on it with appropriate zoom level
          const singleCoords = allCoords[0];
          map!.setView(singleCoords, 13, {
            animate: true,
            duration: 0.5
          });
        } else {
          // Multiple agencies: fit bounds to show all
          const bounds = L.latLngBounds(allCoords);
          map!.fitBounds(bounds, {
            padding: [50, 50], // Add padding around the edges
            maxZoom: 12, // Maximum zoom when showing multiple agencies
            animate: true,
            duration: 0.5
          });
        }
      }
    };

    // Methods
    const selectAgency = (agency: Agency) => {
      emit('agency-select', agency);
    };


    // Lifecycle hooks
    onMounted(() => {
      initMap();
    });

    onUnmounted(() => {
      if (map) {
        map.remove();
        map = null;
      }
    });

    // Watch for changes in agencies list
    watch(() => props.agenciesList, () => {
      if (map) {
        addAgencyMarkers();
      }
    }, { deep: true });

    // Watch for changes in initialAgencyFilter to update selectedAgency
    watch(() => props.initialAgencyFilter, (newValue) => {
      if (newValue) {
        selectedAgency.value = newValue;
        // Emetti l'evento per aggiornare i dati se necessario
        emit('filter-change', {
          year: selectedYear.value,
          agency: newValue
        });
      }
    }, { immediate: false });


    return {
      mapContainer,
      totalAgencies,
      totalAgents,
      animatedTotalAgencies,
      animatedTotalAgents,
      adminName: computed(() => props.adminName || ''),
      availableYears,
      selectedYear,
      selectedAgency,
      onYearChange,
      onAgencyChange,
      agenciesList: computed(() => props.agenciesList),
      agentsList: computed(() => props.agentsList),
      isAdmin: computed(() => props.isAdmin),
      isAgent: computed(() => props.isAgent)
    };
  }
});
</script>

<style scoped>
.widget-13-header {
  padding: 0.5rem 0;
}

.widget-13-filter-badge {
  background: linear-gradient(135deg, rgba(0, 119, 204, 0.05) 0%, rgba(0, 119, 204, 0.1) 100%);
  padding: 0.75rem 1.25rem;
  border-radius: 12px;
  border: 1px solid rgba(0, 119, 204, 0.15);
  flex: 1 1 auto;
  min-width: 140px;
  max-width: 200px;
}

.widget-13-filter-select {
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 6px;
  padding: 4px 8px;
  font-size: 0.8rem;
  width: 100%;
  background-color: #FFFFFF;
  color: #333333;
}

.widget-13-filter-select:hover {
  border-color: rgba(0, 119, 204, 0.5);
}

.widget-13-filter-select:focus {
  border-color: #0077CC;
  outline: none;
}

.widget-13-filter-select:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background-color: #f5f5f5;
}

[data-bs-theme="dark"] .widget-13-filter-badge {
  background: linear-gradient(135deg, rgba(0, 119, 204, 0.1) 0%, rgba(0, 119, 204, 0.2) 100%);
  border-color: rgba(255, 255, 255, 0.1);
}

[data-bs-theme="dark"] .widget-13-filter-select {
  background-color: #2C2C2C;
  border-color: rgba(255, 255, 255, 0.15);
  color: #E0E0E0;
}

.widget-13-filter-select optgroup {
  font-weight: 700;
  color: #0077CC;
}

.widget-13-group-info {
  padding-left: 1rem;
  border-left: 2px solid rgba(0, 119, 204, 0.2);
}

.widget-13-group-badge {
  background: linear-gradient(135deg, rgba(0, 119, 204, 0.05) 0%, rgba(0, 119, 204, 0.1) 100%);
  padding: 0.75rem 1.25rem;
  border-radius: 12px;
  border: 1px solid rgba(0, 119, 204, 0.15);
}

.widget-13-group-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0077CC 0%, #005fa3 100%);
  border-radius: 10px;
  color: white;
  font-size: 1.1rem;
}

.widget-13-total-divider {
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, transparent, rgba(0, 119, 204, 0.3), transparent);
}

.widget-13-counter {
  font-variant-numeric: tabular-nums;
}

[data-bs-theme="dark"] .widget-13-group-info {
  border-left-color: rgba(255, 255, 255, 0.15);
}

[data-bs-theme="dark"] .widget-13-group-badge {
  background: linear-gradient(135deg, rgba(0, 119, 204, 0.1) 0%, rgba(0, 119, 204, 0.2) 100%);
  border-color: rgba(255, 255, 255, 0.1);
}

[data-bs-theme="dark"] .widget-13-total-divider {
  background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.2), transparent);
}

@media (max-width: 991px) {
  .widget-13-group-info {
    border-left: none;
    border-top: 2px solid rgba(0, 119, 204, 0.2);
    padding-left: 0;
    padding-top: 1rem;
    margin-top: 1rem;
  }

  [data-bs-theme="dark"] .widget-13-group-info {
    border-top-color: rgba(255, 255, 255, 0.15);
  }
}

@media (max-width: 576px) {
  .widget-13-group-info {
    flex-direction: column;
    gap: 1rem;
  }

  .widget-13-totals {
    width: 100%;
    justify-content: space-around;
  }
}
</style>

