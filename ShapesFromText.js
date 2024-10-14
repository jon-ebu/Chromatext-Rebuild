class ShapesFromText {
    constructor(text) {
        this.text = text;
        this.shapes = [];
    }

    generateShapesFromText(text) {
        let words = text.split(' ');
        let shapes = [];
        for (let word of words) {
            // Adjust shape size with third argument
            shapes.push(new VertexShape(random(width), random(height), random(10, 600), word));
        }
        return shapes;
    }

    drawShapes(buffer) {
        // Clear the buffer to make it transparent
        buffer.clear();
        // Generate shapes based on the text
        this.shapes = this.generateShapesFromText(this.text);

        // Draw each shape onto the provided buffer
        for (let shape of this.shapes) {
            shape.draw(buffer);
        }
    }
}

class VertexShape {
    constructor(x, y, diameter, char) {
        this.x = x;
        this.y = y;
        this.diameter = diameter;
        this.vertices = char.length;
        this.char = char;
        this.angle = 0; // Initial rotation angle
        this.rotationSpeed = random(0.01, 0.05); // Random rotation speed

        // Ensure the initial position is within the canvas boundaries
        this.x = constrain(this.x, this.diameter / 2, width - this.diameter / 2);
        this.y = constrain(this.y, this.diameter / 2, height - this.diameter / 2);
    }

    update() {
        // Update the rotation angle
        this.angle += this.rotationSpeed;
    }

    draw(buffer) {
        this.update();
        buffer.noStroke();

        // Calculate a tertiary color for shapes
        if (this.char != undefined) {
            let shapeColor = createColorFromText(this.char);
            console.log('Shape color: ' + shapeColor);
            buffer.fill(shapeColor);
        }

        buffer.push();
        // buffer.translate(width / 2, height / 2); // Translate to the center of the window
        buffer.rotate(this.angle);

        // Draw shape with X vertices
        // where X is the length of the word
        if (this.vertices === 1) {
            // Draw a line if the word is one character long
            buffer.line(0, 0, this.diameter, 0);
        } else {
            // Draw a shape with as many vertices as the length of the word
            buffer.beginShape();
            for (let i = 0; i < this.vertices; i++) {
                console.log("vertices: " + this.vertices);
                let angle = TWO_PI / this.vertices * i;
                let vx = this.x + cos(angle) * this.diameter / 2;
                let vy = this.y + sin(angle) * this.diameter / 2;
                buffer.vertex(vx, vy);
            }
            buffer.endShape(CLOSE);

        }
        buffer.pop();
    }
}