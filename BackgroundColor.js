class BackgroundColor {
    constructor(r,g,b) {
        console.log(color)
        this.r = r;
        this.g = g;
        this.b = b;
    }
    draw() {
        rect(30, 20, 55, 40);
        let complementaryColor = getComplementaryColor(color(this.r,this.g,this.b));
        background(complementaryColor);
    }
}

// Function to calculate the complementary color
function getComplementaryColor(bgColor) {
    return color(255 - bgColor.levels[0], 255 - bgColor.levels[1], 255 - bgColor.levels[2]);
}