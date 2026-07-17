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

- **Телефон**: `+359 2 888 8888` / `tel:+35928888888` е placeholder — заменете го навсякъде с реалния номер (header, topbar, hero, footer, sticky bar в `src/js/site.js`, контактната форма).
- **EmailJS**: конфигурирайте ключовете в `contact.html` — дотогава формата отваря имейл клиента на потребителя като fallback (mailto към info@airva.bg).
- **Mach 8 Plus**: спецификациите в `mach8-plus.html` са минимални/ориентировъчни — попълнете точните стойности (BTU, тегло, консумация, височина) от каталога на Coleman-Mach и добавете реална продуктова снимка вместо рендера `prod-mach8.jpg`.
- **Продуктови снимки**: заменете рендерите с реални изображения от dealer asset пакетите на MaxxAir/Coleman-Mach/Aircommand; добавете снимки от реални монтажи.
- **Дистрибутори**: данните в `dealers.html` са placeholder (имейли на собствения домейн, фиктивни телефони) — попълнете реалните партньори или преработете страницата.
- **Социални профили**: линковете в topbar/footer са `#` — сложете реалните или ги махнете.
- **Общи условия**: линкът във footer е празен (`#`).
- **Google Maps**: на contact.html има placeholder вместо карта.
- **Нови продуктови страници**: добавете Aircommand Sparrow, MaxxFan Plus/Dome и др. по шаблона на `product-detail.html` и ги вържете от каталога.
- Добавете `CNAME` само ако ще използвате потвърден custom domain. При деплой във Vercel има готов `vercel.json` (cleanUrls + immutable cache за `/assets`).

## Лиценз

© 2026 АИРВА България. Всички права запазени. Не е предоставен open-source лиценз.
