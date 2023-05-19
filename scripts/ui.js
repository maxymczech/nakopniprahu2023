function closeModal() {
  gameState.modalOpen = false;
  ['#modal-overlay', '#modal-hazards'].forEach(id => {
    document.querySelector(id).style.display = 'none';
  });
}

function closeMenu() {
  ['#modal-overlay', '#main-menu'].forEach(id => {
    document.querySelector(id).style.display = 'none';
  });
}

function openMenu() {
  ['#modal-overlay', '#main-menu'].forEach(id => {
    document.querySelector(id).style.display = 'block';
  });
}

document.getElementById('btn-pvk-web').addEventListener('click', function() {
  window.open('https://cistavoda.pvk.cz/');
});

document.getElementById('btn-start-game').addEventListener('click', function() {
  startGame();
  closeMenu();
});

document.querySelectorAll('.modal-close').forEach(element => {
  element.addEventListener('click', function() {
    closeModal();
  });
});


document.addEventListener('keydown', function(event) {
  if (event?.key === 'Escape') {
    if (gameState.modalOpen) {
      closeModal();
      startGame();
    } else {
      pauseGame();
      openMenu();
    }
  }
}, false);

['#hazard-counter', '#element-phone'].forEach(id => {
  document.querySelector(id).addEventListener('click', function() {
    gameState.modalOpen = true;
    pauseGame();
    ['#modal-overlay', '#modal-hazards'].forEach(id => {
      document.querySelector(id).style.display = 'block';
    });
  });
});
