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