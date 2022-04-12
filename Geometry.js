class Geometry{
    constructor(){        
        this.p1 = createVector(x,y)
        this.p2 = createVector(x,y)        
    }

    createline(){
        if(this.drawing){
            stroke(0,255,0)
            push()
            beginShape(LINES);
            stroke(0.1, 100, 100);
            translate(0, 100);
            vertex(p1.x, p1,y);
            vertex(p2.x, p2,y);
            pop();
            endShape();
        }
    }
}