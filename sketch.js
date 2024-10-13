var input;

function preload() {
    // Load a custom font before the sketch starts
    customFont = loadFont("kh-teka/KHTekaTRIAL-Regular.woff");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  /** Text input (hidden with CSS,
   * the text itself is drawn in drawText) */
  input = createElement('textarea');
  input.position(20,30);
}

function draw() {
  background(0);
  let textInput = new TextInput(input.value());
  textInput.draw();
}

window.windowResized = function () {
    // Resize the canvas when the window is resized
    resizeCanvas(windowWidth, windowHeight);
    setBackgroundColor();
}
