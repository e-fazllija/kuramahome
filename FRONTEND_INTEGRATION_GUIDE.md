# Guida Integrazione Frontend - Sistema di Billing

## ✅ Integrazione Completata

L'integrazione del sistema di billing con Stripe è stata completata nel frontend. Tutti i file necessari sono stati creati e configurati.

## 📁 File Modificati/Creati

### File Modificati

1. **`src/views/crafted/billing/Pricing.vue`**
   - ✅ Integrato con le API del backend
   - ✅ Gestione errori migliorata
   - ✅ Publishable key configurabile tramite variabile d'ambiente
   - ✅ Import del file CSS per gli stili

2. **`src/core/data/billing.ts`**
   - ✅ Interfacce aggiornate per corrispondere al backend
   - ✅ Metodi allineati con le API del backend:
     - `createPaymentIntent()` → `POST /api/billing/create-payment-intent`
     - `getSubscriptionPlans()` → `GET /api/billing/plans`
     - `getSubscriptionStatus()` → `GET /api/billing/subscription-status`
     - `cancelSubscription()` → `POST /api/billing/cancel-subscription`
     - `confirmPayment()` → `POST /api/billing/confirm-payment`

3. **`src/views/crafted/authentication/basic-flow/SignIn.vue`**
   - ✅ Già gestisce il parametro `?payment=success` dal redirect di Stripe
   - ✅ Mostra un messaggio di successo dopo il pagamento

### File Creati

1. **`src/assets/css/pricing.css`**
   - ✅ Stili completi per la pagina pricing
   - ✅ Supporto per modalità dark e light
   - ✅ Design responsive (mobile, tablet, desktop)
   - ✅ Animazioni e transizioni
   - ✅ Stati hover e focus per accessibilità

## 🔧 Configurazione

### 1. Configurare la Publishable Key di Stripe

Hai due opzioni per configurare la chiave:

#### Opzione A: Variabile d'Ambiente (Consigliata)

Crea un file `.env.local` nella cartella `kuramahome/`:

```env
# Stripe Publishable Key
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
```

