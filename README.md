# АИРВА България

Multi-page Vite сайт и продуктов каталог на АИРВА България за климатични и вентилационни решения за превозни средства, морски и индустриални приложения и дома.

## Технологии

- Vite 8
- HTML5
- CSS3, вграден в отделните страници
- Vanilla JavaScript
- Google Fonts — Inter
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
- `home-ac.html` — каталог за домашни климатици
- `home-ac-*.html` — продуктови страници за домашни климатици
- `product-detail.html` — продуктова детайлна страница
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

## Преди production

- Заменете placeholder социалните линкове с реалните профили.
- Потвърдете телефоните, имейлите, адреса и текста на „Общи условия“.
- Конфигурирайте EmailJS или свържете формата към избран backend.
- Добавете `CNAME` само ако ще използвате потвърден custom domain.

## Лиценз

© 2026 АИРВА България. Всички права запазени. Не е предоставен open-source лиценз.
