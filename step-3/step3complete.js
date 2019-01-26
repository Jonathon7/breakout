function step3complete() {
  var canvas = document.getElementById("step3complete");
  var ctx = canvas.getContext("2d");

  var x = canvas.width / 2;
  var y = canvas.height - 30;

  var dx = 2;
  var dy = -2;

  function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#61d38d";
    ctx.fill();
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();

    x += dx;
    y += dy;

    if (x + dx > canvas.width) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      x = canvas.width / 2;
      y = canvas.height - 30;
    }

    requestAnimationFrame(draw);
  }

  draw();
}
