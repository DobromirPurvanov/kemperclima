const SVG_NS = 'http://www.w3.org/2000/svg';
const MOBILE_NAV_QUERY = '(max-width: 860px)';

const ICON_PATHS = {
    facebook: '<path fill="currentColor" stroke="none" d="M13.55 21v-8h2.75l.42-3.2h-3.17V7.75c0-.93.26-1.56 1.6-1.56h1.7V3.33A22.9 22.9 0 0 0 14.37 3c-2.47 0-4.17 1.51-4.17 4.29V9.8H7.4V13h2.8v8h3.35Z"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none"/>',
    linkedin: '<path fill="currentColor" stroke="none" d="M6.5 8.5h-3V21h3V8.5ZM5 3a1.75 1.75 0 1 0 0 3.5A1.75 1.75 0 0 0 5 3Zm5 5.5h2.88v1.7h.04c.4-.77 1.4-2.1 4.08-2.1 4.37 0 5.18 2.88 5.18 6.63V21h-3v-5.55c0-1.33-.03-3.03-1.85-3.03-1.85 0-2.13 1.44-2.13 2.93V21h-3V8.5Z"/>',
    star: '<polygon points="12 2 15.1 8.3 22 9.3 17 14.2 18.2 21 12 17.8 5.8 21 7 14.2 2 9.3 8.9 8.3 12 2"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V21h-4v-.08A1.7 1.7 0 0 0 9 19.37a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.63 15 1.7 1.7 0 0 0 3.08 14H3v-4h.08A1.7 1.7 0 0 0 4.63 9a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.63h.01A1.7 1.7 0 0 0 10 3.08V3h4v.08a1.7 1.7 0 0 0 1.03 1.55 1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.37 9v.01A1.7 1.7 0 0 0 20.92 10H21v4h-.08A1.7 1.7 0 0 0 19.4 15Z"/>',
    plane: '<path d="M17.8 19.2 16 11l3.5-3.5c1.5-1.5 2-3.5 1-4.5s-3-.5-4.5 1l-3.5 3.5-8.2-1.8L2 8l6.5 3.5-3 3L2 14l-1 1 4 3 3 4 1-1-.5-3.5 3-3L15 21l2.8-1.8Z"/>',
    check: '<polyline points="20 6 9 17 4 12"/>',
    home: '<path d="m3 11 9-8 9 8"/><path d="M5 10v11h14V10"/><path d="M9 21v-6h6v6"/>',
    building: '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2M10 21v-3h4v3"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    pin: '<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    tag: '<path d="M20.6 13.6 12 22l-10-10V2h10l8.6 8.6a2.1 2.1 0 0 1 0 3Z"/><circle cx="7" cy="7" r="1.5"/>'
};

const EMOJI_TO_ICON = new Map([
    ['★', 'star'],
    ['⭐', 'star'],
    ['⚙', 'settings'],
    ['⚙️', 'settings'],
    ['✈', 'plane'],
    ['✈️', 'plane'],
    ['✓', 'check'],
    ['✔', 'check'],
    ['🏠', 'home'],
    ['🏡', 'home'],
    ['🏢', 'building'],
    ['☎', 'phone'],
    ['☎️', 'phone'],
    ['📞', 'phone'],
    ['✉', 'mail'],
    ['✉️', 'mail'],
    ['📧', 'mail'],
    ['🌎', 'globe'],
    ['🌍', 'globe']
]);

function createIcon(name, size = '1em') {
    const markup = ICON_PATHS[name];
    if (!markup) return null;

    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    svg.classList.add('ui-icon', `ui-icon-${name}`);
    svg.style.display = 'block';
    svg.style.flex = '0 0 auto';
    svg.innerHTML = markup;

    return svg;
}

