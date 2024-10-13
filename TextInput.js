class TextInput {
    constructor(input) {
        this.text = input;
        this.color = createColorFromText(input);
        this.backgroundcolor = getComplementaryColor(this.color);
        this.lerpFactor = 0;
        this.targetColor = this.color;

        // Create graphics buffers for background, shapes, and text
        this.backgroundBuffer = createGraphics(windowWidth, windowHeight);
        this.textBuffer = createGraphics(windowWidth, windowHeight);
    }

    setColor(newColor) {
        this.targetColor = newColor;
        this.lerpFactor = 0; // Reset lerp factor when color changes
    }

    updateColor() {
        /** little easter egg */
        if (this.text.includes('brat')) {
            this.targetColor = color(0,0,0);
            this.color = lerpColor(this.color, this.targetColor, this.lerpFactor);
            this.backgroundcolor = (lerpColor(this.backgroundcolor, color(168, 204, 0), this.lerpFactor));
            this.lerpFactor += 0.001; // Increment the lerp factor
            if (this.lerpFactor > 1) {
                this.lerpFactor = 1; // Cap the lerp factor
            }
        } else {
            this.color = lerpColor(this.color, this.targetColor, this.lerpFactor);
            this.backgroundcolor = (lerpColor(this.backgroundcolor, getComplementaryColor(this.color), this.lerpFactor));
            this.lerpFactor += 0.001; // Increment the lerp factor
            if (this.lerpFactor > 1) {
                this.lerpFactor = 1; // Cap the lerp factor
            }
        }
    }

    draw() {
        this.updateColor(); // Update the color before drawing

        let textInput = this.text;
        let textColor = this.color;

        // Clear the buffers
        this.backgroundBuffer.clear();
        this.textBuffer.clear();

        // Draw the background
        this.backgroundBuffer.background(this.backgroundcolor);

        // Draw the text
        if (textInput) {
            this.textBuffer.textSize(100);
            this.textBuffer.textFont(customFont);
            this.textBuffer.textAlign(CENTER, CENTER);
            this.textBuffer.fill(textColor);
            this.textBuffer.text(textInput, windowWidth / 2, windowHeight / 2);
        }

    }
}

// Function to generate a color based on text
function createColorFromText(text) {
    if (text === '') {
        return color(0); // Return black if the text is empty
    }
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
        hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }
    return color(hash % 255, (hash >> 8) % 255, (hash >> 16) % 255);
}

// Function to get the complementary color
function getComplementaryColor(c) {
    return color(255 - red(c), 255 - green(c), 255 - blue(c));
}

