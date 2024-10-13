var input;
var customFont;
var textInputInstance;
var debounceTimeout;

function preload() {
    // Load a custom font before the sketch starts
    customFont = loadFont("kh-teka/KHTekaTRIAL-Regular.woff");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);

    // Text input (hidden with CSS, the text itself is drawn in drawText)
    input = createElement('textarea');
    input.position(0, 0);

    // Create an initial TextInput instance
    textInputInstance = new TextInput(input.value());

    // Listen for input changes and update the TextInput instance with debounce
    input.input(() => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            textInputInstance.text = input.value();

            // If the input is empty, set the text color to black; otherwise, generate a color from the input
            let newTextColor = input.value() === '' ? color(0,0,0) : createColorFromText(input.value());
            textInputInstance.setColor(newTextColor);
        }, 0); // Adjust the debounce delay if needed
    });
}

function draw() {
    // Clear the canvas
    background(255);

    // Draw the text input and update its color
    textInputInstance.draw();
}

window.windowResized = function () {
    // Resize the canvas when the window is resized
    resizeCanvas(windowWidth, windowHeight);
}