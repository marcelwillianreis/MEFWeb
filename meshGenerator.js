class meshGenerator {
    constructor() {
        this.nodes = []
    }

    generateLineMesh(struct) {
        if(model.V_lines.length < 1){
            alert('There is no geometry to create mesh')            
            return true
        }

        //create nodes
        for(var i = 0; i < model.V_lines.length; i++)
        {
            struct.createNode(model.V_lines[i].m_x1, -model.V_lines[i].m_y1)
        }
        

        this.showMesh()
        return false
    }

    showMesh() {
        //DRAW MESH
        if (model.V_lines.length >= 1) {
            push()
            stroke(0,200,0);
            beginShape(LINES); 
            for (var i = 0; i < model.V_lines.length; i++) {
                vertex(model.V_lines[i].m_x1, -model.V_lines[i].m_y1)
                vertex(model.V_lines[i].m_x2, -model.V_lines[i].m_y2)
            }
            endShape();

            strokeWeight(7)
            stroke(0,200,0);
            beginShape(POINTS); 
            for (var i = 0; i < model.V_lines.length; i++) {
                vertex(model.V_lines[i].m_x1, -model.V_lines[i].m_y1)
                vertex(model.V_lines[i].m_x2, -model.V_lines[i].m_y2)
            }
            endShape();
            pop()
        }
    }
}