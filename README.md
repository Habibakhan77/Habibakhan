# Ajwa Mobile & Accessories — 1:1 Pixel-Perfect Replica

A faithful 1:1 recreation of [Ajwa Mobile & Accessories](https://www.ajwagadgets.com/), the premier mobile shop in Awami Market, Karkhano Market, Jamrud Road, Peshawar.

---

## 📸 Visual Fidelity & Screenshot Comparison

Every element has been inspected, recreated, and verified against the live reference site:
- **Exact typography**: Google Fonts (`Manrope`, `Sora`, `Noto Naskh Arabic`, `Noto Nastaliq Urdu`).
- **Original Assets**: All 97 original images, brand marks, product renders, shopfront photos, and supplier logos.
- **Color Palette & Styling**: Identical dark theme with `--ink: #151817`, brand yellow (`#FFD600`), and emerald WhatsApp accents (`#22C55E`).
- **Full Viewport Testing**: Automated Puppeteer & Chrome tests verify pixel-perfect parity across Desktop (1280x900) and Mobile (390x844).

---

## 🚀 Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | **Home** | Hero section, Authorized Supplier Brands marquee, Shop by Category, Popular Products grid, Shop by Brand, Physical Store feature, Reviews, Location & Map, and Full Footer. |
| `/products` | **Product Catalogue** | Complete catalogue of 75 products with live search, category pills, brand & availability filters, and sorting. |
| `/products/:slug` | **Product Detail** | High-res product gallery, tags, specs table, device compatibility note, warranty terms, and WhatsApp/Phone CTAs. |
| `/brands/:slug` | **Brand Showcase** | Brand spotlight pages for Interlink, Ronin, Plokama, and Bluk's with brand-specific product grids. |
| `/contact` | **Contact & Visit** | Muhammad Khan and Hamad direct contact cards, store hours, Google Maps directions, and interactive copy-address action. |
| `/about` | **About Us** | Shop story, real photos of the Awami Market counter & shopfront, and team contact options. |
| `/privacy` | **Privacy Policy** | Store privacy terms. |
| `/terms` | **Terms & Conditions** | Terms of service and pricing notice. |
| `*` | **404 Not Found** | Custom dark-themed 404 page matching the original design. |

---

## 🌐 Features & Interactivity

1. **Bilingual Support (English & Urdu)**:
   - Full toggle between English (`LTR`) and Urdu (`RTL`) with custom `Noto Nastaliq Urdu` typography.
2. **Instant Search & Filters**:
   - Client-side search across all 75 items by name, model, type, or specs.
   - Dynamic category pills with live product counts.
3. **Mobile-First Responsiveness**:
   - Sticky bottom bar on mobile with one-tap "Call Now", "WhatsApp", and "Get Directions".
   - Collapsible mobile navigation menu.
4. **Zero-Dependency Production Server**:
   - High-performance Node.js static server with SPA fallback routing.

---

## 🛠️ How to Run

### 1. Start the Local Server
```bash
npm start
# or
node server.js
```
Open [http://127.0.0.1:5173](http://127.0.0.1:5173) in your browser.

### 2. Run Automated Screenshot Audits
```bash
npm run capture
```
Screenshots are saved under the `screenshots/` directory.

### 3. Test Interactive Features
```bash
npm run test:interactions
```

---

## 📁 Project Structure

```
├── public/
│   ├── assets/             # Bundled CSS, JS, and store photography
│   ├── brand/              # Ajwa Mobile logos and brand marks
│   ├── products/           # 75 high-res product images organized by brand & category
│   │   ├── bluks/
│   │   ├── brands/
│   │   ├── general/
│   │   ├── interlink/
│   │   ├── plokama/
│   │   └── ronin/
│   └── favicon.ico
├── screenshots/            # Verification screenshots comparing original vs replica
├── index.html              # Entry HTML with meta tags, SEO, and fonts
├── server.js               # Lightweight SPA web server
├── package.json
└── vercel.json             # Vercel deployment configuration
```
