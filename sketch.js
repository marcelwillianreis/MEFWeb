let cnv
let viewport
let list = []
let scene
let _scale = 2
let cam
let delta = 0.5
let model = null
let canvasFac = 0.8
let angle = 0

//mouse moving
let isMoving = false

//buttons
let buttonFit
const Button_FacY = 0.025
let buttonZoonIn
const ButtonZoonIn_Fac = 0.12
let buttonZoonOUT
const buttonZoonOUT_Fac = 0.27
let buttonPanLeft
let buttonPanRight
let buttonPanTop
let buttonPanBotton
let buttonLoop
const buttonLoop_Fac = 0.97
let buleanLoop = false

let buttonLine
let statusLineButton = false
let typeClickLine = ''

let generateMesh
let isGeometry = true

//check box
let checkboxGrid
let isGrid = true

let checkboxSnap
let isSnap = false

//labels
let labelMouseX
let labelMouseY

let p1
let p2

let lineColor = []

let SecCnv = document.getElementById('_center')
let x = SecCnv.clientWidth
let y = SecCnv.clientHeight
function setup() {

  //create a canvas and a camera

  print(x)
  print(y)
  cnv = createCanvas(x, y, WEBGL);
  cnv.parent("_center");


  //Create a model  
  model = new myModel()

  //create a mesh object
  mesh = new meshGenerator()

  //Create a camera  
  scene = new Camera(model)

  //Canvas_2D whith mouse position
  Canvas_2D = new canvas_2D(scene)

  //create a new structure
  struct = new structure()

  //mouse events
  _mouseEvents = new mouseEvents(MouseEvent)

  //Create buttons
  //buttonFit = createImg('fit.jpg');
  buttonFit = createButton('FIT');
  buttonFit.position(10, Button_FacY * windowHeight);
  buttonFit.mousePressed(fitButtonPressed);

  buttonZoonIn = createButton('ZoonIN');
  buttonZoonIn.position(50, Button_FacY * windowHeight);
  buttonZoonIn.mousePressed(ZoonINButtonPressed);

  buttonZoonOUT = createButton('ZoonOUT');
  buttonZoonOUT.position(115, Button_FacY * windowHeight);
  buttonZoonOUT.mousePressed(ZoonOUTButtonPressed);

  buttonPanLeft = createButton('PanLeft');
  buttonPanLeft.position(195, Button_FacY * windowHeight);
  buttonPanLeft.mousePressed(panLeftButtonPressed);

  buttonPanRight = createButton('PanRight');
  buttonPanRight.position(262, Button_FacY * windowHeight);
  buttonPanRight.mousePressed(panRightButtonPressed);

  buttonPanTop = createButton('PanTop');
  buttonPanTop.position(339, Button_FacY * windowHeight);
  buttonPanTop.mousePressed(panTopButtonPressed);

  buttonPanBotton = createButton('PanBotton');
  buttonPanBotton.position(405, Button_FacY * windowHeight);
  buttonPanBotton.mousePressed(panBottonButtonPressed);

  buttonLine = createButton('Line');
  buttonLine.position(10, 2.3 * Button_FacY * windowHeight);
  buttonLine.mousePressed(lineButtonPressed);

  generateMesh = createButton('Mesh');
  generateMesh.position(55, 2.3 * Button_FacY * windowHeight);
  generateMesh.mousePressed(meshButtonPressed);

  //create checkbox
  checkboxGrid = createCheckbox('Grid', true);
  checkboxGrid.changed(myCheckedGrid);
  checkboxGrid.parent("_sideRight");
  //checkboxGrid.position(100,100)

  checkboxSnap = createCheckbox('Snap', true);
  checkboxSnap.changed(myCheckedSnap);
  checkboxSnap.parent("_sideRight");

  //create lables
  labelMouseX = createElement('labelMouseX', `x: ${Canvas_2D.dx}`);
  labelMouseX.style('color', 'black');
  //labelMouseX.position(10, height * 0.98);
  labelMouseX.parent("_sideRight");


  labelMouseY = createElement('labelMouseY', ` y: ${Canvas_2D.dy}`);
  labelMouseY.style('color', 'black');
  labelMouseY.parent("_sideRight");
  //labelMouseY.position(70, height * 0.98);



  //Choose if between loop and no loop (default is noLoop)
  buttonLoop = createButton('Loop');
  buttonLoop.position(488, Button_FacY * windowHeight);
  buttonLoop.mousePressed(scene.useLoop);

  noLoop()


}


