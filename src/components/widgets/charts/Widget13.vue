<template>
  <!--begin::Agencies Map Widget-->
  <div class="card card-xl-stretch mb-xl-10 map-widget-container">
    <!--begin::Card Header with Filters and Stats-->
    <div class="card-header widget-13-header">
      <!--begin::Unified Controls Row-->
      <div class="d-flex flex-column flex-lg-row align-items-start align-items-lg-center justify-content-between gap-3 gap-lg-4 widget-13-unified-row  my-5">
        <!--begin::Filters Section-->
        <div class="d-flex flex-column flex-md-row gap-3 widget-13-filters-section">
          <!--begin::Agency Filter-->
          <div v-if="!isAgent" class="widget-13-filter-item">
            <label class="widget-13-filter-label">
              <i class="ki-duotone ki-filter fs-5">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
              <span class="fw-semibold">Agenzia</span>
            </label>
            <select 
              v-model="selectedAgencyId" 
              @change="onAgencyChange"
              class="form-select widget-13-filter-select"
            >
              <option value="">Tutte le agenzie</option>
              <option v-for="agency in agenciesList" :key="agency.id" :value="agency.id">
                {{ agency.name }}
              </option>
            </select>
          </div>
          <!--end::Agency Filter-->
          
          <!--begin::Year Filter-->
          <div class="widget-13-filter-item">
            <label class="widget-13-filter-label">
              <i class="ki-duotone ki-calendar fs-5">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
              <span class="fw-semibold">Anno</span>
            </label>
            <select 
              v-model="selectedYear" 
              @change="onYearChange"
              class="form-select widget-13-filter-select"
            >
              <option v-for="year in availableYears" :key="year" :value="year">
                {{ year }}
              </option>
            </select>
          </div>
          <!--end::Year Filter-->
        </div>
        <!--end::Filters Section-->
        
        <!--begin::KPI Stats Section-->
        <div class="d-flex flex-wrap gap-2 gap-md-3 justify-content-start justify-content-lg-end flex-grow-1 widget-13-kpi-section">
          <!--begin::Agents Total-->
          <div v-if="!isAgent" class="widget-13-kpi-item">
            <div class="symbol symbol-40px">
              <span class="symbol-label bg-warning">
                <i class="ki-duotone ki-user-tick fs-5 text-white">
                  <span class="path1"></span>
                  <span class="path2"></span>
                  <span class="path3"></span>
                </i>
              </span>
            </div>
            <div class="widget-13-kpi-content">
              <div class="fw-bold fs-4 text-warning">{{ totalAgents }}</div>
              <div class="text-gray-600 fs-7 fw-semibold">Agenti</div>
            </div>
          </div>
          <!--end::Agents Total-->
          
          <!--begin::Agencies Total-->
          <div v-if="!isAgent" class="widget-13-kpi-item">
            <div class="symbol symbol-40px">
              <span class="symbol-label bg-info">
                <i class="ki-duotone ki-shop fs-5 text-white">
                  <span class="path1"></span>
                  <span class="path2"></span>
                  <span class="path3"></span>
                  <span class="path4"></span>
                  <span class="path5"></span>
                </i>
              </span>
            </div>
            <div class="widget-13-kpi-content">
              <div class="fw-bold fs-4 text-info">{{ totalAgencies }}</div>
              <div class="text-gray-600 fs-7 fw-semibold">Agenzie</div>
            </div>
          </div>
          <!--end::Agencies Total-->
          
          <!--begin::Sold Properties-->
          <div class="widget-13-kpi-item">
            <div class="symbol symbol-40px">
              <span class="symbol-label bg-success">
                <i class="ki-duotone ki-check-circle fs-5 text-white">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
              </span>
            </div>
            <div class="widget-13-kpi-content">
              <div class="fw-bold fs-4 text-success">{{ soldProperties }}</div>
              <div class="text-gray-600 fs-7 fw-semibold">Venduti</div>
            </div>
          </div>
          <!--end::Sold Properties-->
          
          <!--begin::Rented Properties-->
          <div class="widget-13-kpi-item">
            <div class="symbol symbol-40px">
              <span class="symbol-label bg-primary">
                <i class="ki-duotone ki-home-2 fs-5 text-white">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
              </span>
            </div>
            <div class="widget-13-kpi-content">
              <div class="fw-bold fs-4 text-primary">{{ rentedProperties }}</div>
              <div class="text-gray-600 fs-7 fw-semibold">Affittati</div>
            </div>
          </div>
          <!--end::Rented Properties-->
          
          <!--begin::Auction Properties-->
          <div class="widget-13-kpi-item">
            <div class="symbol symbol-40px">
              <span class="symbol-label bg-danger">
                <i class="ki-duotone ki-euro fs-5 text-white">
                  <span class="path1"></span>
                  <span class="path2"></span>
                  <span class="path3"></span>
                </i>
              </span>
            </div>
            <div class="widget-13-kpi-content">
              <div class="fw-bold fs-4 text-danger">{{ auctionProperties }}</div>
              <div class="text-gray-600 fs-7 fw-semibold">Asta</div>
            </div>
          </div>
          <!--end::Auction Properties-->
        </div>
        <!--end::KPI Stats Section-->
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
  phone?: string;
  color?: string;
  Address?: string;
  City?: string;
  Province?: string;
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
    isAgent: {
      type: Boolean,
      default: false
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
      map = L.map(mapContainer.value, {
        center: mainCoords,
        zoom: 9.56, // Initial zoom, will be adjusted based on visible agencies
        zoomControl: false,
        scrollWheelZoom: true,
        doubleClickZoom: false,
        dragging: true,
        touchZoom: true,
        boxZoom: true,
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
    const geocodeAddress = async (address: string, city: string, province?: string): Promise<[number, number] | null> => {
      try {
        // Normalize names
        const normalizedCity = normalizeCityName(city);
        const normalizedAddress = normalizeCityName(address);
        const normalizedProvince = province ? normalizeProvince(province) : '';
        
        // Try with full address first for better precision
        let fullAddress;
        if (normalizedAddress && normalizedProvince) {
          fullAddress = `${normalizedAddress}, ${normalizedCity}, ${normalizedProvince}, Italia`;
        } else if (normalizedAddress) {
          fullAddress = `${normalizedAddress}, ${normalizedCity}, Italia`;
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

      // Filter agencies based on selectedAgencyId
      const visibleAgencies = selectedAgencyId.value 
        ? props.agenciesList.filter(agency => agency.id === selectedAgencyId.value)
        : props.agenciesList;

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

      // Process each visible agency
      for (let index = 0; index < visibleAgencies.length; index++) {
        const agency = visibleAgencies[index];
        const address = agency.Address || agency.address || '';
        const city = agency.City || agency.city || '';
        const province = agency.Province || agency.province || '';
        const agencyName = agency.UserName || agency.userName || agency.name || 'Agency';
        
        let coords: [number, number] | null = null;

        // Try to geocode the full address with province
        if (address && city) {
          coords = await geocodeAddress(address, city, province);
          
          if (!coords) {
            // Try again with just city and province if full address fails
            coords = await geocodeAddress('', city, province);
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
        const userName = agency.UserName || agency.userName || agency.name || 'Agency';
        const fullAddress = `${address || ''}${address && city ? ', ' : ''}${city || ''}`.trim();
        
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

