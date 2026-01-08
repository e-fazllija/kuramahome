<template>
  <!--begin::Tables widget 7-->
  <div class="card card-flush" :class="className">
    <!--begin::Header-->
    <div class="card-header pt-5">
      <!--begin::Title-->
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold text-gray-800">📊 Classifiche & Distribuzioni</span>
        <span class="text-gray-400 mt-1 fw-semibold fs-6">Analisi dettagliata del portafoglio</span>
      </h3>
      <!--end::Title-->
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body pt-6">
      <!--begin::Nav-->
      <ul class="nav nav-pills nav-pills-custom mb-3">
        <template v-for="(item, i) in items" :key="i">
          <!--begin::Item-->
          <li class="nav-item mb-3 me-3 me-lg-6">
            <!--begin::Link-->
            <a
              class="nav-link btn btn-outline btn-flex btn-color-muted btn-active-color-primary flex-column overflow-hidden w-80px h-85px pt-5 pb-2"
              :class="[i === activeTab && 'active']"
              :id="`kt_stats_widget_7_tab_link_${i}`"
              @click.prevent="setActiveTab(i)"
            >
              <!--begin::Icon-->
              <div class="nav-icon mb-3">
                <KTIcon :icon-name="item.icon" icon-class="fs-1 p-0" />
              </div>
              <!--end::Icon-->

              <!--begin::Title-->
              <span class="nav-text text-gray-800 fw-bold fs-6 lh-1">
                {{ item.title }}
              </span>
              <!--end::Title-->

              <!--begin::Bullet-->
              <span
                class="bullet-custom position-absolute bottom-0 w-100 h-4px bg-primary"
              ></span>
              <!--end::Bullet-->
            </a>
            <!--end::Link-->
          </li>
          <!--end::Item-->
        </template>
      </ul>
      <!--end::Nav-->

      <!--begin::Tab Content-->
      <div class="tab-content">
        <template v-for="(item, i) in items" :key="i">
          <!--begin::Tap pane-->
          <div
            class="tab-pane fade"
            :class="[i === activeTab && 'active show']"
            :id="`kt_stats_widget_7_tab_${i}`"
          >
            <!--begin::Top Agenzie Layout-->
            <div v-if="i === 0">
              <!--begin::Filtro Anno-->
              <div class="d-flex justify-content-end align-items-center mb-4">
                <label class="form-label text-muted fs-7 me-3 mb-0">Filtra per anno:</label>
                <select 
                  v-model.number="selectedYearAgencies" 
                  class="form-select form-select-sm w-auto"
                  style="min-width: 100px;"
                  @change="handleYearAgenciesChange"
                >
                  <option v-for="year in availableYears" :key="year" :value="year">
                    {{ year }}
                  </option>
                </select>
              </div>
              <!--end::Filtro Anno-->
              <div class="table-responsive">
                <table class="table table-row-dashed align-middle gs-0 gy-3 my-0">
                    <thead>
                      <tr class="fs-7 fw-bold text-gray-400 border-bottom-0">
                        <th class="p-0 pb-3 min-w-50px text-center">#</th>
                        <th class="p-0 pb-3 min-w-200px text-center">NOME</th>
                        <th 
                          class="p-0 pb-3 min-w-100px text-center sortable-column" 
                          @click="handleSortAgencies('properties')"
                          :class="{ 'active-sort': sortByAgencies === 'properties' }"
                          style="cursor: pointer;"
                        >
                          <div class="d-flex align-items-center justify-content-center">
                            <span>IMMOBILI</span>
                            <span v-if="sortByAgencies === 'properties'" class="ms-2">
                              <i :class="sortOrderAgencies === 'asc' ? 'ki-outline ki-arrow-up fs-8' : 'ki-outline ki-arrow-down fs-8'"></i>
                            </span>
                          </div>
                        </th>
                        <th 
                          class="p-0 pb-3 min-w-100px text-center sortable-column" 
                          @click="handleSortAgencies('customers')"
                          :class="{ 'active-sort': sortByAgencies === 'customers' }"
                          style="cursor: pointer;"
                        >
                          <div class="d-flex align-items-center justify-content-center">
                            <span>CLIENTI</span>
                            <span v-if="sortByAgencies === 'customers'" class="ms-2">
                              <i :class="sortOrderAgencies === 'asc' ? 'ki-outline ki-arrow-up fs-8' : 'ki-outline ki-arrow-down fs-8'"></i>
                            </span>
                          </div>
                        </th>
                        <th 
                          class="p-0 pb-3 min-w-100px text-center sortable-column" 
                          @click="handleSortAgencies('requests')"
                          :class="{ 'active-sort': sortByAgencies === 'requests' }"
                          style="cursor: pointer;"
                        >
                          <div class="d-flex align-items-center justify-content-center">
                            <span>RICHIESTE</span>
                            <span v-if="sortByAgencies === 'requests'" class="ms-2">
                              <i :class="sortOrderAgencies === 'asc' ? 'ki-outline ki-arrow-up fs-8' : 'ki-outline ki-arrow-down fs-8'"></i>
                            </span>
                          </div>
                        </th>
                        <th 
                          class="p-0 pb-3 min-w-100px text-center sortable-column" 
                          @click="handleSortAgencies('soldProperties')"
                          :class="{ 'active-sort': sortByAgencies === 'soldProperties' }"
                          style="cursor: pointer;"
                        >
                          <div class="d-flex align-items-center justify-content-center">
                            <span>VENDITE</span>
                            <span v-if="sortByAgencies === 'soldProperties'" class="ms-2">
                              <i :class="sortOrderAgencies === 'asc' ? 'ki-outline ki-arrow-up fs-8' : 'ki-outline ki-arrow-down fs-8'"></i>
                            </span>
                          </div>
                        </th>
                        <th 
                          class="p-0 pb-3 min-w-100px text-center sortable-column" 
                          @click="handleSortAgencies('appointments')"
                          :class="{ 'active-sort': sortByAgencies === 'appointments' }"
                          style="cursor: pointer;"
                        >
                          <div class="d-flex align-items-center justify-content-center">
                            <span>APPUNTAMENTI</span>
                            <span v-if="sortByAgencies === 'appointments'" class="ms-2">
                              <i :class="sortOrderAgencies === 'asc' ? 'ki-outline ki-arrow-up fs-8' : 'ki-outline ki-arrow-down fs-8'"></i>
                            </span>
                          </div>
                        </th>
                        <th 
                          class="p-0 pb-3 min-w-120px text-center sortable-column" 
                          @click="handleSortAgencies('commissions')"
                          :class="{ 'active-sort': sortByAgencies === 'commissions' }"
                          style="cursor: pointer;"
                        >
                          <div class="d-flex align-items-center justify-content-center">
                            <span>TOT PROVVIGIONI INCASSATE</span>
                            <span v-if="sortByAgencies === 'commissions'" class="ms-2">
                              <i :class="sortOrderAgencies === 'asc' ? 'ki-outline ki-arrow-up fs-8' : 'ki-outline ki-arrow-down fs-8'"></i>
                            </span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                  <tbody>
                    <template v-if="getTableData(i).length > 0">
                      <tr v-for="(row, j) in getTableData(i)" :key="row.id || j">
                        <td>
                          <div class="symbol symbol-40px me-3">
                            <span :class="[
                              'symbol-label text-white fw-bold fs-7',
                              j === 0 ? 'bg-warning' : j === 1 ? 'bg-secondary' : j === 2 ? 'bg-info' : 'bg-primary'
                            ]">
                              {{ j === 0 ? '🥇' : j === 1 ? '🥈' : j === 2 ? '🥉' : j + 1 }}
                            </span>
                          </div>
                        </td>
                        <td>
                          <div class="d-flex justify-content-start flex-column">
                            <span class="text-gray-800 fw-bold text-hover-primary mb-1 fs-6">
                              {{ row.name }}
                            </span>
                            <span class="text-gray-400 fw-semibold d-block fs-7">
                              {{ row.location || '' }}
                            </span>
                          </div>
                        </td>
                          <td class="text-end pe-0">
                            <span class="text-gray-600 fw-bold fs-6">
                              {{ row.properties || 0 }}
                            </span>
                          </td>
                          <td class="text-end pe-0">
                            <span class="text-gray-600 fw-bold fs-6">
                              {{ row.customers || 0 }}
                            </span>
                          </td>
                          <td class="text-end pe-0">
                            <span class="text-gray-600 fw-bold fs-6">
                              {{ row.requests || 0 }}
                            </span>
                          </td>
                          <td class="text-end pe-0">
                            <span class="text-gray-600 fw-bold fs-6">
                              {{ row.soldProperties || 0 }}
                            </span>
                          </td>
                          <td class="text-end pe-0">
                            <span class="text-gray-600 fw-bold fs-6">
                              {{ row.appointments || 0 }}
                            </span>
                          </td>
                          <td class="text-end pe-0">
                            <span class="text-gray-600 fw-bold fs-6">
                              {{ formatCurrency(row.commissions || 0) }}
                            </span>
                          </td>
                      </tr>
                    </template>
                    <template v-else>
                      <tr>
                        <td colspan="8" class="text-center py-10">
                          <span class="text-gray-400 fw-semibold fs-7">Nessun dato disponibile</span>
                        </td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>
            </div>
            <!--end::Top Agenzie Layout-->

            <!--begin::Top Agenti Layout-->
            <div v-else-if="i === 1">
              <!--begin::Filtro Anno-->
              <div class="d-flex justify-content-end align-items-center mb-4">
                <label class="form-label text-muted fs-7 me-3 mb-0">Filtra per anno:</label>
                <select 
                  v-model.number="selectedYearAgents" 
                  class="form-select form-select-sm w-auto"
                  style="min-width: 100px;"
                  @change="handleYearAgentsChange"
                >
                  <option v-for="year in availableYears" :key="year" :value="year">
                    {{ year }}
                  </option>
                </select>
              </div>
              <!--end::Filtro Anno-->
              <div class="table-responsive">
                <table class="table table-row-dashed align-middle gs-0 gy-3 my-0">
                  <thead>
                    <tr class="fs-7 fw-bold text-gray-400 border-bottom-0">
                      <th class="p-0 pb-3 min-w-50px text-center">#</th>
                      <th class="p-0 pb-3 min-w-200px text-center">NOME</th>
                      <th 
                        class="p-0 pb-3 min-w-100px text-center sortable-column" 
                        @click="handleSortAgents('soldProperties')"
                        :class="{ 'active-sort': sortByAgents === 'soldProperties' }"
                        style="cursor: pointer;"
                      >
                        <div class="d-flex align-items-center justify-content-center">
                          <span>IMMOBILI VENDUTI</span>
                          <span v-if="sortByAgents === 'soldProperties'" class="ms-2">
                            <i :class="sortOrderAgents === 'asc' ? 'ki-outline ki-arrow-up fs-8' : 'ki-outline ki-arrow-down fs-8'"></i>
                          </span>
                        </div>
                      </th>
                      <th 
                        class="p-0 pb-3 min-w-100px text-center sortable-column" 
                        @click="handleSortAgents('loadedProperties')"
                        :class="{ 'active-sort': sortByAgents === 'loadedProperties' }"
                        style="cursor: pointer;"
                      >
                        <div class="d-flex align-items-center justify-content-center">
                          <span>IMMOBILI CARICATI</span>
                          <span v-if="sortByAgents === 'loadedProperties'" class="ms-2">
                            <i :class="sortOrderAgents === 'asc' ? 'ki-outline ki-arrow-up fs-8' : 'ki-outline ki-arrow-down fs-8'"></i>
                          </span>
                        </div>
                      </th>
                      <th 
                        class="p-0 pb-3 min-w-100px text-center sortable-column" 
                        @click="handleSortAgents('requests')"
                        :class="{ 'active-sort': sortByAgents === 'requests' }"
                        style="cursor: pointer;"
                      >
                        <div class="d-flex align-items-center justify-content-center">
                          <span>RICHIESTE</span>
                          <span v-if="sortByAgents === 'requests'" class="ms-2">
                            <i :class="sortOrderAgents === 'asc' ? 'ki-outline ki-arrow-up fs-8' : 'ki-outline ki-arrow-down fs-8'"></i>
                          </span>
                        </div>
                      </th>
                      <th 
                        class="p-0 pb-3 min-w-100px text-center sortable-column" 
                        @click="handleSortAgents('appointments')"
                        :class="{ 'active-sort': sortByAgents === 'appointments' }"
                        style="cursor: pointer;"
                      >
                        <div class="d-flex align-items-center justify-content-center">
                          <span>APPUNTAMENTI</span>
                          <span v-if="sortByAgents === 'appointments'" class="ms-2">
                            <i :class="sortOrderAgents === 'asc' ? 'ki-outline ki-arrow-up fs-8' : 'ki-outline ki-arrow-down fs-8'"></i>
                          </span>
                        </div>
                      </th>
                      <th 
                        class="p-0 pb-3 min-w-120px text-center sortable-column" 
                        @click="handleSortAgents('commissions')"
                        :class="{ 'active-sort': sortByAgents === 'commissions' }"
                        style="cursor: pointer;"
                      >
                        <div class="d-flex align-items-center justify-content-center">
                          <span>TOT PROVVIGIONI INCASSATE</span>
                          <span v-if="sortByAgents === 'commissions'" class="ms-2">
                            <i :class="sortOrderAgents === 'asc' ? 'ki-outline ki-arrow-up fs-8' : 'ki-outline ki-arrow-down fs-8'"></i>
                          </span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-if="getTableData(i).length > 0">
                      <tr v-for="(row, j) in getTableData(i)" :key="row.id || j">
                        <td>
                          <div class="symbol symbol-40px me-3">
                            <span :class="[
                              'symbol-label text-white fw-bold fs-7',
                              j === 0 ? 'bg-warning' : j === 1 ? 'bg-secondary' : j === 2 ? 'bg-info' : 'bg-primary'
                            ]">
                              {{ j === 0 ? '🥇' : j === 1 ? '🥈' : j === 2 ? '🥉' : j + 1 }}
                            </span>
                          </div>
                        </td>
                        <td>
                          <div class="d-flex justify-content-start flex-column">
                            <span class="text-gray-800 fw-bold text-hover-primary mb-1 fs-6">
                              {{ row.name }}
                            </span>
                            <span class="text-gray-400 fw-semibold d-block fs-7">
                              {{ row.location || '' }}
                            </span>
                          </div>
                        </td>
                        <td class="text-end pe-0">
                          <span class="text-gray-600 fw-bold fs-6">
                            {{ row.soldProperties || 0 }}
                          </span>
                        </td>
                        <td class="text-end pe-0">
                          <span class="text-gray-600 fw-bold fs-6">
                            {{ row.loadedProperties || 0 }}
                          </span>
                        </td>
                        <td class="text-end pe-0">
                          <span class="text-gray-600 fw-bold fs-6">
                            {{ row.requests || 0 }}
                          </span>
                        </td>
                        <td class="text-end pe-0">
                          <span class="text-gray-600 fw-bold fs-6">
                            {{ row.appointments || 0 }}
                          </span>
                        </td>
                        <td class="text-end pe-0">
                          <span class="text-gray-600 fw-bold fs-6">
                            {{ formatCurrency(row.commissions || 0) }}
                          </span>
                        </td>
                      </tr>
                    </template>
                    <template v-else>
                      <tr>
                        <td colspan="7" class="text-center py-10">
                          <span class="text-gray-400 fw-semibold fs-7">Nessun dato disponibile</span>
                        </td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>
            </div>
            <!--end::Top Agenti Layout-->

            <!--begin::Top Zone Layout-->
            <div v-else-if="i === 2" class="row g-5">
              <!--begin::Top Zone Immobili (Left)-->
              <div class="col-12 col-lg-6">
                <div class="card h-100">
                  <div class="card-header border-0 pt-4 pb-2">
                    <h4 class="card-title fw-bold fs-5 mb-1">🏘️ Top Zone Immobili</h4>
                    <span class="text-muted fs-7">Top 5 città per numero di immobili</span>
                  </div>
                  <div class="card-body pt-2">
                    <div v-if="topZonesPropertiesData && topZonesPropertiesData.length > 0" class="d-flex flex-column">
                      <div v-for="(zone, index) in topZonesPropertiesData.slice(0, 5)" :key="index" 
                           class="d-flex align-items-center mb-3 p-3 rounded-3 bg-light-primary border border-primary border-opacity-25">
                        <div class="symbol symbol-35px me-3">
                          <span class="symbol-label bg-primary text-white fw-bold fs-7">{{ index + 1 }}</span>
                        </div>
                        <div class="d-flex flex-column flex-grow-1">
                          <span class="fw-bold fs-7 text-gray-800">{{ zone.name }}</span>
                        </div>
                        <div class="text-end">
                          <span class="fw-bold fs-6 text-primary">{{ zone.count }} immobili</span>
                        </div>
                      </div>
                    </div>
                    <div v-else class="text-center py-10">
                      <span class="text-gray-400 fw-semibold fs-7">Nessun dato disponibile</span>
                    </div>
                  </div>
                </div>
              </div>
              <!--end::Top Zone Immobili-->

              <!--begin::Top Zone Richieste (Right)-->
              <div class="col-12 col-lg-6">
                <div class="card h-100">
                  <div class="card-header border-0 pt-4 pb-2">
                    <h4 class="card-title fw-bold fs-5 mb-1">📋 Top Zone Richieste</h4>
                    <span class="text-muted fs-7">Top 5 comuni citati nelle richieste</span>
                  </div>
                  <div class="card-body pt-2">
                    <div v-if="topZonesRequestsData && topZonesRequestsData.length > 0" class="d-flex flex-column">
                      <div v-for="(zone, index) in topZonesRequestsData.slice(0, 5)" :key="index" 
                           class="d-flex align-items-center justify-content-between mb-3 p-3 rounded-3 bg-light-success border border-success border-opacity-25">
                        <div class="d-flex align-items-center">
                          <div class="symbol symbol-35px me-3">
                            <span class="symbol-label bg-success text-white fw-bold fs-7">{{ index + 1 }}</span>
                          </div>
                          <span class="fw-bold fs-7 text-gray-800">{{ zone.name }}</span>
                        </div>
                        <div class="text-end">
                          <span class="fw-bold fs-6 text-success">{{ zone.count }} {{ zone.count === 1 ? 'richiesta' : 'richieste' }}</span>
                        </div>
                      </div>
                    </div>
                    <div v-else class="text-center py-10">
                      <span class="text-gray-400 fw-semibold fs-7">Nessun dato disponibile</span>
                    </div>
                  </div>
                </div>
              </div>
              <!--end::Top Zone Richieste-->
            </div>
            <!--end::Top Zone Layout-->

            <!--begin::Tipologie Layout-->
            <div v-else-if="i === 3" class="row g-5">
              <!--begin::Top Categorie Portafoglio (Left)-->
              <div class="col-12 col-lg-6">
                <div class="card h-100">
                  <div class="card-header border-0 pt-4 pb-2">
                    <h4 class="card-title fw-bold fs-5 mb-1">📦 Top Categorie Portafoglio</h4>
                    <span class="text-muted fs-7">Top 5 categorie presenti nel portafoglio</span>
                  </div>
                  <div class="card-body pt-2">
                    <div v-if="topCategoriesData && topCategoriesData.length > 0" class="d-flex flex-column">
                      <div v-for="(category, index) in topCategoriesData.slice(0, 5)" :key="index" 
                           class="d-flex align-items-center mb-3 p-3 rounded-3 bg-light-primary border border-primary border-opacity-25">
                        <div class="symbol symbol-35px me-3">
                          <span class="symbol-label bg-primary text-white fw-bold fs-7">{{ index + 1 }}</span>
                        </div>
                        <div class="d-flex flex-column flex-grow-1">
                          <span class="fw-bold fs-7 text-gray-800">{{ category.name }}</span>
                        </div>
                        <div class="text-end">
                          <span class="fw-bold fs-6 text-primary">{{ category.count }} immobili</span>
                        </div>
                      </div>
                    </div>
                    <div v-else class="text-center py-10">
                      <span class="text-gray-400 fw-semibold fs-7">Nessun dato disponibile</span>
                    </div>
                  </div>
                </div>
              </div>
              <!--end::Top Categorie Portafoglio-->

              <!--begin::Top Tipologie Richieste (Right)-->
              <div class="col-12 col-lg-6">
                <div class="card h-100">
                  <div class="card-header border-0 pt-4 pb-2">
                    <h4 class="card-title fw-bold fs-5 mb-1">📋 Top Tipologie Richieste</h4>
                    <span class="text-muted fs-7">Top 5 tipologie citate nelle richieste</span>
                  </div>
                  <div class="card-body pt-2">
                    <div v-if="topTypologiesRequestsData && topTypologiesRequestsData.length > 0" class="d-flex flex-column">
                      <div v-for="(typology, index) in topTypologiesRequestsData.slice(0, 5)" :key="index" 
                           class="d-flex align-items-center justify-content-between mb-3 p-3 rounded-3 bg-light-success border border-success border-opacity-25">
                        <div class="d-flex align-items-center">
                          <div class="symbol symbol-35px me-3">
                            <span class="symbol-label bg-success text-white fw-bold fs-7">{{ index + 1 }}</span>
                          </div>
                          <span class="fw-bold fs-7 text-gray-800">{{ typology.name }}</span>
                        </div>
                        <div class="text-end">
                          <span class="fw-bold fs-6 text-success">{{ typology.count }} {{ typology.count === 1 ? 'richiesta' : 'richieste' }}</span>
                        </div>
                      </div>
                    </div>
                    <div v-else class="text-center py-10">
                      <span class="text-gray-400 fw-semibold fs-7">Nessun dato disponibile</span>
                    </div>
                  </div>
                </div>
              </div>
              <!--end::Top Tipologie Richieste-->
            </div>
            <!--end::Tipologie Layout-->

            <!--begin::Guadagni Layout-->
            <div v-else-if="i === 4" class="row g-5">
              <!--begin::Top Portafoglio Provvigioni (Left)-->
              <div class="col-12 col-lg-6">
                <div class="card h-100">
                  <div class="card-header border-0 pt-4 pb-2">
                    <h4 class="card-title fw-bold fs-5 mb-1">💰 Provvigioni Portafoglio</h4>
                    <span class="text-muted fs-7">Ancora non incassate</span>
                  </div>
                  <div class="card-body pt-2">
                    <!-- Totale -->
                    <div class="text-center mb-5">
                      <div class="fw-bold fs-2 text-primary mb-1">
                        {{ formatCurrency(totalPortfolioCommissions) }}
                      </div>
                      <div class="text-muted fs-7">Totale provvigioni in portafoglio</div>
                    </div>
                    <!-- Lista -->
                    <div v-if="topEarningsPortfolio && topEarningsPortfolio.length > 0" class="d-flex flex-column">
                      <div v-for="(item, index) in topEarningsPortfolio.slice(0, 5)" :key="item.Id || index"
                           class="d-flex align-items-center justify-content-between mb-3 p-3 rounded-3 bg-light-primary border border-primary border-opacity-25">
                        <div class="d-flex align-items-center">
                          <div class="symbol symbol-35px me-3">
                            <span class="symbol-label bg-primary text-white fw-bold fs-7">{{ index + 1 }}</span>
                          </div>
                          <div class="d-flex flex-column">
                            <span class="fw-bold fs-7 text-gray-800">{{ item.Title }}</span>
                            <span class="text-muted fs-8">{{ item.AddressLine }}{{ item.City ? ', ' + item.City : '' }}</span>
                            <span class="text-muted fs-9">Cod.: {{ item.Id }}</span>
                            <span class="text-muted fs-9">Gestore: {{ item.UserFirstName }}</span>
                          </div>
                        </div>
                        <div class="text-end">
                          <div class="fw-bold fs-7 text-gray-800">Prezzo: {{ formatCurrency(item.Price) }}</div>
                          <div class="fw-bold fs-6 text-primary">Provv.: {{ formatCurrency(item.EffectiveCommission) }}</div>
                        </div>
                      </div>
                    </div>
                    <div v-else class="text-center py-10">
                      <span class="text-gray-400 fw-semibold fs-7">Nessun dato disponibile</span>
                    </div>
                  </div>
                </div>
              </div>
              <!--end::Top Portafoglio Provvigioni-->

              <!--begin::Top Vendite Anno Corrente (Right)-->
              <div class="col-12 col-lg-6">
                <div class="card h-100">
                  <div class="card-header border-0 pt-4 pb-2">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                      <div class="flex-grow-1">
                        <h4 class="card-title fw-bold fs-5 mb-1">🎯 Top Vendite Anno Corrente</h4>
                        <span class="text-muted fs-7">Vendite chiuse nell'anno</span>
                      </div>
                      <div class="d-flex align-items-center gap-3">
                        <!-- Totale Vendite Anno -->
                        <div class="text-end">
                          <div class="fw-bold fs-4 text-success mb-0">
                            {{ formatCurrency(totalYearSalesCommissions) }}
                          </div>
                          <div class="text-muted fs-8">Totale {{ selectedYearSales }}</div>
                        </div>
                        <!-- Filtro Anno -->
                        <select 
                          v-model.number="selectedYearSales" 
                          class="form-select form-select-sm w-auto ms-20"
                          style="min-width: 100px;"
                          @change="handleYearSalesChange"
                        >
                          <option v-for="year in availableYears" :key="year" :value="year">
                            {{ year }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="card-body pt-2">
                    <div v-if="topEarningsSalesYear && topEarningsSalesYear.length > 0" class="d-flex flex-column">
                      <div v-for="(item, index) in topEarningsSalesYear.slice(0, 5)" :key="item.Id || index"
                           class="d-flex align-items-center justify-content-between mb-3 p-3 rounded-3 bg-light-success border border-success border-opacity-25">
                        <div class="d-flex align-items-center">
                          <div class="symbol symbol-35px me-3">
                            <span class="symbol-label bg-success text-white fw-bold fs-7">{{ index + 1 }}</span>
                          </div>
                          <div class="d-flex flex-column">
                            <span class="fw-bold fs-7 text-gray-800">{{ item.Title }}</span>
                            <span class="text-muted fs-8">{{ item.AddressLine }}{{ item.City ? ', ' + item.City : '' }}</span>
                            <span class="text-muted fs-9">Cod.: {{ item.Id }}</span>
                            <span class="text-muted fs-9">Gestore: {{ item.UserFirstName }}</span>
                          </div>
                        </div>
                        <div class="text-end">
                          <div class="fw-bold fs-7 text-gray-800">Prezzo: {{ formatCurrency(item.Price) }}</div>
                          <div class="fw-bold fs-6 text-success">Provv.: {{ formatCurrency(item.EffectiveCommission) }}</div>
                        </div>
                      </div>
                    </div>
                    <div v-else class="text-center py-10">
                      <span class="text-gray-400 fw-semibold fs-7">Nessun dato disponibile</span>
                    </div>
                  </div>
                </div>
              </div>
              <!--end::Top Vendite Anno Corrente-->
            </div>
            <!--end::Guadagni Layout-->

            <!--begin::Default Table Layout (Other Tabs)-->
            <div v-else>
            <div class="table-responsive">
              <table class="table table-row-dashed align-middle gs-0 gy-3 my-0">
                <thead>
                  <tr class="fs-7 fw-bold text-gray-400 border-bottom-0">
                    <th class="p-0 pb-3 min-w-50px text-start">#</th>
                    <th class="p-0 pb-3 min-w-200px text-start">NOME</th>
                    <th class="p-0 pb-3 min-w-120px text-end">IMMOBILI VENDUTI</th>
                    <th class="p-0 pb-3 min-w-120px text-end">PROVVIGIONI</th>
                    <th class="p-0 pb-3 min-w-120px text-end">APPUNTAMENTI</th>
                    <th class="p-0 pb-3 min-w-100px text-end">PROGRESS</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-if="getTableData(i).length > 0">
                    <tr v-for="(row, j) in getTableData(i)" :key="j">
                      <td>
                        <div class="symbol symbol-40px me-3">
                          <span :class="[
                            'symbol-label text-white fw-bold fs-7',
                            j === 0 ? 'bg-warning' : j === 1 ? 'bg-secondary' : j === 2 ? 'bg-info' : 'bg-primary'
                          ]">
                            {{ j === 0 ? '🥇' : j === 1 ? '🥈' : j === 2 ? '🥉' : j + 1 }}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div class="d-flex justify-content-start flex-column">
                          <span class="text-gray-800 fw-bold text-hover-primary mb-1 fs-6">
                            {{ row.name }}
                          </span>
                          <span class="text-gray-400 fw-semibold d-block fs-7">
                            {{ row.location || '' }}
                          </span>
                        </div>
                      </td>
                      <td class="text-end pe-0">
                        <span class="text-gray-600 fw-bold fs-6">
                          {{ row.soldProperties || 0 }}
                        </span>
                      </td>
                      <td class="text-end pe-0">
                        <span class="text-gray-600 fw-bold fs-6">
                          {{ formatCurrency(row.commissions || 0) }}
                        </span>
                      </td>
                      <td class="text-end pe-0">
                        <span class="text-gray-600 fw-bold fs-6">
                          {{ row.appointments || 0 }}
                        </span>
                      </td>
                      <td class="text-end">
                        <span
                          v-if="row.trend > 0"
                          class="badge badge-light-success fs-base"
                        >
                          <KTIcon
                            icon-name="arrow-up"
                            icon-class="fs-5 text-success ms-n1"
                          />
                          {{ row.trend }}%
                        </span>
                        <span v-else-if="row.trend < 0" class="badge badge-light-danger fs-base">
                          <KTIcon
                            icon-name="arrow-down"
                            icon-class="fs-5 text-danger ms-n1"
                          />
                          {{ Math.abs(row.trend) }}%
                        </span>
                        <span v-else class="badge badge-light-secondary fs-base">
                          {{ row.trend }}%
                        </span>
                      </td>
                    </tr>
                  </template>
                  <template v-else>
                    <tr>
                      <td colspan="6" class="text-center py-10">
                        <span class="text-gray-400 fw-semibold fs-7">Nessun dato disponibile</span>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
              </div>
            </div>
            <!--end::Default Table Layout-->
          </div>
          <!--end::Tap pane-->
        </template>
      </div>
      <!--end::Tab Content-->
    </div>
    <!--end: Card Body-->
  </div>
  <!--end::Tables widget 7-->
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from "vue";
import { getTopAgenciesData, getTopAgentsData, getTopZonesData, getTopTypologiesData, getTopEarningsData, type TopAgencyItem, type TopAgentItem, type TopZoneItem, type TopTypologyItem, type TopEarningItem } from "@/core/data/dashboard";

