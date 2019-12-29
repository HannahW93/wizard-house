var rabbitX = 500
var rabbitY = 300
var smallestX = 600;
var hitOne = false
var sceneValue = 0;
var sceneTwoSkullX = 260
var hitTwo = false
var fireFlame = []
const flameNum = 10;
var win = 0

//below is a set of variables that related to movement constrain within walls
//scene one
var hitSceneOneAreaA = false
var hitSceneOneAreaB = false
var hitSceneTwoAreaA = false
var hitSceneTwoAreaB = false
var hitSceneThreeAreaA = false
var hitSceneThreeAreaB = false




function setup() {
  createCanvas(600, 600);
  background('#031533');
  rectMode(CENTER);
  angleMode(DEGREES);
  for (var i = 0; i < flameNum; i++) {
    fireFlame[i] = new flame()
  }
}

function draw() {
  //draw initial scene
  if (sceneValue == 0) {
    drawSceneZero()
  }

   //scene one
  if (sceneValue == 1) {
    drawSceneOne()
    drawRabbit(rabbitX, rabbitY)

  //see if rabbit inside the rect
    hitOne = pointInsideRect(rabbitX, rabbitY, 300, 580, 200, 50)
    //if so, activate scene 2 and reset x,y coord to (320,50)
    if (hitOne) {
      sceneValue = 2
      rabbitX = 320
      rabbitY = 50
    }



  }

//scene two

  if (sceneValue == 2) {

    drawSceneTwo();
    drawRabbit(rabbitX, rabbitY)
    // if rabbit meets the skull
    if (rabbitX > 100 && rabbitX < 300 && rabbitY > 400 && rabbitY < 500 && sceneTwoSkullX < 350) {
      //skull moves
      sceneTwoSkullX++
    }
    drawSkull(sceneTwoSkullX, 540, 20);
    
    //if rabbit moves to this area, activate scene 3 and reset rabbit x,y coord to (210,50)
    
    hitTwo = pointInsideRect(rabbitX, rabbitY, 250, 550, 100, 100)
    if (hitTwo) {
      sceneValue = 3
      rabbitX = 210
      rabbitY = 50
    }
  }

  //scene three
  if (sceneValue == 3) {
    drawSceneThree();
    drawRabbit(rabbitX, rabbitY);

    // if rabbit sits in the correct area, then activate fire rain
    // once the fire rain is activated, it should not disappear no matter how the rabbit moves
    if (rabbitX > 240 && rabbitX < 300 && rabbitY > 200 && rabbitY < 300) {
      win = 1
    }

    if (win == 1) {
      for (var i = 0; i < flameNum; i++) {
        fireFlame[i].display()
        fireFlame[i].fall()
        if (fireFlame[i].y > height) {
          fireFlame[i] = new flame();
        }

        fill('white');
        stroke('#070f24');
        strokeWeight(10);
        textSize(50)
        text("CONGRATULATIONS!", 50, 300)
      }
    }
  }


}



//scene three elements

function drawSceneThree() {
  background('#031533')
  drawRoomThreeBackground()
  push();
  translate(300, 350)
  for (var i = 0; i < 8; i++) {
    if (i != 0) {
      rotate(45 * i);
      drawSkull(0, -150, 20)
      rotate(-45 * i)
    }
  }

  pop();

  drawFirePit();

}

function drawFirePit() {
  fill('#361e14')
  ellipse(300, 350, 150, 100)
  push();
  stroke('#070f24')
  strokeWeight(5)
  drawStone(190, 250);
  drawStone(240, 230);
  drawStone(300, 240);
  drawStone(340, 250);
  drawStone(330, 290);
  drawStone(300, 310);
  drawStone(240, 320);
  drawStone(200, 290);

  pop();

  push();
  translate(250, 330);
  scale(1.8);
  drawFire(0, 0);

  pop();
}

function drawStone(stoneX, stoneY) {
  fill('#303030');
  beginShape();
  curveVertex(stoneX + 28, stoneY + 58);
  curveVertex(stoneX + 62, stoneY + 60);
  curveVertex(stoneX + 60, stoneY + 96);
  curveVertex(stoneX + 28, stoneY + 96);
  curveVertex(stoneX + 10, stoneY + 78);
  endShape(CLOSE);
}

function drawRoomThreeBackground() {
  noStroke();
  fill('#3b98eb');
  rect(250, 100, 200, 300);
  circle(300, 350, 550);

  noStroke();
  fill('#070f24');
  rect(250, 100, 130, 230);
  circle(300, 350, 480);

  noStroke();
  fill('#274f91');
  rect(250, 100, 100, 200);
  circle(300, 350, 450);


}

//scene two elements

function drawSceneTwo() {
  background('#031533')
  drawAlley();
  drawFire(265, 125);
  drawFire(375, 125);
  drawFire(160, 450);
}

