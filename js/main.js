function openModal(id) {
    document.getElementById('modal-' + id).classList.add('active');
}

function closeModal(id) {
    document.getElementById('modal-' + id).classList.remove('active');
}

window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

const currentPage = window.location.pathname.split('/').pop()
const navLinks = document.querySelectorAll('nav ul a');

navLinks.forEach(link => {
    const linkPage = link.getAttribute('href').split('/').pop();
    if (linkPage === currentPage) {
        link.classList.add('active');
    }
});