var input;

function setup() {
  createCanvas(windowWidth, windowHeight);
  input = createElement('textarea');
  input.position(20,30);

}

function draw() {
  background(0);
  drawText();
}

function drawText() {
  let textInput = input.value()
  
  if (textInput) {
    textSize(100)
    fill('yellow');
    text(textInput, windowWidth/2, windowHeight/2);
  }
}

window.windowResized = function () {
    // Resize the canvas when the window is resized
    resizeCanvas(windowWidth, windowHeight);
    setBackgroundColor();
}