export default defineComponent({
  name: "default-dashboard-widget-7",
  components: {},
  props: {
    className: { type: String, required: false },
    agentsData: { type: Array, default: () => [] },
    agenciesData: { type: Array, default: () => [] },
    propertiesData: { type: Array, default: () => [] },
    commissionsData: { type: Array, default: () => [] },
    allSoldProperties: { type: Array, default: () => [] },
    allProperties: { type: Array, default: () => [] },
    calendarEvents: { type: Array, default: () => [] },
  },
  setup(props) {
    const activeTab = ref<number>(0);
    const selectedYearSales = ref<number>(new Date().getFullYear());
    const selectedYearAgencies = ref<number>(new Date().getFullYear());
    const selectedYearAgents = ref<number>(new Date().getFullYear());
    
    // Dati API per Top Agenzie
    const topAgenciesData = ref<TopAgencyItem[]>([]);
    const loadingAgencies = ref<boolean>(false);
    
    // Dati API per Top Agenti
    const topAgentsData = ref<TopAgentItem[]>([]);
    const loadingAgents = ref<boolean>(false);
    
    // Dati API per Top Zone
    const topZonesData = ref<{ propertiesZones: TopZoneItem[]; requestsZones: TopZoneItem[] }>({
      propertiesZones: [],
      requestsZones: []
    });
    const loadingZones = ref<boolean>(false);

    // Dati API per Top Tipologie
    const topTypologiesData = ref<{ categoriesPortfolio: TopTypologyItem[]; categoriesRequests: TopTypologyItem[] }>({
      categoriesPortfolio: [],
      categoriesRequests: []
    });
    const loadingTypologies = ref<boolean>(false);

    // Dati API per Top Guadagni
    const topEarningsData = ref<{
      portfolio: TopEarningItem[];
      salesYear: TopEarningItem[];
      totalPortfolioCommission: number;
      totalSalesYearCommission: number;
    }>({
      portfolio: [],
      salesYear: [],
      totalPortfolioCommission: 0,
      totalSalesYearCommission: 0,
    });
    const loadingEarnings = ref<boolean>(false);
    
    // Stato per ordinamento Top Agenzie
    const sortByAgencies = ref<string>('soldProperties'); // Default: ordina per vendite (lowercase per matchare backend)
    const sortOrderAgencies = ref<'asc' | 'desc'>('desc'); // Default: decrescente
    
    // Stato per ordinamento Top Agenti
    const sortByAgents = ref<string>('soldProperties'); // Default: ordina per vendite
    const sortOrderAgents = ref<'asc' | 'desc'>('desc'); // Default: decrescente

    // Genera anni disponibili per il filtro (ultimi 5 anni)
    const availableYears = computed(() => {
      const currentYear = new Date().getFullYear();
      const years = [];
      for (let i = 0; i < 5; i++) {
        years.push(currentYear - i);
      }
      return years;
    });

    const items = [
      {
        title: "Top Agenzie",
        icon: "office-bag",
        index: "0",
      },
      {
        title: "Top Agenti",
        icon: "people",
        index: "1",
      },
      {
        title: "Top Zone",
        icon: "geolocation",
        index: "2",
      },
      {
        title: "Tipologie",
        icon: "chart-simple",
        index: "3",
      },
      {
        title: "Guadagni",
        icon: "dollar",
        index: "4",
      },
    ];

    const setActiveTab = (index: number) => {
      activeTab.value = index;
    };

    // Funzione per gestire il click su una colonna per ordinare Top Agenti
    const handleSortAgents = (column: string) => {
      if (sortByAgents.value === column) {
        // Se clicchi sulla stessa colonna, inverte l'ordine
        sortOrderAgents.value = sortOrderAgents.value === 'desc' ? 'asc' : 'desc';
      } else {
        // Se clicchi su una colonna diversa, ordina per quella colonna (decrescente di default)
        sortByAgents.value = column;
        sortOrderAgents.value = 'desc';
      }
      // Ricarica i dati con il nuovo ordinamento
      loadTopAgentsData(selectedYearAgents.value, sortByAgents.value, sortOrderAgents.value);
    };

    // Funzione per caricare i dati dei Top Agenti dall'API
    const loadTopAgentsData = async (year?: number, sortBy?: string, sortOrder?: string) => {
      try {
        loadingAgents.value = true;
        const data = await getTopAgentsData(year, sortBy, sortOrder);
        topAgentsData.value = data.Agents || [];
      } catch (error) {
        console.error('Errore nel caricamento dei dati Top Agenti:', error);
        topAgentsData.value = [];
      } finally {
        loadingAgents.value = false;
      }
    };

    // Calcola dati per la tabella agenti (usa dati API)
    const getAgentsTableData = computed(() => {
      if (!topAgentsData.value || topAgentsData.value.length === 0) {
        return [];
      }

      return topAgentsData.value.map((agent: TopAgentItem, index: number) => {
        return {
          id: agent.Id,
          name: agent.Name,
          location: agent.Location || '',
          soldProperties: agent.SoldProperties,
          loadedProperties: agent.LoadedProperties,
          requests: agent.Requests,
          appointments: agent.Appointments,
          commissions: agent.Commissions,
        };
      });
    });

    // Funzione per gestire il click su una colonna per ordinare
    const handleSortAgencies = (column: string) => {
      if (sortByAgencies.value === column) {
        // Se clicchi sulla stessa colonna, inverte l'ordine
        sortOrderAgencies.value = sortOrderAgencies.value === 'desc' ? 'asc' : 'desc';
      } else {
        // Se clicchi su una colonna diversa, ordina per quella colonna (decrescente di default)
        sortByAgencies.value = column;
        sortOrderAgencies.value = 'desc';
      }
      // Ricarica i dati con il nuovo ordinamento
      loadTopAgenciesData(selectedYearAgencies.value, sortByAgencies.value, sortOrderAgencies.value);
    };

    // Funzione per caricare i dati delle Top Agenzie dall'API
    const loadTopAgenciesData = async (year?: number, sortBy?: string, sortOrder?: string) => {
      try {
        loadingAgencies.value = true;
        const data = await getTopAgenciesData(year, sortBy, sortOrder);
        topAgenciesData.value = data.Agencies || [];
      } catch (error) {
        console.error('Errore nel caricamento dei dati Top Agenzie:', error);
        topAgenciesData.value = [];
      } finally {
        loadingAgencies.value = false;
      }
    };

    // Calcola dati per la tabella agenzie (usa dati API)
    const getAgenciesTableData = computed(() => {
      if (!topAgenciesData.value || topAgenciesData.value.length === 0) {
        return [];
      }

      return topAgenciesData.value.map((agency: TopAgencyItem, index: number) => {
        return {
          id: agency.Id,
          name: agency.Name,
          location: agency.Location || '',
          properties: agency.Properties,
          customers: agency.Customers,
          requests: agency.Requests,
          soldProperties: agency.SoldProperties,
          appointments: agency.Appointments,
          commissions: agency.Commissions,
        };
      });
    });

    // Calcola dati per la tabella immobili
    const getPropertiesTableData = computed(() => {
      if (!props.allProperties || props.allProperties.length === 0) {
        return [];
      }

      return props.allProperties.slice(0, 10).map((property: any, index: number) => {
        const propertyName = property.Title || property.Address || `Immobile ${index + 1}`;
        const location = property.City || property.city || '';
        
        // Verifica se venduto
        const isSold = props.allSoldProperties.some((sold: any) => sold.Id === property.Id);
        const soldProperties = isSold ? 1 : 0;

        // Calcola provvigioni se venduto
        const commissions = isSold ? (property.Price || 0) * 0.03 : 0;

        // Appuntamenti (mock)
        const appointments = Math.floor(Math.random() * 10);

        // Trend
        const trend = Math.floor(Math.random() * 20) - 10;

        return {
          id: property.Id,
          name: propertyName,
          location,
          soldProperties,
          commissions,
          appointments,
          trend,
        };
      });
    });

    // Calcola dati per la tabella provvigioni (ordinata per provvigioni)
    const getCommissionsTableData = computed(() => {
      // Combina agenti e agenzie e ordina per provvigioni
      const allData = [
        ...getAgentsTableData.value.map((item: any) => ({ ...item, type: 'agent' })),
        ...getAgenciesTableData.value.map((item: any) => ({ ...item, type: 'agency' }))
      ];

      return allData.sort((a, b) => b.commissions - a.commissions).slice(0, 10);
    });

    const getTableData = (tabIndex: number) => {
      switch (tabIndex) {
        case 0:
          return getAgenciesTableData.value;
        case 1:
          return getAgentsTableData.value;
        case 2:
          return getPropertiesTableData.value;
        case 3:
          return getCommissionsTableData.value;
        default:
          return [];
      }
    };

    const formatCurrency = (value: number): string => {
      return new Intl.NumberFormat('it-IT', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
    };

    // Funzione per caricare i dati delle Top Zone dall'API
    const loadTopZonesData = async () => {
      try {
        loadingZones.value = true;
        const data = await getTopZonesData();
        topZonesData.value = {
          propertiesZones: data.PropertiesZones || [],
          requestsZones: data.RequestsZones || []
        };
      } catch (error) {
        console.error('Errore nel caricamento dei dati Top Zone:', error);
        topZonesData.value = {
          propertiesZones: [],
          requestsZones: []
        };
      } finally {
        loadingZones.value = false;
      }
    };

    // Top Zone Immobili (usa dati API)
    const topZonesPropertiesData = computed(() => {
      if (!topZonesData.value.propertiesZones || topZonesData.value.propertiesZones.length === 0) {
        return [];
      }
      return topZonesData.value.propertiesZones.map((zone: TopZoneItem) => ({
        name: zone.Name,
        count: zone.Count,
        percentage: zone.Percentage
      }));
    });

    // Top Zone Richieste (usa dati API)
    const topZonesRequestsData = computed(() => {
      if (!topZonesData.value.requestsZones || topZonesData.value.requestsZones.length === 0) {
        return [];
      }
      return topZonesData.value.requestsZones.map((zone: TopZoneItem) => ({
        name: zone.Name,
        count: zone.Count,
        percentage: zone.Percentage
      }));
    });

    // Funzione per caricare i dati delle Top Tipologie dall'API
    const loadTopTypologiesData = async () => {
      try {
        loadingTypologies.value = true;
        const data = await getTopTypologiesData();
        topTypologiesData.value = {
          categoriesPortfolio: data.CategoriesPortfolio || [],
          categoriesRequests: data.CategoriesRequests || []
        };
      } catch (error) {
        console.error('Errore nel caricamento dei dati Top Tipologie:', error);
        topTypologiesData.value = {
          categoriesPortfolio: [],
          categoriesRequests: []
        };
      } finally {
        loadingTypologies.value = false;
      }
    };

    // Funzione per caricare i dati Top Guadagni (portafoglio + vendite anno)
    const loadTopEarningsData = async (year?: number) => {
      try {
        loadingEarnings.value = true;
        const data = await getTopEarningsData(year);
        topEarningsData.value = {
          portfolio: data.Portfolio || [],
          salesYear: data.SalesYear || [],
          totalPortfolioCommission: data.TotalPortfolioCommission || 0,
          totalSalesYearCommission: data.TotalSalesYearCommission || 0,
        };
      } catch (error) {
        console.error('Errore nel caricamento dei dati Top Guadagni:', error);
        topEarningsData.value = {
          portfolio: [],
          salesYear: [],
          totalPortfolioCommission: 0,
          totalSalesYearCommission: 0,
        };
      } finally {
        loadingEarnings.value = false;
      }
    };

    // Top Categorie Portafoglio (usa dati API)
    const topCategoriesData = computed(() => {
      if (!topTypologiesData.value.categoriesPortfolio || topTypologiesData.value.categoriesPortfolio.length === 0) {
        return [];
      }
      return topTypologiesData.value.categoriesPortfolio.map((item: TopTypologyItem) => ({
        name: item.Name,
        count: item.Count,
        percentage: item.Percentage
      }));
    });

    // Top Tipologie Richieste (usa dati API)
    const topTypologiesRequestsData = computed(() => {
      if (!topTypologiesData.value.categoriesRequests || topTypologiesData.value.categoriesRequests.length === 0) {
        return [];
      }
      return topTypologiesData.value.categoriesRequests.map((item: TopTypologyItem) => ({
        name: item.Name,
        count: item.Count,
        percentage: item.Percentage
      }));
    });

    // Top Guadagni - Portafoglio (usa dati API)
    const topEarningsPortfolio = computed(() => {
      return topEarningsData.value.portfolio || [];
    });

    // Top Guadagni - Vendite anno (usa dati API)
    const topEarningsSalesYear = computed(() => {
      return topEarningsData.value.salesYear || [];
    });

    const totalPortfolioCommissions = computed(() => topEarningsData.value.totalPortfolioCommission || 0);
    const totalYearSalesCommissions = computed(() => topEarningsData.value.totalSalesYearCommission || 0);

    // Carica i dati iniziali
    onMounted(() => {
      loadTopAgenciesData(selectedYearAgencies.value, sortByAgencies.value, sortOrderAgencies.value);
      loadTopAgentsData(selectedYearAgents.value, sortByAgents.value, sortOrderAgents.value);
      loadTopZonesData();
      loadTopTypologiesData();
      loadTopEarningsData(selectedYearSales.value);
    });

    // Handler espliciti per il cambio anno (più affidabili dei watch)
    const handleYearAgenciesChange = () => {
      const year = Number(selectedYearAgencies.value);
      if (!isNaN(year)) {
        loadTopAgenciesData(year, sortByAgencies.value, sortOrderAgencies.value);
      }
    };

    const handleYearAgentsChange = () => {
      const year = Number(selectedYearAgents.value);
      if (!isNaN(year)) {
        loadTopAgentsData(year, sortByAgents.value, sortOrderAgents.value);
      }
    };

    const handleYearSalesChange = () => {
      const year = Number(selectedYearSales.value);
      if (!isNaN(year)) {
        loadTopEarningsData(year);
      }
    };

    // Watch per ricaricare quando cambia l'anno (backup)
    watch(selectedYearAgencies, (newYear) => {
      const year = Number(newYear);
      if (!isNaN(year)) {
        loadTopAgenciesData(year, sortByAgencies.value, sortOrderAgencies.value);
      }
    });

    // Watch per ricaricare quando cambia l'anno per Top Agenti
    watch(selectedYearAgents, (newYear) => {
      const year = Number(newYear);
      if (!isNaN(year)) {
        loadTopAgentsData(year, sortByAgents.value, sortOrderAgents.value);
      }
    });

    // Watch per ricaricare vendite anno per Guadagni
    watch(selectedYearSales, (newYear) => {
      const year = Number(newYear);
      if (!isNaN(year)) {
        loadTopEarningsData(year);
      }
    });

    return {
      items,
      activeTab,
      setActiveTab,
      getTableData,
      getAgentsTableData,
      getAgenciesTableData,
      formatCurrency,
      topZonesPropertiesData,
      topZonesRequestsData,
      topTypologiesData,
      topEarningsData,
      topCategoriesData,
      topTypologiesRequestsData,
      topEarningsPortfolio,
      topEarningsSalesYear,
      selectedYearSales,
      selectedYearAgencies,
      selectedYearAgents,
      availableYears,
      totalPortfolioCommissions,
      totalYearSalesCommissions,
      loadingAgencies,
      loadingAgents,
      loadingZones,
      loadingTypologies,
      loadingEarnings,
      handleSortAgencies,
      handleSortAgents,
      handleYearAgenciesChange,
      handleYearAgentsChange,
      handleYearSalesChange,
      sortByAgencies,
      sortOrderAgencies,
      sortByAgents,
      sortOrderAgents,
      loadTopTypologiesData,
      loadTopEarningsData,
    };
  },
});
</script>

<style scoped>
.sortable-column {
  transition: background-color 0.2s ease;
  user-select: none;
}

.sortable-column:hover {
  background-color: rgba(0, 0, 0, 0.02);
}

[data-bs-theme="dark"] .sortable-column:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.active-sort {
  color: var(--bs-primary);
}

.sortable-column .d-flex {
  align-items: center;
  gap: 0.25rem;
}
</style>
