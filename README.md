# АИРВА България

Multi-page Vite сайт и продуктов каталог на АИРВА България — покривни климатици и вентилатори за кемпери и каравани (MaxxAir, Coleman-Mach, Aircommand).

## Технологии

- Vite 8
- HTML5
- CSS3, вграден в отделните страници
- Vanilla JavaScript
- Google Fonts — Manrope, Inter, IBM Plex Mono (зареждат се през <link> в head, без @import)
- EmailJS Browser SDK, опционално за контактната форма

Проектът остава без frontend framework. Vite осигурява development server, production build, asset hashing и автоматично публикуване в GitHub Pages.

## Изисквания

- Node.js 20.19+ или 22.12+
- npm 10+

## Стартиране локално

```bash
npm install
npm run dev
```

Vite ще покаже локалния адрес в терминала, обикновено `http://localhost:5173`.

## Команди

```bash
npm run dev          # development server с автоматично презареждане
npm run build        # production build в dist/
npm run preview      # локален преглед на production build-а
npm run check        # source links + build + dist links
```

## Multi-page структура

Всички `*.html` файлове в root директорията се откриват автоматично като отделни Vite entry points. Сегашните имена и URL адреси се запазват.

- `index.html` — начална страница
- `products.html` — продуктов каталог
- `product-detail.html` — продуктова страница MaxxFan Deluxe
- `mach8-plus.html` — продуктова страница Coleman-Mach 8 Plus
- `dealers.html` — дистрибутори
- `faq.html` — често задавани въпроси
- `contact.html` — контакти и форма за запитване
- `privacy.html` — политика за поверителност
- `terms.html` — общи условия
- `vite.config.js` — Vite MPA конфигурация
- `scripts/check-links.mjs` — проверка на source и production линковете

`base: './'` прави готовия сайт преносим между GitHub Project Pages и собствен домейн. Изображенията се обработват от Vite и се публикуват с уникални hashed имена в `dist/assets/`.

## Контактна форма

EmailJS е изключен по подразбиране. За реално изпращане заменете placeholder стойностите в `contact.html`:

- `EMAILJS_PUBLIC_KEY`
- `EMAILJS_SERVICE_ID`
- `EMAILJS_TEMPLATE_ID`

Не добавяйте private keys, пароли или други secrets в клиентския код. Преди production настройте ограниченията за разрешените домейни и rate limiting в EmailJS.

## Публикуване с GitHub Pages

Workflow-ът `.github/workflows/pages.yml` изпълнява `npm ci`, проверява source линковете, build-ва всичките страници, проверява `dist` и публикува готовата директория при push към `main`.

В GitHub отворете **Settings → Pages** и под **Build and deployment → Source** изберете **GitHub Actions**.

## Преди production (чеклист)

Свършено при одита (18.07.2026): `robots.txt` + `sitemap.xml` (в `public/`, домейн `https://airva.bg` — коригирайте при друг домейн), canonical и Open Graph/Twitter тагове на всички страници, JSON-LD (LocalBusiness, Product, FAQPage, BreadcrumbList), favicon (`public/favicon.svg`), `og-image.jpg`, страници `privacy.html` и `terms.html` с GDPR отметка в контактната форма, Google Maps embed в contact.html, реални спецификации на Mach 8 Plus, width/height на изображенията, консолидирани z-index токени и px breakpoints.

Оставащо:
- **Телефон**: `+359 2 888 8888` / `tel:+35928888888` и вторичният `+359 888 123 456` са placeholder — заменете ги навсякъде с реалния номер (topbar, header, hero, footer, sticky bar в `src/js/site.js`, contact.html, privacy.html, terms.html, JSON-LD).
- **Домейн**: canonical, OG таговете, sitemap и JSON-LD ползват `https://airva.bg` — при друг домейн сменете навсякъде.
- **EmailJS**: конфигурирайте ключовете в `contact.html` — дотогава формата отваря имейл клиента на потребителя като fallback (mailto към info@airva.bg).
- **Юридически преглед**: `privacy.html` и `terms.html` са шаблони — добавете ЕИК/фирмени данни и ги прегледайте с юрист.
- **Дистрибутори**: регионалните карти сочат към централата (info@airva.bg) — попълнете реалните партньори при появата им.
- **Социални профили**: премахнати от topbar/footer заради липса на реални URL-и — върнете ги, когато има къде да сочат (вж. `enhanceSocialIcons` в `src/js/site.js`).
- **Mach 8 Plus**: добавете реална продуктова снимка вместо рендера `prod-mach8.jpg`; 230V EU версията може да се различава от US спецификациите.
- **Продуктови снимки**: заменете рендерите с реални изображения от dealer asset пакетите на MaxxAir/Coleman-Mach/Aircommand; добавете снимки от реални монтажи върху кемпери.
- **Нови продуктови страници**: добавете Aircommand Sparrow, MaxxFan Plus/Dome и др. по шаблона на `product-detail.html` и ги вържете от каталога.
- Добавете `CNAME` само ако ще използвате потвърден custom domain. При деплой във Vercel има готов `vercel.json` (cleanUrls + immutable cache за `/assets`).

## Лиценз

© 2026 АИРВА България. Всички права запазени. Не е предоставен open-source лиценз.
