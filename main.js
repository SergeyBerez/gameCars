const score = document.querySelector(".score "),
  start = document.querySelector(".start"),
  gameArea = document.querySelector(".gameArea"),
  car = document.createElement("div");
const KEYS = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false,
};
const setting = {
  start: false,
  score: 0,
  speed: 3,
  traffic: 5,
};

function getQuantityElements(heightElement) {
  return document.documentElement.clientHeight / heightElement + 1;
}
console.log(getQuantityElements(200));
start.addEventListener("click", startGame);
function startGame() {
  gameArea.innerHTML = "";
  start.classList.add("hide");

  // add line on the road
  for (let i = 0; i < getQuantityElements(100); i++) {
    const line = document.createElement("div");
    line.classList.add("line");
    line.style.top = i * 100 + "px";
    line.y = i * 100;
    gameArea.appendChild(line);
  }

  //create car enemy
  for (let i = 0; i < getQuantityElements(100 * setting.traffic); i++) {
    const enemy = document.createElement("div");
    enemy.classList.add("enemy");
    enemy.y = -100 * setting.traffic * (i + 1);

    enemy.style.left =
      Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + "px";
    enemy.style.top = enemy.y + "px";
    enemy.style.background = `transparent url(./image/enemy2.png) center / cover no-repeat`;
    gameArea.appendChild(enemy);
  }
  car.classList.add("car");
  setting.score = 0;
  setting.start = true;
  gameArea.appendChild(car);
  car.style.left = gameArea.offsetWidth / 2 - car.offsetWidth / 2;
  car.style.top = "auto";
  car.style.bottom = "10px";
  setting.y = car.offsetTop;
  setting.x = car.offsetLeft;
  requestAnimationFrame(playGame);
}
function playGame() {
  moveEnemy();
  moveRoad();
  if (setting.start) {
    setting.score += setting.speed;
    score.textContent = `SCORE :` + setting.score;
    if (KEYS.ArrowLeft && setting.x > 0) {
      setting.x -= setting.speed;
    }
    if (KEYS.ArrowRight && setting.x < gameArea.offsetWidth - car.offsetWidth) {
      setting.x += setting.speed;
    }
    if (KEYS.ArrowUp && setting.y > 0) {
      setting.y -= setting.speed;
    }
    if (
      KEYS.ArrowDown &&
      setting.y < gameArea.offsetHeight - car.offsetHeight
    ) {
      setting.y += setting.speed;
    }
    car.style.left = setting.x + "px";
    car.style.top = setting.y + "px";
    requestAnimationFrame(playGame);
  }
}
document.addEventListener("keydown", startRun);
document.addEventListener("keyup", stopRun);
function startRun(e) {
  e.preventDefault();
  KEYS[e.key] = true;
  console.log(e.key);
}
function stopRun(e) {
  e.preventDefault();
  KEYS[e.key] = false;
  console.log(e.key);
  // body
}
function moveRoad() {
  let lines = document.querySelectorAll(".line");
  lines.forEach((line) => {
    line.y += setting.speed;
    line.style.top = line.y + "px";

    if (line.y >= document.documentElement.clientHeight) {
      line.y = -100;
    }
  });
}

function moveEnemy() {
  let enemy = document.querySelectorAll(".enemy");
  enemy.forEach((item) => {
    let carRect = car.getBoundingClientRect();
    let enemyRect = item.getBoundingClientRect();
    if (
      carRect.top <= enemyRect.bottom &&
      carRect.right >= enemyRect.left &&
      carRect.left <= enemyRect.right &&
      carRect.bottom >= enemyRect.top
    ) {
      start.classList.remove("hide");
      score.style.top = start.offsetHeight;
      setting.start = false;
    }

    item.y += setting.speed / 2;
    item.style.top = item.y + "px";
    if (item.y >= document.documentElement.clientHeight) {
      item.y = -100;
      item.style.left =
        Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + "px";
    }
  });
}
