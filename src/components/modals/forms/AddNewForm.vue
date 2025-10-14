<template>
<div class="modal fade" id="kt_modal_scheda" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <!-- Header -->
      <div style="display: flex; align-items: center; width: 100%; justify-content: flex-start;">
        <img src="/src/pic5.png" alt="Logo" style="width: 100px; margin-left: 30px; margin-right: -120px;">
        <h2 class="fw-bold text-dark" style="flex: 1; text-align: center; margin: 0;">DOCUMENTAZIONE IMMOBILE</h2>
      </div>
      <!-- Body -->
      <div class="modal-body py-5 px-7 overflow-auto" style="max-height: 70vh;">
        <!-- Document Section -->
        <div class="document-section">
          
          <!-- Documento di Riconoscimento -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Documento di riconoscimento</h4>
              <p class="text-muted fs-6 mb-3">(Carta d'Identità o Passaporto - se persona giuridica del legale rappresentante o del titolare)</p>
            <div class="d-flex align-items-center">
            <div class="form-check form-check-custom form-check-solid me-10">
                <input class="form-check-input" type="radio" name="documento-riconoscimento-stato" id="documento-riconoscimento-presente">
                <label class="form-check-label" for="documento-riconoscimento-presente">Presente</label>
            </div>
            <div class="form-check form-check-custom form-check-solid me-4">
                <input class="form-check-input" type="radio" name="documento-riconoscimento-stato" id="documento-riconoscimento-richiedere">
                <label class="form-check-label" for="documento-riconoscimento-richiedere">Da richiedere</label>
            </div>
                <button type="button" class="btn btn-icon btn-sm btn-light pdf-view-btn" title="Visualizza documento" disabled>
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento">
                <i class="fas fa-upload fs-4"></i>
                </button>
          </div>
          </div>
          <!-- Codice Fiscale -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Codice Fiscale o Tessera Sanitaria</h4>
            <p class="text-muted fs-6 mb-3">(se persona giuridica del legale rappresentante o del titolare)</p>
            <div class="d-flex align-items-center">
            <div class="form-check form-check-custom form-check-solid me-10">
                <input class="form-check-input" type="radio" name="codice-fiscale-stato" id="codice-fiscale-presente">
                <label class="form-check-label" for="codice-fiscale-presente">Presente</label>
            </div>
            <div class="form-check form-check-custom form-check-solid me-4">
                <input class="form-check-input" type="radio" name="codice-fiscale-stato" id="codice-fiscale-richiedere">
                <label class="form-check-label" for="codice-fiscale-richiedere">Da richiedere</label>
            </div>
                <button type="button" class="btn btn-icon btn-sm btn-light pdf-view-btn" title="Visualizza documento" disabled>
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento">
                <i class="fas fa-upload fs-4"></i>
                </button>
          </div>
          </div>
          <!-- Estratto atto matrimonio -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Estratto per riassunto dell'atto di matrimonio</h4>
            <p class="text-muted fs-6 mb-3">(con indicato il regime coniugale e patrimoniale o Certificato di stato libero o Certificato di unione civile)</p>
            <div class="d-flex align-items-center">
            <div class="form-check form-check-custom form-check-solid me-10">
                <input class="form-check-input" type="radio" name="atto-matrimonio-stato" id="atto-matrimonio-presente">
                <label class="form-check-label" for="atto-matrimonio-presente">Presente</label>
            </div>
            <div class="form-check form-check-custom form-check-solid me-4">
                <input class="form-check-input" type="radio" name="atto-matrimonio-stato" id="atto-matrimonio-richiedere">
                <label class="form-check-label" for="atto-matrimonio-richiedere">Da richiedere</label>
            </div>
                <button type="button" class="btn btn-icon btn-sm btn-light pdf-view-btn" title="Visualizza documento" disabled>
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento">
                <i class="fas fa-upload fs-4"></i>
                </button>
          </div>
          </div>
          <!-- Atto di provenienza -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Atto/i di provenienza</h4>
            <p class="text-muted fs-6 mb-3">(Acquisto, Successione + Accettazione eredità, Divisione, Donazione, Permuta, Decreto di Trasferimento, Sentenza, Usucapione, etc.)</p>
            <div class="d-flex align-items-center">
            <div class="form-check form-check-custom form-check-solid me-10">
                <input class="form-check-input" type="radio" name="atto-provenienza-stato" id="atto-provenienza-presente">
                <label class="form-check-label" for="atto-provenienza-presente">Presente</label>
            </div>
            <div class="form-check form-check-custom form-check-solid me-4">
                <input class="form-check-input" type="radio" name="atto-provenienza-stato" id="atto-provenienza-richiedere">
                <label class="form-check-label" for="atto-provenienza-richiedere">Da richiedere</label>
            </div>
                <button type="button" class="btn btn-icon btn-sm btn-light pdf-view-btn" title="Visualizza documento" disabled>
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento">
                <i class="fas fa-upload fs-4"></i>
                </button>
          </div>
          </div>
          <!-- Impianti -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-3">Impianti: dichiarazione di conformità o di rispondenza</h4>

            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- elettrico/elettronico</h5>
              <div class="d-flex align-items-center">
            <div class="form-check form-check-custom form-check-solid me-10">
                <input class="form-check-input" type="radio" name="elettrico-stato" id="elettrico-presente">
                <label class="form-check-label" for="elettrico-presente">Presente</label>
            </div>
            <div class="form-check form-check-custom form-check-solid me-4">
                <input class="form-check-input" type="radio" name="elettrico-stato" id="elettrico-richiedere">
                <label class="form-check-label" for="elettrico-richiedere">Da richiedere</label>
            </div>
                <button type="button" class="btn btn-icon btn-sm btn-light pdf-view-btn" title="Visualizza documento" disabled>
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento">
                <i class="fas fa-upload fs-4"></i>
                </button>
          </div>
            </div>

            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- idrico/sanitario</h5>
              <div class="d-flex align-items-center">
            <div class="form-check form-check-custom form-check-solid me-10">
                <input class="form-check-input" type="radio" name="idrico-stato" id="idrico-presente">
                <label class="form-check-label" for="idrico-presente">Presente</label>
            </div>
            <div class="form-check form-check-custom form-check-solid me-4">
                <input class="form-check-input" type="radio" name="idrico-stato" id="idrico-richiedere">
                <label class="form-check-label" for="idrico-richiedere">Da richiedere</label>
            </div>
                <button type="button" class="btn btn-icon btn-sm btn-light pdf-view-btn" title="Visualizza documento" disabled>
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento">
                <i class="fas fa-upload fs-4"></i>
                </button>
          </div>
            </div>

            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- gas</h5>
              <div class="d-flex align-items-center">
            <div class="form-check form-check-custom form-check-solid me-10">
                <input class="form-check-input" type="radio" name="gas-stato" id="gas-presente">
                <label class="form-check-label" for="gas-presente">Presente</label>
            </div>
            <div class="form-check form-check-custom form-check-solid me-4">
                <input class="form-check-input" type="radio" name="gas-stato" id="gas-richiedere">
                <label class="form-check-label" for="gas-richiedere">Da richiedere</label>
            </div>
                <button type="button" class="btn btn-icon btn-sm btn-light pdf-view-btn" title="Visualizza documento" disabled>
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento">
                <i class="fas fa-upload fs-4"></i>
                </button>
          </div>
            </div>

            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- riscaldamento/condizionamento</h5>
              <div class="d-flex align-items-center">
            <div class="form-check form-check-custom form-check-solid me-10">
                <input class="form-check-input" type="radio" name="riscaldamento-stato" id="riscaldamento-presente">
                <label class="form-check-label" for="riscaldamento-presente">Presente</label>
            </div>
            <div class="form-check form-check-custom form-check-solid me-4">
                <input class="form-check-input" type="radio" name="riscaldamento-stato" id="riscaldamento-richiedere">
                <label class="form-check-label" for="riscaldamento-richiedere">Da richiedere</label>
            </div>
                <button type="button" class="btn btn-icon btn-sm btn-light pdf-view-btn" title="Visualizza documento" disabled>
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento">
                <i class="fas fa-upload fs-4"></i>
                </button>
          </div>
            </div>

            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- sollevamento</h5>
              <div class="d-flex align-items-center">
            <div class="form-check form-check-custom form-check-solid me-10">
                <input class="form-check-input" type="radio" name="sollevamento-stato" id="sollevamento-presente">
                <label class="form-check-label" for="sollevamento-presente">Presente</label>
            </div>
            <div class="form-check form-check-custom form-check-solid me-4">
                <input class="form-check-input" type="radio" name="sollevamento-stato" id="sollevamento-richiedere">
                <label class="form-check-label" for="sollevamento-richiedere">Da richiedere</label>
            </div>
                <button type="button" class="btn btn-icon btn-sm btn-light pdf-view-btn" title="Visualizza documento" disabled>
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento">
                <i class="fas fa-upload fs-4"></i>
                </button>
          </div>
            </div>

            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- antincendio</h5>
              <div class="d-flex align-items-center">
            <div class="form-check form-check-custom form-check-solid me-10">
                <input class="form-check-input" type="radio" name="antincendio-stato" id="antincendio-presente">
                <label class="form-check-label" for="antincendio-presente">Presente</label>
            </div>
            <div class="form-check form-check-custom form-check-solid me-4">
                <input class="form-check-input" type="radio" name="antincendio-stato" id="antincendio-richiedere">
                <label class="form-check-label" for="antincendio-richiedere">Da richiedere</label>
            </div>
                <button type="button" class="btn btn-icon btn-sm btn-light pdf-view-btn" title="Visualizza documento" disabled>
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento">
                <i class="fas fa-upload fs-4"></i>
                </button>
          </div>
            </div>
          </div>
          <!-- Libretto caldaia -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Libretto della caldaia</h4>
            <div class="d-flex align-items-center">
            <div class="form-check form-check-custom form-check-solid me-10">
                <input class="form-check-input" type="radio" name="libretto-caldaia-stato" id="libretto-caldaia-presente">
                <label class="form-check-label" for="libretto-caldaia-presente">Presente</label>
            </div>
            <div class="form-check form-check-custom form-check-solid me-4">
                <input class="form-check-input" type="radio" name="libretto-caldaia-stato" id="libretto-caldaia-richiedere">
                <label class="form-check-label" for="libretto-caldaia-richiedere">Da richiedere</label>
            </div>
                <button type="button" class="btn btn-icon btn-sm btn-light pdf-view-btn" title="Visualizza documento" disabled>
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento">
                <i class="fas fa-upload fs-4"></i>
                </button>
          </div>
          </div>
          <!-- Abitabilità/Agibilità -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Abitabilità / Agibilità</h4>
            <p class="text-muted fs-6 mb-3">(Certificato rilasciato dal Comune o Attestazione redatta dal Tecnico)</p>
            <div class="d-flex align-items-center">
            <div class="form-check form-check-custom form-check-solid me-10">
                <input class="form-check-input" type="radio" name="agibilità-stato" id="agibilità-presente">
                <label class="form-check-label" for="agibilità-presente">Presente</label>
            </div>
            <div class="form-check form-check-custom form-check-solid me-4">
                <input class="form-check-input" type="radio" name="agibilità-stato" id="agibilità-richiedere">
                <label class="form-check-label" for="agibilità-richiedere">Da richiedere</label>
            </div>
                <button type="button" class="btn btn-icon btn-sm btn-light pdf-view-btn" title="Visualizza documento" disabled>
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento">
                <i class="fas fa-upload fs-4"></i>
                </button>
          </div>
          </div>
          <!-- Certificato idoneità statica -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Certificato di idoneità statica</h4>
            <div class="d-flex align-items-center">
            <div class="form-check form-check-custom form-check-solid me-10">
                <input class="form-check-input" type="radio" name="idoneità-statica-stato" id="idoneità-statica-presente">
                <label class="form-check-label" for="idoneità-statica-presente">Presente</label>
            </div>
            <div class="form-check form-check-custom form-check-solid me-4">
                <input class="form-check-input" type="radio" name="idoneità-statica-stato" id="idoneità-statica-richiedere">
                <label class="form-check-label" for="idoneità-statica-richiedere">Da richiedere</label>
            </div>
                <button type="button" class="btn btn-icon btn-sm btn-light pdf-view-btn" title="Visualizza documento" disabled>
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento">
                <i class="fas fa-upload fs-4"></i>
                </button>
          </div>
          </div>
          <!-- Relazione Tecnica -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Relazione Tecnica Integrata di Conformità Edilizia e Catastale</h4>
            <p class="text-muted fs-6 mb-3">(comprenderà dati catastali completi, descrizione, titolarità, situazione edilizia con riepilogo dei titoli abilitanti, informazioni sull'agibilità/abitabilità, conformità edilizia e catastale, informazioni circa l'esistenza di un interesse culturale del bene ai sensi del D. Lgs. 42/04 ed attestazione conclusiva. Saranno allegati visura catastale e planimetria catastale)</p>
            <div class="d-flex align-items-center">
            <div class="form-check form-check-custom form-check-solid me-10">
                <input class="form-check-input" type="radio" name="relazione-tecnica-stato" id="relazione-tecnica-presente">
                <label class="form-check-label" for="relazione-tecnica-presente">Presente</label>
            </div>
            <div class="form-check form-check-custom form-check-solid me-4">
                <input class="form-check-input" type="radio" name="relazione-tecnica-stato" id="relazione-tecnica-richiedere">
                <label class="form-check-label" for="relazione-tecnica-richiedere">Da richiedere</label>
            </div>
                <button type="button" class="btn btn-icon btn-sm btn-light pdf-view-btn" title="Visualizza documento" disabled>
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento">
                <i class="fas fa-upload fs-4"></i>
                </button>
          </div>
          </div>
          <!-- Catasto -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-3">Catasto:</h4>
            
            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- visura e planimetria</h5>
              <div class="d-flex align-items-center">
            <div class="form-check form-check-custom form-check-solid me-10">
                <input class="form-check-input" type="radio" name="planimetria-stato" id="planimetria-presente">
                <label class="form-check-label" for="planimetria-presente">Presente</label>
            </div>
            <div class="form-check form-check-custom form-check-solid me-4">
                <input class="form-check-input" type="radio" name="planimetria-stato" id="planimetria-richiedere">
                <label class="form-check-label" for="planimetria-richiedere">Da richiedere</label>
            </div>
                <button type="button" class="btn btn-icon btn-sm btn-light pdf-view-btn" title="Visualizza documento" disabled>
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento">
                <i class="fas fa-upload fs-4"></i>
                </button>
          </div>
            </div>

            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- estratto di mappa</h5>
              <div class="d-flex align-items-center">
            <div class="form-check form-check-custom form-check-solid me-10">
                <input class="form-check-input" type="radio" name="estratto-stato" id="estratto-presente">
                <label class="form-check-label" for="estratto-presente">Presente</label>
            </div>
            <div class="form-check form-check-custom form-check-solid me-4">
                <input class="form-check-input" type="radio" name="estratto-stato" id="estratto-richiedere">
                <label class="form-check-label" for="estratto-richiedere">Da richiedere</label>
            </div>
                <button type="button" class="btn btn-icon btn-sm btn-light pdf-view-btn" title="Visualizza documento" disabled>
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento">
                <i class="fas fa-upload fs-4"></i>
                </button>
          </div>
            </div>

            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- elaborato planimetrico con elenco subalterni</h5>
              <div class="d-flex align-items-center">
            <div class="form-check form-check-custom form-check-solid me-10">
                <input class="form-check-input" type="radio" name="subalterni-stato" id="subalterni-presente">
                <label class="form-check-label" for="subalterni-presente">Presente</label>
            </div>
            <div class="form-check form-check-custom form-check-solid me-4">
                <input class="form-check-input" type="radio" name="subalterni-stato" id="subalterni-richiedere">
                <label class="form-check-label" for="subalterni-richiedere">Da richiedere</label>
            </div>
                <button type="button" class="btn btn-icon btn-sm btn-light pdf-view-btn" title="Visualizza documento" disabled>
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento">
                <i class="fas fa-upload fs-4"></i>
                </button>
          </div>
            </div>
          </div>
          <!-- APE -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Attestato di Certificazione/Prestazione Energetica (laddove previsto per legge)</h4>
            <div class="d-flex align-items-center">
            <div class="form-check form-check-custom form-check-solid me-10">
                <input class="form-check-input" type="radio" name="prestazione-energetica-stato" id="prestazione-energetica-presente">
                <label class="form-check-label" for="prestazione-energetica-presente">Presente</label>
            </div>
            <div class="form-check form-check-custom form-check-solid me-4">
                <input class="form-check-input" type="radio" name="prestazione-energetica-stato" id="prestazione-energetica-richiedere">
                <label class="form-check-label" for="prestazione-energetica-richiedere">Da richiedere</label>
            </div>
                <button type="button" class="btn btn-icon btn-sm btn-light pdf-view-btn" title="Visualizza documento" disabled>
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento">
                <i class="fas fa-upload fs-4"></i>
                </button>
          </div>
          </div>
          <!-- Visura ipocatastale -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Visura ipocatastale</h4>
            <p class="text-muted fs-6 mb-3">(a verifica della titolarità immobiliare ed eventuali gravami)</p>
            <div class="d-flex align-items-center">
            <div class="form-check form-check-custom form-check-solid me-10">
                <input class="form-check-input" type="radio" name="visura-ipocatastale-stato" id="visura-ipocatastale-presente">
                <label class="form-check-label" for="visura-ipocatastale-presente">Presente</label>
            </div>
            <div class="form-check form-check-custom form-check-solid me-4">
                <input class="form-check-input" type="radio" name="visura-ipocatastale-stato" id="visura-ipocatastale-richiedere">
                <label class="form-check-label" for="visura-ipocatastale-richiedere">Da richiedere</label>
            </div>
                <button type="button" class="btn btn-icon btn-sm btn-light pdf-view-btn" title="Visualizza documento" disabled>
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento">
                <i class="fas fa-upload fs-4"></i>
                </button>
          </div>
          </div>
          <!-- Condominio -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-3">Condominio (indicare recapiti dell'amministratore):</h4>
            
            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- regolamento</h5>
              <div class="d-flex align-items-center">
            <div class="form-check form-check-custom form-check-solid me-10">
                <input class="form-check-input" type="radio" name="regolamento-stato" id="regolamento-presente">
                <label class="form-check-label" for="regolamento-presente">Presente</label>
            </div>
            <div class="form-check form-check-custom form-check-solid me-4">
                <input class="form-check-input" type="radio" name="regolamento-stato" id="regolamento-richiedere">
                <label class="form-check-label" for="regolamento-richiedere">Da richiedere</label>
            </div>
                <button type="button" class="btn btn-icon btn-sm btn-light pdf-view-btn" title="Visualizza documento" disabled>
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento">
                <i class="fas fa-upload fs-4"></i>
                </button>
          </div>
            </div>

            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- tabelle millesimali</h5>
              <div class="d-flex align-items-center">
            <div class="form-check form-check-custom form-check-solid me-10">
                <input class="form-check-input" type="radio" name="tabelle-millesimali-stato" id="tabelle-millesimali-presente">
                <label class="form-check-label" for="tabelle-millesimali-presente">Presente</label>
            </div>
            <div class="form-check form-check-custom form-check-solid me-4">
                <input class="form-check-input" type="radio" name="tabelle-millesimali-stato" id="tabelle-millesimali-richiedere">
                <label class="form-check-label" for="tabelle-millesimali-richiedere">Da richiedere</label>
            </div>
                <button type="button" class="btn btn-icon btn-sm btn-light pdf-view-btn" title="Visualizza documento" disabled>
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento">
                <i class="fas fa-upload fs-4"></i>
                </button>
          </div>
            </div>

            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- ultimo bilancio consuntivo e preventivo</h5>
              <div class="d-flex align-items-center">
            <div class="form-check form-check-custom form-check-solid me-10">
                <input class="form-check-input" type="radio" name="bilancio-stato" id="bilancio-presente">
                <label class="form-check-label" for="bilancio-presente">Presente</label>
            </div>
            <div class="form-check form-check-custom form-check-solid me-4">
                <input class="form-check-input" type="radio" name="bilancio-stato" id="bilancio-richiedere">
                <label class="form-check-label" for="bilancio-richiedere">Da richiedere</label>
            </div>
                <button type="button" class="btn btn-icon btn-sm btn-light pdf-view-btn" title="Visualizza documento" disabled>
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento">
                <i class="fas fa-upload fs-4"></i>
                </button>
          </div>
            </div>

            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- ultimi due verbali dell'assemblea condominiale</h5>
              <div class="d-flex align-items-center">
            <div class="form-check form-check-custom form-check-solid me-10">
                <input class="form-check-input" type="radio" name="verbali-stato" id="verbali-presente">
                <label class="form-check-label" for="verbali-presente">Presente</label>
            </div>
            <div class="form-check form-check-custom form-check-solid me-4">
                <input class="form-check-input" type="radio" name="verbali-stato" id="verbali-richiedere">
                <label class="form-check-label" for="verbali-richiedere">Da richiedere</label>
            </div>
                <button type="button" class="btn btn-icon btn-sm btn-light pdf-view-btn" title="Visualizza documento" disabled>
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento">
                <i class="fas fa-upload fs-4"></i>
                </button>
          </div>
            </div>

            <div class="ps-5 mb-4">
              <h5 class="fw-semibold text-dark mb-1">- dichiarazione scritta e firmata dall'amministratore attestante l'avvenuto pagamento di tutte le spese condominiali e indicazione delle eventuali spese straordinarie deliberate e delle liti in corso</h5>
              <div class="d-flex align-items-center">
            <div class="form-check form-check-custom form-check-solid me-10">
                <input class="form-check-input" type="radio" name="spese-condominiali-stato" id="spese-condominiali-presente">
                <label class="form-check-label" for="spese-condominiali-presente">Presente</label>
            </div>
            <div class="form-check form-check-custom form-check-solid me-4">
                <input class="form-check-input" type="radio" name="spese-condominiali-stato" id="spese-condominiali-richiedere">
                <label class="form-check-label" for="spese-condominiali-richiedere">Da richiedere</label>
            </div>
                <button type="button" class="btn btn-icon btn-sm btn-light pdf-view-btn" title="Visualizza documento" disabled>
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento">
                <i class="fas fa-upload fs-4"></i>
                </button>
          </div>
            </div>
          </div>
          <!-- Visura camerale -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Visura camerale</h4>
            <p class="text-muted fs-6 mb-3">(solo se persona giuridica)</p>
            <div class="d-flex align-items-center">
            <div class="form-check form-check-custom form-check-solid me-10">
                <input class="form-check-input" type="radio" name="camerale-visura-stato" id="camerale-visura-presente">
                <label class="form-check-label" for="camerale-visura-presente">Presente</label>
            </div>
            <div class="form-check form-check-custom form-check-solid me-4">
                <input class="form-check-input" type="radio" name="camerale-visura-stato" id="camerale-visura-richiedere">
                <label class="form-check-label" for="camerale-visura-richiedere">Da richiedere</label>
            </div>
                <button type="button" class="btn btn-icon btn-sm btn-light pdf-view-btn" title="Visualizza documento" disabled>
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento">
                <i class="fas fa-upload fs-4"></i>
                </button>
          </div>
          </div>
          <!-- Procura -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Procura speciale o generale</h4>
            <p class="text-muted fs-6 mb-3">(solo in presenza di procuratore)</p>
            <div class="d-flex align-items-center">
            <div class="form-check form-check-custom form-check-solid me-10">
                <input class="form-check-input" type="radio" name="Procura-stato" id="Procura-presente">
                <label class="form-check-label" for="Procura-presente">Presente</label>
            </div>
            <div class="form-check form-check-custom form-check-solid me-4">
                <input class="form-check-input" type="radio" name="Procura-stato" id="Procura-richiedere">
                <label class="form-check-label" for="Procura-richiedere">Da richiedere</label>
            </div>
                <button type="button" class="btn btn-icon btn-sm btn-light pdf-view-btn" title="Visualizza documento" disabled>
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento">
                <i class="fas fa-upload fs-4"></i>
                </button>
          </div>
          </div>
          <!-- Certificato Urbanistico -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Certificato di Destinazione Urbanistica</h4>
            <p class="text-muted fs-6 mb-3">(solo in presenza di terreni)</p>
            <div class="d-flex align-items-center">
            <div class="form-check form-check-custom form-check-solid me-10">
                <input class="form-check-input" type="radio" name="destinazione-urbanistica-stato" id="destinazione-urbanistica-presente">
                <label class="form-check-label" for="destinazione-urbanistica-presente">Presente</label>
            </div>
            <div class="form-check form-check-custom form-check-solid me-4">
                <input class="form-check-input" type="radio" name="destinazione-urbanistica-stato" id="destinazione-urbanistica-richiedere">
                <label class="form-check-label" for="destinazione-urbanistica-richiedere">Da richiedere</label>
            </div>
                <button type="button" class="btn btn-icon btn-sm btn-light pdf-view-btn" title="Visualizza documento" disabled>
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento">
                <i class="fas fa-upload fs-4"></i>
                </button>
          </div>
          </div>
          <!-- Contratto locazione -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Copia del contratto di locazione</h4>
            <p class="text-muted fs-6 mb-3">(solo nell'ipotesi di immobile locato)</p>
            <div class="d-flex align-items-center">
            <div class="form-check form-check-custom form-check-solid me-10">
                <input class="form-check-input" type="radio" name="locazione-stato" id="locazione-presente">
                <label class="form-check-label" for="locazione-presente">Presente</label>
            </div>
            <div class="form-check form-check-custom form-check-solid me-4">
                <input class="form-check-input" type="radio" name="locazione-stato" id="locazione-richiedere">
                <label class="form-check-label" for="locazione-richiedere">Da richiedere</label>
            </div>
                <button type="button" class="btn btn-icon btn-sm btn-light pdf-view-btn" title="Visualizza documento" disabled>
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento">
                <i class="fas fa-upload fs-4"></i>
                </button>
          </div>
          </div>
          <!-- Mutuo -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Ricevuta di pagamento ultima rata del mutuo con indicazione del capitale residuo</h4>
            <div class="d-flex align-items-center">
            <div class="form-check form-check-custom form-check-solid me-10">
                <input class="form-check-input" type="radio" name="rata-mutuo-stato" id="rata-mutuo-presente">
                <label class="form-check-label" for="rata-mutuo-presente">Presente</label>
            </div>
            <div class="form-check form-check-custom form-check-solid me-4">
                <input class="form-check-input" type="radio" name="rata-mutuo-stato" id="rata-mutuo-richiedere">
                <label class="form-check-label" for="rata-mutuo-richiedere">Da richiedere</label>
            </div>
                <button type="button" class="btn btn-icon btn-sm btn-light pdf-view-btn" title="Visualizza documento" disabled>
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento">
                <i class="fas fa-upload fs-4"></i>
                </button>
          </div>
          </div>
          <!-- Detrazioni fiscali -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Documentazione inerente la detrazione fiscale ancora in godimento e da trasferire</h4>
            <p class="text-muted fs-6 mb-3">(per lavori eseguiti sull'immobile e/o su parti comuni)</p>
            <div class="d-flex align-items-center">
            <div class="form-check form-check-custom form-check-solid me-10">
                <input class="form-check-input" type="radio" name="detrazione-stato" id="detrazione-presente">
                <label class="form-check-label" for="detrazione-presente">Presente</label>
            </div>
            <div class="form-check form-check-custom form-check-solid me-4">
                <input class="form-check-input" type="radio" name="detrazione-stato" id="detrazione-richiedere">
                <label class="form-check-label" for="detrazione-richiedere">Da richiedere</label>
            </div>
                <button type="button" class="btn btn-icon btn-sm btn-light pdf-view-btn" title="Visualizza documento" disabled>
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento">
                <i class="fas fa-upload fs-4"></i>
                </button>
          </div>
          </div>
           <!-- Proposta D'Acquisto -->
           <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Proposta D'Acquisto</h4>
            <div class="d-flex align-items-center">
            <div class="form-check form-check-custom form-check-solid me-10">
                <input class="form-check-input" type="radio" name="Proposta-stato" id="Proposta-presente">
                <label class="form-check-label" for="Proposta-presente">Presente</label>
            </div>
            <div class="form-check form-check-custom form-check-solid me-4">
                <input class="form-check-input" type="radio" name="Proposta-stato" id="Proposta-richiedere">
                <label class="form-check-label" for="Proposta-richiedere">Da richiedere</label>
            </div>
                <button type="button" class="btn btn-icon btn-sm btn-light pdf-view-btn" title="Visualizza documento" disabled>
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento">
                <i class="fas fa-upload fs-4"></i>
                </button>
          </div>
          </div>
           <!-- Allegato Provvigionale -->
           <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Allegato Provvigionale</h4>
            <div class="d-flex align-items-center">
            <div class="form-check form-check-custom form-check-solid me-10">
                <input class="form-check-input" type="radio" name="provvigionale-stato" id="provvigionale-presente">
                <label class="form-check-label" for="provvigionale-presente">Presente</label>
            </div>
            <div class="form-check form-check-custom form-check-solid me-4">
                <input class="form-check-input" type="radio" name="provvigionale-stato" id="provvigionale-richiedere">
                <label class="form-check-label" for="provvigionale-richiedere">Da richiedere</label>
            </div>
                <button type="button" class="btn btn-icon btn-sm btn-light pdf-view-btn" title="Visualizza documento" disabled>
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento">
                <i class="fas fa-upload fs-4"></i>
                </button>
          </div>
          </div>
          <!-- Preliminare Compravendita -->
          <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Preliminare Compravendita</h4>
            <div class="d-flex align-items-center">
            <div class="form-check form-check-custom form-check-solid me-10">
                <input class="form-check-input" type="radio" name="preliminare-stato" id="preliminare-presente">
                <label class="form-check-label" for="preliminare-presente">Presente</label>
            </div>
            <div class="form-check form-check-custom form-check-solid me-4">
                <input class="form-check-input" type="radio" name="preliminare-stato" id="preliminare-richiedere">
                <label class="form-check-label" for="preliminare-richiedere">Da richiedere</label>
            </div>
                <button type="button" class="btn btn-icon btn-sm btn-light pdf-view-btn" title="Visualizza documento" disabled>
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento">
                <i class="fas fa-upload fs-4"></i>
                </button>
          </div>
          </div>
           <!-- Atto di Vendita -->
           <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Atto di Vendita</h4>
            <div class="d-flex align-items-center">
            <div class="form-check form-check-custom form-check-solid me-10">
                <input class="form-check-input" type="radio" name="Atto-stato" id="Atto-presente">
                <label class="form-check-label" for="Atto-presente">Presente</label>
            </div>
            <div class="form-check form-check-custom form-check-solid me-4">
                <input class="form-check-input" type="radio" name="Atto-stato" id="Atto-richiedere">
                <label class="form-check-label" for="Atto-richiedere">Da richiedere</label>
            </div>
                <button type="button" class="btn btn-icon btn-sm btn-light pdf-view-btn" title="Visualizza documento" disabled>
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento">
                <i class="fas fa-upload fs-4"></i>
                </button>
          </div>
          </div>
           <!-- Atto di Mutuo -->
           <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Atto di Mutuo</h4>
            <div class="d-flex align-items-center">
            <div class="form-check form-check-custom form-check-solid me-10">
                <input class="form-check-input" type="radio" name="Mutuo-stato" id="Mutuo-presente">
                <label class="form-check-label" for="Mutuo-presente">Presente</label>
            </div>
            <div class="form-check form-check-custom form-check-solid me-4">
                <input class="form-check-input" type="radio" name="Mutuo-stato" id="Mutuo-richiedere">
                <label class="form-check-label" for="Mutuo-richiedere">Da richiedere</label>
            </div>
                <button type="button" class="btn btn-icon btn-sm btn-light pdf-view-btn" title="Visualizza documento" disabled>
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento">
                <i class="fas fa-upload fs-4"></i>
                </button>
          </div>
          </div>
           <!-- Documenti Vari -->
           <div class="document-item mb-5">
            <h4 class="fw-bold text-dark mb-1">Documenti Vari</h4>
            <div class="d-flex align-items-center">
            <div class="form-check form-check-custom form-check-solid me-10">
                <input class="form-check-input" type="radio" name="Vari-stato" id="Vari-presente">
                <label class="form-check-label" for="Vari-presente">Presente</label>
            </div>
            <div class="form-check form-check-custom form-check-solid me-4">
                <input class="form-check-input" type="radio" name="Vari-stato" id="Vari-richiedere">
                <label class="form-check-label" for="Vari-richiedere">Da richiedere</label>
            </div>
                <button type="button" class="btn btn-icon btn-sm btn-light pdf-view-btn" title="Visualizza documento" disabled>
                <i class="fas fa-file-pdf fs-4"></i>
                </button>
                <button type="button" class="btn btn-icon btn-sm btn-light me-2 pdf-upload-btn" title="Carica documento">
                <i class="fas fa-upload fs-4"></i>
                </button>
          </div>
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
        <button type="button" class="btn btn-light me-3" data-bs-dismiss="modal" @click="resetModal">
          Chiudi
        </button>
        <button type="button" class="btn btn-primary">
          Salva Documenti
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
      modalElement: null as HTMLElement | null
    };
  },
  mounted() {
    this.modalElement = document.getElementById('kt_modal_scheda');
  },
  methods: {
    resetModal() {
      if (this.modalElement) {
        const checkboxes = this.modalElement.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((checkbox: HTMLInputElement) => {
          checkbox.checked = false;
        });
      }
    },
    printWithBrowser() {
  // 1. Ottieni il contenuto della modale
  const modalContent = document.getElementById("kt_modal_scheda");
  if (!modalContent) return;

  // 2. Crea un clone profondo
  const printContent = modalContent.cloneNode(true) as HTMLElement;
  
  // 3. Sincronizza lo stato di tutti i checkbox
  printContent.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
  const replacement = document.createElement('span');
  replacement.innerHTML = (checkbox as HTMLInputElement).checked 
    ? '☑' 
    : '□';
  replacement.style.marginRight = '5px';
  checkbox.replaceWith(replacement);
});

  // 4. Rimuovi elementi non necessari
  const footer = printContent.querySelector('.modal-footer');
  if (footer) footer.remove();

  // 5. Prepara l'HTML per la stampa con stili specifici
  const printHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Documentazione Immobile</title>
        <meta charset="UTF-8">
        <style>
          @page {
            size: A4;
            margin: 10mm;
          }
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 15mm;
            color: #000;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .document-item {
            margin-bottom: 8mm;
            page-break-inside: avoid;
          }
          h2 {
            text-align: center;
            margin-bottom: 10mm;
          }
          .form-check-label {
            margin-left: 5px;
          }
          .text-muted {
            color: #666 !important;
          }
          img {
            max-width: 100px;
            height: auto;
          }
          /* Stile checkbox per stampa */
          input[type="checkbox"] {
            -webkit-appearance: checkbox !important;
            -moz-appearance: checkbox !important;
            appearance: checkbox !important;
            width: 14px !important;
            height: 14px !important;
            border: 1px solid #000 !important;
            margin: 0 5px 0 0 !important;
            vertical-align: middle;
          }
          input[type="checkbox"]:checked {
            background-color: #000 !important;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E") !important;
            background-repeat: no-repeat !important;
            background-position: center !important;
          }
        </style>
      </head>
      <body>
        ${printContent.innerHTML}
      </body>
    </html>
  `;

  // 6. Apri la finestra di stampa
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    alert("Per favore abilita i popup per la stampa");
    return;
  }

  // 7. Scrivi il contenuto
  printWindow.document.open();
  printWindow.document.write(printHtml);
  printWindow.document.close();

  // 8. Forza il rendering prima della stampa
  setTimeout(() => {
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  }, 500);
}

  },

}
</script>

<style scoped>
@media print {
  body.modal-open {
    visibility: hidden;
  }
  body.modal-open .modal {
    visibility: visible;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: auto;
    overflow: visible;
  }
  .modal-footer {
    display: none !important;
  }
  
  /* Stile per i checkbox nella stampa */
  input[type="checkbox"] {
    appearance: checkbox !important;
    -webkit-appearance: checkbox !important;
    -moz-appearance: checkbox !important;
    width: 13px !important;
    height: 13px !important;
    border: 1px solid #000 !important;
  }
  input[type="checkbox"]:checked {
    background-color: #000 !important;
  }
  input[type="checkbox"]:checked::before {
    content: "✓";
    color: white;
    font-size: 10px;
    position: relative;
    left: 2px;
    top: -2px;
  }
}
</style>