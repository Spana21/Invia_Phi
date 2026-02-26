import React, { useState } from 'react';

// Tady si definujeme adresu Workeru (stejná jako v App.jsx)
const WORKER_URL = "https://worker-invia.spaniklukas.workers.dev";

function DiplomkaModal({ isOpen, onClose }) {
  const [isAgreed, setIsAgreed] = useState(false);
  const [selectedAge, setSelectedAge] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const ageGroups = [
    "Méně než 18", "18 - 24", "25 - 34", "35 - 44",
    "45 - 54", "55 - 64", "65 a více"
  ];

  const handleDownload = async () => {
    setIsSubmitting(true);
    
    // 1. Spustíme stažení souboru (simulace)
    const link = document.createElement('a');
    link.href = '/informovany_souhlas.pdf'; 
    link.download = 'Informovany_souhlas_ucastnika.pdf'; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 2. Odešleme vybraný věk na server
    try {
      await fetch(`${WORKER_URL}/wtf`, {
        method: 'POST',
        keepalive: true,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ age: selectedAge })
      });
      console.log("Statistická data byla úspěšně odeslána.");
    } catch (err) {
      console.error("Chyba při odesílání dat:", err);
    }
    
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <header className="modal-header">
          <div className="warning-icon">⚠️</div>
          <h3>Pozor: Toto byla simulace phishingového útoku</h3>
        </header>
        
        <div className="modal-body">
          <section className="modal-info-section">
            <p className="modal-text">
              Právě jste interagovali s testovací stránkou vytvořenou pro účely <strong>výzkumu v rámci diplomové práce</strong>. 
              Tato stránka pouze napodobuje vzhled portálu Invia, aby demonstrovala, jak snadno lze vytvořit věrohodnou kopii známého webu.
            </p>
            
            <div className="security-guarantee">
              <h4>🛡️ Vaše soukromí je 100% zachováno</h4>
              <p>
                V souladu s etickými pravidly výzkumu <strong>nebyla uložena žádná citlivá data</strong>. Vaše osobní údaje, čísla dokladů ani platebních karet 
                nebyly odeslány na server ani nikde zaznamenány. Systém pouze eviduje anonymní údaj o interakci s formulářem pro statistické vyhodnocení.
              </p>
            </div>
          </section>

          <section className="education-section">
            <h4>💡 Jak nenaletět: Klíčové znaky phishingu</h4>
            <div className="edu-grid">
              <div className="edu-item">
                <span className="edu-icon">🔗</span>
                <div>
                  <strong>Kontrola URL adresy:</strong> Útočníci často používají adresy jako <code>invia-rezervace.com</code> nebo <code>ivnia.cz</code> (překlepy v doméně). Vždy se dívejte do adresního řádku prohlížeče.
                </div>
              </div>
              <div className="edu-item">
                <span className="edu-icon">📧</span>
                <div>
                  <strong>Podezřelý odesílatel:</strong> Oficiální komunikace přichází z domény <code>invia.cz</code>. Pokud e-mail přišel z adresy jako <code>info@rezervace-zajezdu.cz</code>, jde pravděpodobně o podvod.
                </div>
              </div>
              <div className="edu-item">
                <span className="edu-icon">⚡</span>
                <div>
                  <strong>Časový nátlak:</strong> Fráze jako "Váš zájezd bude zrušen, pokud nedokončíte platbu do 10 minut" jsou typickým znakem útoku. Cílem je vyvolat paniku.
                </div>
              </div>
              <div className="edu-item">
                <span className="edu-icon">🔐</span>
                <div>
                  <strong>Zabezpečení stránek:</strong> I když má stránka zámek (HTTPS), neznamená to, že je bezpečná. Znamená to pouze, že spojení je šifrované. Vždy ověřujte identitu webu.
                </div>
              </div>
            </div>
          </section>

          <div className="research-form">
            <hr className="modal-divider" />
            <p className="section-title">Pomozte mi s výzkumem – anonymní údaje</p>
            
            <div className="form-controls">
              <div className="select-wrapper">
                <label>Váš věk:</label>
                <select 
                  className="modal-select"
                  value={selectedAge}
                  onChange={(e) => setSelectedAge(e.target.value)}
                >
                  <option value="" disabled>Vyberte věkovou skupinu...</option>
                  {ageGroups.map((age) => (
                    <option key={age} value={age}>{age} let</option>
                  ))}
                </select>
              </div>

              <div className="agreement-wrapper">
                <label className="checkbox-container">
                  <input 
                    type="checkbox" 
                    checked={isAgreed}
                    onChange={(e) => setIsAgreed(e.target.checked)}
                  />
                  Souhlasím se zapojením do anonymního výzkumu
                </label>
              </div>
            </div>
          </div>
        </div>

        <footer className="modal-footer">
          <p className="small-note">Kliknutím dokončíte simulaci a stáhnete Informovaný souhlas (PDF).</p>
          <button 
            onClick={handleDownload} 
            className="close-btn"
            disabled={!isAgreed || !selectedAge || isSubmitting} 
          >
            {isSubmitting ? 'Odesílám...' : 'Dokončit a stáhnout PDF'}
          </button>
          <p className="github-info">
            Kód projektu je dostupný na <a href="https://github.com/Spana21/Invia_Phi" target="_blank" rel="noopener noreferrer" className="github-link">GitHubu</a>.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default DiplomkaModal;
