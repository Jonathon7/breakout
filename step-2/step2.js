window.onload = function step2() {
  var canvas = document.getElementById("step2");
  var ctx = canvas.getContext("2d");

  ctx.beginPath();
  ctx.rect(0, 0, 20, 20);
  ctx.fillStyle = "#61d38d";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.arc(200, 200, 10, 0, Math.PI * 2);
  ctx.fillStyle = "#61d38d";
  ctx.fill();
  ctx.closePath();
};
