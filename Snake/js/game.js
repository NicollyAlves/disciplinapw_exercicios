(function () {
  let FPS = 10;
  const SIZE = 40;

  let board;
  let snake;
  let food;
  let score = 0;
  let interval;
  let gameStarted = false;
  let frameCount = 0;

  function init() {
    score = 0;
    FPS = 10;
    frameCount = 0;
    gameStarted = true;
    if (board) {
      document.body.removeChild(board.element);
    }
    board = new Board(SIZE);
    snake = new Snake([[4, 4], [4, 5], [4, 6]]);
    food = new Food();
    board.updateScore();
    board.clearGameOverMessage();
  }

  function startGame() {
    interval = setInterval(run, 1000 / FPS);
  }

  window.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowUp":
        snake.changeDirection(0);
        break;
      case "ArrowRight":
        snake.changeDirection(1);
        break;
      case "ArrowDown":
        snake.changeDirection(2);
        break;
      case "ArrowLeft":
        snake.changeDirection(3);
        break;
      case "s":
        if (!interval && gameStarted) {
          startGame();
        } else if (!gameStarted) {
          init();
          startGame();
        }
        break;
      case "p":
        togglePause();
        break;
      default:
        break;
    }
  });

  class Board {
    constructor(size) {
      this.element = document.createElement("table");
      this.element.setAttribute("id", "board");
      this.color = "#ccc";
      document.body.appendChild(this.element);
      for (let i = 0; i < size; i++) {
        const row = document.createElement("tr");
        this.element.appendChild(row);
        for (let j = 0; j < size; j++) {
          const field = document.createElement("td");
          row.appendChild(field);
        }
      }
      this.createScoreBoard();
    }

    createScoreBoard() {
      let scoreElement = document.getElementById('score');
      if (!scoreElement) {
        scoreElement = document.createElement('div');
        scoreElement.setAttribute('id', 'score');
        document.body.appendChild(scoreElement);
      }
    }

    updateScore() {
      const scoreElement = document.getElementById('score');
      scoreElement.textContent = `SCORE: ${score.toString().padStart(5, '0')}`;
    }

    gameOverMessage() {
      const messageElement = document.createElement('div');
      messageElement.setAttribute('id', 'game-over');
      messageElement.textContent = 'Game Over! Press S to restart.';
      document.body.appendChild(messageElement);
    }

    clearGameOverMessage() {
      const messageElement = document.getElementById('game-over');
      if (messageElement) {
        document.body.removeChild(messageElement);
      }
    }
  }

  class Snake {
    constructor(body) {
      this.body = body;
      this.color = "#0d0";
      this.direction = 1;
      this.body.forEach(field => document.querySelector(`#board tr:nth-child(${field[0] + 1}) td:nth-child(${field[1] + 1})`).style.backgroundColor = this.color);
    }

    walk() {
      const head = this.body[this.body.length - 1];
      let newHead;
      switch (this.direction) {
        case 0:
          newHead = [head[0] - 1, head[1]];
          break;
        case 1:
          newHead = [head[0], head[1] + 1];
          break;
        case 2:
          newHead = [head[0] + 1, head[1]];
          break;
        case 3:
          newHead = [head[0], head[1] - 1];
          break;
        default:
          break;
      }

      if (newHead[0] < 0 || newHead[0] >= SIZE || newHead[1] < 0 || newHead[1] >= SIZE) {
        gameOver();
        return;
      }

      this.body.push(newHead);
      const oldTail = this.body.shift();
      document.querySelector(`#board tr:nth-child(${newHead[0] + 1}) td:nth-child(${newHead[1] + 1})`).style.backgroundColor = this.color;
      document.querySelector(`#board tr:nth-child(${oldTail[0] + 1}) td:nth-child(${oldTail[1] + 1})`).style.backgroundColor = board.color;
      this.checkCollision(newHead);
    }

    changeDirection(direction) {
      if ((this.direction % 2) !== (direction % 2)) {
        this.direction = direction;
      }
    }

    checkCollision(newHead) {
      for (let i = 0; i < this.body.length - 1; i++) {
        if (this.body[i][0] === newHead[0] && this.body[i][1] === newHead[1]) {
          gameOver();
          return;
        }
      }

      if (newHead[0] === food.position[0] && newHead[1] === food.position[1]) {
        this.body.unshift(this.body[0]);
        score += food.type === 'red' ? 2 : 1;
        food.place();
        board.updateScore();
      }
    }
  }

  class Food {
    constructor() {
      this.place();
    }

    place() {
      let isValidPosition;
      do {
        this.position = [Math.floor(Math.random() * SIZE), Math.floor(Math.random() * SIZE)];
        isValidPosition = !snake.body.some(segment => segment[0] === this.position[0] && segment[1] === this.position[1]);
      } while (!isValidPosition);

      this.type = Math.random() < 0.33 ? 'red' : 'black';
      document.querySelector(`#board tr:nth-child(${this.position[0] + 1}) td:nth-child(${this.position[1] + 1})`).style.backgroundColor = this.type;
    }
  }

  function run() {
    try {
      snake.walk();
      frameCount++;

      if (frameCount % 60 === 0) {
        clearInterval(interval);
        FPS += 1;
        interval = setInterval(run, 1000 / FPS);
      }
    } catch (error) {
      console.error(error);
      gameOver();
    }
  }

  function gameOver() {
    clearInterval(interval);
    board.gameOverMessage();
    gameStarted = false;
  }

  function togglePause() {
    if (interval) {
      clearInterval(interval);
      interval = null;
    } else {
      interval = setInterval(run, 1000 / FPS);
    }
  }

  init();
})();
