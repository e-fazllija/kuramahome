<template>
  <div class="landing-page">
    <!--begin::Navigation-->
    <nav class="navbar navbar-expand-lg navbar-light fixed-top">
      <div class="container">
        <router-link class="navbar-brand" to="/">
          <img :src="getAssetPath('media/logos/kurama-home-logos/logo-menu.png')" alt="KuramaHome" height="40" />
        </router-link>
        
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link" href="#features">Funzionalità</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#benefits">Vantaggi</a>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/sign-in">Accedi</router-link>
            </li>
            <li class="nav-item">
              <router-link class="btn btn-primary ms-2" to="/sign-up">Inizia</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!--end::Navigation-->

    <!--begin::Hero Section-->
    <section class="hero-section">
      <div class="container">
        <div class="row align-items-center min-vh-100">
          <div class="col-lg-6">
            <div class="hero-content">
              <h1 class="hero-title">
                Gestisci la tua Agenzia Immobiliare con 
                <span class="text-primary">KuramaHome</span>
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
                  <div class="preview-title">KuramaHome Dashboard</div>
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

    <!--begin::Features Section-->
    <section id="features" class="features-section">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center mb-8">
            <h2 class="section-title">Tutto quello che ti serve per gestire la tua agenzia</h2>
            <p class="section-description">
              KuramaHome è la soluzione completa per agenzie immobiliari moderne che vogliono
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
              <h2 class="section-title">Perché scegliere KuramaHome?</h2>
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
                  <p>Usa KuramaHome da computer, tablet o smartphone, sempre sincronizzato.</p>
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

    <!--begin::CTA Section-->
    <section class="cta-section">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto text-center">
            <h2 class="cta-title">Pronto a trasformare la tua agenzia immobiliare?</h2>
            <p class="cta-description">
              Unisciti a centinaia di agenzie che hanno già scelto KuramaHome per gestire
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
    <footer class="footer">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-6">
            <div class="footer-brand">
              <img :src="getAssetPath('media/logos/kurama-home-logos/logo-menu.png')" alt="KuramaHome" height="30" />
              <span class="ms-2 text-muted">© 2024 KuramaHome. Tutti i diritti riservati.</span>
            </div>
          </div>
          <div class="col-md-6 text-md-end">
            <div class="footer-links">
              <router-link to="/sign-in" class="text-muted me-3">Accedi</router-link>
              <router-link to="/sign-up" class="text-muted">Registrati</router-link>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <!--end::Footer-->
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { getAssetPath } from "@/core/helpers/assets";

export default defineComponent({
  name: "landing-page",
  setup() {
    onMounted(() => {
      // Smooth scrolling for anchor links
      const anchorLinks = document.querySelectorAll('a[href^="#"]');
      anchorLinks.forEach(link => {
        link.addEventListener('click', function(e: Event) {
          e.preventDefault();
          const targetId = (e.target as HTMLAnchorElement).getAttribute('href');
          if (targetId) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
              targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }
          }
        });
      });
    });

    return {
      getAssetPath,
    };
  },
});
</script>
