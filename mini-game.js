const canvas = document.getElementById("f1-game");
const ctx = canvas.getContext("2d");

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const leftBtn = document.getElementById("left-btn");
const rightBtn = document.getElementById("right-btn");

const gameWidth = canvas.width;
const gameHeight = canvas.height;

// Load car image
const carImg = new Image();
carImg.src = "assets/images/racing-car.png";

let car = { x: 180, y: 150, width: 40, height: 30, speed: 5 };
let obstacles = [];
let obstacleSpeed = 3;
let score = 0;
let gameOver = false;
let gameStarted = false;

// --- Game Functions ---
function createObstacle() {
  const width = 20 + Math.random() * 40;
  const x = Math.random() * (gameWidth - width);
  obstacles.push({ x, y: -20, width, height: 20 });
}

function draw() {
  ctx.clearRect(0, 0, gameWidth, gameHeight);
  ctx.drawImage(carImg, car.x, car.y, car.width, car.height);

  ctx.fillStyle = "yellow";
  obstacles.forEach((obs) => ctx.fillRect(obs.x, obs.y, obs.width, obs.height));

  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
  ctx.fillText(`Score: ${score}`, 10, 20);
}

function update() {
  if (gameOver) return;

  // Increase speed based on score thresholds
  if (score >= 50) {
    obstacleSpeed = 7;
  } else if (score >= 30) {
    obstacleSpeed = 5;
  } else if (score >= 15) {
    obstacleSpeed = 4;
  } else {
    obstacleSpeed = 3; // initial speed
  }

  obstacles.forEach((obs, index) => {
    obs.y += obstacleSpeed;

    // Collision detection
    if (
      car.x < obs.x + obs.width &&
      car.x + car.width > obs.x &&
      car.y < obs.y + obs.height &&
      car.y + car.height > obs.y
    ) {
      gameOver = true;
      alert(`Game Over! Your score: ${score}`);
      gameStarted = false;
      gameOver = false;
      obstacles = [];
      score = 0;
      restartBtn.style.display = "inline-block";
    }

    // Remove offscreen obstacles
    if (obs.y > gameHeight) {
      obstacles.splice(index, 1);
      score++;
    }
  });
}


function resetGame() {
  car.x = 180;
  car.y = 150;
  obstacles = [];
  score = 0;
  gameOver = false;
  gameStarted = true;
  restartBtn.style.display = "none";
}

// --- Controls ---
document.addEventListener("keydown", (e) => {
  if (!gameStarted) return;
  if (e.key === "ArrowLeft" && car.x > 0) car.x -= car.speed;
  if (e.key === "ArrowRight" && car.x + car.width < gameWidth)
    car.x += car.speed;
  if (e.key === "ArrowUp" && car.y > 0) car.y -= car.speed;
  if (e.key === "ArrowDown" && car.y + car.height < gameHeight)
    car.y += car.speed;
});

leftBtn.addEventListener("touchstart", () => {
  if (gameStarted) car.x -= car.speed;
});
rightBtn.addEventListener("touchstart", () => {
  if (gameStarted) car.x += car.speed;
});
// Left button
leftBtn.addEventListener("click", () => {
  if (gameStarted) car.x -= car.speed;
});
leftBtn.addEventListener("touchstart", () => {
  if (gameStarted) car.x -= car.speed;
});

// Right button
rightBtn.addEventListener("click", () => {
  if (gameStarted) car.x += car.speed;
});
rightBtn.addEventListener("touchstart", () => {
  if (gameStarted) car.x += car.speed;
});

// --- Buttons ---
startBtn.addEventListener("click", () => {
  resetGame();
  gameStarted = true;
  startBtn.style.display = "none";
});

restartBtn.addEventListener("click", () => {
  resetGame();
});

// --- Game loop ---
function gameLoop() {
  if (gameStarted) {
    draw();
    update();
  }
  requestAnimationFrame(gameLoop);
}

// --- Obstacle timer ---
setInterval(() => {
  if (gameStarted) createObstacle();
}, 1500);

gameLoop();