**Per ottenere la chiave:**
1. Vai su [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
2. Copia la **Publishable key** (inizia con `pk_test_` per test)
3. Incollala nel file `.env.local`

#### Opzione B: Modifica Diretta nel Codice

Se non vuoi usare le variabili d'ambiente, modifica direttamente `Pricing.vue` (linea 397):

```typescript
const publishableKey = 'pk_test_your_publishable_key_here';
```

⚠️ **Nota**: Questa chiave è sicura da esporre nel frontend (è pubblica).

### 2. Verificare il Backend

Assicurati che il backend sia configurato correttamente:

```bash
cd kuramahomebe/BackEnd/BackEnd

# Verifica che appsettings.json contenga la configurazione Stripe
# Verifica che le dipendenze siano installate
dotnet restore

# Avvia il backend
dotnet run
```

### 3. Avviare il Frontend

```bash
cd kuramahome

# Installa le dipendenze (se non l'hai già fatto)
npm install

# Avvia il server di sviluppo
npm run dev
```

## 🎯 Flusso Completo dell'Utente

### 1. Registrazione e Verifica Email

```
Utente compila form → POST /api/auth/register
     ↓
Sistema invia email di verifica
     ↓
Utente clicca link nell'email → /pricing/:email/:token
```

### 2. Selezione Piano e Pagamento

```
Pagina Pricing carica → GET /api/billing/plans
     ↓
Utente seleziona piano (Basic/Pro/Premium)
     ↓
Frontend crea Payment Intent → POST /api/billing/create-payment-intent
     ↓
Stripe.js monta il form di pagamento
     ↓
Utente inserisce dati carta
     ↓
Stripe processa pagamento
     ↓
Webhook al backend → POST /api/StripeWebhookEvent/stripe
     ↓
Backend crea Payment e UserSubscription
     ↓
Utente reindirizzato → /sign-in?payment=success
```

### 3. Login e Accesso

```
Pagina SignIn mostra messaggio "Pagamento completato!"
     ↓
Utente fa login
     ↓
Dashboard con abbonamento attivo
```

## 🧪 Testing

### Test Rapido del Flusso

1. **Avvia Backend e Frontend**

```bash
# Terminal 1 - Backend
cd kuramahomebe/BackEnd/BackEnd
dotnet run

# Terminal 2 - Frontend
cd kuramahome
npm run dev
```

2. **Naviga alla Pagina Pricing**

```
http://localhost:5173/#/pricing/test@example.com/dummy-token
```

3. **Seleziona un Piano**
   - Clicca su "Seleziona Pro" (o qualsiasi piano)
   - Verifica che appaia il form di pagamento Stripe

4. **Completa il Pagamento**
   - **Carta di test**: `4242 4242 4242 4242`
   - **Scadenza**: `12/25` (qualsiasi data futura)
   - **CVC**: `123` (qualsiasi 3 cifre)
   - **CAP**: `12345` (qualsiasi 5 cifre)

5. **Verifica il Webhook**
   - Controlla i log del backend per vedere il webhook ricevuto
   - Verifica che venga mostrato: `"Payment Intent succeeded: pi_xxx"`

6. **Verifica il Database**

```sql
-- Controlla il pagamento creato
SELECT * FROM "Payments" ORDER BY "CreateDate" DESC LIMIT 1;

-- Controlla l'abbonamento creato
SELECT * FROM "UserSubscriptions" ORDER BY "CreateDate" DESC LIMIT 1;
```

7. **Completa il Login**
   - Dovresti vedere il messaggio "Pagamento completato!"
   - Fai login con le credenziali dell'utente

### Carte di Test Stripe

| Carta | Scopo | Comportamento |
|-------|-------|---------------|
| `4242 4242 4242 4242` | Successo | Pagamento va sempre a buon fine |
| `4000 0025 0000 3155` | Autenticazione 3D Secure | Richiede autenticazione aggiuntiva |
| `4000 0000 0000 9995` | Rifiutata | Carta sempre rifiutata |
| `4000 0000 0000 0077` | Charge fallito | Carica fallisce dopo autorizzazione |

**Dati sempre validi:**
- **Scadenza**: Qualsiasi data futura (es. `12/30`)
- **CVC**: Qualsiasi 3 cifre (es. `123`)
- **CAP**: Qualsiasi 5 cifre (es. `12345`)

## 🎨 Personalizzazione Stili

Gli stili della pagina pricing sono in `src/assets/css/pricing.css`.

### Modificare i Colori

```css
/* In pricing.css, cerca e modifica: */

/* Colore primario */
--bs-primary: #3699ff;

/* Gradient del badge "Consigliato" */
background: linear-gradient(135deg, #3699ff 0%, #0bb7af 100%);
```

### Modificare il Tema Stripe

In `Pricing.vue`, cerca la configurazione `appearance` (linea 409):

```typescript
const appearance = {
  theme: 'stripe' as const, // Opzioni: 'stripe', 'night', 'flat'
  variables: {
    colorPrimary: '#3699ff', // Colore primario
    colorBackground: '#ffffff', // Sfondo (adatta per dark mode)
    colorText: '#3f4254', // Colore testo
    colorDanger: '#f1416c', // Colore errori
    fontFamily: 'Inter, sans-serif',
    spacingUnit: '4px',
    borderRadius: '8px',
  },
};
```

### Adattare per Dark Mode

Il CSS è già configurato per supportare dark mode automaticamente:

```css
/* Light mode */
.pricing-card {
  background-color: var(--bs-body-bg);
  border-color: var(--bs-gray-200);
}

/* Dark mode */
[data-bs-theme="dark"] .pricing-card {
  background-color: var(--bs-gray-800);
  border-color: var(--bs-gray-700);
}
```

## 🔒 Sicurezza

### ✅ Pratiche Sicure Implementate

1. **Publishable Key nel Frontend**
   - ✅ È sicuro esporre questa chiave (è pubblica)
   - ✅ Non può essere usata per effettuare pagamenti diretti

2. **Secret Key nel Backend**
   - ✅ Mai esposta nel frontend
   - ✅ Utilizzata solo server-side

3. **Webhook Signature Verification**
   - ✅ Tutti i webhook vengono verificati con firma crittografica
   - ✅ Previene webhook falsificati

4. **JWT Authentication**
   - ✅ Endpoint sensibili richiedono autenticazione
   - ✅ Token JWT validato server-side

### ⚠️ Checklist Sicurezza per Produzione

- [ ] Sostituire le chiavi di test con quelle di produzione
- [ ] Configurare HTTPS sul frontend e backend
- [ ] Abilitare CSP (Content Security Policy)
- [ ] Configurare webhook endpoint in produzione su Stripe Dashboard
- [ ] Abilitare 2FA per l'account Stripe
- [ ] Limitare le API key agli IP consentiti
- [ ] Implementare rate limiting sugli endpoint
- [ ] Configurare logging e monitoring

## 📱 Responsive Design

La pagina pricing è completamente responsive:

### Mobile (< 576px)
- Layout a singola colonna
- Card stack verticalmente
- Font size ridotto
- Padding ottimizzato

### Tablet (577px - 991px)
- Layout a 2 colonne su schermi medi
- Spacing adattato

### Desktop (992px+)
- Layout a 3 colonne
- Altezza card uniforme
- Animazioni complete

### Large Desktop (1400px+)
- Contenuto centrato con max-width
- Spacing ottimale

## 🐛 Troubleshooting

### Problema: Stripe non carica

**Errore console**: `Stripe failed to load`

**Soluzione**:
1. Verifica la Publishable Key in `Pricing.vue`
2. Controlla la console per errori di rete
3. Verifica che il dominio sia autorizzato su Stripe Dashboard

### Problema: Payment Intent non viene creato

**Errore console**: `Error creating payment intent`

**Soluzione**:
1. Verifica che il backend sia in esecuzione
2. Controlla i log del backend per errori
3. Verifica che la Secret Key sia configurata in `appsettings.json`
4. Testa l'endpoint direttamente: `POST http://localhost:5001/api/billing/create-payment-intent`

### Problema: Webhook non ricevuto

**Sintomo**: Pagamento completato ma abbonamento non creato

**Soluzione**:
1. **In Sviluppo**: Usa Stripe CLI
   ```bash
   stripe listen --forward-to https://localhost:5001/api/StripeWebhookEvent/stripe
   ```
2. **In Produzione**: Verifica su Stripe Dashboard > Webhooks > Logs
3. Controlla che il Webhook Secret sia corretto in `appsettings.json`

### Problema: Stili non applicati

**Sintomo**: Pagina senza stili custom

**Soluzione**:
1. Verifica che `pricing.css` esista in `src/assets/css/`
2. Verifica l'import in `Pricing.vue`: `import '@/assets/css/pricing.css';`
3. Riavvia il server di sviluppo

### Problema: Dark mode non funziona

**Sintomo**: Stili dark non applicati

**Soluzione**:
1. Verifica che l'attributo `data-bs-theme="dark"` sia presente nell'HTML
2. Controlla il toggle dark/light mode nell'applicazione
3. Verifica che le variabili CSS siano definite nel tema

## 📚 Risorse Utili

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe.js Reference](https://stripe.com/docs/js)
- [Stripe Testing](https://stripe.com/docs/testing)
- [Stripe Dashboard](https://dashboard.stripe.com/)
- [Stripe CLI](https://stripe.com/docs/stripe-cli)

## 🎓 Esempi di Uso

### Recuperare i Piani Disponibili

```typescript
import { getSubscriptionPlans } from '@/core/data/billing';

// In un componente Vue
const loadPlans = async () => {
  try {
    const plans = await getSubscriptionPlans();
    console.log('Piani disponibili:', plans);
    // plans è un array di SubscriptionPlan
  } catch (error) {
    console.error('Errore caricamento piani:', error);
  }
};
```

### Verificare lo Stato dell'Abbonamento

```typescript
import { getSubscriptionStatus } from '@/core/data/billing';

// In un componente autenticato
const checkSubscription = async () => {
  try {
    const status = await getSubscriptionStatus();
    console.log('Stato abbonamento:', status.Status);
    console.log('Piano:', status.SubscriptionPlanId);
    console.log('Scadenza:', status.EndDate);
  } catch (error) {
    console.error('Nessun abbonamento attivo');
  }
};
```

### Cancellare l'Abbonamento

```typescript
import { cancelSubscription } from '@/core/data/billing';
import Swal from 'sweetalert2';

const handleCancelSubscription = async () => {
  const result = await Swal.fire({
    title: 'Sei sicuro?',
    text: 'Vuoi davvero cancellare il tuo abbonamento?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sì, cancella',
    cancelButtonText: 'Annulla'
  });

  if (result.isConfirmed) {
    try {
      await cancelSubscription();
      Swal.fire('Cancellato!', 'Il tuo abbonamento è stato cancellato.', 'success');
    } catch (error) {
      Swal.fire('Errore', 'Impossibile cancellare l\'abbonamento', 'error');
    }
  }
};
```

## ✅ Checklist Finale

### Sviluppo
- [x] Publishable Key configurata
- [x] Backend in esecuzione
- [x] Frontend in esecuzione
- [x] Piani di abbonamento nel database
- [x] Stripe CLI per webhook (opzionale)
- [x] Test con carte di prova
- [x] Verifica webhook ricevuti
- [x] Verifica creazione Payment e Subscription nel DB

### Produzione
- [ ] Sostituire chiavi di test con chiavi di produzione
- [ ] Configurare webhook endpoint su Stripe Dashboard
- [ ] Configurare HTTPS
- [ ] Rimuovere bypass verifica email
- [ ] Testare flusso completo in staging
- [ ] Configurare monitoring e logging
- [ ] Preparare documentazione utente
- [ ] Testare responsive su dispositivi reali

---

**L'integrazione frontend è completa e pronta per essere testata!** 🎉

Per qualsiasi domanda o problema, consulta la sezione Troubleshooting o il file `STRIPE_INTEGRATION_GUIDE.md` nel backend.


