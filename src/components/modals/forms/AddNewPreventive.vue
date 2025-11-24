<template>
  <div class="modal fade" id="kt_modal_preventivo" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <!-- Header -->
        <div id="pdf-content">
          <!-- Logo -->
          <div style="display: flex; align-items: center; width: 100%; justify-content: flex-start;">
            <img src="/src/pic5.png" alt="Logo" style="width: 100px; margin-left: 30px; margin-right: -120px;">
            <h2 class="fw-bold text-dark" style="flex: 1; text-align: center; margin: 0;">PREVENTIVO</h2>
          </div>

          <!-- Contenuto della modale -->
          <div class="modal-body py-5 px-7 overflow-auto" style="max-height: 70vh;">
            <!-- Sezioni del contenuto -->
            <div class="mb-10">
              <h4 class="fw-bold text-dark mb-5">NOTAIO</h4>
              <textarea class="form-control form-control-solid" rows="3" v-model="notaioNotes"></textarea>
            </div>

            <div class="mb-10">
              <h4 class="fw-bold text-dark mb-5">RISTRUTTURAZIONI</h4>
              <textarea class="form-control form-control-solid" rows="3" v-model="ristrutturazioniNotes"></textarea>
            </div>

            <div class="mb-10">
              <h4 class="fw-bold text-dark mb-5">PRATICHE TECNICHE</h4>
              <textarea class="form-control form-control-solid" rows="3" v-model="praticheTecnicheNotes"></textarea>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="modal-footer">
          <button 
            type="button" 
            class="btn btn-secondary me-auto"
            @click="printWithBrowser">
            <i class="fas fa-print me-2"></i> Stampa
          </button>

          <button 
            type="button" 
            class="btn btn-light me-3" 
            data-bs-dismiss="modal" 
            @click="resetModal">
            Chiudi
          </button>
          <button 
            type="button" 
            class="btn btn-primary" 
            @click="saveNotes">
            Salva Preventivo
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">


export default {
  data() {
    return {
      notaioNotes: '',
      ristrutturazioniNotes: '',
      praticheTecnicheNotes: '',
      // Altri campi se necessario
    }
  },
  mounted() {
    // Aggiungi listener per resettare quando la modale viene riaperta
    const modal = document.getElementById('kt_modal_scheda');
    if (modal) {
      modal.addEventListener('show.bs.modal', this.resetModal);
    }
  },
  methods: {
    resetModal() {
      // Resetta tutti i campi del form
      this.notaioNotes = '';
      this.ristrutturazioniNotes = '';
      this.praticheTecnicheNotes = '';
      
      // Resetta eventuali checkbox
      const modal = document.getElementById('kt_modal_scheda');
      if (modal) {
        const checkboxes = modal.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((checkbox: HTMLInputElement) => {
          checkbox.checked = false;
        });
      }
    },
    
    saveNotes() {
      // Metodo per salvare le note
      console.log({
        notaio: this.notaioNotes,
        ristrutturazioni: this.ristrutturazioniNotes,
        praticheTecniche: this.praticheTecnicheNotes
      });
      
      // Qui puoi aggiungere la logica per salvare i dati
    },
    
    printWithBrowser() {
      // Metodo per stampare il contenuto
      const pdfContent = document.getElementById("pdf-content");
      if (!pdfContent) return;

      const printContent = pdfContent.cloneNode(true) as HTMLElement;
      
      // Stili per la stampa
      printContent.style.width = "210mm";
      printContent.style.padding = "20mm";
      printContent.style.margin = "0 auto";
      printContent.style.display = "block";

      // Sostituisci textarea con div
      const textareas = printContent.querySelectorAll("textarea");
      textareas.forEach(textarea => {
        const div = document.createElement("div");
        div.style.whiteSpace = "pre-wrap";
        div.style.padding = "10px";
        div.style.border = "1px solid #eee";
        div.textContent = (textarea as HTMLTextAreaElement).value;
        textarea.parentNode?.replaceChild(div, textarea);
      });

      const printWindow = window.open("", "_blank");
      if (!printWindow) {
        alert("Permetti i popup per visualizzare l'anteprima di stampa");
        return;
      }

      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Preventivo</title>
            <meta charset="UTF-8">
            <style>
              body { font-family: Arial; margin: 0; padding: 20mm; }
              @page { size: A4; margin: 10mm; }
              @media print {
                body { padding: 0; }
              }
            </style>
          </head>
          <body>
            ${printContent.innerHTML}
          </body>
        </html>
      `);

      printWindow.document.close();
      
      setTimeout(() => {
        printWindow.print();
      }, 500);
    }
  }
}
</script>

<style scoped>
.mb-10 {
  margin-bottom: 2.5rem;
}

@media print {
  .modal-footer, .modal-header {
    display: none !important;
  }
}
</style>