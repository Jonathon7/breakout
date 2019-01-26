function minCanvas() {
  var canvas = document.getElementById("min-canvas");
  var ctx = canvas.getContext("2d");

  window.addEventListener("resize", resizeCanvas, false);

  function resizeCanvas() {
    canvas.width = window.innerWidth;

    minBreakout();
    minBreakoutGame();
  }

  resizeCanvas();

  function minBreakout() {
    var ballRadius = 10;

    var x = canvas.width / 2;
    var y = canvas.height - 30;

    var dx = 2;
    var dy = -2;

    var paddleWidth = 65;
    var paddleHeight = 12;

    var paddleX = x + dx - paddleWidth / 2;

    var brickWidth = 50;
    var brickHeight = 20;

    var brickRowCount = 7;
    var brickColumnCount = 5;
    var brickPadding = 5;
    var brickOffsetLeft = 9;
    var brickOffsetTop = 9;

    var score = 0;

    var bricks = [];
    for (var c = 0; c < brickColumnCount; c++) {
      bricks[c] = [];
      for (var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
      }
    }

    function drawBall() {
      ctx.beginPath();
      ctx.arc(x, y, ballRadius, 0, Math.PI * 2, false);
      ctx.fillStyle = "#61d38d";
      ctx.fill();
    }

    function drawPaddle() {
      ctx.beginPath();
      ctx.rect(
        paddleX,
        canvas.height - paddleHeight,
        paddleWidth,
        paddleHeight
      );
      ctx.fillStyle = "#61d38d";
      ctx.fill();
      ctx.closePath();
    }

    function drawBricks() {
      for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
          if (bricks[c][r].status === 1) {
            var brickX = r * (brickWidth + brickPadding) + brickOffsetLeft;
            var brickY = c * (brickHeight + brickPadding) + brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#61d38d";
            ctx.fill();
          }
        }
      }
    }

    function drawScore() {
      ctx.font = "12px Arial";
      ctx.fillStyle = "black";
      ctx.fillText(`Score ${score}`, canvas.width - 100, 10);
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

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBall();
      drawPaddle();
      drawBricks();
      collisionDetection();
      drawScore();

      x += dx;
      y += dy;

      paddleX += dx;

      if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
      }
      if (y + dy < ballRadius) {
        dy = -dy;
      }

      if (y + dy > canvas.height - paddleHeight) {
        dy = -dy;
      }

      requestAnimationFrame(draw);
    }

    draw();
  }
}
