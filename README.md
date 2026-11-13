# 🐿️ CryptoSquirrel — Cryptocurrency Price Tracker

A responsive cryptocurrency price tracker built with **Vue 3, Vite, CoinGecko API, and Netlify Functions**.

CryptoSquirrel provides real-time-requested cryptocurrency quotations in multiple fiat currencies, along with essential market indicators. This project was inspired by the *Código con Juan* Vue.js course and expanded with modern API integration, serverless functions, and improved user experience.

## 🌐 Live Demo

[View CryptoSquirrel on Netlify](https://cryptosquirrel-vue.netlify.app/)

## ✨ Features

- **12 cryptocurrencies:** BTC, ETH, SOL, XRP, ADA, DOGE, USDC, USDT, EURC, AAVE, UNI, and LINK.
- **5 fiat currencies:** USD, EUR, GBP, MXN, and PEN.
- Current prices, 24-hour percentage change, trading volume, market capitalization, and last update.
- Cryptocurrency logos stored locally in WebP format.
- Financial formatting with compact notation (K, M, B, T).
- Responsive design with dynamic colors for price changes.
- Form validation, error handling, and conditional rendering.
- Loading spinner and disabled button during API requests.
- API key protection through Netlify Functions.
- Server-side validation of permitted currencies and cryptoassets.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Vue 3 | Reactive frontend |
| Vite | Development and build tool |
| JavaScript | Application logic and API requests |
| HTML5 / CSS3 | Interface and responsive styling |
| CoinGecko Demo API | Cryptocurrency market data |
| Netlify Functions | Secure serverless API proxy |
| Netlify CLI | Local development |
| Git / GitHub | Version control |

## 🧩 Vue Concepts Implemented

- **Composition API & `<script setup>`:** Modern Vue component architecture.
- **`ref()` and `reactive()`:** Reactive state management.
- **`computed()`:** Derived values and conditional quotation display.
- **`v-model`:** Two-way form binding.
- **`v-for` and `:key`:** Dynamic dropdown options.
- **`v-if`:** Conditional rendering of alerts, loading states, and results.
- **`@submit.prevent`:** Form handling without page reloads.
- **Dynamic bindings:** `:src`, `:class`, and `:disabled`.
- **Slots:** Reusable alert component.
- **Composables:** Extracted API logic into `useCrypto.js`.
- **Async/await and try/catch/finally:** Asynchronous requests and error handling.

## 📁 Project Structure

```text
cripto-vue/
├── netlify/
│   └── functions/
│       └── crypto.mjs        # Secure API proxy
├── public/
│   └── img/                  # Cryptocurrency logos
├── src/
│   ├── assets/               # Background images
│   ├── components/
│   │   ├── Alerta.vue
│   │   └── LoadingIndicator.vue
│   ├── composables/
│   │   └── useCrypto.js
│   ├── utilities/
│   │   └── formatter.js
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── .env.local                # Private API configuration
├── index.html
├── package.json
└── README.md
```

## 🚀 Getting Started

**1. Clone the repository and install dependencies:**

```bash
git clone https://github.com/YOUR_USERNAME/cripto-vue.git
cd cripto-vue
npm install
```

**2. Create `.env.local` in the project root:**

```env
COINGECKO_API_URL=https://api.coingecko.com/api/v3
COINGECKO_API_KEY=your_demo_api_key
```

Never commit your API key to GitHub.

**3. Start the application:**

```bash
npx netlify dev
```

Open `http://localhost:8888` (or the address displayed in your terminal).

**4. Production build:**

```bash
npm run build
```

## 🔒 API Integration

The application uses CoinGecko's `/simple/price` endpoint through a Netlify serverless function.

**Request flow:**

`Vue → useCrypto.js → Netlify Function → CoinGecko API → Vue`

The serverless function protects the API key, validates supported assets, and returns market data to the frontend.

Multiple market indicators are retrieved through a single API request.

## ⚠️ Limitations

- CoinGecko Demo API request limits apply.
- Prices are requested on demand rather than streamed continuously.
- Only predefined cryptocurrencies and fiat currencies are supported.
- Some market indicators may be unavailable for certain assets.
- Historical charts and trading functionality are not included.

## 🔄 Improvements Over the Original Project

| Original Course | CryptoSquirrel |
|---|---|
| CryptoCompare API | CoinGecko Demo API |
| Direct API requests | Serverless Netlify proxy |
| Top-ranked cryptocurrencies | 12 selected cryptoassets |
| Basic price display | Five market indicators |
| API-hosted images | Local WebP logos |
| Logic mainly in App.vue | Reusable Vue composable |
| Basic formatting | Financial formatting utilities |
| Basic validation | Client/server validation and loading states |

## 📚 Learning Outcomes

This project strengthened my understanding of Vue 3 reactivity, computed properties, composables, reusable components, form validation, and asynchronous JavaScript.

I also gained practical experience with **API security, environment variables, serverless functions, JSON processing, browser debugging, and separation of frontend and backend responsibilities**.

## 🗺️ Future Improvements

- Server-side caching and request rate limiting.
- Historical cryptocurrency price charts.
- Additional market indicators and asset information.
- Improved accessibility and error feedback.
- Automated unit and integration tests.
- User preferences and additional language support.

## 🙏 Acknowledgements

Inspired by the cryptocurrency quotation project from **Código con Juan's Vue.js course**.

Additional tools and resources include Vue.js, CoinGecko API, Netlify, and ChatGPT for technical guidance and debugging support.

## 📄 License

Educational and portfolio project. No open-source license has been selected yet.

Third-party assets and services remain subject to their respective licenses and terms.

---

**CryptoSquirrel** — Built with Vue 3, CoinGecko API, and Netlify Functions.
