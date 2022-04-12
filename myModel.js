class myModel {
    constructor() {
        //atribute of origin
        this.scaleOrigin = 0.02

        //vector of points
        this.m_verts = []
        this.m_vcolors = []
        this.V_lines = []


        //REFERENCE TRIANGLE TO CREATE CANVAS, CAMERA AND OTHERS
        /*         //create points
                this.m_verts.push(createVector(0, 0))
                this.m_verts.push(createVector(5, 0))
                this.m_verts.push(createVector(2.5, -5))
        
                //create colors
                this.m_vcolors.push(createVector(255, 0.0, 0.0))
                this.m_vcolors.push(createVector(0.0, 255, 0.0))
                this.m_vcolors.push(createVector(0.0, 0.0, 255)) */

    }

    showModel() {
        /*         
                push()
                noStroke()
                beginShape(TRIANGLES);
                for (var i = 0; i < this.m_verts.length; i++) {
                    fill(color(this.m_vcolors[i].x, this.m_vcolors[i].y, this.m_vcolors[i].z))
                    vertex(this.m_verts[i].x, this.m_verts[i].y)
                }
                endShape(); 

  
        pop()*/

        //DRAW LINES
        if (this.V_lines.length >= 1) {
            push()
            beginShape(LINES);

            for (var i = 0; i < this.V_lines.length; i++) {
                vertex(this.V_lines[i].m_x1, -this.V_lines[i].m_y1)
                vertex(this.V_lines[i].m_x2, -this.V_lines[i].m_y2)
            }

            endShape();
            pop()
        }

    }

    createLines() {
        this.V_lines.push(new _line())
        noFill()
    }

    getBoundBox(_left, _right, _bottom, _top) {
        let boundBoxVector = []

        //m_verts
        let m_verts = []

        if (this.V_lines.length >= 1) {
            for (var i = 0; i < this.V_lines.length; i++) {
                m_verts.push(createVector(this.V_lines[i].m_x1, -this.V_lines[i].m_y1))
                m_verts.push(createVector(this.V_lines[i].m_x2, -this.V_lines[i].m_y2))
            }
        }


        if (m_verts.length < 1 || this.V_lines.length < 1) {
            let _xmin = -1
            let _xmax = 9
            let _ymin = 1
            let _ymax = -9
            boundBoxVector.push(createVector(_xmin, _ymin))
            boundBoxVector.push(createVector(_xmax, _ymax))
            return boundBoxVector;
        }


        let _xmin = m_verts[0].x
        let _xmax = _xmin
        let _ymin = m_verts[0].y
        let _ymax = _ymin

        for (var i = 1; i < m_verts.length; i++) {
            if (m_verts[i].x < _xmin)
                _xmin = m_verts[i].x;

            if (m_verts[i].x > _xmax)
                _xmax = m_verts[i].x;

            if (m_verts[i].y > _ymin)
                _ymin = m_verts[i].y;

            if (m_verts[i].y < _ymax)
                _ymax = m_verts[i].y;
        }

        boundBoxVector.push(createVector(_xmin, _ymin))
        boundBoxVector.push(createVector(_xmax, _ymax))

        return boundBoxVector
    }
}