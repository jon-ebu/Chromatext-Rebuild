var input;

function preload() {
    // Load a custom font before the sketch starts
    customFont = loadFont("kh-teka/KHTekaTRIAL-Regular.woff");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    /** Text input (hidden with CSS,
     * the text itself is drawn in drawText) */
    input = createElement('textarea');
    input.position(0, 0);
}

function draw() {
    let textInput = new TextInput(input.value());
    let textColor = textInput.color;
    let textColorVals = [red(textColor), green(textColor), blue(textColor)];
    let background = new BackgroundColor(textColorVals[0], textColorVals[1], textColorVals[2]);
    background.draw();
    textInput.draw();
}

window.windowResized = function () {
    // Resize the canvas when the window is resized
    resizeCanvas(windowWidth, windowHeight);
}