function drawAlley() {


  // light blue wall thickness
  noStroke();
  fill('#3b89eb')
  rect(350, 200, 190, 490)
  rect(250, 450, 190, 390)
  rect(350, 550, 190, 190)

  //niche thickness
  fill('#070f24');
  rect(300, 125, 80, 80)
  rect(400, 125, 80, 80)
  rect(200, 450, 80, 80)

  // floor
  noStroke();
  fill('#274f91');
  rect(350, 200, 100, 400);
  rect(250, 450, 100, 300);
  rect(350, 550, 100, 100);

  //dark blue wall thickness
  noFill();
  stroke('#070f24');
  strokeWeight(15);
  beginShape();
  vertex(300, 0);
  vertex(300, 300);
  vertex(200, 300);
  vertex(200, 700);
  vertex(400, 700);
  vertex(400, 500);
  vertex(300, 500);
  vertex(300, 400);
  vertex(400, 400);
  vertex(400, 0);
  endShape();

  //niches
  noStroke();
  fill('#274f91');
  rect(300, 125, 50, 50);
  rect(400, 125, 50, 50);
  rect(200, 450, 50, 50);


}


//scene one elements

function drawSceneOne() {
  background('#031533')
  drawBackgroundOne()

  drawBackgroundSkull(460, 160, 20)

  drawBackgroundSkull(130, 120, 20);
  drawDesk()
  drawBackgroundSkull(150, 180, 20)

  //implement the "collect" skull function
  // only draw skull to the left of the rabbit
  for (var i = 0; i < 3; i++) {
    if (smallestX > 180 + 120 * i) {
      drawSkull(180 + 120 * i, 290, 20);
    }
  }

  drawFire(100, 400)
  drawFire(440, 400)
}

function drawFire(fireX, fireY) {
  fill('#ed6fe7')
  noStroke();
  rect(fireX + 30, fireY + 10, 40, 30, 15, 15, 15, 15)
  triangle(fireX + 10, fireY + 5, fireX + 50, fireY + 5, fireX + 30, fireY - 25)
  fill('#f7b5f4');
  ellipse(fireX + 30, fireY + 10, 20, 30)
}

function drawDesk() {
  push();
  stroke('#070f24');
  strokeWeight(10);
  fill('#571406');
  rect(width / 2, 180, 150, 60);
  rect(width / 2, 130, 300, 80);
  fill('#3e92b0');
  rect(130, 430, 100, 80, 20, 20, 20, 20)
  rect(470, 430, 100, 80, 20, 20, 20, 20)
  fill('#7ed7f7');
  rect(130, 410, 100, 80, 20, 20, 20, 20)
  rect(470, 410, 100, 80, 20, 20, 20, 20)
  fill('#070f24');
  rect(width / 2, 130, 120, 60, 10, 10, 10, 10)
  noStroke();
  fill('white');
  textSize(20);
  text("COLLECT", 255, 135)
  fill('#7ed7f7');

  pop();
}

function drawBackgroundOne() {
  push();
  fill('#274f91');
  strokeWeight(25);
  stroke('#3b98eb')
  beginShape()
  vertex(200, 600);
  vertex(200, 500);
  vertex(50, 500);
  vertex(50, 50);
  vertex(550, 50);
  vertex(550, 200);
  vertex(700, 200);
  vertex(700, 400);
  vertex(550, 400);
  vertex(550, 500);
  vertex(400, 500);
  vertex(400, 600);
  endShape();
  pop();
  push();
  noFill();
  strokeWeight(15);
  stroke('#070f24');
  beginShape()
  vertex(200 + 20, 600);
  vertex(200 + 20, 500 - 20);
  vertex(50 + 20, 500 - 20);
  vertex(50 + 20, 50 + 20);
  vertex(550 - 20, 50 + 20);
  vertex(550 - 20, 200 + 20);
  vertex(700, 200 + 20);
  vertex(700, 400 - 20);
  vertex(550 - 20, 400 - 20);
  vertex(550 - 20, 500 - 20);
  vertex(400 - 20, 500 - 20);
  vertex(400 - 20, 600);
  endShape();
  pop();
}


function drawSkull(Xcoord, Ycoord, sWeight) {
  push();
  noStroke();
  fill('#070f24');
  ellipse(Xcoord, Ycoord, 90 + sWeight, 80 + sWeight)
  rect(Xcoord, Ycoord + 40, 30 + sWeight, 10 + sWeight)
  fill('#bee0e8')
  ellipse(Xcoord, Ycoord, 90, 80)
  rect(Xcoord, Ycoord + 40, 30, 10)
  fill('white');
  ellipse(Xcoord, Ycoord - 10, 85, 60)
  fill('black');
  ellipse(Xcoord - 20, Ycoord + 20, 25, 20)
  ellipse(Xcoord + 20, Ycoord + 20, 25, 20)
  ellipse(Xcoord, Ycoord + 30, 10, 10)
  pop();
}

