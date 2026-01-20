<template>
  <div class="landing-page">
    <!--begin::Navigation-->
    <LandingNavbar />
    <!--end::Navigation-->

    <!--begin::Hero Section-->
    <section class="hero-section">
      <div class="container">
        <div class="row align-items-center min-vh-100">
          <div class="col-lg-6">
            <div class="hero-content">
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
              <h4 class="feature-title">Modulistica Digitale</h4>
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

    <!--begin::Benefits Section-->
    <section id="benefits" class="benefits-section">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <div class="benefits-content">
              <h2 class="section-title">Perché scegliere MiraiHome?</h2>
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
          </div>
          
          <div class="col-lg-6">
            <div class="stats-container">
              <div class="row g-4">
                <div class="col-6">
                  <div class="stat-card">
                    <div class="stat-number">500+</div>
                    <div class="stat-label">Agenzie Attive</div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="stat-card">
                    <div class="stat-number">50K+</div>
                    <div class="stat-label">Immobili Gestiti</div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="stat-card">
                    <div class="stat-number">2K+</div>
                    <div class="stat-label">Agenti</div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="stat-card">
                    <div class="stat-number">99.9%</div>
                    <div class="stat-label">Uptime</div>
                  </div>
                </div>
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
              Piani flessibili pensati per agenzie di ogni dimensione. Inizia con il piano Basic e scala quando cresci.
            </p>
          </div>
        </div>
        
        <div class="row g-4 justify-content-center">
          <div class="col-lg-4 col-md-6" v-for="(plan, index) in pricingPlans" :key="plan.id">
            <div class="pricing-card-landing" :class="{ 'pricing-card-featured-landing': index === 1 }">
              <div v-if="index === 1" class="pricing-badge-landing">
                <span class="badge badge-primary">Più Popolare</span>
              </div>
              <div class="pricing-card-header">
                <div class="pricing-icon-wrapper-landing">
                  <i :class="plan.icon" class="fs-2x text-primary"></i>
                </div>
                <h3 class="pricing-plan-name">{{ plan.name }}</h3>
                <div class="pricing-price-landing">
                  <span class="price-amount">€{{ plan.price }}</span>
                  <span class="price-period">/{{ plan.period }}</span>
                </div>
                <p class="pricing-description">{{ plan.description }}</p>
              </div>
              <div class="pricing-card-body">
                <ul class="pricing-features-list">
                  <li v-for="feature in plan.features" :key="feature">
                    <i class="ki-duotone ki-check-circle fs-5 text-success me-2">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    {{ feature }}
                  </li>
                </ul>
              </div>
              <div class="pricing-card-footer">
                <router-link :to="'/sign-up'" class="btn btn-lg w-100" :class="index === 1 ? 'btn-primary' : 'btn-outline-primary'">
                  Inizia Ora
                </router-link>
              </div>
            </div>
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
          <div class="col-lg-8 mx-auto">
            <div class="accordion" id="faqAccordion">
              <div class="accordion-item" v-for="(faq, index) in faqs" :key="index">
                <h2 class="accordion-header">
                  <button 
                    class="accordion-button" 
                    :class="{ 'collapsed': index !== 0 }"
                    type="button" 
                    :data-bs-toggle="'collapse'" 
                    :data-bs-target="'#faq' + index"
                    :aria-expanded="index === 0 ? 'true' : 'false'"
                  >
                    {{ faq.question }}
                  </button>
                </h2>
                <div 
                  :id="'faq' + index" 
                  class="accordion-collapse collapse" 
                  :class="{ 'show': index === 0 }"
                  :data-bs-parent="'#faqAccordion'"
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
import { defineComponent, onMounted, ref, reactive } from "vue";
import { getAssetPath } from "@/core/helpers/assets";
import { getActivePlans, type SubscriptionPlan } from "@/core/data/subscription-plans";
import PublicPropertySearchForm from "@/components/property/PublicPropertySearchForm.vue";
import LandingNavbar from "@/components/landing/LandingNavbar.vue";
import LandingFooter from "@/components/landing/LandingFooter.vue";
import type { PublicPropertySearchFilters } from "@/core/data/properties";
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
          "Agenzie illimitate",
          "Agenti illimitati",
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

    const faqs = ref([
      {
        question: "Posso cambiare piano in qualsiasi momento?",
        answer: "Sì, puoi aggiornare o modificare il tuo piano in qualsiasi momento dalla sezione Abbonamento. I cambi di piano vengono applicati immediatamente. Nota: per i downgrade potrebbe essere necessario ridurre alcune risorse se superano i limiti del nuovo piano."
      },
      {
        question: "Cosa succede se supero i limiti del mio piano?",
        answer: "Riceverai una notifica quando ti avvicini ai limiti del tuo piano. Potrai decidere di aggiornare al piano superiore o ridurre le risorse utilizzate per rimanere entro i limiti."
      },
      {
        question: "I miei dati sono al sicuro?",
        answer: "Assolutamente sì. Utilizziamo i migliori standard di sicurezza e crittografia per proteggere i tuoi dati. Eseguiamo backup automatici quotidiani e i tuoi dati sono protetti da accessi non autorizzati."
      },
      {
        question: "Offrite supporto tecnico?",
        answer: "Sì, offriamo supporto via email per tutti i piani. I piani Pro e Premium includono supporto prioritario con tempi di risposta più rapidi. Il piano Premium include anche supporto 24/7."
      },
      {
        question: "Posso provare MiraiHome gratuitamente?",
        answer: "Sì, puoi registrarti e iniziare a usare MiraiHome senza impegno. Non richiediamo carta di credito per la registrazione. Puoi esplorare tutte le funzionalità e decidere se passare a un piano a pagamento quando sei pronto."
      },
      {
        question: "Come funziona l'export dei dati?",
        answer: "I piani Pro e Premium includono la possibilità di esportare i dati in formato Excel o CSV. Il piano Pro include 10 export al mese, mentre il piano Premium include export illimitati. L'export è disponibile per immobili, clienti, agenti e altre entità."
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

    onMounted(async () => {
      // Try to load real plans from API, fallback to static data
      try {
        const activePlans = await getActivePlans();
        if (activePlans && activePlans.length > 0) {
          // Map API plans to our format
          pricingPlans.value = activePlans.slice(0, 3).map((plan, index) => {
            const features = plan.Features?.slice(0, 8).map(f => f.Description || f.FeatureName) || [];
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
      }
    });

    return {
      pricingPlans,
      howItWorksSteps,
      testimonials,
      faqs,
      landingSearchDefaults,
      handleLandingSearch,
    };
  },
});
</script>
