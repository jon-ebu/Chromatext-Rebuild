var input;
var customFont;
var textInputInstance;
var shapes;
var debounceTimeout;
var shouldDrawShapes = false;
var backgroundBuffer;
var shapesBuffer;
var textBuffer;



function preload() {
    // Load a custom font before the sketch starts
    customFont = loadFont("kh-teka/KHTekaTRIAL-Regular.woff");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);

    // Create graphics buffers for background, shapes, and text
    backgroundBuffer = createGraphics(windowWidth, windowHeight);
    shapesBuffer = createGraphics(windowWidth, windowHeight);
    textBuffer = createGraphics(windowWidth, windowHeight);

    // Text input (hidden with CSS, the text itself is drawn in drawText)
    input = createElement('textarea');
    input.position(0, 0);

    // Create an initial TextInput instance
    textInputInstance = new TextInput(input.value());

    // Create an initial ShapesFromText instance
    shapes = new ShapesFromText("hello :)");

    // Listen for input changes and update the TextInput and SHapesFromText instances with debounce
    input.input(() => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            textInputInstance.text = input.value();

            // If the input is empty, set the text color to black; otherwise, generate a color from the input
            let newTextColor = input.value() === '' ? color(0, 0, 0) : createColorFromText(input.value());
            textInputInstance.setColor(newTextColor);

            // Update the ShapesFromText instance with the new input
            shapes.text = input.value();

            // Set the flag to draw shapes
            shouldDrawShapes = true;

        }, 0); // Adjust the debounce delay if needed
    });
}

function draw() {
    // Clear the main canvas
    background(255);

    // Continuously update and draw shapes
    // shapes.drawShapes(shapesBuffer);

    // Draw the background buffer onto the main canvas
    backgroundBuffer.background(textInputInstance.backgroundcolor);

    // Draw the background buffer onto the main canvas
    image(backgroundBuffer, 0, 0);

    // Apply blur to the shapes buffer
    shapesBuffer.filter(BLUR, 10); // Adjust the blur amount as needed

    // Draw shapes if shouldDrawShapes is true...
    if (shouldDrawShapes) {
        // Delay the drawing of the shapes buffer onto the main canvas by 300 milliseconds
        setTimeout(() => {
            shapesBuffer.clear(); // Clear the shapes buffer
            shapes.drawShapes(shapesBuffer); // Draw shapes onto the buffer
            shouldDrawShapes = false; // Reset the flag after drawing
            image(shapesBuffer, 0, 0);
        }, 0);
    } else {
        image(shapesBuffer, 0, 0);
    }

    // Draw the text input and update its color...
    // Then draw the text buffer onto the main canvas
    textInputInstance.draw();
    image(textInputInstance.textBuffer, 0, 0);
}

window.windowResized = function () {
    // Resize the canvas and the graphics buffers when the window is resized
    resizeCanvas(windowWidth, windowHeight);
    backgroundBuffer = createGraphics(windowWidth, windowHeight);
    shapesBuffer = createGraphics(windowWidth, windowHeight);
    textBuffer = createGraphics(windowWidth, windowHeight);
}