function drawBackgroundSkull(Xcoord, Ycoord, sWeight) {
  push();
  noStroke();
  fill('#070f24');
  ellipse(Xcoord, Ycoord, 90 + sWeight, 80 + sWeight)
  rect(Xcoord, Ycoord + 40, 30 + sWeight, 10 + sWeight)
  fill('#7ed7f7')
  ellipse(Xcoord, Ycoord, 90, 80)
  rect(Xcoord, Ycoord + 40, 30, 10)
  fill('#bee0e8');
  ellipse(Xcoord, Ycoord - 10, 85, 60)
  fill('black');
  ellipse(Xcoord - 20, Ycoord + 20, 25, 20)
  ellipse(Xcoord + 20, Ycoord + 20, 25, 20)
  ellipse(Xcoord, Ycoord + 30, 10, 10)
  pop();
}


//scene zero elements

function drawSceneZero() {
  background('#031533')
  push();
  fill('#f7b5f4')
  circle(300, 300, 200)
  pop();
  drawRabbit(260, 300)
  push();
  textAlign(CENTER);
  textSize(30);
  fill('black')
  stroke('#f7b5f4')
  strokeWeight(5);
  text("THE WIZARD'S HOUSE", 300, 150)
  fill('white')
  noStroke()
  textSize(20);
  text("press ENTER to start", 300, 470)
  text("press LEFT/RIGHT/UP/DOWN arrow to move", 300, 500)
  pop();


}


function drawRabbit(X1, Y1) {
  push();
  rectMode(CORNER)
  stroke('#070f24');
  strokeWeight(10);
  fill('#7f95e3');
  rect(X1, Y1, 80, 50, 10, 10, 10, 10);
  rect(X1 + 50, Y1 - 70, 20, 70, 20, 20, 0, 0);
  rect(X1 + 10, Y1 - 70, 20, 70, 20, 20, 0, 0);
  stroke('brown');
  strokeWeight(5);
  line(X1 + 10, Y1 + 25, X1 + 30, Y1 + 25);
  line(X1 + 50, Y1 + 25, X1 + 70, Y1 + 25);

  pop()

}

//this function is built for rectMode(CENTER)
function pointInsideRect(pointX, pointY, x, y, xW, yW) {
  if (pointX >= x - xW * 0.5 && // right of the left edge AND
    pointX <= x + xW * 0.5 && // left of the right edge AND
    pointY >= y - yW * 0.5 && // below the top AND
    pointY <= y + yW * 0.5) { // above the bottom
    return true;
  }
  return false;
}


// the followings are how I constrained the movement of the rabbit inside the walls


function pointInsideCircle(pointA, pointB, cirA, cirB, radius) {
  if (dist(pointA, pointB, cirA, cirB) <= radius) {
    return true
  }
  return false
}



function movement(x, y) {

  if (sceneValue == 1) {
    hitSceneOneAreaA = pointInsideRect(x, y, 350, 280, 530, 100)
    hitSceneOneAreaB = pointInsideRect(x, y, 280, 500, 150, 350)
    if (hitSceneOneAreaA || hitSceneOneAreaB) {
      return true
    }
    return false
  }

  if (sceneValue == 2) {
    //  rect(350, 200, 100, 400);
    //rect(250, 450, 100, 300);
    hitSceneTwoAreaA = pointInsideRect(x, y, 300, 200, 60, 400)
    hitSceneTwoAreaB = pointInsideRect(x, y, 220, 450, 80, 300)
    if (hitSceneTwoAreaA || hitSceneTwoAreaB) {
      return true
    }
    return false

  }

  if (sceneValue == 3) {
    hitSceneThreeAreaA = pointInsideRect(x, y, 220, 100, 60, 200)
    hitSceneThreeAreaB = pointInsideCircle(x, y, 270, 350, 225)
    if (hitSceneThreeAreaA || hitSceneThreeAreaB) {
      return true
    }
    return false
  }

}


// only move while inside certain geometries
function keyPressed() {


  if (keyCode === RIGHT_ARROW && movement(rabbitX + 20, rabbitY)) {
    rabbitX = rabbitX + 20
  }
  if (keyCode === LEFT_ARROW && movement(rabbitX - 20, rabbitY)) {
    rabbitX = rabbitX - 20
    if (rabbitX < smallestX) {
      smallestX = rabbitX
    }
  }
  if (keyCode === UP_ARROW && movement(rabbitX, rabbitY - 20)) {
    rabbitY = rabbitY - 20
  }
  if (keyCode === DOWN_ARROW && movement(rabbitX, rabbitY + 20)) {
    rabbitY = rabbitY + 20
  }

  if (keyCode === ENTER) {
    sceneValue = 1
  }

}

//implement fire rain

class flame {

  constructor() {
    this.x = random(0, width)
    this.y = 0
    this.speed = random(5, 15)
  }

  fall() {
    this.y = this.y + this.speed
  }

  display() {
    drawFire(this.x, this.y)

  }

}

