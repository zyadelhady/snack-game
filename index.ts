const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const canvasContext = canvas.getContext('2d')!;
const yourScore = document.getElementById('score')! as HTMLHeadingElement;

let playerScore = 0;
let isIntersected = false;

let dx = 10;
let dy = 0;

let snake = [
  { x: 150, y: 150 },
  { x: 140, y: 150 },
  { x: 130, y: 150 },
  { x: 120, y: 150 },
  { x: 110, y: 150 },
  { x: 100, y: 150 },
];
const food = {
  x: randomTen(0, canvas.width - 10),
  y: randomTen(0, canvas.height - 10),
};

const draw = (
  color: string,
  x: number,
  y: number,
  width: number,
  height: number
) => {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(x, y, width, height);
};

function randomTen(min: number, max: number) {
  return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

const drawFood = (x: number, y: number) => {
  draw('darkred', x, y, 10, 10);
};

let moveSnake = (e: KeyboardEvent) => {
  if (e.key === 'ArrowDown' && dy != -10) {
    dx = 0;
    dy = 10;
  } else if (e.key === 'ArrowUp' && dy != 10) {
    dx = 0;
    dy = -10;
  } else if (e.key === 'ArrowRight' && dx != -10) {
    dx = 10;
    dy = 0;
  } else if (e.key === 'ArrowLeft' && dx != 10) {
    dx = -10;
    dy = 0;
  }
};

const intersect = () => {
  for (let i = 1; i < snake.length - 1; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      isIntersected = true;
    }
  }
};

const eat = () => {
  if (
    snake[0].x >= food.x &&
    snake[0].x <= food.x + 10 &&
    snake[0].y >= food.y &&
    snake[0].y <= food.y + 10
  ) {
    playerScore++;
    food.x = randomTen(0, canvas.width - 10);
    food.y = randomTen(0, canvas.height - 10);

    snake.push({
      x: snake[snake.length - 1].x - 10,
      y: snake[snake.length - 1].y,
    });
  }
};

const SnakeMovment = (dx = 0, dy = 0) => {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  snake.pop();
};

setInterval(() => {
  draw('black', 0, 0, canvas.width, canvas.height);

  if (isIntersected) {
    canvasContext.fillStyle = 'white';
    canvasContext.font = '50px VT323';
    canvasContext.textAlign = 'center';
    canvasContext.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
    canvasContext.fillText(
      'CLICK TO CONTINUE',
      canvas.width / 2,
      canvas.height / 2 + 100
    );

    snake = [
      { x: 150, y: 150 },
      { x: 140, y: 150 },
      { x: 130, y: 150 },
      { x: 120, y: 150 },
      { x: 110, y: 150 },
      { x: 100, y: 150 },
    ];

    playerScore = 0;

    canvas.addEventListener('click', () => {
      isIntersected = false;
    });
  } else {
    for (let i = 0; i < snake.length; i++) {
      if (snake[i].x < 0) {
        snake[i].x = canvas.width;
      }

      if (snake[i].x > canvas.width) {
        snake[i].x = 1;
      }

      if (snake[i].y > canvas.height) {
        snake[i].y = 1;
      }

      if (snake[i].y < 0) {
        snake[i].y = canvas.height;
      }
    }

    intersect();

    document.addEventListener('keydown', moveSnake, { once: true });

    drawFood(food.x, food.y);
    eat();

    SnakeMovment(dx, dy);

    for (let i = 0; i < snake.length; i++) {
      if (i === 0) {
        draw('blue', snake[i].x, snake[i].y, 10, 10);
      } else if (i === snake.length - 1) {
        draw('green', snake[i].x, snake[i].y, 10, 10);
      } else {
        draw('white', snake[i].x, snake[i].y, 10, 10);
      }
    }

    yourScore.textContent = playerScore.toString();
  }
}, 100);
