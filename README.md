# ✈️ Simulace Phishingu (Invia)
### 🎓 Diplomová práce: Úspěšnost kybernetických útoků na různé věkové skupiny   

![React](https://img.shields.io/badge/Webová_aplikace-React-blue?style=for-the-badge&logo=react)
![Security](https://img.shields.io/badge/Zaměření-Bezpečnost-green?style=for-the-badge)
![Research](https://img.shields.io/badge/Účel-Výzkum-orange?style=for-the-badge)

Tento projekt vznikl jako součást diplomové práce a slouží k názorné ukázce toho, jak fungují tzv. **phishingové útoky**. Cílem aplikace je simulovat reálný phishingový útok v kontrolovaném prostředí a sbírat anonymní statistická data o chování uživatelů pro výzkumné účely.

---

## 📌 O co v projektu jde?
Aplikace simuluje stránku, která vypadá téměř identicky jako rezervační proces na portálu Invia. V rámci vědeckého výzkumu sledujeme, jak lidé s takovou stránkou pracují a zda dokáží rozpoznat, že se nejedná o originál.

### 🛡️ Je to bezpečné? (Ochrana soukromí)
*   Aplikace **neukládá** žádná hesla, čísla platebních karet ani jiné citlivé údaje. 
*   Veškerý sběr dat je **anonymní**.
*   Po pokusu o dokončení rezervace je uživateli zobrazeno edukační okno vysvětlující, že se jedná o test, spolu s informovaným souhlasem.

---

## 🏗️ Struktura projektu

Projekt je rozdělen do dvou hlavních částí:

### 💻 1. Webová stránka (`Invia_client/`)
Uživatelské rozhraní vytvořené v prostředí **React + Vite**. 
- Navrženo tak, aby věrně kopírovalo vzhled a proces rezervace zájezdu.
- Po kliknutí na tlačítko pro pokračování/dokončení zobrazuje edukační modální okno.

### ⚙️ 2. Backend / Worker 
Serverová část běžící na technologii **Cloudflare Workers**.
- Zajišťuje bezpečné a anonymní započítávání návštěv a interakcí.
- Spravuje statistiky (počet zobrazení, kliknutí na tlačítka, věkové skupiny).
- Obsahuje chráněnou administrátorskou zónu pro export nasbíraných dat.


## ⚙️ Jak to funguje (z pohledu uživatele)

1.  **Vstup:** Uživatel navštíví stránku, která vypadá jako běžný rezervační formulář zájezdu.
2.  **Akce:** Vyplní údaje a klikne na "Pokračovat".
3.  **Odhalení a Edukace:** Místo odeslání rezervace se objeví okno s informací, že jde o výzkumný projekt a jak phishing rozpoznat.
4.  **Stažení informovaného souhlasu::** Uživatel si může stáhnout informovaný souhlas.
5.  **Anonymní statistika:** Systém si zaznamená pouze fakt, že k akci došlo, a (pokud jej uživatel vyplní) věkovou skupinu.

---

## 🛠️ Použité technologie

- **Frontend:** React, Lucide React (ikony), Vanilla CSS.
- **Backend:** Cloudflare Workers (JavaScript).
- **Databáze:** Cloudflare KV (Key-Value storage) pro ukládání statistik.

---

## 📧 Kontakt

Pokud máte k projektu dotazy nebo se zajímáte o výsledky výzkumu, neváhejte mě kontaktovat:

- **Autor:** Lukáš Špánik
- **Instituce:** Univerzita Obrany
- **Email:** lukas.spanik@unob.cz

---
*Tento projekt slouží výhradně pro akademické účely a byl schválen etickou komisí Univerzity obrany.*
