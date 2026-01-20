<template>
  <div class="legal-page-wrapper faq-page-wrapper">
    <div class="card shadow-sm" style="border-radius: 0.95rem; border: 1px solid #e9ecef;">
      <!--begin::Header-->
      <div class="card-header border-0 pt-6 pb-4" style="background: linear-gradient(135deg, #f1f3ff 0%, #e8f4ff 100%); border-radius: 0.95rem 0.95rem 0 0;">
        <div class="card-title">
          <div class="d-flex align-items-center">
            <div class="symbol symbol-45px me-3">
              <span class="symbol-label" style="background: linear-gradient(135deg, #3699ff 0%, #0bb7af 100%); box-shadow: 0 4px 12px rgba(54, 153, 255, 0.3);">
                <i class="ki-duotone ki-question-2 fs-2 text-white">
                  <span class="path1"></span>
                  <span class="path2"></span>
                  <span class="path3"></span>
                </i>
              </span>
            </div>
            <div>
              <h3 class="fw-bold m-0 text-gray-900 fs-3">Domande Frequenti (FAQ)</h3>
              <span class="text-muted fs-7 fw-semibold">Trova le risposte alle domande più comuni su MiraiHome</span>
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
        <div class="legal-content faq-content">
          
          <!--begin::Search Section-->
          <div class="mb-8">
            <div class="input-group input-group-lg">
              <span class="input-group-text bg-light-primary border-0">
                <i class="ki-duotone ki-magnifier fs-2 text-primary">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
              </span>
              <input
                type="text"
                class="form-control form-control-solid border-0"
                placeholder="Cerca nelle FAQ..."
                v-model="searchQuery"
              />
            </div>
          </div>
          <!--end::Search Section-->

          <!--begin::General Questions-->
          <div class="mb-8">
            <h4 class="fw-bold text-gray-900 mb-4 faq-section-title">
              <i class="ki-duotone ki-information-5 fs-2 me-2 text-primary">
                <span class="path1"></span>
                <span class="path2"></span>
                <span class="path3"></span>
              </i>
              Domande Generali
            </h4>
            <div class="accordion accordion-flush" id="generalAccordion">
              <div 
                v-for="(faq, index) in filteredFAQs.general" 
                :key="'general-' + index"
                class="accordion-item faq-item"
              >
                <h2 class="accordion-header">
                  <button 
                    class="accordion-button collapsed" 
                    type="button" 
                    :data-bs-toggle="'collapse'" 
                    :data-bs-target="'#general-' + index"
                    :aria-expanded="false"
                    :aria-controls="'general-' + index"
                  >
                    <span class="faq-question">{{ faq.question }}</span>
                  </button>
                </h2>
                <div 
                  :id="'general-' + index" 
                  class="accordion-collapse collapse" 
                  :data-bs-parent="'#generalAccordion'"
                >
                  <div class="accordion-body">
                    <p class="text-gray-700 fs-6 lh-lg">{{ faq.answer }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--end::General Questions-->

          <!--begin::Properties Questions-->
          <div class="mb-8">
            <h4 class="fw-bold text-gray-900 mb-4 faq-section-title">
              <i class="ki-duotone ki-home-2 fs-2 me-2 text-success">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
              Gestione Immobili
            </h4>
            <div class="accordion accordion-flush" id="propertiesAccordion">
              <div 
                v-for="(faq, index) in filteredFAQs.properties" 
                :key="'properties-' + index"
                class="accordion-item faq-item"
              >
                <h2 class="accordion-header">
                  <button 
                    class="accordion-button collapsed" 
                    type="button" 
                    :data-bs-toggle="'collapse'" 
                    :data-bs-target="'#properties-' + index"
                    :aria-expanded="false"
                    :aria-controls="'properties-' + index"
                  >
                    <span class="faq-question">{{ faq.question }}</span>
                  </button>
                </h2>
                <div 
                  :id="'properties-' + index" 
                  class="accordion-collapse collapse" 
                  :data-bs-parent="'#propertiesAccordion'"
                >
                  <div class="accordion-body">
                    <p class="text-gray-700 fs-6 lh-lg">{{ faq.answer }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--end::Properties Questions-->

          <!--begin::Customers Questions-->
          <div class="mb-8">
            <h4 class="fw-bold text-gray-900 mb-4 faq-section-title">
              <i class="ki-duotone ki-user fs-2 me-2 text-info">
                <span class="path1"></span>
                <span class="path2"></span>
                <span class="path3"></span>
                <span class="path4"></span>
              </i>
              Gestione Clienti
            </h4>
            <div class="accordion accordion-flush" id="customersAccordion">
              <div 
                v-for="(faq, index) in filteredFAQs.customers" 
                :key="'customers-' + index"
                class="accordion-item faq-item"
              >
                <h2 class="accordion-header">
                  <button 
                    class="accordion-button collapsed" 
                    type="button" 
                    :data-bs-toggle="'collapse'" 
                    :data-bs-target="'#customers-' + index"
                    :aria-expanded="false"
                    :aria-controls="'customers-' + index"
                  >
                    <span class="faq-question">{{ faq.question }}</span>
                  </button>
                </h2>
                <div 
                  :id="'customers-' + index" 
                  class="accordion-collapse collapse" 
                  :data-bs-parent="'#customersAccordion'"
                >
                  <div class="accordion-body">
                    <p class="text-gray-700 fs-6 lh-lg">{{ faq.answer }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--end::Customers Questions-->

          <!--begin::Subscription Questions-->
          <div class="mb-8">
            <h4 class="fw-bold text-gray-900 mb-4 faq-section-title">
              <i class="ki-duotone ki-credit-cart fs-2 me-2 text-warning">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
              Abbonamenti e Pagamenti
            </h4>
            <div class="accordion accordion-flush" id="subscriptionAccordion">
              <div 
                v-for="(faq, index) in filteredFAQs.subscription" 
                :key="'subscription-' + index"
                class="accordion-item faq-item"
              >
                <h2 class="accordion-header">
                  <button 
                    class="accordion-button collapsed" 
                    type="button" 
                    :data-bs-toggle="'collapse'" 
                    :data-bs-target="'#subscription-' + index"
                    :aria-expanded="false"
                    :aria-controls="'subscription-' + index"
                  >
                    <span class="faq-question">{{ faq.question }}</span>
                  </button>
                </h2>
                <div 
                  :id="'subscription-' + index" 
                  class="accordion-collapse collapse" 
                  :data-bs-parent="'#subscriptionAccordion'"
                >
                  <div class="accordion-body">
                    <p class="text-gray-700 fs-6 lh-lg">{{ faq.answer }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--end::Subscription Questions-->

          <!--begin::Account Questions-->
          <div class="mb-8">
            <h4 class="fw-bold text-gray-900 mb-4 faq-section-title">
              <i class="ki-duotone ki-setting-2 fs-2 me-2 text-danger">
                <span class="path1"></span>
                <span class="path2"></span>
              </i>
              Account e Impostazioni
            </h4>
            <div class="accordion accordion-flush" id="accountAccordion">
              <div 
                v-for="(faq, index) in filteredFAQs.account" 
                :key="'account-' + index"
                class="accordion-item faq-item"
              >
                <h2 class="accordion-header">
                  <button 
                    class="accordion-button collapsed" 
                    type="button" 
                    :data-bs-toggle="'collapse'" 
                    :data-bs-target="'#account-' + index"
                    :aria-expanded="false"
                    :aria-controls="'account-' + index"
                  >
                    <span class="faq-question">{{ faq.question }}</span>
                  </button>
                </h2>
                <div 
                  :id="'account-' + index" 
                  class="accordion-collapse collapse" 
                  :data-bs-parent="'#accountAccordion'"
                >
                  <div class="accordion-body">
                    <p class="text-gray-700 fs-6 lh-lg">{{ faq.answer }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--end::Account Questions-->

          <!--begin::No Results-->
          <div v-if="hasNoResults" class="text-center py-10">
            <i class="ki-duotone ki-information-5 fs-3x text-muted mb-4">
              <span class="path1"></span>
              <span class="path2"></span>
              <span class="path3"></span>
            </i>
            <h5 class="fw-bold text-gray-600 mb-2">Nessun risultato trovato</h5>
            <p class="text-gray-500 fs-6">Prova a cercare con parole chiave diverse</p>
          </div>
          <!--end::No Results-->

          <!--begin::Contact Section-->
          <div class="mb-0">
            <div class="card card-bordered bg-light-primary">
              <div class="card-body p-6">
                <div class="d-flex align-items-center">
                  <div class="symbol symbol-50px me-5">
                    <span class="symbol-label bg-primary">
                      <i class="ki-duotone ki-sms fs-2x text-white">
                        <span class="path1"></span>
                        <span class="path2"></span>
                      </i>
                    </span>
                  </div>
                  <div class="flex-grow-1">
                    <h5 class="fw-bold text-gray-900 mb-2">Non hai trovato la risposta che cercavi?</h5>
                    <p class="text-gray-700 fs-6 mb-0">
                      Contattaci per ricevere assistenza personalizzata. Il nostro team di supporto è disponibile 
                      per rispondere a tutte le tue domande.
                    </p>
                  </div>
                  <div class="ms-4">
                    <a href="mailto:support@miraihome.it" class="btn btn-primary">
                      <i class="ki-duotone ki-sms fs-2 me-2">
                        <span class="path1"></span>
                        <span class="path2"></span>
                      </i>
                      Contattaci
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--end::Contact Section-->

        </div>
      </div>
      <!--end::Body-->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";

interface FAQItem {
  question: string;
  answer: string;
}

export default defineComponent({
  name: "faq",
  setup() {
    const lastUpdated = "25 Gennaio 2024";
    const searchQuery = ref("");

    const allFAQs = {
      general: [
        {
          question: "Cos'è MiraiHome?",
          answer: "MiraiHome è una piattaforma completa per la gestione immobiliare che ti permette di gestire immobili, clienti, agenti, richieste e documentazione in un unico sistema integrato. È progettato per agenzie immobiliari e agenti che vogliono ottimizzare il loro workflow e migliorare la gestione del loro portafoglio immobiliare."
        },
        {
          question: "Come posso iniziare a usare MiraiHome?",
          answer: "Per iniziare, registrati creando un account. Una volta completata la registrazione e verificata la tua email, potrai accedere alla dashboard e iniziare a utilizzare tutte le funzionalità disponibili. Ti consigliamo di iniziare aggiungendo i tuoi primi clienti e immobili per familiarizzare con la piattaforma."
        },
        {
          question: "Quali browser sono supportati?",
          answer: "MiraiHome è compatibile con tutti i browser moderni, inclusi Google Chrome, Mozilla Firefox, Microsoft Edge, Safari e Opera. Ti consigliamo di utilizzare l'ultima versione del browser per garantire le migliori prestazioni e sicurezza."
        },
        {
          question: "I miei dati sono sicuri?",
          answer: "Sì, la sicurezza dei tuoi dati è la nostra priorità. Utilizziamo crittografia SSL/TLS per tutte le comunicazioni, backup regolari dei dati, e rispettiamo rigorosamente il GDPR. I tuoi dati sono archiviati in server sicuri e accessibili solo a personale autorizzato."
        }
      ] as FAQItem[],
      properties: [
        {
          question: "Come posso aggiungere un nuovo immobile?",
          answer: "Per aggiungere un nuovo immobile, vai alla sezione 'Immobili' nel menu principale e clicca sul pulsante 'Aggiungi Immobile'. Compila tutti i campi obbligatori come titolo, categoria, indirizzo, città, prezzo e altre informazioni rilevanti. Puoi anche caricare foto e documenti associati all'immobile."
        },
        {
          question: "Posso modificare un immobile dopo averlo aggiunto?",
          answer: "Sì, puoi modificare un immobile in qualsiasi momento. Vai alla lista degli immobili, seleziona l'immobile che desideri modificare e clicca su 'Modifica'. Potrai aggiornare tutte le informazioni, aggiungere o rimuovere foto, e modificare lo stato dell'immobile (disponibile, in trattativa, venduto, archiviato)."
        },
        {
          question: "Come funziona la gestione delle foto degli immobili?",
          answer: "Puoi caricare più foto per ogni immobile durante la creazione o la modifica. Le foto vengono compresse automaticamente per ottimizzare le prestazioni. Puoi anche riordinare le foto trascinandole nella posizione desiderata. La prima foto caricata diventerà l'immagine principale dell'immobile."
        },
        {
          question: "Cosa significa 'In Home' e 'Highlighted'?",
          answer: "'In Home' indica che l'immobile viene mostrato nella homepage della piattaforma. 'Highlighted' significa che l'immobile è evidenziato e riceve maggiore visibilità nella lista degli immobili. Queste opzioni ti aiutano a promuovere gli immobili più importanti o di maggiore interesse."
        },
        {
          question: "Come gestisco lo stato di un immobile?",
          answer: "Puoi impostare diversi stati per ogni immobile: Disponibile, In Trattativa, Venduto, o Archiviato. Inoltre, puoi contrassegnare un immobile come 'Asta' o 'In Negoziazione'. Questi stati ti aiutano a tenere traccia del ciclo di vita di ogni immobile e a organizzare meglio il tuo lavoro."
        }
      ] as FAQItem[],
      customers: [
        {
          question: "Come aggiungo un nuovo cliente?",
          answer: "Per aggiungere un nuovo cliente, vai alla sezione 'Clienti' nel menu e clicca su 'Aggiungi Cliente'. Compila le informazioni richieste come nome, cognome, email, telefono e altri dettagli di contatto. Puoi anche aggiungere note e documenti associati al cliente."
        },
        {
          question: "Posso associare un cliente a più immobili?",
          answer: "Sì, un cliente può essere associato a più immobili. Quando crei o modifichi un immobile, puoi selezionare il cliente associato dall'elenco dei clienti esistenti. Questo ti permette di tenere traccia di tutti gli immobili collegati a un particolare cliente."
        },
        {
          question: "Come gestisco le richieste dei clienti?",
          answer: "Nella sezione 'Richieste' puoi creare e gestire le richieste dei clienti. Ogni richiesta può essere associata a un cliente e a uno o più immobili. Puoi aggiungere note, aggiornare lo stato della richiesta e tenere traccia di tutte le comunicazioni relative alla richiesta."
        },
        {
          question: "Posso esportare i dati dei clienti?",
          answer: "Sì, puoi esportare i dati dei clienti in vari formati. Vai alla lista dei clienti e utilizza la funzione di esportazione per scaricare i dati in formato CSV o Excel. Questo ti permette di fare backup o utilizzare i dati in altri sistemi."
        }
      ] as FAQItem[],
      subscription: [
        {
          question: "Come funziona il sistema di abbonamenti?",
          answer: "MiraiHome offre diversi piani di abbonamento con funzionalità e limiti diversi. Puoi visualizzare tutti i piani disponibili nella sezione 'Gestisci Abbonamento' e scegliere quello più adatto alle tue esigenze. Ogni piano include funzionalità specifiche come numero massimo di immobili, clienti, agenti, ecc."
        },
        {
          question: "Come posso cambiare piano di abbonamento?",
          answer: "Puoi cambiare il tuo piano di abbonamento in qualsiasi momento dalla sezione 'Gestisci Abbonamento'. Seleziona il nuovo piano e completa il processo di pagamento. Il cambio di piano sarà effettivo immediatamente o alla scadenza del periodo corrente, a seconda del tipo di piano selezionato."
        },
        {
          question: "Quali metodi di pagamento sono accettati?",
          answer: "Accettiamo pagamenti tramite carte di credito e debito (Visa, Mastercard, American Express) attraverso Stripe, un sistema di pagamento sicuro e affidabile. Tutti i pagamenti sono processati in modo sicuro e i tuoi dati di pagamento non vengono mai memorizzati sui nostri server."
        },
        {
          question: "Cosa succede se scade il mio abbonamento?",
          answer: "Se il tuo abbonamento scade, avrai ancora accesso alla piattaforma per un periodo di grazia limitato. Durante questo periodo, alcune funzionalità potrebbero essere limitate. Ti invieremo promemoria via email prima della scadenza per darti il tempo di rinnovare il tuo abbonamento."
        },
        {
          question: "Posso annullare il mio abbonamento in qualsiasi momento?",
          answer: "Sì, puoi annullare il tuo abbonamento in qualsiasi momento dalla sezione 'Gestisci Abbonamento'. L'abbonamento rimarrà attivo fino alla fine del periodo già pagato, dopodiché non verrà rinnovato automaticamente. Non ci sono penali per l'annullamento."
        }
      ] as FAQItem[],
      account: [
        {
          question: "Come posso modificare le informazioni del mio account?",
          answer: "Puoi modificare le informazioni del tuo account andando nella sezione 'Profilo' e poi su 'Impostazioni'. Qui potrai aggiornare il tuo nome, email, telefono, password e altre informazioni personali. Ricorda di salvare le modifiche dopo averle apportate."
        },
        {
          question: "Come cambio la mia password?",
          answer: "Per cambiare la password, vai su 'Profilo' > 'Impostazioni' e clicca su 'Cambia Password'. Inserisci la tua password attuale e la nuova password due volte per conferma. Assicurati di utilizzare una password forte con almeno 8 caratteri, includendo lettere maiuscole, minuscole, numeri e caratteri speciali."
        },
        {
          question: "Cosa devo fare se ho dimenticato la password?",
          answer: "Se hai dimenticato la password, vai alla pagina di accesso e clicca su 'Password dimenticata?'. Inserisci il tuo indirizzo email e riceverai un link per reimpostare la password. Segui le istruzioni nell'email per creare una nuova password."
        },
        {
          question: "Come posso gestire gli agenti nella mia agenzia?",
          answer: "Se sei un amministratore o un'agenzia, puoi gestire gli agenti dalla sezione 'Agenti'. Qui puoi aggiungere nuovi agenti, modificare le informazioni esistenti, assegnare permessi e ruoli, e gestire l'accesso alla piattaforma. Ogni agente avrà il proprio account con accesso alle funzionalità appropriate."
        },
        {
          question: "Come funziona il sistema di ruoli e permessi?",
          answer: "MiraiHome offre tre ruoli principali: Admin, Agency e Agent. Gli Admin hanno accesso completo a tutte le funzionalità. Le Agenzie possono gestire i propri agenti e immobili. Gli Agenti hanno accesso alle funzionalità base per gestire clienti e immobili assegnati. I permessi vengono gestiti automaticamente in base al ruolo."
        },
        {
          question: "Posso cambiare il tema (dark/light mode)?",
          answer: "Sì, puoi cambiare il tema della piattaforma in qualsiasi momento. Vai su 'Profilo' > 'Impostazioni' e seleziona la modalità tema che preferisci (Chiaro o Scuro). La preferenza viene salvata e mantenuta tra le sessioni."
        }
      ] as FAQItem[]
    };

    const filteredFAQs = computed(() => {
      if (!searchQuery.value.trim()) {
        return allFAQs;
      }

      const query = searchQuery.value.toLowerCase();
      const filtered: typeof allFAQs = {
        general: [],
        properties: [],
        customers: [],
        subscription: [],
        account: []
      };

      Object.keys(allFAQs).forEach((key) => {
        const category = key as keyof typeof allFAQs;
        filtered[category] = allFAQs[category].filter(
          (faq) =>
            faq.question.toLowerCase().includes(query) ||
            faq.answer.toLowerCase().includes(query)
        );
      });

      return filtered;
    });

    const hasNoResults = computed(() => {
      if (!searchQuery.value.trim()) {
        return false;
      }
      return (
        filteredFAQs.value.general.length === 0 &&
        filteredFAQs.value.properties.length === 0 &&
        filteredFAQs.value.customers.length === 0 &&
        filteredFAQs.value.subscription.length === 0 &&
        filteredFAQs.value.account.length === 0
      );
    });

    onMounted(() => {
      // Initialize Bootstrap accordion if needed
    });

    return {
      lastUpdated,
      searchQuery,
      filteredFAQs,
      hasNoResults,
    };
  },
});
</script>

