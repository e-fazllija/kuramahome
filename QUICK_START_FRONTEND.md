# Quick Start Frontend - Sistema di Billing

## 🚀 Setup Rapido (3 minuti)

### 1. Configura la Stripe Publishable Key

**Opzione A: Variabile d'Ambiente (Consigliata)**

Crea il file `.env.local` in `kuramahome/`:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
```

**Opzione B: Modifica Diretta**

Modifica `src/views/crafted/billing/Pricing.vue` (linea 397):

```typescript
const publishableKey = 'pk_test_your_key_here';
```

> 💡 Ottieni la chiave da: https://dashboard.stripe.com/test/apikeys

### 2. Avvia l'Applicazione

```bash
# Installa dipendenze (se necessario)
npm install

# Avvia il server di sviluppo
npm run dev
```

### 3. Testa il Flusso

1. Apri: `http://localhost:5173/#/pricing/test@example.com/dummy-token`
2. Seleziona un piano (es. "Pro")
3. Usa carta di test: `4242 4242 4242 4242`
4. Scadenza: `12/25` | CVC: `123`
5. Completa il pagamento ✅

## 📁 File Modificati

### ✅ File Aggiornati

- `src/views/crafted/billing/Pricing.vue` - Integrato con backend API
- `src/core/data/billing.ts` - Metodi allineati alle API
- `src/assets/css/pricing.css` - Stili dark/light mode (NUOVO)

### 🔄 Flusso Completo

```
1. Utente seleziona piano
   ↓
2. Frontend crea Payment Intent (POST /api/billing/create-payment-intent)
   ↓
3. Stripe.js monta form pagamento
   ↓
4. Utente inserisce dati carta
   ↓
5. Stripe processa pagamento
   ↓
6. Webhook al backend (crea Payment + Subscription)
   ↓
7. Redirect a /sign-in?payment=success
   ↓
8. Login completato ✅
```

## 🧪 Test Rapido

### Carte di Test

| Numero | Risultato |
|--------|-----------|
| `4242 4242 4242 4242` | ✅ Successo |
| `4000 0025 0000 3155` | 🔐 Richiede 3D Secure |
| `4000 0000 0000 9995` | ❌ Rifiutata |

### Verifica Backend

```bash
# Terminal 1 - Backend deve essere in esecuzione
cd kuramahomebe/BackEnd/BackEnd
dotnet run

# Terminal 2 - Frontend
cd kuramahome
npm run dev
```

### Verifica Database

Dopo il pagamento, controlla che siano stati creati:

```sql
-- Pagamento
SELECT * FROM "Payments" ORDER BY "CreateDate" DESC LIMIT 1;

-- Abbonamento
SELECT * FROM "UserSubscriptions" ORDER BY "CreateDate" DESC LIMIT 1;
```

## 🎨 Personalizzazione

### Modificare Colori Stripe

In `Pricing.vue` (linea 409):

```typescript
const appearance = {
  theme: 'stripe' as const,
  variables: {
    colorPrimary: '#3699ff', // <-- Cambia qui
    // ...
  },
};
```

### Modificare Stili Pagina

Modifica `src/assets/css/pricing.css`:

```css
/* Esempio: cambia il colore primario */
.pricing-card-featured {
  border-color: #ff6b35; /* tuo colore */
}
```

## 🐛 Troubleshooting

### ❌ Stripe non carica

**Soluzione**: Verifica la Publishable Key

```typescript
// In Pricing.vue, controlla che sia corretta
const publishableKey = 'pk_test_...';
```

### ❌ Payment Intent non creato

**Soluzione**: Verifica che il backend sia in esecuzione

```bash
# Testa l'endpoint direttamente
curl -X POST http://localhost:5001/api/billing/create-payment-intent \
  -H "Content-Type: application/json" \
  -d '{
    "plan": "pro",
    "amount": 4900,
    "currency": "eur",
    "email": "test@example.com"
  }'
```

### ❌ Webhook non ricevuto

**Soluzione**: Usa Stripe CLI in sviluppo

```bash
stripe listen --forward-to https://localhost:5001/api/StripeWebhookEvent/stripe
```

### ❌ Stili non applicati

**Soluzione**: Riavvia il server di sviluppo

```bash
# Ctrl+C per fermare, poi:
npm run dev
```

## 📚 Metodi Disponibili

```typescript
// In qualsiasi componente Vue
import {
  createPaymentIntent,
  getSubscriptionPlans,
  getSubscriptionStatus,
  cancelSubscription,
  confirmPayment
} from '@/core/data/billing';

// Esempi:
const plans = await getSubscriptionPlans();
const status = await getSubscriptionStatus();
await cancelSubscription();
```

## ✅ Checklist

Prima di testare:
- [ ] Backend in esecuzione (`dotnet run`)
- [ ] Publishable Key configurata
- [ ] Piani nel database (esegui script SQL)
- [ ] Stripe CLI in ascolto (opzionale)

Durante il test:
- [ ] Pagina pricing si carica
- [ ] Form Stripe appare dopo selezione piano
- [ ] Pagamento con carta test funziona
- [ ] Webhook ricevuto (controlla log backend)
- [ ] Record creati nel database
- [ ] Redirect a SignIn con messaggio successo

## 🎯 Prossimi Passi

1. **Testa il flusso completo** con carte di test
2. **Verifica il database** per confermare creazione record
3. **Personalizza gli stili** secondo il tuo brand
4. **Prepara per produzione** (sostituisci chiavi test)

---

**Per la guida completa**: Vedi `FRONTEND_INTEGRATION_GUIDE.md`

**Tutto pronto!** 🎉 Il frontend è integrato e funzionante.


