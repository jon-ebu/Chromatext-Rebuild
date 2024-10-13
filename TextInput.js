class TextInput {
    constructor(input) {
        this.text = input;
        this.color = createColorFromText(input);
        this.backgroundcolor = getComplementaryColor(this.color);
        this.lerpFactor = 0;
        this.targetColor = this.color;
    }

    setColor(newColor) {
        this.targetColor = newColor;
        this.lerpFactor = 0; // Reset lerp factor when color changes
    }

    updateColor() {
        this.color = lerpColor(this.color, this.targetColor, this.lerpFactor);
        this.backgroundcolor = getComplementaryColor(this.color);
        this.lerpFactor += 0.0001; // Increment the lerp factor
        if (this.lerpFactor > 1) {
            this.lerpFactor = 1; // Cap the lerp factor
        }
    }

    draw() {
        this.updateColor(); // Update the color before drawing

        let textInput = this.text;
        let textColor = this.color;

        if (textInput) {
            textSize(100);
            textFont(customFont);
            textAlign(CENTER, CENTER);
            fill(textColor);
            background(this.backgroundcolor);
            text(textInput, windowWidth / 2, windowHeight / 2);
        }
        /** easter egg */
        if (textInput.includes('brat')) {
            background(138, 206, 0);
            textSize(100);
            textFont(customFont);
            textAlign(CENTER, CENTER);
            fill('black');
            text(textInput, windowWidth / 2, windowHeight / 2);
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