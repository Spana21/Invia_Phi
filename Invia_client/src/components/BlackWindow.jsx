import React, { useState } from 'react';

// Tady si definujeme adresu Workeru (stejná jako v LoginScreen)
const WORKER_URL = "https://worker-invia.spaniklukas.workers.dev";

function DiplomkaModal({ isOpen, onClose }) {
  const [isAgreed, setIsAgreed] = useState(false);
  const [selectedAge, setSelectedAge] = useState('');

  if (!isOpen) return null;

  const ageGroups = [
    "Méně než 17", "18 - 24", "25 - 34", "35 - 44",
    "45 - 54", "55 - 64", "65 a více"
  ];

  const handleDownload = () => {
    // 1. Spustíme stažení souboru (simulace)
    const link = document.createElement('a');
    link.href = '/informovany_souhlas.pdf'; 
    link.download = 'Informovany_souhlas_ucastnika.pdf'; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 2. NOVÉ: Odešleme vybraný věk na server
    fetch(`${WORKER_URL}/wtf`, {
      method: 'POST', // Používáme POST pro odeslání dat
      keepalive: true,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ age: selectedAge }) // Pošleme vybraný věk
    })
    .then(res => console.log("Věk odeslán do statistiky"))
    .catch(err => console.error("Chyba při odesílání věku:", err));
    
    // 3. Zavřeme okno
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Toto je diplomová práce</h3>
        
        <p className="modal-text">
          Pro pokračování prosím vyplňte následující údaje a potvrďte souhlas.
        </p>

        {/* --- VÝBĚR VĚKU --- */}
        <div className="age-selection-section">
          <p className="section-title">Jaký je váš věk?</p>
          <select 
            className="modal-select"
            value={selectedAge}
            onChange={(e) => setSelectedAge(e.target.value)}
          >
            <option value="" disabled>Vyberte prosím věkovou skupinu...</option>
            {ageGroups.map((age) => (
              <option key={age} value={age} style={{color: 'black'}}>
                {age} let
              </option>
            ))}
          </select>
        </div>

        {/* --- SOUHLAS --- */}
        <div className="agreement-wrapper">
          <label className="checkbox-container">
            <input 
              type="checkbox" 
              checked={isAgreed}
              onChange={(e) => setIsAgreed(e.target.checked)}
            />
            Souhlasím
          </label>
        </div>

        {/* --- TLAČÍTKO --- */}
        <button 
          onClick={handleDownload} 
          className="close-btn"
          disabled={!isAgreed || !selectedAge} 
        >
          Stáhnout dokument
        </button>
      </div>
    </div>
  );
}

export default DiplomkaModal;