const gameState = {
  date: null,
  hazards: 0,
  modalOpen: false,
  money: 0,
  running: false,
  wasStarted: false,
}

function startGame() {
  // Initialize game state
  if (!gameState.wasStarted) {
    gameState.date = new Date();
    gameState.day = gameState.date.getDate();
    gameState.hazards = 0;
    gameState.money = 1e5;
    gameState.wasStarted = true;
  }

  // Start the game
  gameState.running = true;
}

function pauseGame() {
  gameState.running = false;
}

function gameLoop() {
  requestAnimationFrame(gameLoop);
  if (gameState.running) {
    document.getElementById('money-counter').innerHTML = gameState.money.toLocaleString();
    document.getElementById('hazard-counter').innerHTML = gameState.hazards;

    (() => {
      gameState.date.setSeconds(gameState.date.getSeconds() + 120);

      // Increase money
      if (gameState.day !== gameState.date.getDate()) {
        gameState.day = gameState.date.getDate();
        gameState.money += 5000;
      }

      const y = gameState.date.getFullYear();
      const d = gameState.date.getDate();
      const m = gameState.date.getMonth();
      const h = gameState.date.getHours();
      const i = gameState.date.getMinutes();
      document.getElementById('main-clock').innerHTML = `${d < 10 ? 0 : ''}${d}.${m < 10 ? 0 : ''}${m}.${y} ${h < 10 ? 0 : ''}${h}:${i < 10 ? 0 : ''}${i}`;
    })()
  }
}

gameLoop();
