function minBreakoutGame() {
  var canvas = document.getElementById("min-game");
  var ctx = canvas.getContext("2d");

  var ballRadius = 10;

  var x = canvas.width / 2;
  var y = canvas.height - 30;
  var dx = 2;
  var dy = -2;

  var paddleWidth = 60;
  var paddleHeight = 10;
  var paddleX = (canvas.width - paddleWidth) / 2;
  var paddleY = canvas.height - paddleHeight;

  var lives = 3;
  var score = 0;

  var brickColumnCount = 5;
  var brickRowCount = 4;
  var brickWidth = 40;
  var brickHeight = 20;
  var brickPadding = 10;
  var brickOffsetLeft = 30;
  var brickOffsetTop = 30;

  var bricks = [];

  for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
      bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
  }

  function drawBricks() {
    for (var c = 0; c < brickColumnCount; c++) {
      for (var r = 0; r < brickRowCount; r++) {
        if (bricks[c][r].status == 1) {
          var brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
          var brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          ctx.beginPath();
          ctx.rect(brickX, brickY, brickWidth, brickHeight);
          ctx.fillStyle = "#61d38d";
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }

  function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
      for (var r = 0; r < brickRowCount; r++) {
        var b = bricks[c][r];
        if (b.status == 1) {
          if (
            x > b.x &&
            x < b.x + brickWidth &&
            y > b.y &&
            y < b.y + brickHeight
          ) {
            dy = -dy;
            b.status = 0;
            score++;
          }
        }
      }
    }
  }

  function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#61d38d";
    ctx.fill();
    ctx.closePath();
  }

  function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#61d38d";
    ctx.fill();
  }

  function drawScore() {
    ctx.font = "12px Arial";
    ctx.fillStyle = "#61d38d";
    ctx.fillText("Score " + score, 10, 20);
  }

  function drawLives() {
    ctx.font = "12px Arial";
    ctx.fillStyle = "#61d38d";
    ctx.fillText("Lives " + lives, canvas.width - 50, 20);
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
    collisionDetection();
    drawScore();
    drawLives();

    x += dx;
    y += dy;

    if (x + dx > canvas.width || x + dx < ballRadius) {
      dx = -dx;
    }
    if (y + dy < ballRadius) {
      dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
      if (x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy;
      } else {
        lives--;
        if (!lives) {
          document.location.reload();
        } else {
          x = canvas.width / 2;
          y = canvas.height - 30;
          paddleX = (canvas.width - paddleWidth) / 2;
          lives--;
        }
      }
    }

    requestAnimationFrame(draw);
  }

  draw();

  document.addEventListener("mousemove", mouseMoveHandler, false);

  function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
      paddleX = relativeX - paddleWidth / 2;
    }
  }
}
