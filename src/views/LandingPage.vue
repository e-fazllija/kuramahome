<template>
  <div class="landing-page">
    <!--begin::Navigation-->
    <LandingNavbar />
    <!--end::Navigation-->

    <!--begin::Hero Section-->
    <section class="hero-section">
      <div class="container">
        <div class="row align-items-center hero-row">
          <div class="col-lg-6">
            <div class="hero-content">
              <img 
                :src="getAssetPath('media/logos/kurama-home-logos/logo-menu.png')" 
                alt="MiraiHome" 
                class="hero-content-logo"
              />
              <h1 class="hero-title">
                Gestisci la tua Agenzia Immobiliare con 
                <span class="text-primary">MiraiHome</span>
              </h1>
              <p class="hero-description">
                La piattaforma completa per gestire immobili, clienti, agenti e tutte le operazioni 
                della tua agenzia immobiliare in modo professionale ed efficiente.
              </p>
              <div class="hero-buttons">
                <router-link to="/sign-up" class="btn btn-primary btn-lg me-3">
                  <i class="ki-duotone ki-rocket me-2">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  Inizia Gratis
                </router-link>
                <router-link to="/sign-in" class="btn btn-outline-secondary btn-lg">
                  Accedi
                </router-link>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="hero-image">
              <div class="dashboard-preview">
                <div class="preview-header">
                  <div class="preview-controls">
                    <span class="control"></span>
                    <span class="control"></span>
                    <span class="control"></span>
                  </div>
                  <div class="preview-title">MiraiHome Dashboard</div>
                </div>
                <div class="preview-content">
                  <div class="preview-widget"></div>
                  <div class="preview-widget"></div>
                  <div class="preview-widget large"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--end::Hero Section-->

    <!--begin::Property Search Section-->
    <section id="find-your-property" class="property-search-section">
      <div class="container">
        <div class="property-search-card">
          <div class="row g-4 align-items-center">
            <div class="col-lg-4">
              <div class="property-search-copy">
                <span class="badge badge-light-primary text-uppercase mb-3">Ricerca Immobili</span>
                <h2 class="property-search-title">Consulta gli immobili disponibili in tempo reale</h2>
                <p class="property-search-text">
                  Filtra per provincia, comune, prezzo e tipologia per trovare rapidamente la soluzione più adatta alle esigenze dei tuoi clienti.
                </p>
              </div>
            </div>
            <div class="col-lg-8">
              <PublicPropertySearchForm
                :initial-filters="landingSearchDefaults"
                :show-heading="false"
                :compact="true"
                submit-label="Cerca immobili"
                @submit="handleLandingSearch"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--end::Property Search Section-->

    <!--begin::Features Section-->
    <section id="features" class="features-section">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center mb-8">
            <h2 class="section-title">Tutto quello che ti serve per gestire la tua agenzia</h2>
            <p class="section-description">
              MiraiHome è la soluzione completa per agenzie immobiliari moderne che vogliono
              automatizzare i processi e aumentare le vendite.
            </p>
          </div>
        </div>
        
        <div class="row g-4">
          <div class="col-lg-4 col-md-6">
            <div class="feature-card">
              <div class="feature-icon">
                <i class="ki-duotone ki-home fs-1 text-primary">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
              </div>
              <h4 class="feature-title">Gestione Immobili</h4>
              <p class="feature-description">
                Carica, organizza e gestisci tutti i tuoi immobili con foto, dettagli completi,
                prezzi e disponibilità in una piattaforma centralizzata.
              </p>
            </div>
          </div>
          
          <div class="col-lg-4 col-md-6">
            <div class="feature-card">
              <div class="feature-icon">
                <i class="ki-duotone ki-profile-user fs-1 text-success">
                  <span class="path1"></span>
                  <span class="path2"></span>
                  <span class="path3"></span>
                  <span class="path4"></span>
                </i>
              </div>
              <h4 class="feature-title">Gestione Clienti</h4>
              <p class="feature-description">
                Mantieni un database completo dei tuoi clienti con tutte le informazioni
                per venditori e acquirenti, sempre aggiornato e facilmente consultabile.
              </p>
            </div>
          </div>
          
          <div class="col-lg-4 col-md-6">
            <div class="feature-card">
              <div class="feature-icon">
                <i class="ki-duotone ki-abstract-26 fs-1 text-warning">
                  <span class="path1"></span>
                  <span class="path2"></span>
                  <span class="path3"></span>
                  <span class="path4"></span>
                  <span class="path5"></span>
                </i>
              </div>
              <h4 class="feature-title">Team e Agenti</h4>
              <p class="feature-description">
                Gestisci il tuo team di agenti, assegna immobili, monitora le performance
                e traccia i risultati di ogni membro della tua agenzia.
              </p>
            </div>
          </div>
          
          <div class="col-lg-4 col-md-6">
            <div class="feature-card">
              <div class="feature-icon">
                <i class="ki-duotone ki-calendar-8 fs-1 text-info">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
              </div>
              <h4 class="feature-title">Calendario Appuntamenti</h4>
              <p class="feature-description">
                Organizza visite, appuntamenti e meeting con clienti utilizzando
                il sistema di calendario integrato con notifiche automatiche.
              </p>
            </div>
          </div>
          
          <div class="col-lg-4 col-md-6">
            <div class="feature-card">
              <div class="feature-icon">
                <i class="ki-duotone ki-document fs-1 text-danger">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
              </div>
              <h4 class="feature-title">Archivio Digitale</h4>
              <p class="feature-description">
                Accedi a tutta la modulistica necessaria per il settore immobiliare,
                sempre aggiornata e conforme alle normative vigenti.
              </p>
            </div>
          </div>
          
          <div class="col-lg-4 col-md-6">
            <div class="feature-card">
              <div class="feature-icon">
                <i class="ki-duotone ki-chart-simple fs-1 text-primary">
                  <span class="path1"></span>
                  <span class="path2"></span>
                  <span class="path3"></span>
                  <span class="path4"></span>
                </i>
              </div>
              <h4 class="feature-title">Analisi e Report</h4>
              <p class="feature-description">
                Monitora le performance della tua agenzia con dashboard avanzate,
                report dettagliati e analisi delle vendite e degli affitti.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--end::Features Section-->

    <!--begin::Featured Properties Section-->
    <section id="featured-properties" class="featured-properties-section">
      <div class="container">
        <div class="featured-properties-banner">
          <div class="row g-4 align-items-center">
            <div class="col-lg-4">
              <div class="featured-properties-cta">
                <span class="badge badge-light-primary text-uppercase mb-3">In evidenza</span>
                <h2 class="featured-properties-title">Scopri gli immobili disponibili</h2>
                <p class="featured-properties-text">
                  Migliaia di annunci dalle migliori agenzie. Trova la casa dei tuoi sogni tra le proposte dei nostri soci.
                </p>
                <router-link to="/immobili" class="btn btn-primary btn-lg">
                  <i class="ki-duotone ki-home-2 me-2">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  Esplora gli immobili di tutti i nostri soci
                </router-link>
              </div>
            </div>
            <div class="col-lg-8">
              <div class="featured-properties-carousel">
                <template v-if="displayedProperties.length > 0">
                  <Transition name="carousel-fade" mode="out-in">
                    <div class="row g-4" :key="carouselIndex">
                      <div
                        class="col-md-4"
                        v-for="property in displayedProperties"
                        :key="property.Id"
                      >
                        <div class="property-card">
                          <div class="property-card-image">
                            <img :src="property.MainPhotoUrl || placeholderImage" :alt="property.Title" />
                            <span class="badge badge-primary property-badge" v-if="property.Highlighted">In evidenza</span>
                            <span class="badge badge-warning property-badge" v-if="property.Auction">Asta</span>
                            <span class="badge badge-info property-badge" v-if="property.Negotiation">In trattativa</span>
                          </div>
                          <div class="property-card-body">
                            <div class="property-card-header">
                              <h4 class="property-card-title">{{ property.Title }}</h4>
                              <div class="property-price d-flex align-items-center gap-2 flex-wrap">
                                <span v-if="property.PriceReduced && property.PriceReduced > 0 && property.PriceReduced < property.Price" class="d-flex flex-column gap-1">
                                  <span class="text-decoration-line-through text-danger small">{{ formatPrice(property.Price) }}</span>
                                  <span class="d-flex align-items-center gap-2">
                                    <span class="fw-bold">{{ formatPrice(property.PriceReduced) }}</span>
                                    <span class="text-success fw-semibold small">-{{ Math.round(((property.Price - property.PriceReduced) / property.Price) * 100) }}%</span>
                                  </span>
                                </span>
                                <span v-else>{{ formatPrice(property.Price) }}</span>
                              </div>
                            </div>
                            <div class="property-location text-muted mb-2">
                              <i class="ki-duotone ki-geolocation me-2">
                                <span class="path1"></span>
                                <span class="path2"></span>
                              </i>
                              {{ property.City }}, {{ property.State }}
                            </div>
                            <div class="property-card-footer">
                              <router-link :to="`/immobili/${property.Id}`" class="btn btn-outline-primary w-100">
                                Dettagli
                              </router-link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Transition>
                </template>
                <div v-else-if="featuredPropertiesLoading" class="featured-properties-loading text-center py-5">
                  <div class="spinner-border text-primary" role="status"></div>
                  <p class="mt-2 text-muted">Caricamento...</p>
                </div>
                <div v-else class="featured-properties-empty text-center py-5">
                  <i class="ki-duotone ki-home-2 fs-1 text-muted">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  <p class="mt-2 text-muted">Nessun immobile al momento</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--end::Featured Properties Section-->

