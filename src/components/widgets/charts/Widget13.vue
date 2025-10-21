<template>
  <!--begin::Agencies Map Widget-->
  <div class="card card-xl-stretch mb-xl-10 map-widget-container">
    <!--begin::Map Background (Full Widget)-->
    <div ref="mapContainer" id="leaflet-map" class="leaflet-map-full-background"></div>
    <!--end::Map Background-->
    
    <!--begin::Content Over Map-->
    <div class="widget-content-overlay">
      <!--begin::Header Vertical Left-->
      <div class="header-vertical-left">
        <!--begin::Title-->
        <div class="mb-3">
          <span class="card-label fw-bold fs-3 text-dark">🗺️ Mappa Agenzie</span>
        </div>
        <!--end::Title-->
        
        <!--begin::Agency Filter-->
        <div class="mb-3">
          <div class="d-flex align-items-center gap-2 mb-2">
            <i class="ki-duotone ki-filter fs-4 text-primary">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            <span class="fw-semibold fs-6 text-gray-700">Agenzia:</span>
          </div>
          <select 
            v-model="selectedAgencyId" 
            @change="onAgencyChange"
            class="form-select form-select-sm agency-filter-vertical-select"
          >
            <option value="">Tutte le agenzie</option>
            <option v-for="agency in agenciesList" :key="agency.id" :value="agency.id">
              {{ agency.name }}
            </option>
          </select>
        </div>
        <!--end::Agency Filter-->
        
        <!--begin::Year Filter-->
        <div class="mb-3">
          <div class="d-flex align-items-center gap-2 mb-2">
            <i class="ki-duotone ki-calendar fs-4 text-primary">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
            <span class="fw-semibold fs-6 text-gray-700">Anno:</span>
          </div>
          <select 
            v-model="selectedYear" 
            @change="onYearChange"
            class="form-select form-select-sm year-filter-vertical-select"
          >
            <option v-for="year in availableYears" :key="year" :value="year">
              {{ year }}
            </option>
          </select>
        </div>
        <!--end::Year Filter-->
        
        <!--begin::Separator-->
        <div class="separator separator-dashed my-3"></div>
        <!--end::Separator-->
        
        <!--begin::Agents Total-->
        <div class="mb-3">
          <div class="d-flex align-items-center gap-2">
            <div class="symbol symbol-35px">
              <span class="symbol-label bg-warning">
                <i class="ki-duotone ki-user-tick fs-4 text-white">
                  <span class="path1"></span>
                  <span class="path2"></span>
                  <span class="path3"></span>
                </i>
              </span>
            </div>
            <div>
              <div class="fw-bold fs-4 text-warning">{{ totalAgents }}</div>
              <div class="text-gray-700 fs-8 fw-semibold">Agenti</div>
            </div>
          </div>
        </div>
        <!--end::Agents Total-->
        
        <!--begin::Agencies Total-->
        <div class="mb-3">
          <div class="d-flex align-items-center gap-2">
            <div class="symbol symbol-35px">
              <span class="symbol-label bg-info">
                <i class="ki-duotone ki-shop fs-4 text-white">
                  <span class="path1"></span>
                  <span class="path2"></span>
                  <span class="path3"></span>
                  <span class="path4"></span>
                  <span class="path5"></span>
                </i>
              </span>
            </div>
            <div>
              <div class="fw-bold fs-4 text-info">{{ totalAgencies }}</div>
              <div class="text-gray-700 fs-8 fw-semibold">Agenzie</div>
            </div>
          </div>
        </div>
        <!--end::Agencies Total-->
        
        <!--begin::Separator-->
        <div class="separator separator-dashed my-3"></div>
        <!--end::Separator-->
        
        <!--begin::Sold Properties-->
        <div class="mb-3">
          <div class="d-flex align-items-center gap-2">
            <div class="symbol symbol-35px">
              <span class="symbol-label bg-success">
                <i class="ki-duotone ki-check-circle fs-4 text-white">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
              </span>
            </div>
            <div>
              <div class="fw-bold fs-4 text-success">{{ soldProperties }}</div>
              <div class="text-gray-700 fs-8 fw-semibold">Immobili Venduti</div>
            </div>
          </div>
        </div>
        <!--end::Sold Properties-->
        
        <!--begin::Rented Properties-->
        <div class="mb-3">
          <div class="d-flex align-items-center gap-2">
            <div class="symbol symbol-35px">
              <span class="symbol-label bg-primary">
                <i class="ki-duotone ki-home-2 fs-4 text-white">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
              </span>
            </div>
            <div>
              <div class="fw-bold fs-4 text-primary">{{ rentedProperties }}</div>
              <div class="text-gray-700 fs-8 fw-semibold">Immobili Affittati</div>
            </div>
          </div>
        </div>
        <!--end::Rented Properties-->
        
        <!--begin::Auction Properties-->
        <div class="mb-2">
          <div class="d-flex align-items-center gap-2">
            <div class="symbol symbol-35px">
              <span class="symbol-label bg-danger">
                <i class="ki-duotone ki-euro fs-4 text-white">
                  <span class="path1"></span>
                  <span class="path2"></span>
                  <span class="path3"></span>
                </i>
              </span>
            </div>
            <div>
              <div class="fw-bold fs-4 text-danger">{{ auctionProperties }}</div>
              <div class="text-gray-700 fs-8 fw-semibold">Immobili Asta</div>
            </div>
          </div>
        </div>
        <!--end::Auction Properties-->
      </div>
      <!--end::Header Vertical Left-->
      
      <!--begin::Body-->
      <div class="card-body p-0 position-relative body-overlay">
        <!-- Map content only -->
      </div>
      <!--end::Body-->
    </div>
    <!--end::Content Over Map-->
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
  town: string;
  region: string;
  phone?: string;
  color?: string;
  Address?: string;
  Town?: string;
  Region?: string;
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
    totalAgents: {
      type: Number,
      default: 0
    },
    selectedAgency: {
      type: String,
      default: ''
    },
    selectedYear: {
      type: Number,
      default: () => new Date().getFullYear()
    },
    soldProperties: {
      type: Number,
      default: 0
    },
    rentedProperties: {
      type: Number,
      default: 0
    },
    auctionProperties: {
      type: Number,
      default: 0
    }
  },
  emits: ['agency-select', 'agency-change', 'year-change'],
  setup(props, { emit }) {
    // Agency filter
    const selectedAgencyId = ref<string>(props.selectedAgency || '');
    
    // Year filter
    const selectedYear = ref<number>(props.selectedYear);
    const currentYear = new Date().getFullYear();
    const availableYears = computed(() => {
      const years = [];
      for (let i = 0; i < 6; i++) {
        years.push(currentYear - i);
      }
      return years;
    });

    // Map reference
    const mapContainer = ref<HTMLElement | null>(null);
    let map: L.Map | null = null;
    const markers: L.Marker[] = [];

    // Calculate total agencies
    const totalAgencies = computed(() => props.agenciesList.length);

    // Get main agency coordinates (first agency or agency with specific criteria)
    const getMainAgencyCoords = (): [number, number] => {
      if (props.agenciesList.length === 0) {
        return [41.9, 12.5]; // Default to Lazio region
      }

      // Use the first agency as main agency
      const mainAgency = props.agenciesList[0];
      const address = mainAgency.Address || mainAgency.address || '';
      const town = mainAgency.Town || mainAgency.town || '';
      const region = mainAgency.Region || mainAgency.region || '';

      // Try to geocode the main agency
      if (address && town) {
        // For synchronous use, we'll use fallback coordinates
        const normalizedTown = normalizeCityName(town).toLowerCase();
        
        // Check if we have coordinates in our fallback database
        const fallbackCoords = getCityFallbackCoords(town);
        if (fallbackCoords[0] !== 42.5 || fallbackCoords[1] !== 13.0) { // Not default coordinates
          return fallbackCoords;
        }
      }

      return [41.9, 12.5]; // Default to Lazio region
    };

    // Initialize Leaflet map
    const initMap = () => {
      if (!mapContainer.value) return;

      // Get main agency coordinates
      const mainCoords = getMainAgencyCoords();

      // Create map centered on main agency with wider view (completely static)
      map = L.map(mapContainer.value, {
        center: mainCoords,
        zoom: 9.56, // Increased by 5% from 9.1 (9.1 * 1.05 = 9.555)
        zoomControl: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        dragging: false,
        touchZoom: false,
        boxZoom: false,
        keyboard: false
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
    const geocodeAddress = async (address: string, town: string, province?: string): Promise<[number, number] | null> => {
      try {
        // Normalize names
        const normalizedTown = normalizeCityName(town);
        const normalizedAddress = normalizeCityName(address);
        const normalizedProvince = province ? normalizeProvince(province) : '';
        
        // Try with full address first for better precision
        let fullAddress;
        if (normalizedAddress && normalizedProvince) {
          fullAddress = `${normalizedAddress}, ${normalizedTown}, ${normalizedProvince}, Italia`;
        } else if (normalizedAddress) {
          fullAddress = `${normalizedAddress}, ${normalizedTown}, Italia`;
        } else if (normalizedProvince) {
          fullAddress = `${normalizedTown}, ${normalizedProvince}, Italia`;
        } else {
          fullAddress = `${normalizedTown}, Italia`;
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
    const getCityFallbackCoords = (town: string): [number, number] => {
      // Normalize the town name for lookup
      const normalizedTown = normalizeCityName(town).toLowerCase();
      
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
      if (cityCoordinates[normalizedTown]) {
        return cityCoordinates[normalizedTown];
      }
      
      // Partial match
      for (const [city, coords] of Object.entries(cityCoordinates)) {
        if (normalizedTown.includes(city) || city.includes(normalizedTown)) {
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

      // Highlight color for selected agency
      const highlightColor = '#FFD700'; // Gold

      // Process each agency
      for (let index = 0; index < props.agenciesList.length; index++) {
        const agency = props.agenciesList[index];
        const address = agency.Address || agency.address || '';
        const town = agency.Town || agency.town || '';
        const region = agency.Region || agency.region || '';
        const agencyName = agency.UserName || agency.userName || agency.name || 'Agenzia';
        
        let coords: [number, number] | null = null;

        // Try to geocode the full address with region
        if (address && town) {
          coords = await geocodeAddress(address, town, region);
          
          if (!coords) {
            // Try again with just town and province if full address fails
            coords = await geocodeAddress('', town, region);
          }
          
          // Add small delay to respect rate limits
          await new Promise(resolve => setTimeout(resolve, 200));
        }

        // Fallback to city coordinates if geocoding fails
        if (!coords && town) {
          coords = getCityFallbackCoords(town);
        }

        // Ultimate fallback
        if (!coords) {
          coords = [42.5, 13.0];
        }

        // Check if this agency is selected
        const isSelected = selectedAgencyId.value && 
                          agency.id === selectedAgencyId.value;
        
        // Assign color: gold if selected, otherwise from array
        const color = isSelected ? highlightColor : markerColors[index % markerColors.length];
        const markerSize = isSelected ? 32 : 26;
        const borderWidth = isSelected ? 5 : 4;
        const pulseAnimation = isSelected ? 'animation: pulse 2s infinite;' : '';
        
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
              box-shadow: 0 ${isSelected ? 6 : 3}px ${isSelected ? 16 : 12}px rgba(0,0,0,${isSelected ? 0.5 : 0.35});
              ${pulseAnimation}
              transition: all 0.3s ease;
            "></div>
            ${isSelected ? `
              <style>
                @keyframes pulse {
                  0%, 100% { transform: scale(1); }
                  50% { transform: scale(1.15); }
                }
              </style>
            ` : ''}
          `,
          iconSize: [markerSize, markerSize],
          iconAnchor: [markerSize / 2, markerSize / 2]
        });

        const marker = L.marker(coords, { icon: customIcon }).addTo(map!);
        
        // Add coordinates to existing list for future reference
        existingCoords.push(coords);
        allCoords.push(coords); // Store for bounds calculation
        
        // Create popup content with UserName and address
        const userName = agency.UserName || agency.userName || agency.name || 'Agenzia';
        const fullAddress = `${address || ''}${address && town ? ', ' : ''}${town || ''}`.trim();
        
        const popupContent = `
          <div style="min-width: 220px; text-align: left;">
            <h4 style="margin: 0 0 8px 0; color: ${color}; font-weight: bold; font-size: 14px;">${userName}</h4>
            <p style="margin: 4px 0; font-size: 12px; color: #666;"><strong>📍</strong> ${fullAddress}</p>
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
        
        // Show popup on hover
        marker.on('mouseover', () => {
          marker.openPopup();
        });
        
        marker.on('mouseout', () => {
          marker.closePopup();
        });
        
        // Click event to select agency (and keep popup open)
        marker.on('click', () => {
          marker.openPopup();
          selectAgency(agency);
        });

        markers.push(marker);
      }
      
      // Automatically adjust map view to show all markers
      if (allCoords.length > 0) {
        const bounds = L.latLngBounds(allCoords);
        map!.fitBounds(bounds, {
          padding: [50, 50], // Add padding around the edges
          maxZoom: 10.3 // Don't zoom in too much (12 - 15% = 10.3, accounting for left panel)
        });
      }
    };

    // Methods
    const selectAgency = (agency: Agency) => {
      emit('agency-select', agency);
    };

    const onAgencyChange = () => {
      emit('agency-change', selectedAgencyId.value);
    };
    
    const onYearChange = () => {
      emit('year-change', selectedYear.value);
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

    // Watch for changes in selectedAgency prop
    watch(() => props.selectedAgency, (newValue) => {
      selectedAgencyId.value = newValue || '';
      // Re-render markers to highlight selected agency
      if (map) {
        addAgencyMarkers();
      }
    });

    // Watch for changes in selectedAgencyId to update markers
    watch(selectedAgencyId, () => {
      if (map) {
        addAgencyMarkers();
      }
    });
    
    // Watch for changes in selectedYear prop
    watch(() => props.selectedYear, (newYear) => {
      selectedYear.value = newYear;
    });

    return {
      mapContainer,
      totalAgencies,
      selectedAgencyId,
      selectedYear,
      availableYears,
      onAgencyChange,
      onYearChange
    };
  }
});
</script>

<style scoped>
/* Map Widget Container */
.map-widget-container {
  position: relative;
  overflow: hidden;
  min-height: 550px;
}

/* Map Background - Full Widget Coverage */
.leaflet-map-full-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 550px;
  z-index: 1;
  border-radius: 0.75rem;
}

/* Widget Content Overlay */
.widget-content-overlay {
  position: relative;
  width: 100%;
  min-height: 550px;
  z-index: 10;
  background: transparent;
  pointer-events: none;
}

.widget-content-overlay > * {
  pointer-events: auto;
}

/* Ensure map remains interactive */
.leaflet-map-full-background {
  pointer-events: auto !important;
}

/* Header Vertical Left */
.header-vertical-left {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 100;
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(30px);
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(225, 229, 233, 0.25);
  min-width: 280px;
  max-width: 320px;
}

/* Body Overlay */
.body-overlay {
  min-height: 450px;
  padding: 1rem;
  pointer-events: none;
}

:deep(.leaflet-container) {
  height: 100%;
  width: 100%;
  border-radius: 0.75rem;
  cursor: default !important;
  opacity: 0.7;
  filter: brightness(0.9) contrast(1.1);
}

:deep(.leaflet-container .leaflet-interactive) {
  cursor: pointer !important;
}

:deep(.custom-marker) {
  background: transparent !important;
  border: none !important;
  z-index: 1000 !important;
}

:deep(.leaflet-marker-pane) {
  z-index: 1000 !important;
}

/* Pulse animation for selected marker */
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.15);
    opacity: 0.9;
  }
}

:deep(.leaflet-popup-content-wrapper) {
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

:deep(.leaflet-popup-content) {
  margin: 12px;
  font-family: inherit;
}

/* Custom Tooltip (Nuvoletta) */
:deep(.custom-tooltip) {
  background: rgba(255, 255, 255, 0.95) !important;
  border: 1px solid rgba(0, 0, 0, 0.1) !important;
  border-radius: 8px !important;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.15) !important;
  padding: 6px 10px !important;
  font-family: inherit !important;
  white-space: nowrap !important;
  backdrop-filter: blur(5px) !important;
}

:deep(.custom-tooltip::before) {
  border-top-color: rgba(255, 255, 255, 0.95) !important;
}

:deep(.leaflet-tooltip-top::before) {
  border-top-color: rgba(255, 255, 255, 0.95) !important;
}

:deep(.leaflet-tooltip-bottom::before) {
  border-bottom-color: rgba(255, 255, 255, 0.95) !important;
}

:deep(.leaflet-tooltip-left::before) {
  border-left-color: rgba(255, 255, 255, 0.95) !important;
}

:deep(.leaflet-tooltip-right::before) {
  border-right-color: rgba(255, 255, 255, 0.95) !important;
}

/* Custom Popup Styles for Hover */
:deep(.custom-popup-hover) {
  z-index: 10000 !important;
}

:deep(.custom-popup-hover .leaflet-popup-content-wrapper) {
  background: #ffffff !important;
  border-radius: 0.75rem !important;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3) !important;
  border: 3px solid #3699ff !important;
  padding: 0 !important;
  pointer-events: auto !important;
  opacity: 1 !important;
}

:deep(.custom-popup-hover .leaflet-popup-content) {
  margin: 14px !important;
  line-height: 1.5 !important;
  min-width: 200px !important;
  color: #1e1e2d !important;
  font-size: 13px !important;
}

:deep(.custom-popup-hover .leaflet-popup-tip) {
  background: #ffffff !important;
  border: 3px solid #3699ff !important;
  border-top: none !important;
  border-left: none !important;
}

:deep(.custom-popup-hover .leaflet-popup-close-button) {
  display: none !important;
}

/* Ensure popup and markers are above everything (including the vertical panel) */
:deep(.leaflet-popup-pane) {
  z-index: 10000 !important;
}

:deep(.leaflet-popup) {
  z-index: 10000 !important;
}

:deep(.leaflet-marker-icon) {
  z-index: 1000 !important;
}

:deep(.leaflet-shadow-pane) {
  z-index: 999 !important;
}

/* Custom Popup Styles (legacy) */
:deep(.custom-popup .leaflet-popup-content-wrapper) {
  background: rgba(255, 255, 255, 0.98) !important;
  border-radius: 0.75rem !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15) !important;
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  backdrop-filter: blur(10px) !important;
  padding: 0 !important;
}

:deep(.custom-popup .leaflet-popup-content) {
  margin: 12px !important;
  line-height: 1.4 !important;
}

:deep(.custom-popup .leaflet-popup-tip) {
  background: rgba(255, 255, 255, 0.98) !important;
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  backdrop-filter: blur(10px) !important;
}

:deep(.custom-popup .leaflet-popup-close-button) {
  color: #666 !important;
  font-size: 18px !important;
  font-weight: bold !important;
  right: 8px !important;
  top: 8px !important;
  transition: color 0.2s ease !important;
}

:deep(.custom-popup .leaflet-popup-close-button:hover) {
  color: #333 !important;
}

/* KPI Overlay */
.kpi-overlay {
  position: absolute;
  top: 15px;
  left: 15px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 20;
}

.kpi-card {
  background: rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(15px);
  border-radius: 0.65rem;
  padding: 0.85rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.35);
  transition: all 0.3s ease;
  min-width: 150px;
}

