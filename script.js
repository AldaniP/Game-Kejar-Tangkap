document.addEventListener('DOMContentLoaded', () => {
  const player = document.getElementById('player');
  const target = document.getElementById('target');
  const gameBoard = document.getElementById('game-board');
  const scoreDisplay = document.getElementById('score');
  const timerDisplay = document.getElementById('timer');

  let score = 0;
  let time = 30; // Waktu bermain dalam detik
  let playerMoved = false; // Menyimpan status pergerakan pemain

  document.addEventListener('keydown', movePlayer);

  function movePlayer(event) {
    const key = event.key;
    const playerRect = player.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const gameBoardRect = gameBoard.getBoundingClientRect();

    const step = 10; // Jarak pergerakan pemain

    if (!playerMoved) {
      playerMoved = true;
      startTimer();
    }

    if (key === 'ArrowUp' && playerRect.top - step > gameBoardRect.top) {
      player.style.top = (player.offsetTop - step) + 'px';
    } else if (key === 'ArrowDown' && playerRect.bottom + step < gameBoardRect.bottom) {
      player.style.top = (player.offsetTop + step) + 'px';
    } else if (key === 'ArrowLeft' && playerRect.left - step > gameBoardRect.left) {
      player.style.left = (player.offsetLeft - step) + 'px';
    } else if (key === 'ArrowRight' && playerRect.right + step < gameBoardRect.right) {
      player.style.left = (player.offsetLeft + step) + 'px';
    }

    if (isColliding(playerRect, targetRect)) {
      score++;
      scoreDisplay.textContent = score;
      alert('Selamat! Anda berhasil mencapai target!');
      resetTarget();
    }
  }

  function isColliding(rect1, rect2) {
    return (
      rect1.left < rect2.right &&
      rect1.right > rect2.left &&
      rect1.top < rect2.bottom &&
      rect1.bottom > rect2.top
    );
  }

  function resetTarget() {
    const maxX = gameBoard.clientWidth - target.offsetWidth;
    const maxY = gameBoard.clientHeight - target.offsetHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    target.style.top = randomY + 'px';
    target.style.left = randomX + 'px';
  }

  function startTimer() {
    const timerInterval = setInterval(() => {
      timerDisplay.textContent = time;
      time--;

      if (time < 0) {
        endGame(timerInterval);
      }
    }, 1000);
  }

  function endGame(timerInterval) {
    clearInterval(timerInterval);
    document.removeEventListener('keydown', movePlayer);
    alert(`Waktu bermain habis. Skor Anda: ${score}`);
  }

  resetTarget();
  scoreDisplay.textContent = score;
});