<!--begin::Benefits Section-->
<section id="benefits" class="benefits-section">
  <div class="container">
    <div class="row mb-8">
      <div class="col-lg-8 mx-auto text-center">
        <h2 class="section-title">Perché scegliere MiraiHome?</h2>
      </div>
    </div>
    <div class="row g-4">
      <div class="col-lg-4 col-md-6">
        <div class="benefit-item">
          <div class="benefit-icon">
            <i class="ki-duotone ki-rocket fs-2 text-success">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
          </div>
          <div class="benefit-text">
            <h5>Efficienza Massima</h5>
            <p>Automatizza i processi più noiosi e concentrati su quello che conta: vendere e affittare.</p>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-6">
        <div class="benefit-item">
          <div class="benefit-icon">
            <i class="ki-duotone ki-shield-tick fs-2 text-primary">
              <span class="path1"></span>
              <span class="path2"></span>
              <span class="path3"></span>
            </i>
          </div>
          <div class="benefit-text">
            <h5>Sicuro e Affidabile</h5>
            <p>I tuoi dati sono protetti con i migliori sistemi di sicurezza e backup automatici.</p>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-6">
        <div class="benefit-item">
          <div class="benefit-icon">
            <i class="ki-duotone ki-devices fs-2 text-warning">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
          </div>
          <div class="benefit-text">
            <h5>Accessibile Ovunque</h5>
            <p>Usa MiraiHome da computer, tablet o smartphone, sempre sincronizzato.</p>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-6">
        <div class="benefit-item">
          <div class="benefit-icon">
            <i class="ki-duotone ki-chart-line fs-2 text-info">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
          </div>
          <div class="benefit-text">
            <h5>Statistiche in Tempo Reale</h5>
            <p>Monitora vendite, richieste e performance degli agenti con dashboard sempre aggiornate.</p>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-6">
        <div class="benefit-item">
          <div class="benefit-icon">
            <i class="ki-duotone ki-people fs-2 text-danger">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
          </div>
          <div class="benefit-text">
            <h5>Gestione Completa dei Clienti</h5>
            <p>Organizza contatti, appuntamenti e trattative in un unico sistema semplice da usare.</p>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-6">
        <div class="benefit-item">
          <div class="benefit-icon">
            <i class="ki-duotone ki-cloud fs-2 text-secondary">
              <span class="path1"></span>
              <span class="path2"></span>
            </i>
          </div>
          <div class="benefit-text">
            <h5>Cloud Sempre Aggiornato</h5>
            <p>Nessuna installazione: aggiornamenti automatici e accesso immediato alle nuove funzionalità.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<!--end::Benefits Section-->


    <!--begin::Pricing Section-->
    <section id="pricing" class="pricing-section">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center mb-8">
            <h2 class="section-title">Scegli il piano perfetto per la tua agenzia</h2>
            <p class="section-description">
              Piani flessibili pensati per agenzie di ogni dimensione. Dopo la registrazione avrai <strong>10 giorni gratuiti</strong> per provare la piattaforma – nessuna carta richiesta.
            </p>
            <div class="landing-trial-badge mb-3">
              <i class="ki-duotone ki-gift fs-4 text-success me-2">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
              Per ogni esigenza, piani prepagati da 3, 6 o 12 mesi con sconti dedicati
            </div>
          </div>
        </div>
        
        <div class="pricing-comparison-table">
          <div class="pricing-table-grid">
            <!-- Riga header: corner con logo + 3 piani -->
            <div class="pricing-table-corner">
              <img :src="getAssetPath('media/logos/kurama-home-logos/logo-menu.png')" alt="MiraiHome" class="pricing-corner-logo" />
            </div>
            <div 
              v-for="(plan, index) in pricingPlans" 
              :key="plan.id" 
              class="pricing-table-plan-header"
              :class="'pricing-header-' + (index === 0 ? 'basic' : index === 1 ? 'pro' : 'premium')"
            >
              <div class="pricing-header-icon">
                <i :class="plan.icon" class="fs-2x"></i>
              </div>
              <h3 class="pricing-header-name">{{ plan.name }}</h3>
              <div class="pricing-header-price">
                <span class="pricing-header-amount">€{{ plan.price }}</span>
                <span class="pricing-header-period">/{{ plan.period }}</span>
              </div>
              <router-link :to="'/sign-up'" class="btn btn-sm btn-primary pricing-header-btn">
                Inizia Ora
              </router-link>
            </div>
            <!-- Righe body: feature + valori per ogni piano -->
            <template v-for="(row, ri) in featuresComparison" :key="ri">
              <div class="pricing-table-feature-col" :class="{ 'pricing-table-row-alt': ri % 2 === 1 }">
                <span class="pricing-table-feature-label">{{ row.label }}</span>
              </div>
              <div 
                v-for="plan in pricingPlans" 
                :key="'cell-' + ri + '-' + plan.id"
                class="pricing-table-cell pricing-table-cell-value"
                :class="{ 'pricing-table-row-alt': ri % 2 === 1 }"
              >
                <span class="pricing-table-value">{{ getFeatureValueForPlan(row.featureKey, plan.name) }}</span>
              </div>
            </template>
          </div>
        </div>
      </div>
    </section>
    <!--end::Pricing Section-->

    <!--begin::How It Works Section-->
    <section id="how-it-works" class="how-it-works-section">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center mb-8">
            <h2 class="section-title">Come Funziona</h2>
            <p class="section-description">
              Inizia a usare MiraiHome in pochi semplici passaggi
            </p>
          </div>
        </div>
        
        <div class="row g-4">
          <div class="col-lg-3 col-md-6" v-for="(step, index) in howItWorksSteps" :key="index">
            <div class="step-card">
              <div class="step-number">{{ index + 1 }}</div>
              <div class="step-icon">
                <i :class="step.icon" class="fs-1 text-primary"></i>
              </div>
              <h4 class="step-title">{{ step.title }}</h4>
              <p class="step-description">{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--end::How It Works Section-->

    <!--begin::Testimonials Section-->
    <!-- <section id="testimonials" class="testimonials-section">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center mb-8">
            <h2 class="section-title">Cosa dicono i nostri clienti</h2>
            <p class="section-description">
              Centinaia di agenzie immobiliari si fidano di MiraiHome per gestire il loro business
            </p>
          </div>
        </div>
        
        <div class="row g-4">
          <div class="col-lg-4 col-md-6" v-for="testimonial in testimonials" :key="testimonial.id">
            <div class="testimonial-card">
              <div class="testimonial-rating">
                <i v-for="n in 5" :key="n" class="ki-duotone ki-star fs-5 text-warning">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
              </div>
              <p class="testimonial-text">"{{ testimonial.text }}"</p>
              <div class="testimonial-author">
                <div class="author-avatar">
                  <span>{{ testimonial.initials }}</span>
                </div>
                <div class="author-info">
                  <div class="author-name">{{ testimonial.name }}</div>
                  <div class="author-role">{{ testimonial.role }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> -->
    <!--end::Testimonials Section-->

    <!--begin::FAQ Section-->
    <section id="faq" class="faq-section">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center mb-8">
            <h2 class="section-title">Domande Frequenti</h2>
            <p class="section-description">
              Trova risposte alle domande più comuni su MiraiHome
            </p>
          </div>
        </div>
        
        <div class="row">
          <div class="col-lg-10 mx-auto">
            <div class="accordion faq-categories-accordion" id="categoryAccordion">
              <div 
                class="accordion-item faq-category-item" 
                v-for="(category, catIndex) in faqsByCategory" 
                :key="category.category"
              >
                <h2 class="accordion-header">
                  <button 
                    class="accordion-button faq-category-button" 
                    :class="{ 'collapsed': catIndex !== 0 }"
                    type="button" 
                    :data-bs-toggle="'collapse'" 
                    :data-bs-target="'#category-' + catIndex"
                    :aria-expanded="catIndex === 0 ? 'true' : 'false'"
                  >
                    {{ category.category }}
                  </button>
                </h2>
                <div 
                  :id="'category-' + catIndex" 
                  class="accordion-collapse collapse" 
                  :class="{ 'show': catIndex === 0 }"
                  data-bs-parent="#categoryAccordion"
                >
                  <div class="accordion-body p-0">
                    <div class="accordion" :id="'faqAccordion' + catIndex">
                      <div 
                        class="accordion-item" 
                        v-for="(faq, faqIndex) in category.items" 
                        :key="catIndex + '-' + faqIndex"
                      >
                        <h3 class="accordion-header">
                          <button 
                            class="accordion-button faq-question-button" 
                            :class="{ 'collapsed': faqIndex !== 0 }"
                            type="button" 
                            :data-bs-toggle="'collapse'" 
                            :data-bs-target="'#faq-' + catIndex + '-' + faqIndex"
                            :aria-expanded="faqIndex === 0 ? 'true' : 'false'"
                          >
                            {{ faq.question }}
                          </button>
                        </h3>
                        <div 
                          :id="'faq-' + catIndex + '-' + faqIndex" 
                          class="accordion-collapse collapse" 
                          :class="{ 'show': faqIndex === 0 }"
                          :data-bs-parent="'#faqAccordion' + catIndex"
                        >
                          <div class="accordion-body">
                            {{ faq.answer }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--end::FAQ Section-->

    <!--begin::CTA Section-->
    <section class="cta-section">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center">
            <h2 class="cta-title">Pronto a trasformare la tua agenzia immobiliare?</h2>
            <p class="cta-description">
              Unisciti a centinaia di agenzie che hanno già scelto MiraiHome per gestire
              il loro business in modo più efficiente e professionale.
            </p>
            <div class="cta-buttons">
              <router-link to="/sign-up" class="btn btn-primary btn-lg me-3">
                <i class="ki-duotone ki-rocket me-2">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
                Inizia Gratis Ora
              </router-link>
              <router-link to="/sign-in" class="btn btn-outline-light btn-lg">
                Hai già un account?
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--end::CTA Section-->

    <!--begin::Footer-->
    <LandingFooter />
    <!--end::Footer-->
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, reactive, computed } from "vue";
import { getAssetPath } from "@/core/helpers/assets";
import { getSubscriptionPlans } from "@/core/data/billing";
import { searchPublicProperties, type PublicPropertyCard, type PublicPropertySearchFilters } from "@/core/data/properties";
import PublicPropertySearchForm from "@/components/property/PublicPropertySearchForm.vue";
import LandingNavbar from "@/components/landing/LandingNavbar.vue";
import LandingFooter from "@/components/landing/LandingFooter.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "landing-page",
  components: {
    PublicPropertySearchForm,
    LandingNavbar,
    LandingFooter,
  },
  setup() {
    const router = useRouter();
    const featuredProperties = ref<PublicPropertyCard[]>([]);
    const featuredPropertiesLoading = ref(false);
    const carouselIndex = ref(0);
    const placeholderImage = getAssetPath("media/stock/600x400/img-1.jpg");
    let carouselInterval: ReturnType<typeof setInterval> | null = null;

    const displayedProperties = computed(() => {
      const list = featuredProperties.value;
      if (list.length === 0) return [];
      const size = 3;
      const totalGroups = Math.ceil(list.length / size) || 1;
      const start = (carouselIndex.value % totalGroups) * size;
      const chunk = list.slice(start, start + size);
      if (chunk.length < size && list.length >= size) {
        return chunk.concat(list.slice(0, size - chunk.length));
      }
      return chunk;
    });

    const formatPrice = (value?: number) => {
      if (!value || value <= 0) return "Su richiesta";
      return new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value);
    };

    const allPlansFromApi = ref<Array<{ Name: string; Price: number; BillingPeriod?: string }>>([]);
    type PlanFeature = { FeatureName?: string; featureName?: string; FeatureValue?: string; featureValue?: string; Description?: string; description?: string };
    const defaultPlansWithFeatures: Array<{ Name: string; Features: PlanFeature[] }> = [
      { Name: "Basic", Features: [
        { FeatureName: "max_agencies", FeatureValue: "1", Description: "Massimo 1 agenzia" },
        { FeatureName: "max_agents", FeatureValue: "5", Description: "Massimo 5 agenti" },
        { FeatureName: "max_properties", FeatureValue: "20", Description: "Massimo 20 immobili" },
        { FeatureName: "max_customers", FeatureValue: "50", Description: "Massimo 50 clienti" },
        { FeatureName: "max_requests", FeatureValue: "100", Description: "Massimo 100 richieste" },
        { FeatureName: "export_enabled", FeatureValue: "false", Description: "Export dati disabilitato" },
        { FeatureName: "max_exports", FeatureValue: "0", Description: "Nessun export" },
        { FeatureName: "storage_limit", FeatureValue: "1", Description: "1 GB storage" },
      ]},
      { Name: "Pro", Features: [
        { FeatureName: "max_agencies", FeatureValue: "5", Description: "Massimo 5 agenzie" },
        { FeatureName: "max_agents", FeatureValue: "25", Description: "Massimo 25 agenti" },
        { FeatureName: "max_properties", FeatureValue: "100", Description: "Massimo 100 immobili" },
        { FeatureName: "max_customers", FeatureValue: "500", Description: "Massimo 500 clienti" },
        { FeatureName: "max_requests", FeatureValue: "1000", Description: "Massimo 1000 richieste" },
        { FeatureName: "export_enabled", FeatureValue: "true", Description: "Export abilitato" },
        { FeatureName: "max_exports", FeatureValue: "10", Description: "10 export/mese" },
        { FeatureName: "storage_limit", FeatureValue: "10", Description: "10 GB storage" },
      ]},
      { Name: "Premium", Features: [
        { FeatureName: "max_agencies", FeatureValue: "unlimited", Description: "Agenzie illimitate" },
        { FeatureName: "max_agents", FeatureValue: "unlimited", Description: "Agenti illimitati" },
        { FeatureName: "max_properties", FeatureValue: "unlimited", Description: "Immobili illimitati" },
        { FeatureName: "max_customers", FeatureValue: "unlimited", Description: "Clienti illimitati" },
        { FeatureName: "max_requests", FeatureValue: "unlimited", Description: "Richieste illimitate" },
        { FeatureName: "export_enabled", FeatureValue: "true", Description: "Export abilitato" },
        { FeatureName: "max_exports", FeatureValue: "unlimited", Description: "Export illimitati" },
        { FeatureName: "storage_limit", FeatureValue: "unlimited", Description: "Storage illimitato" },
      ]},
    ];
    const plansWithFullFeatures = ref<Array<{ Name: string; Features?: PlanFeature[] }>>([...defaultPlansWithFeatures]);

    const norm = (f: PlanFeature, key: 'name' | 'value' | 'desc'): string => {
      if (key === 'name') return (f.FeatureName ?? f.featureName ?? '') as string;
      if (key === 'value') return (f.FeatureValue ?? f.featureValue ?? '') as string;
      return (f.Description ?? f.description ?? '') as string;
    };

    const featuresComparisonKeys = [
      { featureKey: "max_agencies", label: "Agenzie" },
      { featureKey: "max_agents", label: "Agenti" },
      { featureKey: "max_properties", label: "Immobili" },
      { featureKey: "max_customers", label: "Clienti" },
      { featureKey: "max_requests", label: "Richieste" },
      { featureKey: "export_enabled", label: "Export dati" },
      { featureKey: "max_exports", label: "Export al mese" },
      { featureKey: "storage_limit", label: "Storage" },
    ];

    const featuresComparison = computed(() => {
      return featuresComparisonKeys.filter(row => {
        const hasAny = plansWithFullFeatures.value.some(p => 
          p.Features?.some(f => norm(f, 'name').toLowerCase() === row.featureKey.toLowerCase())
        );
        return hasAny;
      });
    });

    const getFeatureValueForPlan = (featureKey: string, planName: string): string => {
      const plan = plansWithFullFeatures.value.find(p => p.Name.toLowerCase() === planName.toLowerCase());
      const feature = plan?.Features?.find(f => norm(f, 'name').toLowerCase() === featureKey.toLowerCase());
      if (!feature) return "—";
      const desc = norm(feature, 'desc').trim();
      const val = norm(feature, 'value').toLowerCase();
      if (val === "false" || val === "0") return "No";
      if (val === "true" && featureKey === "export_enabled") return "Sì";
      if (val === "unlimited") return "Illimitato";
      if (val && /^\d+$/.test(val)) return val;
      if (desc) {
        const numMatch = desc.match(/(\d+)\s*(gb|mb)?/i);
        if (numMatch) return numMatch[2] ? `${numMatch[1]} ${(numMatch[2] as string).toUpperCase()}` : numMatch[1];
        if (desc.toLowerCase().includes("illimit")) return "Illimitato";
        if (desc.toLowerCase().includes("disabilit")) return "No";
        return desc.replace(/^(Massimo|Fino a)\s+/, "").trim();
      }
      return val || (desc || "—");
    };

    const getPrepaidOptionsForPlan = (basePlanName: string): Array<{ months: number; price: number; discountPercent: number }> => {
      const plans = allPlansFromApi.value;
      if (!plans.length) return [];
      const base = basePlanName.toLowerCase();
      const PREPAID = { months3: 5, months6: 10, months12: 15 } as const;
      const result: Array<{ months: number; price: number; discountPercent: number }> = [];
      const add = (plan: { Price: number } | undefined, months: number, discount: number) => {
        if (!plan) return;
        const price = Math.round(plan.Price * 100) / 100;
        result.push({ months, price, discountPercent: discount });
      };
      const plan3 = plans.find(p => {
        const n = p.Name.toLowerCase();
        return (n.includes('3 months') || p.BillingPeriod === 'quarterly') && n.startsWith(base);
      });
      const plan6 = plans.find(p => {
        const n = p.Name.toLowerCase();
        return (n.includes('6 months') || p.BillingPeriod === 'semiannual') && n.startsWith(base);
      });
      const plan12 = plans.find(p => {
        const n = p.Name.toLowerCase();
        return (n.includes('12 months') || p.BillingPeriod === 'annual' || p.BillingPeriod === 'yearly') && n.startsWith(base);
      });
      add(plan3, 3, PREPAID.months3);
      add(plan6, 6, PREPAID.months6);
      add(plan12, 12, PREPAID.months12);
      return result;
    };

    const pricingPlans = ref([
      {
        id: 1,
        name: "Basic",
        price: "12",
        period: "mese",
        description: "Perfetto per piccole agenzie e singoli agenti",
        icon: "ki-duotone ki-rocket",
        features: [
          "Fino a 1 agenzia",
          "Fino a 5 agenti",
          "Fino a 20 immobili",
          "Fino a 50 clienti",
          "Fino a 100 richieste",
          "Calendario appuntamenti",
          "1 GB di storage",
          "Supporto email"
        ]
      },
      {
        id: 2,
        name: "Pro",
        price: "39",
        period: "mese",
        description: "Ideale per agenzie medie in crescita",
        icon: "ki-duotone ki-crown",
        features: [
          "Fino a 5 agenzie",
          "Fino a 25 agenti",
          "Fino a 100 immobili",
          "Fino a 500 clienti",
          "Fino a 1000 richieste",
          "Export dati (10/mese)",
          "10 GB di storage",
          "Report avanzati",
          "Supporto prioritario"
        ]
      },
      {
        id: 3,
        name: "Premium",
        price: "99",
        period: "mese",
        description: "Per grandi agenzie e gruppi immobiliari",
        icon: "ki-duotone ki-shield-tick",
        features: [
          "Fino a 10 agenzie",
          "Fino a 50 agenti",
          "Immobili illimitati",
          "Clienti illimitati",
          "Richieste illimitate",
          "Export dati illimitato",
          "Storage illimitato",
          "Report avanzati",
          "API avanzate",
          "Supporto prioritario 24/7"
        ]
      }
    ]);

    const howItWorksSteps = ref([
      {
        icon: "ki-duotone ki-user-square",
        title: "Registrati",
        description: "Crea il tuo account in meno di 2 minuti. Non serve carta di credito per iniziare."
      },
      {
        icon: "ki-duotone ki-setting-2",
        title: "Configura",
        description: "Imposta la tua agenzia, aggiungi i tuoi agenti e personalizza le impostazioni."
      },
      {
        icon: "ki-duotone ki-home",
        title: "Aggiungi Immobili",
        description: "Carica i tuoi immobili con foto, dettagli e tutte le informazioni necessarie."
      },
      {
        icon: "ki-duotone ki-chart-simple",
        title: "Gestisci e Cresci",
        description: "Monitora le performance, gestisci clienti e appuntamenti, e scala il tuo business."
      }
    ]);

    const testimonials = ref([
      {
        id: 1,
        text: "MiraiHome ha rivoluzionato il modo in cui gestiamo la nostra agenzia. Tutto è più organizzato e efficiente.",
        name: "Marco Rossi",
        role: "Titolare, Immobiliare Rossi",
        initials: "MR"
      },
      {
        id: 2,
        text: "La gestione dei clienti e degli appuntamenti è diventata molto più semplice. Consigliatissimo!",
        name: "Laura Bianchi",
        role: "Agente Immobiliare",
        initials: "LB"
      },
      {
        id: 3,
        text: "Ottimo rapporto qualità-prezzo. Il piano Pro ha tutto quello che serve per la nostra agenzia media.",
        name: "Giuseppe Verdi",
        role: "Direttore, Casa & Affari",
        initials: "GV"
      }
    ]);

    const faqsByCategory = ref([
      {
        category: "Prodotto e generale",
        items: [
          {
            question: "Cos'è MiraiHome?",
            answer: "MiraiHome è la piattaforma completa per gestire la tua agenzia immobiliare: immobili, clienti, agenti, appuntamenti, documentazione e report. Tutto in un unico sistema cloud, accessibile da qualsiasi dispositivo."
          },
          {
            question: "Chi può usare MiraiHome?",
            answer: "MiraiHome è pensato per agenzie immobiliari di ogni dimensione: dal professionista singolo al gruppo con più agenzie e agenti. Supporta tre ruoli: Admin (titolare), Agenzia e Agente."
          },
          {
            question: "Devo installare qualcosa?",
            answer: "No. MiraiHome è una soluzione cloud: non richiede installazione. Accedi dal browser da computer, tablet o smartphone, sempre sincronizzato."
          }
        ]
      },
      {
        category: "Registrazione e account",
        items: [
          {
            question: "Posso provare MiraiHome gratuitamente?",
            answer: "Sì. Dopo la registrazione hai 10 giorni gratuiti per provare la piattaforma. Non richiediamo carta di credito per iniziare."
          },
          {
            question: "Devo inserire la carta di credito per registrarmi?",
            answer: "No. La registrazione è gratuita e senza impegno. Potrai attivare un piano a pagamento quando decidi di continuare."
          },
          {
            question: "Ho dimenticato la password, cosa faccio?",
            answer: "Usa il link \"Password dimenticata\" nella pagina di accesso. Riceverai un'email con le istruzioni per reimpostare la password in modo sicuro."
          }
        ]
      },
      {
        category: "Funzionalità",
        items: [
          {
            question: "Come funziona la gestione degli immobili?",
            answer: "Puoi caricare tutti gli immobili con foto, dettagli, prezzi e disponibilità in un unico archivio. Ogni immobile può essere associato a clienti, richieste e appuntamenti."
          },
          {
            question: "Posso cercare immobili senza registrarmi?",
            answer: "Sì. La vetrina pubblica permette di cercare gli immobili disponibili filtrando per provincia, comune, prezzo, tipologia e altre caratteristiche, senza bisogno di un account."
          },
          {
            question: "Cos'è il calendario appuntamenti?",
            answer: "Il calendario integrato ti permette di organizzare visite, appuntamenti e meeting con i clienti, associandoli a immobili e richieste, con notifiche automatiche."
          },
          {
            question: "Come funziona l'export dei dati?",
            answer: "I piani Pro e Premium includono l'export in Excel o CSV. Il Pro offre 10 export al mese, il Premium è illimitato. Puoi esportare immobili, clienti, richieste e altre entità."
          }
        ]
      },
      {
        category: "Piani e prezzi",
        items: [
          {
            question: "Quali piani sono disponibili?",
            answer: "Basic (€12/mese), Pro (€39/mese) e Premium (€99/mese). Sono disponibili anche piani prepagati da 3, 6 o 12 mesi con sconti dedicati."
          },
          {
            question: "Posso pagare in un'unica soluzione?",
            answer: "Sì. Puoi scegliere piani prepagati per 3, 6 o 12 mesi con sconti progressivi. Il pagamento ricorrente mensile è disponibile per i piani base."
          },
          {
            question: "Posso cambiare piano in qualsiasi momento?",
            answer: "Sì. Puoi aggiornare o modificare il piano dalla sezione Abbonamento. Per i downgrade potrebbe essere necessario ridurre alcune risorse se superano i limiti del nuovo piano."
          },
          {
            question: "Cosa succede se supero i limiti del mio piano?",
            answer: "Riceverai una notifica quando ti avvicini ai limiti. Potrai aggiornare al piano superiore o ridurre le risorse utilizzate per rimanere entro i limiti."
          }
        ]
      },
      {
        category: "Sicurezza e supporto",
        items: [
          {
            question: "I miei dati sono al sicuro?",
            answer: "Sì. Utilizziamo i migliori standard di sicurezza e crittografia. Eseguiamo backup automatici quotidiani e i tuoi dati sono protetti da accessi non autorizzati."
          },
          {
            question: "Offrite supporto tecnico?",
            answer: "Sì. Supporto via email per tutti i piani. Pro e Premium includono supporto prioritario. Il piano Premium include anche supporto 24/7."
          },
          {
            question: "Dove trovo la privacy policy e la cookie policy?",
            answer: "Le informative su privacy e cookie sono disponibili nelle pagine legali del sito, accessibili dal footer."
          }
        ]
      }
    ]);

    const landingSearchDefaults = reactive<Partial<PublicPropertySearchFilters>>({
      status: "Disponibile",
    });

    const buildQueryParams = (filters: PublicPropertySearchFilters) => {
      const query: Record<string, string> = {};
      if (filters.keyword) query.keyword = filters.keyword;
      if (filters.province) query.province = filters.province;
      if (filters.city) query.city = filters.city;
      if (filters.category) query.category = filters.category;
      if (filters.typology) query.typology = filters.typology;
      if (filters.status) query.status = filters.status;
      if (filters.priceMin) query.priceMin = filters.priceMin.toString();
      if (filters.priceMax) query.priceMax = filters.priceMax.toString();
      query.page = "1";
      return query;
    };

    const handleLandingSearch = (filters: PublicPropertySearchFilters) => {
      router.push({
        name: "public-properties",
        query: buildQueryParams(filters),
      });
    };

    const fetchFeaturedProperties = async () => {
      featuredPropertiesLoading.value = true;
      try {
        const result = await searchPublicProperties({ page: 1, pageSize: 9 });
        featuredProperties.value = result.Data || [];
        // Avvia rotazione carousel ogni 4 secondi
        if (featuredProperties.value.length > 3) {
          carouselInterval = setInterval(() => {
            carouselIndex.value = (carouselIndex.value + 1) % Math.ceil(featuredProperties.value.length / 3);
          }, 4000);
        }
      } catch {
        featuredProperties.value = [];
      } finally {
        featuredPropertiesLoading.value = false;
      }
    };

    onMounted(async () => {
      fetchFeaturedProperties();
      // Try to load real plans from API, fallback to static data
      try {
        const activePlans = await getSubscriptionPlans();
        const landingNames = ['Basic', 'Pro', 'Premium'];
        const monthlyPlans = landingNames
          .map(name => activePlans.find(p => p.Name === name && (p as { BillingPeriod?: string }).BillingPeriod === 'monthly'))
          .filter(Boolean) as Array<{ Id: number; Name: string; Price: number; BillingPeriod?: string; Description?: string; Features?: Array<{ FeatureName: string; FeatureValue?: string; Description?: string }> }>;
        allPlansFromApi.value = activePlans.filter(p => p.Name.toLowerCase() !== 'free');
        plansWithFullFeatures.value = monthlyPlans.map(p => {
          const raw = p as { Features?: PlanFeature[] };
          const hasFeatures = raw.Features && raw.Features.length > 0;
          const defaultPlan = defaultPlansWithFeatures.find(d => d.Name === p.Name);
          return {
            Name: p.Name,
            Features: hasFeatures ? raw.Features! : (defaultPlan?.Features ?? []),
          };
        });
        if (monthlyPlans.length > 0) {
          pricingPlans.value = monthlyPlans.map((plan, index) => {
            const features = (plan as { Features?: Array<{ Description?: string; FeatureName: string }> }).Features?.slice(0, 8).map(f => f.Description || f.FeatureName) || [];
            return {
              id: plan.Id,
              name: plan.Name,
              price: plan.Price.toString(),
              period: plan.BillingPeriod === 'monthly' ? 'mese' : 'anno',
              description: plan.Description || pricingPlans.value[index]?.description || '',
              icon: index === 0 ? "ki-duotone ki-rocket" : index === 1 ? "ki-duotone ki-crown" : "ki-duotone ki-shield-tick",
              features: features.length > 0 ? features : pricingPlans.value[index]?.features || []
            };
          });
        }
      } catch (error) {
        console.log('Using static pricing plans data');
        plansWithFullFeatures.value = [...defaultPlansWithFeatures];
        allPlansFromApi.value = [
          { Name: 'Basic', Price: 19, BillingPeriod: 'monthly' },
          { Name: 'Basic 3 Months', Price: 54, BillingPeriod: 'quarterly' },
          { Name: 'Basic 6 Months', Price: 102, BillingPeriod: 'semiannual' },
          { Name: 'Basic 12 Months', Price: 182, BillingPeriod: 'annual' },
          { Name: 'Pro', Price: 39, BillingPeriod: 'monthly' },
          { Name: 'Pro 3 Months', Price: 111, BillingPeriod: 'quarterly' },
          { Name: 'Pro 6 Months', Price: 211, BillingPeriod: 'semiannual' },
          { Name: 'Pro 12 Months', Price: 398, BillingPeriod: 'annual' },
          { Name: 'Premium', Price: 99, BillingPeriod: 'monthly' },
          { Name: 'Premium 3 Months', Price: 282, BillingPeriod: 'quarterly' },
          { Name: 'Premium 6 Months', Price: 535, BillingPeriod: 'semiannual' },
          { Name: 'Premium 12 Months', Price: 1010, BillingPeriod: 'annual' },
        ];
      }
    });

    onUnmounted(() => {
      if (carouselInterval) clearInterval(carouselInterval);
    });

    return {
      getAssetPath,
      pricingPlans,
      featuresComparison,
      getFeatureValueForPlan,
      getPrepaidOptionsForPlan,
      howItWorksSteps,
      testimonials,
      faqsByCategory,
      landingSearchDefaults,
      handleLandingSearch,
      featuredProperties,
      displayedProperties,
      featuredPropertiesLoading,
      carouselIndex,
      placeholderImage,
      formatPrice,
    };
  },
});
</script>