//function to draw with or whithout loop, use redraw() if no loop
function draw() {

  background(240, 240, 240)

  if (isGrid) {
    Canvas_2D.makeDisplaygrid(scene)
  }

  if (isGeometry) {
    model.showModel()
  } else {
    isGeometry = mesh.generateLineMesh(struct)
  }

  scene.animateModel()
  scene.camera()
}

//Description
//The windowResized() function is called once every time the browser window is resized. 
//This is a good place to resize the canvas or do any other adjustments to accommodate the new window size.
//Syntax: windowResized([event])
//Object: optional Event callback argument. (Optional)
function windowResized() {
  if (canvasFac * windowWidth > 600) {
    resizeCanvas(canvasFac * windowWidth, canvasFac * windowHeight);
    scene.fitWorldToViewport(1.15)
    labelMouseX.parent("_sideRight");
    labelMouseY.parent("_sideRight");
    /* labelMouseX.position(10, height * 0.98);
    labelMouseY.position(70, height * 0.98); */
  }
}



//################################# BUTTON FUNCTIONS #######################
function fitButtonPressed() {
  scene.fitWorldToViewport(1.1)
}

function ZoonINButtonPressed() {
  scene.scaleWorldWindow(1 / 1.1)
}

function ZoonOUTButtonPressed() {
  scene.scaleWorldWindow(1.1)
}

function panLeftButtonPressed() {
  scene.panWorldWindow(0.1, 0)
}

function panRightButtonPressed() {
  scene.panWorldWindow(-0.1, 0)
}

function panTopButtonPressed() {
  scene.panWorldWindow(0, -0.1)
}

function panBottonButtonPressed() {
  scene.panWorldWindow(0, 0.1)
}

function lineButtonPressed() {
  statusLineButton = true
  typeClickLine = 'firstClick'
}

function meshButtonPressed() {
  if (isGeometry) {
    isGeometry = false
  } else {
    isGeometry = true
  }
  redraw()
}
//################################# BUTTON FUNCTIONS #######################

//################################# CHECKBOX FUNCTIONS #######################
function myCheckedGrid() {
  if (isGrid) {
    isGrid = false
    checkboxSnap.elt.firstElementChild.checked = false
    checkboxSnap.elt.hidden = true
    Canvas_2D.isSnap = false
  } else {
    isGrid = true
    checkboxSnap.elt.hidden = false
  }


  redraw()
}

function myCheckedSnap() {
  if (Canvas_2D.isSnap) {
    Canvas_2D.isSnap = false
  } else {
    Canvas_2D.isSnap = true
  }
  redraw()
}
//################################# CHECKBOX FUNCTIONS #######################


//################################# KEYBOARD FUNCTIONS #######################
function keyPressed(event) {
  scene.moving()
  redraw()
  if (keyIsDown(70)) // tecla F
  {
    scene.useLoop()
  }
  if (keyIsDown(71)) // tecla G
  {
    myCheckedGrid()
    if (checkboxGrid.elt.firstElementChild.checked) {
      checkboxGrid.elt.firstElementChild.checked = false
    } else {
      checkboxGrid.elt.firstElementChild.checked = true
    }
  }
  if (keyIsDown(76)) // tecla L
  {
    statusLineButton = true
    typeClickLine = 'secondClick'
  }
}

function keyReleased() {

}

//################################# KEYBOARD FUNCTIONS #######################

