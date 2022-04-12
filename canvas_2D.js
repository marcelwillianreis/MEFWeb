class canvas_2D {
    constructor(scene) {
        //mouse position
        this.mouseInCanvas = true
        this.precision = 1
        this.dx = round(0.0, this.precision)
        this.dy = round(0.0, this.precision)
        this.cursor2D = cursor(CROSS)
        this.scene = scene
        this.isSnap = true
        this.gridX = 1
        this.gridY = 1
    }

    //position in the new scale with origin in the same position of the camera world
    mousePosition() {

        this.dx = round(((mouseX / width) * (scene._right - scene._left) + scene._left), this.precision)
        this.dy = round(((mouseY / height) * (scene._bottom - scene._top) + scene._top), this.precision)


        if (this.mouseInsideCanvas()) {
            //snap
            if (this.isSnap) {
                let snap = []
                snap = this.snapTo()
                this.dx = snap[0].x
                this.dy = snap[0].y
            }

            //drawing in the label
            labelMouseX.elt.firstChild.data = `x: ${this.dx}`
            labelMouseY.elt.firstChild.data = ` y: ${this.dy}`
        }

    }

    mouseCursor(type) {
        this.cursor2D = cursor(type)
        //colocar estes cursores na situação escolhida.
        /*       this.cursor2D = cursor()
              this.cursor2D = cursor(ARROW)
              this.cursor2D = cursor(CROSS)
              this.cursor2D = cursor(HAND)
              this.cursor2D = cursor(MOVE)
              this.cursor2D = cursor(TEXT)
              this.cursor2D = cursor(WAIT) */
    }

    mouseInsideCanvas() {
        if (this.dx >= this.scene._right
            || this.dx <= this.scene._left ||
            this.dy >= this.scene._top ||
            this.dy <= this.scene._bottom) {

            this.mouseInCanvas = false

        } else {
            this.mouseInCanvas = true
        }

        return this.mouseInCanvas
    }

    
    origin(oX, oY) {
        //create origin   
        let x, y
        stroke(0)
        strokeWeight(3)
        beginShape(LINES)
        x = oX - this.gridX * 0.2
        y = oX
        vertex(x, y, 0)
        x = oX + this.gridX * 0.2
        y = oX
        vertex(x, y, 0)
        endShape()

        beginShape(LINES)
        x = oX
        y = oY - this.gridY * 0.2
        vertex(x, y, 0)
        x = oX
        y = oY + this.gridY * 0.2
        vertex(x, y, 0)
        endShape()
    }

    makeDisplaygrid(scene) {
        push()
        let oX = 0
        let oY = 0
        let x = 0
        let y


        //points to make a grid
        beginShape(POINTS)
        stroke(0)
        strokeWeight(1.5)
        while (x >= scene._left) {
            y = 0
            while (y >= scene._bottom) {
                vertex(x, -y)
                y -= this.gridY
            }
            x -= this.gridX
        }

        x = 0
        while (x <= scene._right) {
            y = 0
            while (y >= scene._bottom) {
                vertex(x, -y)
                y -= this.gridY
            }
            x += this.gridX
        }

        x = 0
        while (x <= scene._right) {
            y = 0
            while (y <= scene._top) {
                vertex(x, -y)
                y += this.gridY
            }
            x += this.gridX
        }

        x = 0
        while (x >= scene._left) {
            y = 0
            while (y <= scene._top) {
                vertex(x, -y)
                y += this.gridY
            }
            x -= this.gridX
        }

        endShape()

        this.origin(oX, oY)

        pop()
    }


    setGrid(gridx, gridy) {
        this.gridX = gridx
        this.gridY = gridy
    }

    getGrid() {
        let grid = []
        grid.push(createVector(this.gridX, this.gridY))
        return grid
    }

    
    setSnap(boolenaSnap) {
        this.isSnap = boolenaSnap
    }

    snapTo(){
        let ip;   // integer part
        let fp;   // "fraction" part
        let x = this.dx;
        let y = this.dy;
        let snap = []

        fp = x / this.gridX;
        ip = parseInt(fp);
        fp = fp - ip;
        if (fp > 0.5)
            x = (ip + 1.0) * this.gridX;
        else if (fp < -0.5)
            x = (ip - 1.0) * this.gridX;
        else
            x = ip * this.gridX;

        fp = y / this.gridY;
        ip = parseInt(fp);
        fp = fp - ip;
        if (fp > 0.5)
            y = (ip + 1.0) * this.gridY;
        else if (fp < -0.5)
            y = (ip - 1.0) * this.gridY;
        else
            y = ip * this.gridY;

        snap.push(createVector(x, y))

        return snap
    }
}