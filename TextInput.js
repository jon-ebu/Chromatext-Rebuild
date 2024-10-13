class TextInput {
    constructor(input) {
        this.color = createColorFromText(input);
        this.text = input;
    }
    draw() {
        let textInput = this.text;
        let textColor = this.color

        if (textInput) {
            textSize(100);
            textFont(customFont);
            textAlign(CENTER, CENTER);
            fill(textColor);
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
        }}
    }

// Function to generate a color based on text
function createColorFromText(text) {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
        hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }
    const r = (hash >> 24) & 255;
    const g = (hash >> 16) & 255;
    const b = (hash >> 8) & 255;
    return color(r, g, b);
}