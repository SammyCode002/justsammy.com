// Constants
const GRID_SIZE = 20;
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;
const BORDER_SIZE = 50;  // Size of the border around the canvas

// Variables
let snake = [{ x: 0, y: 0 }];  // Starting position of the snake
let snake_direction = { x: 1, y: 0 };  // Initial direction (right)
let food = { x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) };  // Random initial food position

// Player's snake color (default: yellow)
const snake_color = { r: 0, g: 255, b: 0 };  // Bright green color (R, G, B)

// Game over flag
let gameOver = false;
let showPlayAgainButton = false;

// Score
let score = 0;

function setup() {
  createCanvas(CANVAS_WIDTH + 2 * BORDER_SIZE, CANVAS_HEIGHT + 2 * BORDER_SIZE);  // Set the canvas size with border
}

function draw() {
  frameRate(10);  // Set the frame rate to control game speed

  if (gameOver) {
    draw_game_over_screen();
    if (showPlayAgainButton) {
      draw_play_again_button();
    }
  } else {
    handle_input();
    update_game();
    render_game();
  }
}

function handle_input() {
  if (keyIsPressed) {
    if (keyCode === UP_ARROW) {
      snake_direction = { x: 0, y: -1 };
    } else if (keyCode === DOWN_ARROW) {
      snake_direction = { x: 0, y: 1 };
    } else if (keyCode === LEFT_ARROW) {
      snake_direction = { x: -1, y: 0 };
    } else if (keyCode === RIGHT_ARROW) {
      snake_direction = { x: 1, y: 0 };
    }
  }
}

function update_game() {
  // Move the snake
  const head = snake[snake.length - 1];
  const new_head_x = (head.x + snake_direction.x + GRID_SIZE) % GRID_SIZE;
  const new_head_y = (head.y + snake_direction.y + GRID_SIZE) % GRID_SIZE;
  const new_head = { x: new_head_x, y: new_head_y };

  // Check for collisions
  if (snake.slice(0, -1).some(segment => segment.x === new_head.x && segment.y === new_head.y)) {
    gameOver = true;
  }

  if (new_head_x < 0 || new_head_x >= GRID_SIZE || new_head_y < 0 || new_head_y >= GRID_SIZE) {
    gameOver = true;
  }

  snake.push(new_head);

  // Check if the snake eats the food
  if (new_head.x === food.x && new_head.y === food.y) {
    food.x = Math.floor(Math.random() * GRID_SIZE);
    food.y = Math.floor(Math.random() * GRID_SIZE);
    score++;  // Increase the score when the snake eats food
  } else {
    snake.shift();
  }
}

function render_game() {
  // Draw the grassy background
  background(150, 255, 150);  // Light green color (R, G, B)

  // Draw the border
  fill(200);
  rect(0, 0, CANVAS_WIDTH + 2 * BORDER_SIZE, BORDER_SIZE);  // Top border
  rect(0, BORDER_SIZE, BORDER_SIZE, CANVAS_HEIGHT);  // Left border
  rect(0, CANVAS_HEIGHT + BORDER_SIZE, CANVAS_WIDTH + 2 * BORDER_SIZE, BORDER_SIZE);  // Bottom border
  rect(CANVAS_WIDTH + BORDER_SIZE, BORDER_SIZE, BORDER_SIZE, CANVAS_HEIGHT);  // Right border

  // Draw the snake
  fill(snake_color.r, snake_color.g, snake_color.b);  // Bright green color (R, G, B)
  for (const segment of snake) {
    const x = segment.x;
    const y = segment.y;
    const cell_size = CANVAS_WIDTH / GRID_SIZE;
    ellipse((x * cell_size) + BORDER_SIZE + cell_size / 2,
      (y * cell_size) + BORDER_SIZE + cell_size / 2,
      CANVAS_WIDTH / GRID_SIZE,
      CANVAS_HEIGHT / GRID_SIZE
    );
  }

  // Draw the apple as the food
  const x = food.x;
  const y = food.y;
  const cell_size = CANVAS_WIDTH / GRID_SIZE;
  const apple_x = (x * cell_size) + BORDER_SIZE + cell_size / 2;
  const apple_y = (y * cell_size) + BORDER_SIZE + cell_size / 2;

  // Draw the apple body (red circle)
  fill(255, 0, 0);  // Red color (R, G, B)
  ellipse(apple_x, apple_y, cell_size, cell_size);

  // Draw the apple leaf (green triangle)
  fill(0, 128, 0);  // Green color (R, G, B)
  triangle(
    apple_x - cell_size * 0.2, apple_y - cell_size * 0.6,
    apple_x + cell_size * 0.2, apple_y - cell_size * 0.6,
    apple_x, apple_y - cell_size * 0.9
  );

  // Draw the score
  textSize(24);
  fill(0);
  textAlign(CENTER);
  text("Score: " + score, CANVAS_WIDTH / 2 + BORDER_SIZE, BORDER_SIZE - 10);  // Display the score above the border
}

function draw_game_over_screen() {
  textSize(32);
  fill(0);
  textAlign(CENTER, CENTER);
  text("Game Over", CANVAS_WIDTH / 2 + BORDER_SIZE, CANVAS_HEIGHT / 2 + BORDER_SIZE);

  // Draw the final score
  textSize(24);
  fill(0);
  textAlign(CENTER);
  text("Score: " + score, CANVAS_WIDTH / 2 + BORDER_SIZE, CANVAS_HEIGHT / 2 + BORDER_SIZE + 40);

  // Set the flag to show the Play Again button
  showPlayAgainButton = true;
}

// Draw the "Play Again" button
function draw_play_again_button() {
  const button_width = 120;
  const button_height = 40;
  const button_x = CANVAS_WIDTH / 2 + BORDER_SIZE - button_width / 2;
  const button_y = CANVAS_HEIGHT / 2 + BORDER_SIZE + 80;

  // Draw the button rectangle
  fill(255);
  rect(button_x, button_y, button_width, button_height);

  // Draw the button text
  textSize(20);
  fill(0);
  textAlign(CENTER, CENTER);
  text("Play Again", CANVAS_WIDTH / 2 + BORDER_SIZE, button_y + button_height / 2);
}

function mouseClicked() {
  if (gameOver && showPlayAgainButton) {
    // Check if the click is within the bounds of the "Play Again" button
    const button_width = 120;
    const button_height = 40;
    const button_x = CANVAS_WIDTH / 2 + BORDER_SIZE - button_width / 2;
    const button_y = CANVAS_HEIGHT / 2 + BORDER_SIZE + 80;

    if (button_x < mouseX && mouseX < button_x + button_width &&
      button_y < mouseY && mouseY < button_y + button_height) {
      // Reset the game state and start a new game
      snake = [{ x: 0, y: 0 }];
      snake_direction = { x: 1, y: 0 };
      food = { x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) };
      gameOver = false;
      score = 0;
      showPlayAgainButton = false;
    }
  }
}

