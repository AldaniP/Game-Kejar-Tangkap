document.addEventListener('DOMContentLoaded', () => {
    const player = document.getElementById('player');
    const target = document.getElementById('target');
    const gameBoard = document.getElementById('game-board');

    document.addEventListener('keydown', movePlayer);

    function movePlayer(event) {
        const key = event.key;
        const playerRect = player.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const gameBoardRect = gameBoard.getBoundingClientRect();

        if (key === 'ArrowUp' && playerRect.top > gameBoardRect.top) {
            player.style.top = (playerRect.top - gameBoardRect.top - 10) + 'px';
        } else if (key === 'ArrowDown' && playerRect.bottom < gameBoardRect.bottom) {
            player.style.top = (playerRect.top - gameBoardRect.top + 10) + 'px';
        } else if (key === 'ArrowLeft' && playerRect.left > gameBoardRect.left) {
            player.style.left = (playerRect.left - gameBoardRect.left - 10) + 'px';
        } else if (key === 'ArrowRight' && playerRect.right < gameBoardRect.right) {
            player.style.left = (playerRect.left - gameBoardRect.left + 10) + 'px';
        }

        if (isColliding(playerRect, targetRect)) {
            alert('Selamat! Anda berhasil mencapai target!');
            resetTarget();
        }
    }

    function isColliding(rect1, rect2) {
        return rect1.left < rect2.right &&
            rect1.right > rect2.left &&
            rect1.top < rect2.bottom &&
            rect1.bottom > rect2.top;
    }

    function resetTarget() {
        const maxX = gameBoard.clientWidth - target.offsetWidth;
        const maxY = gameBoard.clientHeight - target.offsetHeight;

        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);

        target.style.left = randomX + 'px';
        target.style.top = randomY + 'px';
    }

    setInterval(resetTarget, 3000); // Reset target setiap 3 detik
});
