"use strict";

let draw_marble = function (context, x, y, width, color) {
  let gr = context.createLinearGradient(x, y, x + width / 3, y + width / 3);

  context.beginPath();
  if (color === "white") {
    gr.addColorStop(0, '#ffffff');
    gr.addColorStop(1, '#c0c0c0');
  } else if (color === "grey") {
    gr.addColorStop(0, '#b0b0b0');
    gr.addColorStop(1, '#ffffff');
  } else if (color === "black") {
    gr.addColorStop(0, '#000000');
    gr.addColorStop(1, '#c0c0c0');
  }

  context.strokeStyle = "#000000";
  context.lineWidth = 1;
  context.fillStyle = gr;
  context.arc(x, y, width / 2, 0.0, 2 * Math.PI, false);
  context.fill();
  context.stroke();
  context.closePath();
};

export default {
  draw_marble: draw_marble
};