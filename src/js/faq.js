function ensureId(element, prefix, index) {
    if (element.id) return element.id;

    const ownerDocument = element.ownerDocument;
    let candidate = `${prefix}-${index + 1}`;
    let suffix = 1;

    while (ownerDocument.getElementById(candidate)) {
        suffix += 1;
        candidate = `${prefix}-${index + 1}-${suffix}`;
    }

    element.id = candidate;
    return candidate;
}

export function setupFaqAccordion(root = document) {
    const items = [...root.querySelectorAll('.faq-item')]
        .map((item) => ({
            item,
            question: item.querySelector('.faq-question'),
            answer: item.querySelector('.faq-answer')
        }))
        .filter(({ question, answer }) => question && answer);

    if (!items.length) return;

    const setExpanded = ({ item, question, answer }, expanded) => {
        item.classList.toggle('active', expanded);
        question.setAttribute('aria-expanded', String(expanded));
        answer.hidden = !expanded;
        answer.setAttribute('aria-hidden', String(!expanded));
    };

    const toggleItem = (current) => {
        const shouldExpand = current.question.getAttribute('aria-expanded') !== 'true';

        items.forEach((entry) => {
            setExpanded(entry, entry === current ? shouldExpand : false);
        });
    };

    const initiallyExpanded = items.find(({ item }) => item.classList.contains('active'));

    items.forEach((entry, index) => {
        const { question, answer } = entry;

        if (question.dataset.faqEnhanced === 'true') return;
        question.dataset.faqEnhanced = 'true';

        // Remove the legacy inline dependency before registering the accessible
        // handler, so one click can never toggle the item twice.
        question.removeAttribute('onclick');
        question.onclick = null;

        const questionId = ensureId(question, 'faq-question', index);
        const answerId = ensureId(answer, 'faq-answer', index);
        const isNativeButton = question.matches('button, summary');

        if (!isNativeButton) {
            question.setAttribute('role', 'button');
            question.tabIndex = 0;
        } else if (question.matches('button') && !question.hasAttribute('type')) {
            question.type = 'button';
        }

        question.setAttribute('aria-controls', answerId);
        answer.setAttribute('role', 'region');
        answer.setAttribute('aria-labelledby', questionId);
        question.querySelector('.faq-question-icon')?.setAttribute('aria-hidden', 'true');

        setExpanded(entry, entry === initiallyExpanded);

        question.addEventListener('click', () => toggleItem(entry));
        if (!isNativeButton) {
            question.addEventListener('keydown', (event) => {
                if (event.repeat || (event.key !== 'Enter' && event.key !== ' ')) return;
                event.preventDefault();
                toggleItem(entry);
            });
        }
    });
}

if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => setupFaqAccordion(), { once: true });
    } else {
        setupFaqAccordion();
    }
}
