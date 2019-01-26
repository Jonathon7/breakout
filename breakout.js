function breakout() {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");

  //radius dimension for ball 1 and ball 2
  var ballRadius = 10;
  var b2Radius = 10;

  //determines position of the ball
  var x = canvas.width / 2;
  var y = canvas.height - 30;

  var dx = 3; //determines speed and direction of the ball's x movement
  var dy = -3; //determines speed and direction of the ball's y movement

  //determines position of ball two
  var b2x = canvas.width / 2;
  var b2y = canvas.height - 30;

  var b2dx = 3; //determines speed and directino of ball 2's x movement
  var b2dy = -3; //determines speed and directino of ball 2's y movement

  //power up brick vars
  var powerUpHeight = 15;
  var powerUpWidth = 30;

  //determines if the power up is drawn on the canvas 1 = true 0 = false
  var powerUpStatus = 1;

  //random number between 7 and 15 in milliseconds for the interval when the power up can appear
  var powerUpTiming = Math.floor(Math.random() * (14000 - 7000 + 1000)) + 7000;

  var powerUpInterval = false;

  //determines position of a power up brick
  //randomized x coordinate

  var powerUpX = Math.floor(Math.random() * (canvas.width + 1)) - powerUpWidth;
  var powerUpY = 0;

  //determines speed and direction of power up brick
  var powerUpdx = 0;
  var powerUpdy = 2;

  //takes in a random number and picks a power up

  //sets the power up interval to true after a random amount of time
  setTimeout(() => {
    powerUpInterval = true;
  }, powerUpTiming);

  //determines which power up brick to display
  var speed = false;
  var ball = false;

  //var is set to true when the power up brick hits the paddle
  var startBall = false;

  //drops random power ups after a random amount of time (powerUpTiming + 7000)
  function powerUpLoop() {
    var randomPowerUp = Math.floor(Math.random() * (3 - 1)) + 1;
    powerUpStatus = 1;
    powerUpX = Math.floor(Math.random() * (canvas.width + 1)) - powerUpWidth;
    powerUpY = 0;
    powerUpdx = 0;
    powerUpdy = 2;

    switch (randomPowerUp) {
      case 1:
        speed = true;
        break;
      case 2:
        ball = true;
        break;
      default:
        console.log("default case");
    }
  }

  setInterval(powerUpLoop, powerUpTiming);

  //paddle dimensions
  var paddleHeight = 10;
  var paddleWidth = 75;
  var paddleX = (canvas.width - paddleWidth) / 2;

  //key controls
  var rightPressed = false;
  var leftPressed = false;

  //brick variables
  var brickRowCount = 5;
  var brickColumnCount = 7;
  var brickWidth = 75;
  var brickHeight = 20;
  var brickPadding = 10;
  var brickOffsetTop = 30;
  var brickOffsetLeft = 30;

  //brick two dimensional array
  var bricks = [];
  for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
      bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
  }

  var score = 0;
  var lives = 30;

  //collision detection when the ball hits a brick
  function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
      for (var r = 0; r < brickRowCount; r++) {
        var b = bricks[c][r];
        if (b.status == 1) {
          //collision detection for ball 2
          if (startBall === true) {
            if (
              b2x > b.x &&
              b2x < b.x + brickWidth &&
              b2y > b.y &&
              b2y < b.y + brickHeight
            ) {
              b2dy = -b2dy;
              b.status = 0;
              ++score;
              if (score == brickRowCount * brickColumnCount) {
                alert("You win, Congratulations");
                document.location.reload();
              }
            }
          }
          //collision detection for ball 1
          if (
            x > b.x &&
            x < b.x + brickWidth &&
            y > b.y &&
            y < b.y + brickHeight
          ) {
            dy = -dy;
            b.status = 0;
            ++score;
            if (score == brickRowCount * brickColumnCount) {
              alert("You win, Congratulations");
              document.location.reload();
            }
          }
        }
      }
    }
  }

  function powerUpCollisionDetection() {
    if (powerUpY + powerUpdy > canvas.height + powerUpHeight) {
      powerUpStatus = 0;
      powerUpX = 0;
      powerUpY = 0;
      powerUpdx = 0;
      powerUpdy = 0;
    }
    if (powerUpY + powerUpdy > canvas.height - powerUpHeight) {
      if (powerUpX > paddleX && powerUpX < paddleX + paddleWidth) {
        if (ball === true) {
          startBall = true;
          if (b2dx == 0 && b2dy == 0) {
            b2x = canvas.width / 2;
            b2y = canvas.height - 30;
            b2dx = 3;
            b2dy = -3;
          }
          ball = false;
        }

        //if the power up hits the paddle it speeds up the ball and resets and freezes the position of the power up
        if (speed === true) {
          if (dy == 3 && dx == 3) {
            (dx = 5), (dy = 5);
          } else if (dy == -3 && dx == -3) {
            (dx = -5), (dy = -5);
          } else if (dy == 3 && dx == -3) {
            (dx = -5), (dy = 5);
          } else if (dy == -3 && dx == 3) {
            (dx = 5), (dy = -5);
          }

          //if ball 2 is on the canvas when the speed power up is hit, ball 2's speed will increase as well
          if (startBall === true) {
            if (b2dy == 3 && b2dx == 3) {
              (b2dx = 5), (b2dy = 5);
            } else if (b2dy == -3 && b2dx == -3) {
              (b2dx = -5), (b2dy = -5);
            } else if (b2dy == 3 && b2dx == -3) {
              (b2dx = -5), (b2dy = 5);
            } else if (dy == -3 && dx == 3) {
              (b2dx = 5), (b2dy = -5);
            }
          }

          setTimeout(() => {
            //resets the speed of the ball after 7s while keeping the direction of the ball
            if (dy == 5 && dx == 5) {
              (dx = 3), (dy = 3);
            } else if (dy == -5 && dx == -5) {
              (dx = -3), (dy = -3);
            } else if (dy == 5 && dx == -5) {
              (dx = -3), (dy = 3);
            } else if (dy == -5 && dx == 5) {
              (dx = 3), (dy = -3);
            }

            //if ball 2 is still on the canvas when the speed power up ends, it's speed will revert back to default
            if (startBall === true) {
              if (b2dy == 5 && b2dx == 5) {
                (b2dx = 3), (b2dy = 3);
              } else if (b2dy == -5 && b2dx == -5) {
                (b2dx = -3), (b2dy = -3);
              } else if (b2dy == 5 && b2dx == -5) {
                (b2dx = -3), (b2dy = 3);
              } else if (b2dy == -5 && b2dx == 5) {
                (b2dx = 3), (b2dy = -3);
              }
            }
            speed = false;
          }, 7000);
        }
      }
    }
  }

  //draws the ball on the canvas
  function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }

  function drawBallTwo() {
    ctx.beginPath();
    ctx.arc(b2x, b2y, b2Radius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
  }

  //draws the paddle on the canvas
  function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }

  //draws the bricks on the canvas
  function drawBricks() {
    for (var c = 0; c < brickColumnCount; c++) {
      for (var r = 0; r < brickRowCount; r++) {
        if (bricks[c][r].status == 1) {
          var brickX = r * (brickWidth + brickPadding) + brickOffsetLeft;
          var brickY = c * (brickHeight + brickPadding) + brickOffsetTop;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          ctx.beginPath();
          ctx.rect(brickX, brickY, brickWidth, brickHeight);
          ctx.fillStyle = "#0095DD";
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }

  function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
  }

  function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
  }

  function drawPowerUp() {
    //speed power up
    if (powerUpStatus == 1 && powerUpInterval === true && speed === true) {
      ctx.beginPath();
      ctx.rect(powerUpX, powerUpY, powerUpWidth, powerUpHeight);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
    }
    //ball 2 power up
    if (powerUpStatus == 1 && powerUpInterval === true && ball === true) {
      ctx.beginPath();
      ctx.rect(powerUpX, powerUpY, powerUpWidth, powerUpHeight);
      ctx.fillStyle = "red";
      ctx.fill();
      ctx.closePath();
    }
  }

  //function executes every 10 ms set by the setInterval() function
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection(); //detects when the ball hits a brick
    powerUpCollisionDetection();
    drawScore();
    drawLives();
    drawPowerUp();

    //draws ball 2 on the canvas when ball power up brick hits the paddle
    if (powerUpInterval === true && startBall === true) {
      drawBallTwo();
    }

    //collision detection for top and bottom and paddle. Game ends if the ball hit the bottom
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
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
          alert("GAME OVER");
          document.location.reload();
        } else {
          x = canvas.width / 2;
          y = canvas.height - 30;
          dx = 3;
          dy = -3;
          paddleX = (canvas.width - paddleWidth) / 2;
        }
      }
    }

    //collision detection for ball two
    if (startBall === true) {
      if (b2x + b2dx > canvas.width - b2Radius || b2x + b2dx < b2Radius) {
        b2dx = -b2dx;
      }
      if (b2y + b2dy < 0) {
        b2dy = -b2dy;
      } else if (b2y + b2dy > canvas.height - b2Radius) {
        if (b2x > paddleX && b2x < paddleX + paddleWidth) {
          b2dy = -b2dy;
        } else if (b2y + b2dy > canvas.height) {
          startBall = false;
          if (!startBall) {
            b2x = canvas.width / 2;
            b2y = canvas.height - 30;
            b2dx = 0;
            b2dy = 0;
          }
        }
      }
    }

    //changes x position of paddle based on left and right pressed buttons
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
      paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
      paddleX -= 7;
    }

    //moves the ball slightly every frame
    x += dx;
    y += dy;

    //moves ball 2
    if (startBall === true) {
      b2x += b2dx;
      b2y += b2dy;
    }

    //moves the power up brick down the canvas
    if (powerUpInterval === true) {
      powerUpX += powerUpdx;
      powerUpY += powerUpdy;
    }

    //calls draw() over and over to perform the animation
    requestAnimationFrame(draw);
  }

  draw();

  //event listeners for keyup and keydown events and mouse movement
  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
  document.addEventListener("mousemove", mouseMoveHandler, false);

  function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
      paddleX = relativeX - paddleWidth / 2;
    }
  }

  function keyDownHandler(e) {
    if (e.keyCode == 39) {
      rightPressed = true;
    } else if (e.keyCode == 37) {
      leftPressed = true;
    }
  }

  function keyUpHandler(e) {
    if (e.keyCode == 39) {
      rightPressed = false;
    } else if (e.keyCode == 37) {
      leftPressed = false;
    }
  }
}