export function setupMobileMenu(root = document) {
    const menuToggle = root.querySelector('#menuToggle');
    const nav = root.querySelector('#nav');

    if (!menuToggle || !nav || menuToggle.dataset.siteMenuEnhanced === 'true') return;

    menuToggle.dataset.siteMenuEnhanced = 'true';
    menuToggle.type = 'button';
    nav.id ||= 'site-navigation';
    nav.setAttribute('aria-label', nav.getAttribute('aria-label') || 'Основна навигация');
    menuToggle.setAttribute('aria-controls', nav.id);

    const mobileQuery = typeof window.matchMedia === 'function'
        ? window.matchMedia(MOBILE_NAV_QUERY)
        : { matches: false };

    let bodyOverflowBeforeLock = '';
    let bodyIsLocked = false;

    const lockBody = () => {
        if (bodyIsLocked) return;
        bodyOverflowBeforeLock = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        bodyIsLocked = true;
    };

    const unlockBody = () => {
        if (!bodyIsLocked) return;
        document.body.style.overflow = bodyOverflowBeforeLock;
        bodyIsLocked = false;
    };

    const setNavUnavailable = (unavailable) => {
        nav.inert = unavailable;
        nav.toggleAttribute('inert', unavailable);
        if (unavailable) nav.setAttribute('aria-hidden', 'true');
        else nav.removeAttribute('aria-hidden');
    };

    const syncMenuState = ({ focusFirstLink = false } = {}) => {
        const isMobile = mobileQuery.matches;
        const isOpen = isMobile && nav.classList.contains('open');

        menuToggle.classList.toggle('open', isOpen);
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.setAttribute('aria-label', isOpen ? 'Затвори менюто' : 'Отвори менюто');

        if (isMobile) {
            setNavUnavailable(!isOpen);
            if (isOpen) lockBody();
            else unlockBody();
        } else {
            setNavUnavailable(false);
            unlockBody();
        }

        if (isOpen && focusFirstLink) {
            window.requestAnimationFrame(() => nav.querySelector('a[href]')?.focus());
        }

        return isOpen;
    };

    const closeMenu = ({ returnFocus = false } = {}) => {
        const wasOpen = mobileQuery.matches && nav.classList.contains('open');
        nav.classList.remove('open');
        menuToggle.classList.remove('open');
        syncMenuState();

        if (wasOpen && returnFocus) menuToggle.focus();
    };

    // The legacy inline handler owns the open/close class toggle. This listener
    // runs after that click has completed and only synchronizes accessible state.
    menuToggle.addEventListener('click', (event) => {
        const openedWithKeyboard = event.detail === 0;
        queueMicrotask(() => {
            syncMenuState({ focusFirstLink: openedWithKeyboard });
        });
    });

    nav.addEventListener('click', (event) => {
        if (event.target.closest('a[href]')) closeMenu();
    });

    document.addEventListener('pointerdown', (event) => {
        if (!mobileQuery.matches || !nav.classList.contains('open')) return;
        if (nav.contains(event.target) || menuToggle.contains(event.target)) return;
        closeMenu();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape' || !mobileQuery.matches || !nav.classList.contains('open')) return;
        event.preventDefault();
        closeMenu({ returnFocus: true });
    });

    const handleViewportChange = () => {
        if (!mobileQuery.matches) {
            nav.classList.remove('open');
            menuToggle.classList.remove('open');
        }
        syncMenuState();
    };

    if (typeof mobileQuery.addEventListener === 'function') {
        mobileQuery.addEventListener('change', handleViewportChange);
    } else if (typeof mobileQuery.addListener === 'function') {
        mobileQuery.addListener(handleViewportChange);
    }

    syncMenuState();
}

export function setCurrentNavigationItem(root = document) {
    const links = [...root.querySelectorAll('.nav-list a[href]')];
    if (!links.length) return;

    links.forEach((link) => link.removeAttribute('aria-current'));

    let currentLink = links.find((link) => link.classList.contains('active'));

    if (!currentLink && typeof window !== 'undefined') {
        const currentUrl = new URL(window.location.href);
        const normalizePath = (pathname) => pathname.replace(/\/index\.html$/, '/').replace(/\/{2,}/g, '/');

        currentLink = links.find((link) => {
            if (!link.getAttribute('href') || link.getAttribute('href') === '#') return false;
            const linkUrl = new URL(link.getAttribute('href'), currentUrl);
            return linkUrl.origin === currentUrl.origin
                && normalizePath(linkUrl.pathname) === normalizePath(currentUrl.pathname);
        });
    }

    currentLink?.setAttribute('aria-current', 'page');
}

