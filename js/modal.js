const openBtn = document.querySelector('.open-modal-btn');
const modalOverlay = document.getElementById('modalOverlay');
const closeBtn = document.getElementById('closeBtn');

  openBtn.addEventListener('click', () => {
    modalOverlay.style.display = 'flex';
  });

  closeBtn.addEventListener('click', () => {
    modalOverlay.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.style.display = 'none';
    }
  });

var subMenu = document.querySelector('.submenu');
var openSubMenu = document.querySelector('.open_submenu');
  
openSubMenu.addEventListener('click', function() {
  subMenu.classList.toggle('show');

})
document.addEventListener('click', function(e) {
  if (subMenu.classList.contains('show')
    && !subMenu.contains(e.target)
    && !openSubMenu.contains(e.target)){
      subMenu.classList.remove('show');
    }
  
})
