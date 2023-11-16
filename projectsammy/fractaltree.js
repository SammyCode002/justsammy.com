let angle;

function setup() {
  createCanvas(400, 400);
  angle = PI / 4;
  stroke(190, 155, 255); 
}

function draw() {
  clear();
  translate(200, height);
  angle = map(sin(frameCount * 0.01), -1, 1, PI / 2, PI / 16); // vary the angle using sin()
  branch(100);
}

function branch(len) {
  line(0, 0, 0, -len);
  translate(0, -len);
  if (len > 4) {
    push();
    rotate(angle);
    branch(len * 0.67);
    pop();
    push();
    rotate(-angle);
    branch(len * 0.67);
    pop();
  }
}