.kpi-card:hover {
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.15);
  transform: translateY(-3px) scale(1.02);
  border-color: rgba(54, 153, 255, 0.5);
}

/* Year Filter */
.year-filter-elegant {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(54, 153, 255, 0.2);
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  backdrop-filter: blur(5px);
}

.year-filter-elegant-select {
  background: transparent !important;
  border: none !important;
  color: #3f4254 !important;
  font-weight: 500 !important;
  font-size: 13px !important;
  padding: 2px 8px !important;
  width: 80px !important;
  appearance: none !important;
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
}

.year-filter-elegant-select:focus {
  outline: none !important;
  box-shadow: none !important;
}


/* Agency Filter Vertical Select */
.agency-filter-vertical-select {
  background: #ffffff !important;
  border: 1px solid #e1e5e9 !important;
  border-radius: 0.5rem !important;
  color: #1e1e2d !important;
  font-weight: 600 !important;
  font-size: 13px !important;
  padding: 8px 12px !important;
  width: 100% !important;
  transition: all 0.3s ease !important;
  appearance: none !important;
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.agency-filter-vertical-select:focus {
  background: #ffffff !important;
  border-color: #3699ff !important;
  box-shadow: 0 0 0 3px rgba(54, 153, 255, 0.15) !important;
  outline: none !important;
}

.agency-filter-vertical-select:hover {
  border-color: #3699ff !important;
  box-shadow: 0 4px 10px rgba(54, 153, 255, 0.12);
}

.agency-filter-vertical-select option {
  background: white !important;
  color: #3f4254 !important;
  font-weight: 500 !important;
  padding: 8px 12px !important;
}

/* Year Filter Vertical Select */
.year-filter-vertical-select {
  background: #ffffff !important;
  border: 1px solid #e1e5e9 !important;
  border-radius: 0.5rem !important;
  color: #1e1e2d !important;
  font-weight: 600 !important;
  font-size: 13px !important;
  padding: 8px 12px !important;
  width: 100% !important;
  transition: all 0.3s ease !important;
  appearance: none !important;
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.year-filter-vertical-select:focus {
  background: #ffffff !important;
  border-color: #3699ff !important;
  box-shadow: 0 0 0 3px rgba(54, 153, 255, 0.15) !important;
  outline: none !important;
}

.year-filter-vertical-select:hover {
  border-color: #3699ff !important;
  box-shadow: 0 4px 10px rgba(54, 153, 255, 0.12);
}

.year-filter-vertical-select option {
  background: white !important;
  color: #3f4254 !important;
  font-weight: 500 !important;
  padding: 8px 12px !important;
}

/* Responsive */
@media (max-width: 1200px) {
  .header-vertical-left {
    min-width: 240px;
    max-width: 280px;
    padding: 1.25rem;
  }
}

@media (max-width: 768px) {
  .map-widget-container {
    min-height: 450px;
  }
  
  .leaflet-map-full-background {
    height: 400px;
  }
  
  .widget-content-overlay {
    height: 400px;
  }
  
  .body-overlay {
    height: 400px;
  }
  
  .header-vertical-left {
    top: 10px;
    left: 10px;
    min-width: 200px;
    max-width: 240px;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(25px);
  }
  
  .agency-filter-vertical-select {
    font-size: 12px !important;
    padding: 6px 10px !important;
  }
}
</style>
