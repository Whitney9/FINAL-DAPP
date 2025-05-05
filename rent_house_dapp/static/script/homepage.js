const trigger = document.getElementById('citySelector');
const menu    = document.getElementById('dropdownMenu');
trigger.addEventListener('click', () => {
    menu.classList.toggle('active');
});

document.querySelectorAll('.district-list li')
.forEach(li => li.addEventListener('click', e => {
    document.getElementById('cityLabel').innerText = e.target.textContent + ' ▾';
    menu.classList.remove('active');
}));

document.querySelectorAll('.filters .btn')
.forEach(btn => btn.addEventListener('click', () => {
    btn.classList.toggle('selected');
}));
