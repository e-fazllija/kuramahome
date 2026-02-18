# Guida all'applicazione della Palette Colori

## Panoramica
Questo documento descrive come applicare la palette colori personalizzata a tutti i componenti dell'applicazione Mirai Home.

## Palette Colori

### Modalità Light
- **Sfondo principale**: `#FFFFFF` (Bianco Puro)
- **Testo principale**: `#333333` (Grigio Scuro Antracite)
- **Testo secondario**: `#666666` (Grigio Medio)
- **Sfondo secondario**: `#F0F0F0` (Grigio Chiaro)
- **Accento principale**: `#0077CC` (Blu Professionale)

### Modalità Dark
- **Sfondo principale**: `#1A1A1A` (Grigio Scuro Profondo)
- **Testo principale**: `#E0E0E0` (Bianco Tenue)
- **Testo secondario**: `#AAAAAA` (Grigio Chiaro Freddo)
- **Sfondo secondario**: `#2C2C2C` (Grigio Medio Caldo)
- **Accento principale**: `#0077CC` (Blu Professionale - stesso per coerenza)

## Classi CSS Disponibili

### Classi di Testo
```css
.text-palette-primary    /* Colore testo principale */
.text-palette-secondary   /* Colore testo secondario */
```

### Classi di Sfondo
```css
.bg-palette-primary      /* Sfondo principale */
.bg-palette-secondary    /* Sfondo secondario */
```

### Classi per Modali
```css
.modal-palette           /* Container modale */
.modal-palette-header    /* Header modale */
.modal-palette-body      /* Body modale */
.modal-palette-footer    /* Footer modale */
```

### Classi per Card
```css
.card-palette            /* Card principale */
.card-palette-header     /* Header card */
```

### Classi per Form
```css
.form-control-palette    /* Campi input/form */
.form-label-palette      /* Etichette form */
```

### Classi per Bottoni
```css
.btn-palette-primary     /* Bottone primario */
.btn-palette-outline     /* Bottone outline */
```

### Classi per Tabelle
```css
.table-palette           /* Tabella principale */
```

### Classi per Alert
```css
.alert-palette-info      /* Alert informativo */
.alert-palette-success   /* Alert successo */
.alert-palette-warning   /* Alert avviso */
.alert-palette-danger    /* Alert errore */
```

## Come Applicare la Palette

### 1. Modali
Sostituire:
```html
<div class="modal-content">
  <div class="modal-header">
    <h2 class="fw-bold text-gray-900">Titolo</h2>
    <span class="text-muted">Sottotitolo</span>
  </div>
</div>
```

Con:
```html
<div class="modal-content card-palette">
  <div class="modal-header card-palette-header">
    <h2 class="fw-bold text-palette-primary">Titolo</h2>
    <span class="text-palette-secondary">Sottotitolo</span>
  </div>
</div>
```

### 2. Form
Sostituire:
```html
<label class="fs-6 fw-bold mb-3 text-gray-800">Etichetta</label>
<input class="form-control modern-input" />
```

Con:
```html
<label class="fs-6 fw-bold mb-3 text-palette-primary">Etichetta</label>
<input class="form-control modern-input form-control-palette" />
```

### 3. Card
Sostituire:
```html
<div class="card">
  <div class="card-header">
    <h3 class="text-gray-900">Titolo</h3>
  </div>
</div>
```

Con:
```html
<div class="card card-palette">
  <div class="card-header card-palette-header">
    <h3 class="text-palette-primary">Titolo</h3>
  </div>
</div>
```

### 4. Bottoni
Sostituire:
```html
<button class="btn btn-primary">Azione</button>
```

Con:
```html
<button class="btn btn-palette-primary">Azione</button>
```

## Gradienti e Colori Accent

Per i gradienti, utilizzare sempre il colore accent principale (`#0077CC`):

```css
background: linear-gradient(135deg, #0077CC 0%, #0077CC 100%);
```

Per gli sfondi con trasparenza:
```css
background: linear-gradient(135deg, rgba(0, 119, 204, 0.1) 0%, rgba(0, 119, 204, 0.05) 100%);
```

## Variabili CSS

Le variabili CSS sono disponibili globalmente:

```css
var(--bs-text-primary)      /* Testo principale */
var(--bs-text-secondary)    /* Testo secondario */
var(--bs-bg-primary)        /* Sfondo principale */
var(--bs-bg-secondary)      /* Sfondo secondario */
var(--bs-accent-primary)    /* Accento principale */
var(--bs-border-color)      /* Colore bordi */
var(--bs-shadow-color)      /* Colore ombre */
var(--bs-hover-bg)          /* Sfondo hover */
var(--bs-focus-color)       /* Colore focus */
```

## File Già Aggiornati

I seguenti file sono già stati aggiornati con la palette colori:

### Modali Forms
- ✅ `AddPropertyModal.vue`
- ✅ `ExportCustomerModal.vue`
- ✅ `AddProvinceModal.vue`
- ✅ `AddCityModal.vue`
- ✅ `AddLocationModal.vue`
- ✅ `agencies/AddAgencyModal.vue`
- ✅ `agencies/UpdateAgencyModal.vue`

### CSS
- ✅ `pricing-modal.css`
- ✅ `palette-variables.css` (nuovo file globale)

## Prossimi Passi

1. Applicare le classi della palette a tutti i modali rimanenti
2. Aggiornare tutte le pagine nella cartella `pages/`
3. Verificare che tutti i componenti utilizzino la palette
4. Testare la modalità dark/light

## Note Importanti

- La palette supporta automaticamente la modalità dark/light
- Utilizzare sempre le classi CSS invece degli stili inline quando possibile
- I colori si adattano automaticamente al tema del sistema
- Mantenere la coerenza utilizzando sempre le stesse classi per gli stessi elementi
