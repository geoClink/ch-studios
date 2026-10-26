// Embed view tab switcher
function switchEmbedView(btn, view) {
    const frame = btn.closest('.browser-frame');
    frame.querySelectorAll('.embed-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    const desktop = frame.querySelector('.embed-view-desktop');
    const mobile = frame.querySelector('.embed-view-mobile');
    if (desktop) desktop.style.display = view === 'desktop' ? 'block' : 'none';
    if (mobile) mobile.style.display = view === 'mobile' ? 'flex' : 'none';
}

// Mobile nav hamburger
const nav = document.querySelector('nav');
const navUl = document.querySelector('nav ul');
if (nav && navUl) {
    const toggle = document.createElement('button');
    toggle.className = 'nav-toggle';
    toggle.setAttribute('aria-label', 'Toggle navigation');
    toggle.textContent = '☰';
    nav.appendChild(toggle);

    const backdrop = document.createElement('div');
    backdrop.className = 'nav-backdrop';
    document.body.appendChild(backdrop);

    function openNav() {
        nav.classList.add('open');
        backdrop.classList.add('active');
        toggle.textContent = '✕';
    }

    function closeNav() {
        nav.classList.remove('open');
        backdrop.classList.remove('active');
        toggle.textContent = '☰';
    }

    toggle.addEventListener('click', () => {
        nav.classList.contains('open') ? closeNav() : openNav();
    });

    backdrop.addEventListener('click', closeNav);

    navUl.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeNav);
    });
}

// Modal functions
function openModal(id) {
    document.getElementById('modal-' + id).classList.add('active');
}

function closeModal(id) {
    document.getElementById('modal-' + id).classList.remove('active');
}

// Close modal on background click
window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

// Active nav link
const currentPage = window.location.pathname.split('/').pop();
const navLinks = document.querySelectorAll('nav ul a');
navLinks.forEach(link => {
    const linkPage = link.getAttribute('href').split('/').pop();
    if (linkPage === currentPage) {
        link.classList.add('active');
    }
});

// Scroll fade-in
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.project, .service, .member, .case-block, #testimonial').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

function switchEmbedView(tabElement, viewType) {
    // 1. Update Tab Styles
    document.querySelectorAll('.embed-tab').forEach(tab => tab.classList.remove('active'));
    tabElement.classList.add('active');

    // 2. Toggle Iframe Visibility
    if (viewType === 'mobile') {
        document.querySelector('.embed-view-desktop').style.display = 'none';
        document.querySelector('.embed-view-mobile').style.display = 'flex';
    } else {
        document.querySelector('.embed-view-desktop').style.display = 'block';
        document.querySelector('.embed-view-mobile').style.display = 'none';
    }
}

// Phone status bar clock
(function () {
    const el = document.getElementById('phone-time');
    if (!el) return;
    function tick() {
        const now = new Date();
        const h = now.getHours() % 12 || 12;
        const m = String(now.getMinutes()).padStart(2, '0');
        el.textContent = `${h}:${m}`;
    }
    tick();
    setInterval(tick, 10000);
})();

// Typing animation
const heroText = "A Detroit-based software studio crafting mobile apps and full stack products.";
const heroH1 = document.querySelector('#hero h1');

if (heroH1) {
    if (!sessionStorage.getItem('typed')) {
        heroH1.textContent = '';
        let i = 0;
        const type = () => {
            if (i < heroText.length) {
                heroH1.textContent += heroText[i];
                i++;
                setTimeout(type,30);
            } else {
                sessionStorage.setItem('typed', 'true');
            }
        };
        type()
    }
}

const testimonials = [
    {
        quote: `"George walked into the Academy curious but reserved, quietly taking it all in. Since then, I’ve watched him come into his own letting that curiosity fuel real growth. Today, he’s not just a strong coder, he’s a go to resource for others. I’m proud of what he’s accomplished in seven months, and even more excited to see how far he’ll go."`,
        author: "- Ron Marshall - Marketing Mentor, Apple Developer Academy MSU"
    },
    {
        quote: `"As I further develop my discipline as a UI/UX designer, the shared vision between the developers and the designers is imperative to create an amazing final product. After working with George, I can testify that he understands the importance of proper communication, research, and hard work. He would easily take any feedback I gave him and either implement it or offer me a new perspective on it. Working with him was a smooth process and I would definitely work with him again."`,
        author: "- Tamia Brezzell - UI/UX Designer"
    },
    {
        quote: `"Having the CH Studios team behind Tripsetta has been an absolute lifesaver. George is fast, knowledgeable, proactive, and always willing to dig deeper than what's immediately in front of him. He consistently identifies opportunities for improvement, solves problems quickly, and helps keep our platform moving forward. This partnership has been invaluable to our growth, and I couldn't be more appreciative of the work they've done."`,
        author: "- LaShelle McClaster - Founder, Tripsetta"
    },
    {
        quote: `"Jaiden brought a rare combination of curiosity, precision, and initiative to our MVP build. His ability to take complex ideas and translate them into clear, actionable progress made a real difference in moving this work forward."`,
        author: "- Ashlee Cunningham - Founder, We Change Community Consulting"
    },
];

let currentIndex = 0;
const quoteElement = document.getElementById('quote-text');
const authorElement = document.getElementById('quote-author');

function updateQuote() {
    quoteElement.style.opacity = 0;
    authorElement.style.opacity = 0;

    setTimeout(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;

        quoteElement.textContent = testimonials[currentIndex].quote;
        authorElement.textContent = testimonials[currentIndex].author;

        quoteElement.style.opacity = 1;
        authorElement.style.opacity = 1;
    }, 500);
}

setInterval(updateQuote, 5000);