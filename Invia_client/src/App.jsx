import React, { useState, useEffect } from 'react';
import { 
  Phone, User, AlertCircle, Info, Calendar, Plane, 
  Users, Gift, Facebook, Youtube, Instagram, Mail 
} from 'lucide-react';
import DiplomkaModal from './components/BlackWindow'; 
import './App.css';

const WORKER_URL = "https://anton-databaze.spaniklukas.workers.dev";

function App() {
  const [timeLeft, setTimeLeft] = useState(29 * 60 + 26);
  const [showModal, setShowModal] = useState(false); 

  const [error, setError] = useState('');
  const currentPath = window.location.pathname.replace('/', '');
  const schoolId = currentPath !== '' ? currentPath : 'nezadano';

  useEffect(() => {
    if (WORKER_URL) {
      fetch(`${WORKER_URL}/visit?school=${schoolId}`)
        .then(res => console.log("Návštěva odeslána pro:", schoolId))
        .catch(err => console.error("Chyba při odesílání návštěvy:", err));
    }
  }, [schoolId]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    
    const timerId = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);
    
    return () => clearInterval(timerId);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return [h, m, s].map(v => v < 10 ? "0" + v : v).join(":");
  };

  const [formData, setFormData] = useState({
    jmeno: '', prijmeni: '', stat: 'Česká republika',
    pohlavi: '', denNarozeni: '', mesicNarozeni: '', rokNarozeni: '',
    email: '', telefon: '', 
    ulice: '', mesto: '', psc: '',
    obcanka: '', karta: ''
  });

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    

    setError(''); // Pro jistotu vymažeme jakoukoliv starou chybu
 
    fetch(`${WORKER_URL}/track-login-click?school=${schoolId}`).catch(console.error);
    fetch(`${WORKER_URL}/track-modal-view?school=${schoolId}`).catch(console.error);

    // TADY VYSKOČÍ TVOJE ČERNÉ OKNO
    setShowModal(true);
  };

  return (
    <div className="page-wrapper">
      
      <DiplomkaModal isOpen={showModal} onClose={() => setShowModal(false)} />

      <header className="main-header">
        <div className="header-container">
          <div className="logo"> <img src="/logo.svg" alt="Invia" className="header-logo-img" /></div>
          <div className="header-right">
            <div className="contact-info"><Phone size={16} /> Volejte 226 000 260</div>
            <div className="hours">Po-Pá 7:00-22:00; So-Ne 8:00-22:00</div>
            <div className="login-link"><User size={16} /> Přihlásit se</div>
          </div>
        </div>
      </header>

      <div className="progress-bar">
        <div className="step active"><span className="step-num">1.</span> Zákazník</div>
        <div className="step line"></div>
        <div className="step"><span className="step-num">2.</span> Cestující</div>
        <div className="step line"></div>
        <div className="step"><span className="step-num">3.</span> Doplňkové služby</div>
        <div className="step line"></div>
        <div className="step"><span className="step-num">4.</span> Dokončení rezervace</div>
      </div>

      <div className="timer-section">
        Čas na dokončení rezervace <strong className="ticking-timer">{formatTime(timeLeft)}</strong>
      </div>

      <main className="main-content">
        <div className="left-column">
          
          <div className="alert-box yellow">
            <AlertCircle size={20} color="#856404" />
            <p>Pospěšte si, tento hotel je velmi oblíbený a volné pokoje jsou brzy obsazené.</p>
          </div>

          <div className="alert-box blue">
            <Info size={24} color="#004b87" style={{flexShrink: 0}} />
            <div className="blue-text">
              <strong>Může být uplatněna věrnostní či seniorská sleva CK Blue Style</strong><br/>
              Věrnostní sleva od cestovní kanceláře Blue Style bývá zpravidla poskytnuta klientům, kteří již v minulosti s touto cestovní kanceláří vycestovali.
            </div>
          </div>

          <div className="alert-box green">
            <Gift size={24} color="#155724" style={{flexShrink: 0}} />
            <p><strong>Máme pro vás skvělou zprávu! Tento zájezd jste obdrželi jako dárek.</strong> Byla uplatněna 100% sleva. Vyplňte prosím pečlivě své údaje včetně čísla dokladu a platební karty pro nezbytné ověření totožnosti (z karty vám nebude nic účtováno, slouží pouze jako garance pro hotel).</p>
          </div>

          <div className="form-container">
            <div className="form-header"><User size={18} /> Objednavatel</div>
            
            <form onSubmit={handleSubmit} className="booking-form">
              
              <div className="form-row three-cols">
                <div className="input-group">
                  <label>Jméno <span className="req">*</span></label>
                  <input type="text" name="jmeno" placeholder="např. Jan" required onChange={handleChange} />
                </div>
                <div className="input-group">
                  <label>Příjmení <span className="req">*</span></label>
                  <input type="text" name="prijmeni" placeholder="např. Novák" required onChange={handleChange} />
                </div>
                <div className="input-group">
                  <label>Státní příslušnost <span className="req">*</span></label>
                  <select name="stat" onChange={handleChange} defaultValue="Česká republika">
                    <option value="Česká republika">🇨🇿 Česká republika</option>
                    <option value="Slovensko">🇸🇰 Slovensko</option>
                  </select>
                </div>
              </div>

               <div className="form-row two-cols-uneven">
                <div className="input-group">
                  <label>Pohlaví <span className="req">*</span></label>
                  <select name="pohlavi" required onChange={handleChange}>
                    <option value="">vyberte</option>
                    <option value="Muž">Muž</option>
                    <option value="Žena">Žena</option>
                  </select>
                </div>
                <div className="input-group date-group">
                  <label>Datum narození <span className="req">*</span></label>
                  <div className="date-inputs">
                    <select name="denNarozeni" required onChange={handleChange}>
                      <option value="">den</option>
                      {[...Array(31)].map((_, i) => <option key={i+1} value={i+1}>{i+1}</option>)}
                    </select>
                    <select name="mesicNarozeni" required onChange={handleChange}>
                      <option value="">měsíc</option>
                      <option value="1">Leden</option><option value="2">Únor</option><option value="3">Březen</option>
                      <option value="4">Duben</option><option value="5">Květen</option><option value="6">Červen</option>
                      <option value="7">Červenec</option><option value="8">Srpen</option><option value="9">Září</option>
                      <option value="10">Říjen</option><option value="11">Listopad</option><option value="12">Prosinec</option>
                    </select>
                    <select name="rokNarozeni" required onChange={handleChange}>
                      <option value="">rok</option>
                      {[...Array(80)].map((_, i) => <option key={2006-i} value={2006-i}>{2006-i}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label>E-mail <span className="req">*</span></label>
                  <input type="email" name="email" required onChange={handleChange} />
                </div>
                <div className="input-group">
                  <label>Mobilní telefon <span className="req">*</span></label>
                  <div className="phone-input">
                    <select className="phone-prefix"><option>🇨🇿 +420</option><option>🇸🇰 +421</option></select>
                    <input type="tel" name="telefon" required onChange={handleChange} />
                  </div>
                </div>
              </div>

              <div className="form-row three-cols-address">
                <div className="input-group address-street">
                  <label>Ulice a číslo popisné <span className="req">*</span></label>
                  <input type="text" name="ulice" required onChange={handleChange} />
                </div>
                <div className="input-group address-city">
                  <label>Město <span className="req">*</span></label>
                  <input type="text" name="mesto" required onChange={handleChange} />
                </div>
                <div className="input-group address-zip">
                  <label>PSČ <span className="req">*</span></label>
                  <input type="text" name="psc" required onChange={handleChange} />
                </div>
              </div>

              <div className="divider"></div>

              <div className="form-row highlight-row">
                <div className="input-group">
                  <label>Číslo občanského průkazu nebo pasu <span className="req">*</span></label>
                  <input type="text" name="obcanka" required minLength="6" onChange={handleChange} />
                </div>
              </div>

              <div className="form-row highlight-row">
                <div className="input-group">
                  <label>Číslo platební karty (pro ověření totožnosti) <span className="req">*</span></label>
                  <input 
                    type="text" 
                    name="karta" 
                    placeholder="0000 0000 0000 0000" 
                    required 
                    pattern="[0-9\s]{15,20}" 
                    title="Zadejte platné číslo karty (minimálně 16 číslic)"
                    onChange={handleChange} 
                  />
                </div>
              </div>

              <div className="privacy-notice">
                Vaše osobní údaje zpracováváme pro vyřízení vaší objednávky, pro zasílání našich nabídek a další účely. 
                Nabídky přizpůsobujeme podle vašich předchozích objednávek. Bližší informace najdete v sekci <a href="#">Ochrana soukromí</a>.
              </div>

              <div className="submit-section">
                <button type="submit" className="submit-btn">Pokračovat</button>
              </div>
            </form>
          </div>
        </div>

        {/* PRAVÝ SLOUPEC */}
        <div className="right-column">
          <div className="summary-box">
            <div className="summary-timer">
              <span>Čas na dokončení rezervace</span>
              <span className="time ticking-timer">{formatTime(timeLeft)}</span>
            </div>
            
            <img 
              src="hotel.jpg" 
              alt="Albatros Makadi Resort" 
              className="hotel-image"
            />
            
            <h2 className="hotel-title">Albatros Makadi Resort (ex Royal Pharaohs Makadi) ⭐⭐⭐⭐⭐</h2>
            <p className="hotel-location">Egypt - Hurghada</p>

            <div className="flight-details">
              <div className="detail-item"><Calendar size={16} /> so 8. 8. 2026 - pá 14. 8. 2026 (7 dní / 5 nocí)</div>
              <div className="detail-item"><span>🍽️</span> All inclusive</div>
              <div className="detail-item"><Plane size={16} /> Letecky (Brno ✈ Hurghada)</div>
              
              <div className="flight-schedule">
                <div className="flight-row"><span className="flight-airport">Brno (BRQ)</span><span className="flight-time">so 14. 3. 2026 <strong>00:05</strong></span></div>
                <div className="flight-row"><span className="flight-airport">Hurghada (HRG)</span><span className="flight-time">čt 19. 3. 2026 <strong>21:30</strong></span></div>
              </div>

              <div className="detail-item"><Users size={16} /> 2 dospělí</div>
              <div className="detail-item"><User size={16} /> Pokoj Deluxe Promo s výhledem na bazén</div>
            </div>

            <div className="price-section">
              <div className="price-row"><span>Cena zájezdu</span><span className="strike-through">35 980 Kč</span></div>
              <div className="price-row total"><span>Celková cena za skupinu</span><span className="free-price">0 Kč</span></div>
              <div className="free-badge">DÁREK ZDARMA</div>
            </div>
            
            <div className="payment-options">
              <p>Možnosti platby</p>
              <div className="pay-badges"><span>✅ Kartou online</span><span>✅ Apple/Google Pay</span></div>
            </div>
          </div>
        </div>
      </main>

      <footer className="main-footer">
        <div className="footer-content">
          <p className="footer-hours">Volejte Po-Pá 7:00-22:00; So-Ne 8:00-22:00</p>
          <div className="footer-phone">216 123 261</div>
          <p className="footer-copy">© 2000–2026. Invia.cz, a.s. - největší cestovní agentura v ČR.</p>
          <div className="social-icons">
            <div className="social-circle"><Facebook size={18} /></div><div className="social-circle"><Youtube size={18} /></div>
            <div className="social-circle"><Instagram size={18} /></div><div className="social-circle"><Mail size={18} /></div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;