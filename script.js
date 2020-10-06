/* global keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, 
collideRectCircle, collideCircleCircle, random, mouseIsPressed, 
clear, textSize, createCanvas, strokeWeight, rect, background, colorMode, 
HSB, noStroke, backgroundColor, color, fill, ellipse, text, stroke, 
line, width, height, mouseX, mouseY, windowWidth, windowHeight, createCheckbox,
textAlign, RIGHT, CENTER, keyIsPressed, key, textFont */

let dots,
  checkbox,
  r = 2,
  ballColor,
  c = 0,
  mode;

function setup() {
  mode = 0;
  createCanvas(windowWidth - 20, windowHeight - 20);
  colorMode(HSB, 360, 100, 100);

  dots = [];
}

function draw() {
  background(220, 0, 0);

  if (mode == 0) {
    textAlign(CENTER, CENTER);
    noStroke();
    fill("white");
    textSize(60);
    textFont("Cambria");
    text("WORLD OF COLOR", width / 2, height / 2 - 120);
    textSize(20);
    
    text(
      "Click and drag your mouse to create a colorful fountain.",
      width / 2,
      height / 2 - 45
    );
    text(
      "Feel free to try out various fountain designs.",
      width / 2,
      height / 2 - 15
    );
    text(
      "Press and hold SPACEBAR to suspend the fountains in the air.",
      width / 2,
      height / 2 + 15
    );
    text("Press 'S' to begin. Enjoy the show!", width / 2, height / 2 + 90);
    if (keyIsPressed && (key == "s" || key == "S")) {
      mode = 1;
    }
  }

  if (mode == 1) {
    // Color (the H component of HSB)
    c += 0.5;
    // Could also use modular arithmetic here
    if (c > 360) {
      c = 0;
    }
    
    ballColor = color(c, 50, 90);

    if (mouseIsPressed) {
      dots.push(new BouncyDot(mouseX, mouseY, r, ballColor));
    }

    for (let i = 0; i < dots.length; i++) {
      dots[i].display();
      if (keyIsPressed && keyCode == 32) {
        dots[i].suspend();
      } else {
        dots[i].bounce();
      }
    }
  }
}

class BouncyDot {
  constructor(x, y, r, c) {
    // Randomly generate position
    this.x = x;
    this.y = y;
    // Randomly generate radius
    this.r = r;
    // Randomly generate color
    this.color = c;
    // Randomly generate a master velocity (broken into components)...
    this.masterXvelocity = random(0);
    this.masterYvelocity = random(1, 3);
    // ...and use those as starting velocities.
    this.xVelocity = this.masterXvelocity;
    this.yVelocity = this.masterYvelocity;

    this.dist = height - this.r - this.y;
    this.bounceYVelocity = this.yVelocity;
  }

  // Executes when spacebar is pressed. Suspends fountain particles in the air
  suspend() {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
    if (this.x + this.r > width) {
      this.xVelocity = -1 * this.masterXvelocity;
    }
    if (this.x - this.r < 0) {
      this.xVelocity = this.masterXvelocity;
    }
    if (this.y + this.r > height) {
      this.yVelocity = -1 * this.masterYvelocity;
    }
    if (this.y - this.r < 0) {
      this.yVelocity = this.masterYvelocity;
    }
  }

  // Allows each fountain particle to bounce roughly according to the laws of physics
  bounce() {
    // Acceleration
    let a = 1.5;

    // When ball bounces, velocity changes direction
    if (this.x + this.r > width) {
      this.xVelocity = -1 * this.masterXvelocity;
    }
    if (this.x - this.r < 0) {
      this.xVelocity = this.masterXvelocity;
    }
    this.y += this.yVelocity;
    this.x += this.xVelocity;

    // v = vo + at
    this.yVelocity += a;

    if (this.y > height - this.r) {
      this.yVelocity *= -0.953;
    }
  }

  display() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.r * 2);
  }
}
