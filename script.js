document.addEventListener("DOMContentLoaded", function () {
  const movableDiv = document.querySelector(".mario-container");
  const tempsSpan = document.querySelector(".temps");
  const elapsedTimeDiv = document.querySelector(".elapsed-time");
  let isJumping = false;
  let isFalling = false;
  const jumpHeight = 150;
  const step = 10;
  let initialTop = parseFloat(window.getComputedStyle(movableDiv).top); // Stockez la position verticale initiale
  const startDate = new Date();
  const windowWidth = window.innerWidth;
  const cube = document.querySelector(".cube");
  const collisionImage = document.querySelector(".collision-image");

  const ring = () => {
    const audio = new Audio();
    audio.src = "Img/saut.wav";
    audio.play();
  };

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
      ring ();

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

let jumpCount = 0;
const imageList = [
    'img/1PHP.png',
    'img/1bootstrap.png',
    'img/1css3.png',
    'img/1html5.png',
    'img/1illustrator.png',
    'img/1indesign.png',
    'img/1Javascript.png',
    'img/1mysql.png',
];

function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * imageList.length);
    return imageList[randomIndex];
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

        jumpCount++;

        // Réinitialise isCollision à true à chaque saut
        isCollision = true;

        // Appelle handleCollision immédiatement après le saut
        setTimeout(function () {
            handleCollision();
        }, 2000);
    }
}

function handleCollision() {
    if (isCollision) {
        showImage();
    }
}

function showImage() {
  const image = document.createElement('img');
  image.src = getRandomImage();
  image.alt = 'Logo magique';
  image.classList.add('classlogo');
  document.body.appendChild(image);

  for (let i = 0; i < 3; i++) {
    const coin = document.createElement('div');
    coin.classList.add('coin', 'associated-with-image');
    document.body.appendChild(coin);

    const imageRect = image.getBoundingClientRect();
    const topPosition = imageRect.top + Math.random() * imageRect.height;
    const leftPosition = imageRect.left + Math.random() * imageRect.width;
    coin.style.top = `${topPosition}px`;
    coin.style.left = `${leftPosition}px`;
  }

  setTimeout(function () {
    removeImageAndCoins(image);
  }, 600);
}

function removeImageAndCoins(image) {
  document.body.removeChild(image);

  const coins = document.querySelectorAll('.associated-with-image');
  coins.forEach((coin) => {
    document.body.removeChild(coin);
  });

  isCollision = false;
}

document.addEventListener("keydown", function(event) {
  if (event.keyCode === 32) { 
    mario_container.classList.add('jump'); 

    setTimeout(function() {
      mario_container.classList.remove('jump');
      checkCollision();
    }, 300); 
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const audio = new Audio("Img/smb.mp3"); 
  const toggleButton = document.getElementById("toggleButton");

  function toggleSound() {
    if (audio.paused) {
      audio.play(); 
      toggleButton.textContent = "OFF";
    } else {
      audio.pause(); 
      toggleButton.textContent = "ON";
    }
  }

  toggleButton.addEventListener("click", toggleSound);

});

document.addEventListener("DOMContentLoaded", function () {
  const apiKey = '748f032f68ef4c819704f0416507ea63'; 
  const apiUrl = `https://api.weatherbit.io/v2.0/current?lat=43.2926781&lon=5.5676425&key=${apiKey}&include=minutely`;

  function fetchWeather() {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log('Données météo actuelles :', data);
  
        if (data && data.current) {
          if (data.current.weather && data.current.weather[0]) {
            updateMeteoBasedOnWeather(data.current.weather[0].main);
          } else {
            console.error('Structure de données météo inattendue - Propriété weather manquante :', data);
          }
        } else {
          console.error('Structure de données météo inattendue - Propriété current manquante :', data);
        }
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données météo :', error);
      });
  }
  

  function updateMeteoBasedOnWeather(weatherCondition) {
    const meteoImage = document.querySelector('.meteo');

    meteoImage.className = 'meteo';

    switch (weatherCondition.toLowerCase()) {
      case '800':
      case '801':
      case '802':
        meteoImage.classList.add('clear');
        break;
      case '200':
      case '201':
      case '202':
      case '230':
      case '231':
      case '232':
      case '233':
      case '300':
      case '301':
      case '302':
      case '500':
      case '501':
      case '502':
      case '511':
      case '520':
      case '521':
      case '522':
      case '900':
        meteoImage.classList.add('thunderstorm');
        break;
      case '600':
      case '601':
      case '602':
      case '610':
      case '621':
      case '622':
      case '623':
        meteoImage.classList.add('snow');
        break;
      case '611':
      case '612':
      case '700':
      case '711':
      case '721':
      case '731':
      case '741':
      case '751':
      case '803':
      case '804':
      case '429':
        meteoImage.classList.add('cloud');
        break;
      default:
        meteoImage.classList.add('clear');
    }
  }

  fetchWeather();
  setInterval(fetchWeather, 18000000);
});
