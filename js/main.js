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
        quote: `"Jaiden brought a rare combination of curiosity, precision, and initiative to our MVP build. His ability to take complex ideas and translate them into clear, actionable progress made a real difference in moving this work forward."`,
        author: "- Ashlee Cunningham - Founder, We Change Community Consulting"
    },
    // {
    //    quote: `"Sample quote."`,
    //     author: "- Sample Author"
    // },
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