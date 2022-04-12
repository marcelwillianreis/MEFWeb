
class mouseEvents {
  constructor(e) {
    this.e = e
  }

  mouseButtons() {
    if (this.e.mousePressed()) {
      if (this.e.mouseButton === LEFT) {

      }
      if (this.e.mouseButton === RIGHT) {

      }
      if (this.e.mouseButton === CENTER) {

      }
    }
  }
}

//################################# MOUSE FUNCTIONS #######################

function mouseMoved() {
  //EVALUTE NEW POSITION OF MOUSE IN THE SOFTWARE SCALE WORLD
  Canvas_2D.mousePosition()

  //check if the mouse arrow is within the canvas
  if (Canvas_2D.mouseInsideCanvas()) {
    if (model.V_lines.length >= 1) {

      if (!model.V_lines[model.V_lines.length - 1].isPossible()) {
        var temp = model.V_lines[model.V_lines.length - 1].getPointsToDraw(Canvas_2D.dx, Canvas_2D.dy)
        model.V_lines[model.V_lines.length - 1].setPoints(temp[0].x, temp[0].y, temp[1].x, temp[1].y)
        redraw()
      }
    }
  }

}

//Description
//If argument is given, sets the sketch to fullscreen or not based on the value of the argument. 
//If no argument is given, returns the current fullscreen state. 
//Note that due to browser restrictions this can only be called on user input, for example, on mouse press like the example below.
//Syntax: fullscreen([val])
//Parameters val:Boolean: whether the sketch should be in fullscreen mode or not (Optional)
//Returns: Boolean: current fullscreen state
function mousePressed() {

  //check if the mouse arrow is within the canvas


  if (mouseButton === LEFT) {

  }

  if (mouseButton === RIGHT) {

  }
  if (mouseButton === CENTER) {

  }

}


function mouseReleased() {
  if (Canvas_2D.mouseInsideCanvas()) {
    if (mouseButton === LEFT) {
      if (statusLineButton) {

        if (typeClickLine == 'secondClick') {
          model.createLines()
          model.V_lines[model.V_lines.length - 1].addPoint(Canvas_2D.dx, Canvas_2D.dy)
          statusLineButton = false
          typeClickLine = 'thirdClick'

        } else if (typeClickLine == 'firstClick') {
          typeClickLine = 'secondClick'
        }

      } else {
        if (model.V_lines.length >= 1) {
          if (typeClickLine == 'thirdClick') {
            model.V_lines[model.V_lines.length - 1].addPoint(Canvas_2D.dx, Canvas_2D.dy)
            typeClickLine = ''
            statusLineButton = false
          }
        }
      }
    }
    if (mouseButton === RIGHT) {

    }
    if (mouseButton === CENTER) {

      scene.fitWorldToViewport(1.1)
    }
  }
}

function mouseClicked() {

}

function mouseWheel(event) {
  let _scroll = event.delta
  if (event.delta > 0)
    scene.scaleWorldWindow(1.1)
  else if (event.delta < 0)
    scene.scaleWorldWindow(1 / 1.1)
  else { }
}

//################################# MOUSE FUNCTIONS #######################