export function enhanceSocialIcons(root = document) {
    root.querySelectorAll('.topbar-social, .footer-social').forEach((group) => {
        [...group.querySelectorAll('a')].forEach((link, index) => {
            if (link.dataset.iconEnhanced === 'true') return;

            const accessibleName = (link.getAttribute('aria-label') || link.textContent || '').trim().toLowerCase();
            const fallback = ['facebook', 'instagram', 'linkedin'][index];
            const platform = accessibleName.includes('facebook') || accessibleName === 'f'
                ? 'facebook'
                : accessibleName.includes('instagram') || accessibleName === 'i'
                    ? 'instagram'
                    : accessibleName.includes('linkedin') || accessibleName === 'in'
                        ? 'linkedin'
                        : fallback;

            if (!platform) return;

            const label = platform === 'facebook' ? 'Facebook' : platform === 'instagram' ? 'Instagram' : 'LinkedIn';
            const icon = createIcon(platform, '18');
            if (!icon) return;

            link.replaceChildren(icon);
            link.setAttribute('aria-label', label);
            link.setAttribute('title', link.getAttribute('title') || label);
            link.dataset.iconEnhanced = 'true';
        });
    });
}

export function enhanceUiIcons(root = document) {
    const iconContainers = root.querySelectorAll([
        '.feature-icon',
        '.stat-icon',
        '.footer-contact-icon',
        '.contact-item-icon',
        '.map-placeholder-icon',
        '.dealer-icon',
        '.dealer-benefit-check',
        '.about-check',
        '.feature-check',
        '.header-phone-icon'
    ].join(','));

    iconContainers.forEach((container) => {
        if (container.dataset.iconEnhanced === 'true' || container.querySelector('svg')) return;

        const symbol = container.textContent.trim();
        let iconName = EMOJI_TO_ICON.get(symbol);

        if (iconName === 'home' && container.matches('.footer-contact-icon, .contact-item-icon')) {
            iconName = 'pin';
        }

        const icon = createIcon(iconName);
        if (!icon) return;

        container.replaceChildren(icon);
        container.setAttribute('aria-hidden', 'true');
        container.dataset.iconEnhanced = 'true';
    });
}

export function enhanceImages(root = document) {
    root.querySelectorAll('img').forEach((image) => {
        const isCritical = Boolean(image.closest('.header, .hero, .page-hero, .logo'));
        const isHeroImage = Boolean(image.closest('.hero, .page-hero'));

        if (!image.hasAttribute('loading')) image.loading = isCritical ? 'eager' : 'lazy';
        if (!image.hasAttribute('decoding')) image.decoding = 'async';

        if (!image.hasAttribute('fetchpriority')) {
            image.setAttribute('fetchpriority', isHeroImage ? 'high' : isCritical ? 'auto' : 'low');
        }
    });
}

