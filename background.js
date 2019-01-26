window.onload = function() {
  breakout();
  minCanvas();

  var canvasBG = document.getElementById("background");
  var ctxBG = canvasBG.getContext("2d");

  var bricksColumn = 5;
  var bricksRow = 24;
  var Width = 10;
  var Height = 7;
  var Padding = 2;
  var OffsetTop = 5;
  var OffsetLeft = 7;

  var bricks2d = [];

  var ballRadius2d = 3;
  var x2 = canvasBG.width / 2;
  var y2 = canvasBG.height - 30;

  var x2dx = 1;
  var y2dy = -1;

  var paddleWidth = 14;
  var paddleHeight = 5;
  var paddleX = canvasBG.width / 2;
  var paddleY = canvasBG.height - paddleHeight;

  var score = 0;

  for (var column = 0; column < bricksColumn; column++) {
    bricks2d[column] = [];
    for (var row = 0; row < bricksRow; row++) {
      bricks2d[column][row] = { x: 0, y: 0, status: 1 };
    }
  }

  function drawBricks2d() {
    for (var c = 0; c < bricksColumn; c++) {
      for (var r = 0; r < bricksRow; r++) {
        if (bricks2d[c][r].status == 1) {
          var brickX = r * (Width + Padding) + OffsetLeft;
          var brickY = c * (Height + Padding) + OffsetTop;

          bricks2d[c][r].x = brickX;
          bricks2d[c][r].y = brickY;

          ctxBG.beginPath();
          ctxBG.rect(brickX, brickY, Width, Height);
          ctxBG.fillStyle = "#61d38d";
          ctxBG.fill();
          ctxBG.closePath();
        }
      }
    }
  }

  function drawBall2d() {
    ctxBG.beginPath();
    ctxBG.arc(x2, y2, ballRadius2d, 0, Math.PI * 2);
    ctxBG.fillStyle = "#61d38d";
    ctxBG.fill();
    ctxBG.closePath();
  }

  function drawPaddle() {
    ctxBG.beginPath();
    ctxBG.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctxBG.fillStyle = "#61d38d";
    ctxBG.fill();
  }

  function drawScore() {
    ctxBG.font = "8px Arial";
    ctxBG.fillStyle = "#61d38d";
    ctxBG.fillText("Score: " + score, 2, canvasBG.height - 20);
  }

  function collisionDetection() {
    for (var c = 0; c < bricksColumn; c++) {
      for (var r = 0; r < bricksRow; r++) {
        var brick = bricks2d[c][r];
        if (brick.status === 1) {
          if (
            x2 > brick.x &&
            x2 < brick.x + Width &&
            y2 > brick.y &&
            y2 < brick.y + Height
          ) {
            y2dy = -y2dy;
            brick.status = 0;
            ++score;
          }
        }
      }
    }
  }

  function drawBG() {
    ctxBG.clearRect(0, 0, canvasBG.width, canvasBG.height);
    drawBricks2d();
    drawBall2d();
    drawPaddle();
    collisionDetection();
    drawScore();

    if (x2 + x2dx > canvasBG.width - ballRadius2d || x2 + x2dx < ballRadius2d) {
      x2dx = -x2dx;
    } else if (y2 + y2dy < ballRadius2d) {
      y2dy = -y2dy;
    }

    if (x2 + x2dx > paddleX - ballRadius2d && y2 + y2dy > paddleY) {
      y2dy = -y2dy;
    }

    x2 += x2dx;
    y2 += y2dy;

    paddleX += x2dx;

    requestAnimationFrame(drawBG);
  }

  drawBG();
};
