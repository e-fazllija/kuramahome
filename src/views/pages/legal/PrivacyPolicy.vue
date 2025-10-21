<template>
  <div class="legal-page-wrapper">
    <div class="card shadow-sm" style="border-radius: 0.95rem; border: 1px solid #e9ecef;">
      <!--begin::Header-->
      <div class="card-header border-0 pt-6 pb-4" style="background: linear-gradient(135deg, #f1f3ff 0%, #e8f4ff 100%); border-radius: 0.95rem 0.95rem 0 0;">
        <div class="card-title">
          <div class="d-flex align-items-center">
            <div class="symbol symbol-45px me-3">
              <span class="symbol-label" style="background: linear-gradient(135deg, #3699ff 0%, #0bb7af 100%); box-shadow: 0 4px 12px rgba(54, 153, 255, 0.3);">
                <i class="ki-duotone ki-shield-tick fs-2 text-white">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
              </span>
            </div>
            <div>
              <h3 class="fw-bold m-0 text-gray-900 fs-3">Privacy Policy</h3>
              <span class="text-muted fs-7 fw-semibold">Informativa sulla Privacy - GDPR</span>
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
            <h4 class="fw-bold text-gray-900 mb-4">1. Introduzione</h4>
            <p class="text-gray-700 fs-6 lh-lg">
              La presente Informativa sulla Privacy descrive come KuramaHome ("noi", "nostro" o "la nostra società") 
              raccoglie, utilizza, conserva e protegge le informazioni personali degli utenti del nostro servizio di 
              gestione immobiliare.
            </p>
            <p class="text-gray-700 fs-6 lh-lg">
              Rispettiamo la tua privacy e ci impegniamo a proteggere i tuoi dati personali in conformità con il 
              Regolamento Generale sulla Protezione dei Dati (GDPR) dell'Unione Europea e altre normative applicabili.
            </p>
          </div>
          <!--end::Introduction-->

          <!--begin::Data Controller-->
          <div class="mb-8">
            <h4 class="fw-bold text-gray-900 mb-4">2. Titolare del Trattamento</h4>
            <div class="bg-light-info rounded p-6 mb-4">
              <div class="d-flex align-items-center">
                <i class="ki-duotone ki-information-5 fs-2 text-info me-4">
                  <span class="path1"></span>
                  <span class="path2"></span>
                  <span class="path3"></span>
                </i>
                <div>
                  <strong class="fw-bold text-gray-900">Titolare del Trattamento:</strong><br>
                  <span class="text-gray-700">KuramaHome S.r.l.</span><br>
                  <span class="text-gray-600 fs-7">Email: privacy@kuramahome.it</span>
                </div>
              </div>
            </div>
          </div>
          <!--end::Data Controller-->

          <!--begin::Data Collection-->
          <div class="mb-8">
            <h4 class="fw-bold text-gray-900 mb-4">3. Dati Personali Raccolti</h4>
            <div class="row g-6">
              <div class="col-lg-6">
                <div class="card card-bordered h-100">
                  <div class="card-header bg-light-primary">
                    <h5 class="card-title text-primary fw-bold mb-0">
                      <i class="ki-duotone ki-user fs-2 me-2">
                        <span class="path1"></span>
                        <span class="path2"></span>
                        <span class="path3"></span>
                        <span class="path4"></span>
                      </i>
                      Dati dell'Account
                    </h5>
                  </div>
                  <div class="card-body">
                    <ul class="list-unstyled text-gray-700 fs-6">
                      <li class="mb-2"><i class="ki-duotone ki-check-circle fs-5 text-success me-2"><span class="path1"></span><span class="path2"></span></i>Nome e cognome</li>
                      <li class="mb-2"><i class="ki-duotone ki-check-circle fs-5 text-success me-2"><span class="path1"></span><span class="path2"></span></i>Indirizzo email</li>
                      <li class="mb-2"><i class="ki-duotone ki-check-circle fs-5 text-success me-2"><span class="path1"></span><span class="path2"></span></i>Numero di telefono</li>
                      <li class="mb-2"><i class="ki-duotone ki-check-circle fs-5 text-success me-2"><span class="path1"></span><span class="path2"></span></i>Password (criptata)</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="card card-bordered h-100">
                  <div class="card-header bg-light-success">
                    <h5 class="card-title text-success fw-bold mb-0">
                      <i class="ki-duotone ki-geolocation fs-2 me-2">
                        <span class="path1"></span>
                        <span class="path2"></span>
                      </i>
                      Dati di Contatto
                    </h5>
                  </div>
                  <div class="card-body">
                    <ul class="list-unstyled text-gray-700 fs-6">
                      <li class="mb-2"><i class="ki-duotone ki-check-circle fs-5 text-success me-2"><span class="path1"></span><span class="path2"></span></i>Indirizzo di residenza</li>
                      <li class="mb-2"><i class="ki-duotone ki-check-circle fs-5 text-success me-2"><span class="path1"></span><span class="path2"></span></i>Città e CAP</li>
                      <li class="mb-2"><i class="ki-duotone ki-check-circle fs-5 text-success me-2"><span class="path1"></span><span class="path2"></span></i>Regione</li>
                      <li class="mb-2"><i class="ki-duotone ki-check-circle fs-5 text-success me-2"><span class="path1"></span><span class="path2"></span></i>Dati fiscali (Codice Fiscale/P.IVA)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--end::Data Collection-->

          <!--begin::Purpose-->
          <div class="mb-8">
            <h4 class="fw-bold text-gray-900 mb-4">4. Finalità del Trattamento</h4>
            <div class="table-responsive">
              <table class="table table-bordered table-hover">
                <thead class="bg-light-primary">
                  <tr>
                    <th class="fw-bold">Finalità</th>
                    <th class="fw-bold">Base Giuridica</th>
                    <th class="fw-bold">Esempi di Utilizzo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Fornitura del servizio</td>
                    <td><span class="badge badge-light-success">Contratto</span></td>
                    <td>Gestione immobili, clienti e documentazione</td>
                  </tr>
                  <tr>
                    <td>Comunicazioni commerciali</td>
                    <td><span class="badge badge-light-primary">Consenso</span></td>
                    <td>Newsletter, offerte promozionali</td>
                  </tr>
                  <tr>
                    <td>Adempimenti legali</td>
                    <td><span class="badge badge-light-info">Obbligo legale</span></td>
                    <td>Fatturazione, dichiarazioni fiscali</td>
                  </tr>
                  <tr>
                    <td>Analytics e miglioramenti</td>
                    <td><span class="badge badge-light-warning">Interesse legittimo</span></td>
                    <td>Statistiche di utilizzo, ottimizzazioni</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!--end::Purpose-->

          <!--begin::Rights-->
          <div class="mb-8">
            <h4 class="fw-bold text-gray-900 mb-4">5. I Tuoi Diritti (GDPR)</h4>
            <div class="row g-4">
              <div class="col-md-6 col-lg-4">
                <div class="d-flex align-items-center p-4 bg-light-success rounded">
                  <i class="ki-duotone ki-information-2 fs-2x text-success me-4">
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                  </i>
                  <div>
                    <h6 class="fw-bold text-gray-900 mb-1">Accesso</h6>
                    <span class="text-gray-600 fs-7">Richiedi copia dei tuoi dati</span>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-lg-4">
                <div class="d-flex align-items-center p-4 bg-light-warning rounded">
                  <i class="ki-duotone ki-setting-2 fs-2x text-warning me-4">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  <div>
                    <h6 class="fw-bold text-gray-900 mb-1">Rettifica</h6>
                    <span class="text-gray-600 fs-7">Correggi dati inesatti</span>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-lg-4">
                <div class="d-flex align-items-center p-4 bg-light-danger rounded">
                  <i class="ki-duotone ki-trash fs-2x text-danger me-4">
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                  </i>
                  <div>
                    <h6 class="fw-bold text-gray-900 mb-1">Cancellazione</h6>
                    <span class="text-gray-600 fs-7">Richiedi rimozione dati</span>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-lg-4">
                <div class="d-flex align-items-center p-4 bg-light-primary rounded">
                  <i class="ki-duotone ki-pause-circle fs-2x text-primary me-4">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  <div>
                    <h6 class="fw-bold text-gray-900 mb-1">Limitazione</h6>
                    <span class="text-gray-600 fs-7">Limita l'elaborazione</span>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-lg-4">
                <div class="d-flex align-items-center p-4 bg-light-info rounded">
                  <i class="ki-duotone ki-file-down fs-2x text-info me-4">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  <div>
                    <h6 class="fw-bold text-gray-900 mb-1">Portabilità</h6>
                    <span class="text-gray-600 fs-7">Esporta i tuoi dati</span>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-lg-4">
                <div class="d-flex align-items-center p-4 bg-light-dark rounded">
                  <i class="ki-duotone ki-cross-circle fs-2x text-dark me-4">
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </i>
                  <div>
                    <h6 class="fw-bold text-gray-900 mb-1">Opposizione</h6>
                    <span class="text-gray-600 fs-7">Opponiti al trattamento</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--end::Rights-->

          <!--begin::Data Sharing-->
          <div class="mb-8">
            <h4 class="fw-bold text-gray-900 mb-4">6. Condivisione dei Dati</h4>
            <div class="alert alert-light-info d-flex align-items-center p-5">
              <i class="ki-duotone ki-shield-tick fs-2x text-info me-4">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
              <div>
                <h5 class="fw-bold text-info mb-2">Non vendiamo i tuoi dati personali</h5>
                <p class="text-gray-700 mb-0">
                  I tuoi dati personali vengono condivisi solo con terze parti fidate per:
                </p>
                <ul class="list-unstyled mt-3 text-gray-600">
                  <li class="mb-1">• Fornitori di servizi (hosting, email, pagamenti)</li>
                  <li class="mb-1">• Adempimenti legali e fiscali</li>
                  <li class="mb-1">• Autorità competenti su richiesta</li>
                </ul>
              </div>
            </div>
          </div>
          <!--end::Data Sharing-->

          <!--begin::Security-->
          <div class="mb-8">
            <h4 class="fw-bold text-gray-900 mb-4">7. Sicurezza dei Dati</h4>
            <div class="row g-4">
              <div class="col-md-6">
                <div class="card card-bordered h-100 bg-light-success">
                  <div class="card-body text-center p-6">
                    <i class="ki-duotone ki-shield-check fs-4x text-success mb-4">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    <h5 class="fw-bold text-success mb-3">Crittografia SSL/TLS</h5>
                    <p class="text-gray-700 fs-6">Tutti i dati vengono trasmessi e memorizzati utilizzando protocolli di crittografia avanzati.</p>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="card card-bordered h-100 bg-light-primary">
                  <div class="card-body text-center p-6">
                    <i class="ki-duotone ki-key fs-4x text-primary mb-4">
                      <span class="path1"></span>
                      <span class="path2"></span>
                    </i>
                    <h5 class="fw-bold text-primary mb-3">Accessi Controllati</h5>
                    <p class="text-gray-700 fs-6">Solo personale autorizzato ha accesso ai dati, con controlli rigorosi degli accessi.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--end::Security-->

          <!--begin::Retention-->
          <div class="mb-8">
            <h4 class="fw-bold text-gray-900 mb-4">8. Conservazione dei Dati</h4>
            <div class="bg-light-warning rounded p-6">
              <div class="d-flex align-items-start">
                <i class="ki-duotone ki-clock fs-2x text-warning me-4 mt-1">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
                <div>
                  <h5 class="fw-bold text-warning mb-3">Periodi di Conservazione</h5>
                  <ul class="list-unstyled text-gray-700 fs-6">
                    <li class="mb-2"><strong>Dati dell'account:</strong> Fino alla cancellazione dell'account</li>
                    <li class="mb-2"><strong>Dati fiscali:</strong> 10 anni (obbligo legale)</li>
                    <li class="mb-2"><strong>Log di sistema:</strong> 1 anno</li>
                    <li class="mb-2"><strong>Comunicazioni:</strong> 3 anni</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <!--end::Retention-->

          <!--begin::Contact-->
          <div class="mb-0">
            <h4 class="fw-bold text-gray-900 mb-4">9. Contatti per la Privacy</h4>
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
                  Per esercitare i tuoi diritti o per qualsiasi domanda relativa alla privacy, 
                  contattaci utilizzando i canali sopra indicati. Ti risponderemo entro 30 giorni.
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
  name: "privacy-policy",
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

@media (max-width: 768px) {
  .card-body {
    padding: 1.5rem;
  }
  
  .legal-content h4 {
    font-size: 1.1rem;
  }
}
</style>