export function addQueryContextChip(root = document) {
    if (typeof window === 'undefined' || root.querySelector('#query-context-chip')) return;

    const formContainer = root.querySelector('.contact-form');
    const formTitle = formContainer?.querySelector('.form-title');
    if (!formContainer || !formTitle) return;

    const params = new URLSearchParams(window.location.search);
    const product = params.get('product')?.trim();
    const subject = params.get('subject')?.trim();
    const vehicle = params.get('vehicle')?.trim();
    const need = params.get('need')?.trim();
    const power = params.get('power')?.trim();
    const subjectLabels = {
        offer: 'Оферта',
        product: 'Въпрос за продукт',
        service: 'Сервизно обслужване',
        installation: 'Монтаж',
        dealer: 'Дистрибуторство',
        other: 'Друго'
    };
    const vehicleLabels = {
        van: 'кемпер ван',
        motorhome: 'моторен кемпер',
        caravan: 'каравана'
    };
    const needLabels = {
        ventilation: 'свеж въздух',
        cooling: 'охлаждане',
        unsure: 'експертен съвет'
    };
    const powerLabels = {
        '12v': '12V',
        '230v': '230V',
        unsure: 'захранването ще се уточни'
    };

    let contextText = '';
    if (product) {
        const shortProduct = product.length > 80 ? `${product.slice(0, 77)}…` : product;
        contextText = `Запитване за: ${shortProduct}`;
    } else if (vehicleLabels[vehicle] || needLabels[need] || powerLabels[power]) {
        const selection = [vehicleLabels[vehicle], needLabels[need], powerLabels[power]].filter(Boolean);
        contextText = `Вашият избор: ${selection.join(' · ')}`;
    } else if (subject && subjectLabels[subject]) {
        contextText = `Тема: ${subjectLabels[subject]}`;
    }

    if (!contextText) return;

    const chip = document.createElement('div');
    const icon = createIcon('tag', '16');
    const text = document.createElement('span');

    chip.id = 'query-context-chip';
    chip.className = 'form-context-chip';
    chip.setAttribute('role', 'note');
    chip.setAttribute('aria-label', 'Контекст на запитването');
    chip.style.cssText = [
        'display:inline-flex',
        'align-items:center',
        'gap:8px',
        'max-width:100%',
        'margin:0 0 20px',
        'padding:8px 12px',
        'border:1px solid var(--gray-light,#e2e8f0)',
        'border-radius:999px',
        'background:var(--gray,#f4f7fc)',
        'color:var(--primary,#0d2b4e)',
        'font-size:14px',
        'font-weight:600',
        'line-height:1.4'
    ].join(';');

    text.textContent = contextText;
    if (icon) chip.append(icon);
    chip.append(text);
    formTitle.insertAdjacentElement('afterend', chip);
}

export function buildSolutionFinderUrl(selection = {}) {
    const params = new URLSearchParams({
        subject: 'offer',
        source: 'home-finder',
        vehicle: String(selection.vehicle || ''),
        need: String(selection.need || ''),
        power: String(selection.power || '')
    });

    return `contact.html?${params.toString()}#quote-form`;
}

export function setupSolutionFinder(root = document) {
    const finder = root.querySelector('#solutionFinder');
    if (!finder || finder.dataset.finderEnhanced === 'true') return;

    finder.dataset.finderEnhanced = 'true';
    finder.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!finder.reportValidity()) return;

        const data = new FormData(finder);
        window.location.href = buildSolutionFinderUrl({
            vehicle: data.get('vehicle'),
            need: data.get('need'),
            power: data.get('power')
        });
    });
}

export function addStickyCallBar(root = document) {
    if (!root.body || root.querySelector('.sticky-call')) return;

    const bar = document.createElement('div');
    bar.className = 'sticky-call';

    const phoneLink = document.createElement('a');
    phoneLink.className = 'sticky-call-phone';
    phoneLink.href = 'tel:+35928888888';
    const phoneIcon = createIcon('phone', '18');
    if (phoneIcon) phoneLink.append(phoneIcon);
    phoneLink.append('Обади се');

    const ctaLink = document.createElement('a');
    ctaLink.className = 'sticky-call-cta';
    ctaLink.href = 'contact.html?subject=offer&source=sticky#quote-form';
    const ctaIcon = createIcon('mail', '18');
    if (ctaIcon) ctaLink.append(ctaIcon);
    ctaLink.append('Получете оферта');

    bar.append(phoneLink, ctaLink);
    root.body.append(bar);
}

export function initSiteEnhancements(root = document) {
    setupMobileMenu(root);
    setCurrentNavigationItem(root);
    enhanceSocialIcons(root);
    enhanceUiIcons(root);
    enhanceImages(root);
    setupSolutionFinder(root);
    addQueryContextChip(root);
    addStickyCallBar(root);
}

if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => initSiteEnhancements(), { once: true });
    } else {
        initSiteEnhancements();
    }
}
