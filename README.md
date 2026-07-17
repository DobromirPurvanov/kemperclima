# АИРВА България

Статичен уебсайт и продуктов каталог на АИРВА България за климатични и вентилационни решения за превозни средства, морски и индустриални приложения и дома.

## Технологии

- HTML5
- CSS3, вграден в страниците
- Vanilla JavaScript
- Google Fonts — Inter
- EmailJS Browser SDK, опционално за контактната форма

Проектът няма framework, package manager, build стъпка или локални зависимости.

## Стартиране локално

От основната папка изпълнете:

```bash
python3 -m http.server 8000
```

След това отворете [http://localhost:8000](http://localhost:8000).

Проверка на вътрешните линкове:

```bash
node scripts/check-links.mjs
```

## Основни страници

- `index.html` — начална страница
- `products.html` — продуктов каталог
- `home-ac.html` — каталог за домашни климатици
- `home-ac-*.html` — продуктови страници за домашни климатици
- `product-detail.html` — продуктова детайлна страница
- `dealers.html` — дистрибутори
- `faq.html` — често задавани въпроси
- `contact.html` — контакти и форма за запитване

## Контактна форма

EmailJS е изключен по подразбиране. За реално изпращане заменете placeholder стойностите в `contact.html`:

- `EMAILJS_PUBLIC_KEY`
- `EMAILJS_SERVICE_ID`
- `EMAILJS_TEMPLATE_ID`

Не добавяйте private keys, пароли или други secrets в клиентския код. Преди production настройте ограниченията за разрешените домейни и rate limiting в EmailJS.

## Публикуване с GitHub Pages

Включеният workflow `.github/workflows/pages.yml` проверява вътрешните линкове и публикува сайта при push към `main`.

След създаването на GitHub repository:

1. Push-нете branch `main`.
2. Отворете **Settings → Pages**.
3. Под **Build and deployment → Source** изберете **GitHub Actions**.

Не е необходим build процес. Всички пътища са относителни и работят и когато сайтът е публикуван като GitHub Project Page.

## Преди production

- Заменете placeholder социалните линкове с реалните профили.
- Потвърдете телефоните, имейлите, адреса и текста на „Общи условия“.
- Конфигурирайте EmailJS или свържете формата към избран backend.
- Добавете `CNAME` само ако ще използвате потвърден custom domain.

## Лиценз

© 2026 АИРВА България. Всички права запазени. Не е предоставен open-source лиценз.
