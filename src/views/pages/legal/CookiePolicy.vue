<template>
  <div class="legal-page-wrapper">
    <div class="card shadow-sm" style="border-radius: 0.95rem; border: 1px solid #e9ecef;">
      <!--begin::Header-->
      <div class="card-header border-0 pt-6 pb-4" style="background: linear-gradient(135deg, #f1f3ff 0%, #e8f4ff 100%); border-radius: 0.95rem 0.95rem 0 0;">
        <div class="card-title">
          <div class="d-flex align-items-center">
            <div class="symbol symbol-45px me-3">
              <span class="symbol-label" style="background: linear-gradient(135deg, #3699ff 0%, #0bb7af 100%); box-shadow: 0 4px 12px rgba(54, 153, 255, 0.3);">
                <i class="ki-duotone ki-cookie fs-2 text-white">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
              </span>
            </div>
            <div>
              <h3 class="fw-bold m-0 text-gray-900 fs-3">Cookie Policy</h3>
              <span class="text-muted fs-7 fw-semibold">Informativa sui Cookie - GDPR</span>
            </div>
          </div>
        </div>
        <div class="card-toolbar">
          <span class="badge badge-light-primary fs-7 fw-bold">Ultimo aggiornamento: {{ lastUpdated }}</span>
        </div>
      </div>
      <!--end::Header-->

      <!--begin::Body-->
      <div class="card-body py-6 px-9">
        <div class="legal-content">
          <!--begin::Introduction-->
          <div class="mb-8">
            <h4 class="fw-bold text-gray-900 mb-4">1. Cosa sono i Cookie</h4>
            <div class="alert alert-light-info d-flex align-items-start p-5">
              <i class="ki-duotone ki-information-5 fs-2x text-info me-4 mt-1">
                <span class="path1"></span>
                <span class="path2"></span>
                <span class="path3"></span>
              </i>
              <div>
                <h5 class="fw-bold text-info mb-2">Definizione</h5>
                <p class="text-gray-700 mb-0">
                  I cookie sono piccoli file di testo che vengono memorizzati sul tuo dispositivo quando visiti il nostro sito web. 
                  Ci aiutano a fornire una migliore esperienza utente e a comprendere come utilizzi i nostri servizi.
                </p>
              </div>
            </div>
          </div>
          <!--end::Introduction-->

          <!--begin::Cookie Types-->
          <div class="mb-8">
            <h4 class="fw-bold text-gray-900 mb-4">2. Tipi di Cookie Utilizzati</h4>
            
            <!--begin::Essential Cookies-->
            <div class="mb-6">
              <div class="card card-bordered">
                <div class="card-header bg-light-success">
                  <div class="card-title">
                    <h5 class="fw-bold text-success mb-0">
                      <i class="ki-duotone ki-shield-tick fs-2 me-2">
                        <span class="path1"></span>
                        <span class="path2"></span>
                      </i>
                      Cookie Tecnici Necessari
                    </h5>
                  </div>
                  <span class="badge badge-success">Sempre Attivi</span>
                </div>
                <div class="card-body">
                  <p class="text-gray-700 fs-6 mb-4">
                    Questi cookie sono essenziali per il funzionamento del sito web e non possono essere disabilitati. 
                    Non raccolgono informazioni personali identificabili.
                  </p>
                  <div class="table-responsive">
                    <table class="table table-sm table-bordered">
                      <thead class="bg-light">
                        <tr>
                          <th class="fw-bold">Nome Cookie</th>
                          <th class="fw-bold">Scopo</th>
                          <th class="fw-bold">Durata</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><code>session_id</code></td>
                          <td>Mantiene la sessione utente attiva</td>
                          <td>Fino alla chiusura del browser</td>
                        </tr>
                        <tr>
                          <td><code>auth_token</code></td>
                          <td>Autenticazione utente</td>
                          <td>24 ore</td>
                        </tr>
                        <tr>
                          <td><code>csrf_token</code></td>
                          <td>Sicurezza contro attacchi CSRF</td>
                          <td>Fino alla chiusura del browser</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <!--end::Essential Cookies-->

            <!--begin::Analytics Cookies-->
            <div class="mb-6">
              <div class="card card-bordered">
                <div class="card-header bg-light-primary">
                  <div class="card-title">
                    <h5 class="fw-bold text-primary mb-0">
                      <i class="ki-duotone ki-chart-simple fs-2 me-2">
                        <span class="path1"></span>
                        <span class="path2"></span>
                        <span class="path3"></span>
                      </i>
                      Cookie Analytics
                    </h5>
                  </div>
                  <span class="badge badge-primary">Con Consenso</span>
                </div>
                <div class="card-body">
                  <p class="text-gray-700 fs-6 mb-4">
                    Questi cookie ci aiutano a comprendere come gli utenti interagiscono con il nostro sito web, 
                    fornendo informazioni anonime e aggregate.
                  </p>
                  <div class="row g-4">
                    <div class="col-md-6">
                      <div class="d-flex align-items-center p-4 bg-light-primary rounded">
                        <i class="ki-duotone ki-chart-line fs-2x text-primary me-3">
                          <span class="path1"></span>
                          <span class="path2"></span>
                        </i>
                        <div>
                          <h6 class="fw-bold text-gray-900 mb-1">Google Analytics</h6>
                          <span class="text-gray-600 fs-7">Analisi del traffico web</span>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="d-flex align-items-center p-4 bg-light-info rounded">
                        <i class="ki-duotone ki-eye fs-2x text-info me-3">
                          <span class="path1"></span>
                          <span class="path2"></span>
                          <span class="path3"></span>
                        </i>
                        <div>
                          <h6 class="fw-bold text-gray-900 mb-1">Hotjar</h6>
                          <span class="text-gray-600 fs-7">Mappatura comportamento utente</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--end::Analytics Cookies-->

            <!--begin::Functional Cookies-->
            <div class="mb-6">
              <div class="card card-bordered">
                <div class="card-header bg-light-warning">
                  <div class="card-title">
                    <h5 class="fw-bold text-warning mb-0">
                      <i class="ki-duotone ki-setting-2 fs-2 me-2">
                        <span class="path1"></span>
                        <span class="path2"></span>
                      </i>
                      Cookie Funzionali
                    </h5>
                  </div>
                  <span class="badge badge-warning">Con Consenso</span>
                </div>
                <div class="card-body">
                  <p class="text-gray-700 fs-6 mb-4">
                    Questi cookie permettono al sito web di ricordare le scelte che fai (come nome utente, 
                    lingua o regione) e forniscono funzionalità migliorate e personalizzate.
                  </p>
                  <ul class="list-unstyled text-gray-700 fs-6">
                    <li class="mb-2"><i class="ki-duotone ki-check-circle fs-5 text-success me-2"><span class="path1"></span><span class="path2"></span></i>Preferenze utente (tema, lingua)</li>
                    <li class="mb-2"><i class="ki-duotone ki-check-circle fs-5 text-success me-2"><span class="path1"></span><span class="path2"></span></i>Impostazioni di visualizzazione</li>
                    <li class="mb-2"><i class="ki-duotone ki-check-circle fs-5 text-success me-2"><span class="path1"></span><span class="path2"></span></i>Filtri e ricerche salvate</li>
                    <li class="mb-0"><i class="ki-duotone ki-check-circle fs-5 text-success me-2"><span class="path1"></span><span class="path2"></span></i>Personalizzazione interfaccia</li>
                  </ul>
                </div>
              </div>
            </div>
            <!--end::Functional Cookies-->

            <!--begin::Marketing Cookies-->
            <div class="mb-6">
              <div class="card card-bordered">
                <div class="card-header bg-light-danger">
                  <div class="card-title">
                    <h5 class="fw-bold text-danger mb-0">
                      <i class="ki-duotone ki-send fs-2 me-2">
                        <span class="path1"></span>
                        <span class="path2"></span>
                      </i>
                      Cookie Marketing
                    </h5>
                  </div>
                  <span class="badge badge-danger">Con Consenso</span>
                </div>
                <div class="card-body">
                  <p class="text-gray-700 fs-6 mb-4">
                    Questi cookie vengono utilizzati per fornire pubblicità più rilevante per te e i tuoi interessi. 
                    Possono anche essere utilizzati per limitare il numero di volte che vedi una pubblicità.
                  </p>
                  <div class="alert alert-light-warning d-flex align-items-center p-4">
                    <i class="ki-duotone ki-information-5 fs-2x text-warning me-4">
                      <span class="path1"></span>
                      <span class="path2"></span>
                      <span class="path3"></span>
                    </i>
                    <div>
                      <h6 class="fw-bold text-warning mb-1">Nota Importante</h6>
                      <span class="text-gray-700 fs-7">
                        Attualmente non utilizziamo cookie di marketing. Questa sezione è inclusa per completezza 
                        e nel caso di future implementazioni.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--end::Marketing Cookies-->
          </div>
          <!--end::Cookie Types-->

          <!--begin::Management-->
          <div class="mb-8">
            <h4 class="fw-bold text-gray-900 mb-4">3. Gestione dei Cookie</h4>
            
            <!--begin::Browser Settings-->
            <div class="mb-6">
              <h5 class="fw-bold text-gray-800 mb-4">Impostazioni del Browser</h5>
              <div class="row g-4">
                <div class="col-lg-6">
                  <div class="card card-bordered h-100">
                    <div class="card-header bg-light-info">
                      <h6 class="fw-bold text-info mb-0">
                        <i class="ki-duotone ki-gear fs-2 me-2">
                          <span class="path1"></span>
                          <span class="path2"></span>
                        </i>
                        Controllo Generale
                      </h6>
                    </div>
                    <div class="card-body">
                      <p class="text-gray-700 fs-6 mb-4">
                        Puoi controllare e gestire i cookie direttamente dalle impostazioni del tuo browser.
                      </p>
                      <div class="d-grid">
                        <button class="btn btn-info btn-sm">
                          <i class="ki-duotone ki-setting-3 fs-3 me-2">
                            <span class="path1"></span>
                            <span class="path2"></span>
                            <span class="path3"></span>
                            <span class="path4"></span>
                            <span class="path5"></span>
                          </i>
                          Cookie Settings
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="card card-bordered h-100">
                    <div class="card-header bg-light-warning">
                      <h6 class="fw-bold text-warning mb-0">
                        <i class="ki-duotone ki-trash fs-2 me-2">
                          <span class="path1"></span>
                          <span class="path2"></span>
                          <span class="path3"></span>
                        </i>
                        Cancellazione
                      </h6>
                    </div>
                    <div class="card-body">
                      <p class="text-gray-700 fs-6 mb-4">
                        Puoi cancellare tutti i cookie esistenti dal tuo browser in qualsiasi momento.
                      </p>
                      <div class="d-grid">
                        <button class="btn btn-warning btn-sm">
                          <i class="ki-duotone ki-trash fs-3 me-2">
                            <span class="path1"></span>
                            <span class="path2"></span>
                            <span class="path3"></span>
                          </i>
                          Cancella Cookie
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--end::Browser Settings-->

            <!--begin::Browser Instructions-->
            <div class="mb-6">
              <h5 class="fw-bold text-gray-800 mb-4">Istruzioni per Browser</h5>
              <div class="accordion" id="browser-accordion">
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#chrome">
                      <i class="ki-duotone ki-chrome fs-2 me-3">
                        <span class="path1"></span>
                        <span class="path2"></span>
                      </i>
                      Google Chrome
                    </button>
                  </h2>
                  <div id="chrome" class="accordion-collapse collapse show" data-bs-parent="#browser-accordion">
                    <div class="accordion-body">
                      <ol class="text-gray-700 fs-6">
                        <li class="mb-2">Clicca sui tre punti in alto a destra</li>
                        <li class="mb-2">Seleziona "Impostazioni"</li>
                        <li class="mb-2">Vai su "Privacy e sicurezza" → "Cookie e altri dati dei siti"</li>
                        <li class="mb-0">Gestisci i cookie per questo sito</li>
                      </ol>
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#firefox">
                      <i class="ki-duotone ki-firefox fs-2 me-3">
                        <span class="path1"></span>
                        <span class="path2"></span>
                      </i>
                      Mozilla Firefox
                    </button>
                  </h2>
                  <div id="firefox" class="accordion-collapse collapse" data-bs-parent="#browser-accordion">
                    <div class="accordion-body">
                      <ol class="text-gray-700 fs-6">
                        <li class="mb-2">Clicca sul menu ☰ in alto a destra</li>
                        <li class="mb-2">Seleziona "Impostazioni"</li>
                        <li class="mb-2">Vai su "Privacy e sicurezza"</li>
                        <li class="mb-0">Nella sezione "Cookie e dati dei siti web" gestisci le impostazioni</li>
                      </ol>
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#safari">
                      <i class="ki-duotone ki-safari fs-2 me-3">
                        <span class="path1"></span>
                        <span class="path2"></span>
                      </i>
                      Apple Safari
                    </button>
                  </h2>
                  <div id="safari" class="accordion-collapse collapse" data-bs-parent="#browser-accordion">
                    <div class="accordion-body">
                      <ol class="text-gray-700 fs-6">
                        <li class="mb-2">Vai su "Safari" nel menu</li>
                        <li class="mb-2">Seleziona "Preferenze"</li>
                        <li class="mb-2">Clicca sulla scheda "Privacy"</li>
                        <li class="mb-0">Gestisci le impostazioni dei cookie</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--end::Browser Instructions-->
          </div>
          <!--end::Management-->

          <!--begin::Third Party-->
          <div class="mb-8">
            <h4 class="fw-bold text-gray-900 mb-4">4. Cookie di Terze Parti</h4>
            <div class="table-responsive">
              <table class="table table-bordered table-hover">
                <thead class="bg-light-primary">
                  <tr>
                    <th class="fw-bold">Servizio</th>
                    <th class="fw-bold">Scopo</th>
                    <th class="fw-bold">Privacy Policy</th>
                    <th class="fw-bold">Opt-out</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Google Analytics</strong></td>
                    <td>Analisi del traffico web</td>
                    <td><a href="https://policies.google.com/privacy" target="_blank" class="link-primary">Privacy Policy</a></td>
                    <td><a href="https://tools.google.com/dlpage/gaoptout" target="_blank" class="btn btn-sm btn-outline-danger">Disabilita</a></td>
                  </tr>
                  <tr>
                    <td><strong>Google Maps</strong></td>
                    <td>Visualizzazione mappe</td>
                    <td><a href="https://policies.google.com/privacy" target="_blank" class="link-primary">Privacy Policy</a></td>
                    <td><span class="text-muted">N/A</span></td>
                  </tr>
                  <tr>
                    <td><strong>Stripe</strong></td>
                    <td>Gestione pagamenti</td>
                    <td><a href="https://stripe.com/privacy" target="_blank" class="link-primary">Privacy Policy</a></td>
                    <td><span class="text-muted">N/A</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!--end::Third Party-->

          <!--begin::Updates-->
          <div class="mb-8">
            <h4 class="fw-bold text-gray-900 mb-4">5. Aggiornamenti della Policy</h4>
            <div class="alert alert-light-warning d-flex align-items-start p-5">
              <i class="ki-duotone ki-information-5 fs-2x text-warning me-4 mt-1">
                <span class="path1"></span>
                <span class="path2"></span>
                <span class="path3"></span>
              </i>
              <div>
                <h5 class="fw-bold text-warning mb-2">Notifiche di Modifica</h5>
                <p class="text-gray-700 mb-3">
                  Potremmo aggiornare questa Cookie Policy periodicamente per riflettere cambiamenti nelle nostre pratiche 
                  o per altre ragioni operative, legali o regolamentari.
                </p>
                <ul class="list-unstyled text-gray-700 fs-6">
                  <li class="mb-2">• Ti notificheremo eventuali modifiche significative via email</li>
                  <li class="mb-2">• La data dell'ultimo aggiornamento è indicata in alto</li>
                  <li class="mb-0">• Ti incoraggiamo a rivedere periodicamente questa policy</li>
                </ul>
              </div>
            </div>
          </div>
          <!--end::Updates-->

          <!--begin::Contact-->
          <div class="mb-0">
            <h4 class="fw-bold text-gray-900 mb-4">6. Contatti</h4>
            <div class="card card-bordered">
              <div class="card-body">
                <div class="row g-4">
                  <div class="col-md-6">
                    <div class="d-flex align-items-center">
                      <div class="symbol symbol-40px me-4">
                        <span class="symbol-label bg-light-primary">
                          <i class="ki-duotone ki-sms fs-2 text-primary">
                            <span class="path1"></span>
                            <span class="path2"></span>
                          </i>
                        </span>
                      </div>
                      <div>
                        <h6 class="fw-bold text-gray-900 mb-1">Email Privacy</h6>
                        <span class="text-gray-600 fs-7">privacy@kuramahome.it</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="d-flex align-items-center">
                      <div class="symbol symbol-40px me-4">
                        <span class="symbol-label bg-light-success">
                          <i class="ki-duotone ki-call fs-2 text-success">
                            <span class="path1"></span>
                            <span class="path2"></span>
                          </i>
                        </span>
                      </div>
                      <div>
                        <h6 class="fw-bold text-gray-900 mb-1">Telefono</h6>
                        <span class="text-gray-600 fs-7">+39 02 1234567</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="separator my-4"></div>
                <p class="text-gray-600 fs-7 mb-0">
                  Per domande sui cookie o per esercitare i tuoi diritti riguardo al trattamento dei dati personali, 
                  contattaci utilizzando i canali sopra indicati.
                </p>
              </div>
            </div>
          </div>
          <!--end::Contact-->
        </div>
      </div>
      <!--end::Body-->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "cookie-policy",
  setup() {
    const lastUpdated = "25 Gennaio 2024";

    return {
      lastUpdated,
    };
  },
});
</script>

<style scoped>
.legal-content h4 {
  border-bottom: 2px solid #f1f3ff;
  padding-bottom: 0.5rem;
}

.legal-content .table th {
  border-top: none;
  font-size: 0.9rem;
}

.legal-content .card {
  transition: transform 0.2s ease;
}

.legal-content .card:hover {
  transform: translateY(-2px);
}

code {
  background-color: #f8f9fa;
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
}

.accordion-button:not(.collapsed) {
  background-color: #f8f9fa;
  color: #495057;
}

@media (max-width: 768px) {
  .card-body {
    padding: 1.5rem;
  }
  
  .legal-content h4 {
    font-size: 1.1rem;
  }
}
</style>
