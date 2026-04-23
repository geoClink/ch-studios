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
    heroH1.textContent = '';
    let i = 0;
    const type = () => {
        if (i < heroText.length) {
            heroH1.textContent += heroText[i];
            i++;
            setTimeout(type, 30);
        }
    };
    type();
}