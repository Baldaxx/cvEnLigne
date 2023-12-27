document.addEventListener("DOMContentLoaded", function () {
  const movableDiv = document.querySelector(".mario-container");
  const tempsSpan = document.querySelector(".temps");
  const elapsedTimeDiv = document.querySelector(".elapsed-time");
  let isJumping = false;
  let isFalling = false;
  const jumpHeight = 250;
  const step = 10;
  let initialTop = parseFloat(window.getComputedStyle(movableDiv).top); // Stockez la position verticale initiale
  const startDate = new Date();
  const windowWidth = window.innerWidth;
  const cube = document.querySelector(".cube");
  const collisionImage = document.querySelector(".collision-image");

  function moveLeft() {
    const currentLeft = parseFloat(window.getComputedStyle(movableDiv).left);

    if (currentLeft - step >= 0) {
      movableDiv.style.left = `${currentLeft - step}px`;
      movableDiv.classList.add("facing-left");
      movableDiv.classList.remove("facing-right");
      resetVerticalPosition();
    }
  }

  function moveRight() {
    const currentLeft = parseFloat(window.getComputedStyle(movableDiv).left);

    if (currentLeft + step + movableDiv.clientWidth <= windowWidth) {
      movableDiv.style.left = `${currentLeft + step}px`;
      movableDiv.classList.add("facing-right");
      movableDiv.classList.remove("facing-left");
      resetVerticalPosition();
    }
  }

  function resetVerticalPosition() {
    movableDiv.style.top = `${initialTop}px`;
  }

  function jump() {
    if (!isJumping && !isFalling) {
      isJumping = true;

      const jumpInterval = setInterval(function () {
        const currentTop = parseFloat(window.getComputedStyle(movableDiv).top);

        if (currentTop <= initialTop - jumpHeight || isFalling) {
          clearInterval(jumpInterval);
          isJumping = false;
          isFalling = true;
          fall();
        } else {
          movableDiv.style.top = `${currentTop - step}px`;
        }
      }, 10);
    }
  }

  function fall() {
    const fallInterval = setInterval(function () {
      const currentTop = parseFloat(window.getComputedStyle(movableDiv).top);

      if (currentTop >= initialTop) {
        clearInterval(fallInterval);
        isFalling = false;
        movableDiv.style.top = `${initialTop}px`;
      } else {
        movableDiv.style.top = `${currentTop + step}px`;
      }
    }, 10);
  }

  document.addEventListener("keydown", function (event) {
    switch (event.key) {
      case "ArrowLeft":
        moveLeft();
        break;
      case "ArrowRight":
        moveRight();
        break;
      case " ":
        jump();
        break;
    }
  });

  setInterval(function () {
    const currentDate = new Date();
    const elapsedTime = Math.floor((currentDate - startDate) / 1000);

    const hours = Math.floor(elapsedTime / 3600);
    const minutes = Math.floor((elapsedTime % 3600) / 60);
    const seconds = elapsedTime % 60;

    tempsSpan.textContent = `Time: ${formatTime(hours)}:${formatTime(
      minutes
    )}:${formatTime(seconds)}`;

    elapsedTimeDiv.textContent = `Time: ${formatTime(hours)}:${formatTime(
      minutes
    )}:${formatTime(seconds)}`;
  }, 1000);
});

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

const mario_container = document.querySelector('.mario-container');
const cube = document.querySelector('.cube');
let isCollision = false;

function checkCollision() {
    if (isColliding(mario_container, cube) && !isCollision) {
        isCollision = true;
        handleCollision();
    }
}

function isColliding(element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    console.log("rec1", rect1);
    const rect2 = element2.getBoundingClientRect();
    console.log("rec2", rect2);
    return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
    );
}

function handleCollision() {
    showImage();
}

function showImage() {
    const image = document.createElement('img');
    image.src = 'img/1PHP.png'; 
    image.alt = 'Logo de PHP'; 
    image.classList.add('classlogo');
    document.body.appendChild(image);
    


    setTimeout(function() {
        document.body.removeChild(image);
        isCollision = false; 
    }, 10000);
}

document.addEventListener("keydown", function(event) {
    if (event.keyCode === 32) { 
        mario_container.classList.add('jump'); 
        setTimeout(function() {
            mario_container.classList.remove('jump');
            checkCollision();
        }, 500); 
    }
});
