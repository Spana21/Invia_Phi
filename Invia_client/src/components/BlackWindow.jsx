import React, { useState } from 'react';
import { ShieldCheck, Lightbulb, FileText, Mail, Phone, GraduationCap } from 'lucide-react';

// Tady si definujeme adresu Workeru (stejná jako v LoginScreen)
const WORKER_URL = "https://anton-databaze.spaniklukas.workers.dev";

function DiplomkaModal({ isOpen, onClose }) {
  const [isAgreed, setIsAgreed] = useState(false);
  const [selectedAge, setSelectedAge] = useState('');

  if (!isOpen) return null;

  const ageGroups = [
    "17 let nebo méně", "18 - 24", "25 - 34", "35 - 44",
    "45 - 54", "55 - 64", "65 a více"
  ];

  const handleDownload = async () => {
    try {
      // 1. Spuštění stahování souboru
      const link = document.createElement('a');
      link.href = '/informovany_souhlas.pdf'; 
      link.download = 'Informovany_souhlas_ucastnika.pdf'; 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // 2. Získání identifikátoru školy z URL
      const currentPath = window.location.pathname.replace('/', ''); 
      const schoolId = currentPath !== '' ? currentPath : 'nezadano';

      // 3. Odeslání dat na Worker (pokud je adresa vyplněná a není to jen prázdný text)
      if (WORKER_URL && WORKER_URL !== "") {
        await fetch(`${WORKER_URL}/wtf`, {
          method: 'POST',
          keepalive: true,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            age: selectedAge,
            school: schoolId,
            timestamp: new Date().toISOString() 
          })
        });
        console.log(`Statistika věku odeslána pro školu: ${schoolId}`);
      }
    } catch (err) {
      console.error("Chyba při zpracování:", err);
    } finally {
      onClose();
    }
  };

  return (
     <div className="modal-overlay">
      <div className="modal-content">

        <h3>Právě jste se stali součástí simulovaného testování v rámci <strong>diplomové práce</strong>.</h3>
        <div className="modal-info-section">
          <p className="modal-text">
            Tato stránka není skutečným přihlašovacím portálem. Jedná se o <strong>bezpečnou simulaci</strong> v rámci výzkumu pro mou diplomovou práci.
          </p>
                  <hr className="modal-divider" />

        <div className="age-selection-section">
          <p className="section-title">Pomozte mi s výzkumem: Do jaké věkové skupiny patříte?</p>
          <select 
            className="modal-select"
            value={selectedAge}
            onChange={(e) => setSelectedAge(e.target.value)}
          >
            <option value="" disabled>Vyberte prosím věkovou skupinu...</option>
            {ageGroups.map((age) => (
              <option key={age} value={age}>
                {age} let
              </option>
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

        <div className="modal-footer">
          <p className="small-note">Kliknutím na tlačítko stáhnete informovaný souhlas a okno se zavře.</p>
          <button 
            onClick={handleDownload} 
            className="close-btn"
            disabled={!isAgreed || !selectedAge} 
          >
            <FileText size={20} style={{ verticalAlign: 'middle', marginRight: '10px' }} />
            Stáhnout dokument a dokončit
          </button>
          
          <p className="github-info" style={{ marginTop: '30px' }}>
            Projekt je plně transparentní a zdrojový kód je dostupný na 
            <a href="https://github.com/Spana21/Bakalare_phi" target="_blank" rel="noopener noreferrer" className="github-link"> GitHubu</a>.
          </p>
        </div>
          <div className="security-guarantee">
            <h4><ShieldCheck size={28} color="#34d399" /> Vaše údaje jsou v naprostém bezpečí</h4>
            <p>
              Vaše <strong>heslo ani e-mail nebyly nikde uloženy ani odeslány</strong>. 
              Tato simulace slouží výhradně k anonymnímu sběru statistik pro vědecké účely. 
            </p>
          </div>
        </div>

          <div className="education-section">
            <h4><Lightbulb size={24} color="#34d399" style={{ verticalAlign: 'middle', marginRight: '10px' }} /> Jak se příště nenechat napálit?</h4>
            <ul className="edu-list">
              <li><strong>Zkontrolujte adresu (URL):</strong> Skutečné systémy mají jasnou a oficiální adresu. točníci často používají adresy s překlepy nebo navíc přidanými slovy, např. 
                  <code code>prihlaseni-ucet.com</code>, <code>bezpecna-platba.net</code> nebo 
                  <code>mojebanka-secure.cz</code>.  Vždy si pečlivě zkontrolujte doménu v adresním řádku.</li>
              <li><strong>Podezřelý odesílatel:</strong> Vždy si ověřte, z jaké e-mailové adresy vám přišla výzva k přihlášení.</li>
              <li><strong>Nátlak a urgentnost:</strong> Phishing často straší (např. "Váš účet bude zablokován"), aby vás přiměl jednat bez přemýšlení.</li>
              <li><strong>Podezřele výhodná nabídka:</strong> Nabídky typu <code>„Zboží zdarma“</code>, <code>„Oběd za 1 Kč“</code> nebo <code>„Exkluzivní sleva jen dnes“</code> mohou být návnadou 
                  vedoucí na podvodnou stránku.</li>
            </ul>
          </div>

        {/* --- KONTAKTY --- */}
        <div className="contact-section">
          <div className="contact-card">
            <h5>Autor výzkumu</h5>
            <div className="contact-item">
              <Mail size={16} color="#34d399" />
              <a href="mailto:lukas.spanik@unob.cz">lukas.spanik@unob.cz</a>
            </div>
            <div className="contact-item">
              <GraduationCap size={16} color="#34d399" />
              <span>rtm. Lukáš Špánik</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiplomkaModal;