const PAINTCOLORS = ['black', 'white', 'blue', 'orange', 'red', 'green'];
var currentActiveColorIndex = 0;
var isUserClicking = false;
var isEraserActive;
var pixelCanvasSize = 16;

function drawCanvas(){
    var sketchPadDiv = document.createElement('div');
    sketchPadDiv.setAttribute('id', 'sketch-pad');

    for (var i = 0; i < pixelCanvasSize; i++){
        let xDiv = document.createElement('div');
        xDiv.setAttribute('class','x-axis');
        sketchPadDiv.appendChild(xDiv);
        for (var i2 = 0; i2 < pixelCanvasSize; i2++){
            let yDiv = document.createElement('div');
            yDiv.setAttribute('class','y-axis pixel');
            yDiv.ondragstart = () => {
                return false;
              };
            yDiv.onmouseover = function(){
                if (isUserClicking){
                    paintPixel(yDiv);        
                }    
            }
            yDiv.addEventListener('click', function(e) {
                paintPixel(yDiv);
            })
            xDiv.appendChild(yDiv);
        }    
    }

    return sketchPadDiv;
}

function paintPixel(yDiv) {
    if (!isEraserActive) {
        yDiv.setAttribute('class','y-axis pixel ' + PAINTCOLORS[currentActiveColorIndex]);
    }
    else {
        yDiv.setAttribute('class','y-axis pixel');
    }
}

var sketchpad = document.getElementById('sketchpad-container');
sketchpad.appendChild(drawCanvas());

document.body.onmousedown = function() {
    isUserClicking = true;
}

document.body.onmouseup = function() {
    isUserClicking = false;
}

var pixels = document.getElementsByClassName('pixel');

function cleanCanvas(){

}

var canvasSizeContainer = document.getElementById('canvas-size-input-container');
var canvasSizeInputBox = document.getElementById('canvas-size-input');
var canvasSizeAddButton = document.getElementById('add-canvas-size-button');
var canvasSizeSubtractButton = document.getElementById('subtract-canvas-size-button');

function createCanvasInputBox(){
    var canvasSizeInputBoxElement = document.createElement('input');
    canvasSizeInputBoxElement.setAttribute('id', 'canvas-size-input');
    canvasSizeInputBoxElement.setAttribute('placeholder', (pixelCanvasSize + 'px'));
    canvasSizeInputBoxElement.setAttribute('type', 'number');
    canvasSizeInputBoxElement.setAttribute('max', '34');
    canvasSizeInputBoxElement.setAttribute('min', '0');
    return canvasSizeInputBoxElement;
}

canvasSizeInputBox.addEventListener('change', function(e) {
    changeCanvasSize(e.target.value);
});

canvasSizeAddButton.addEventListener('click', function() {
    changeCanvasSize(pixelCanvasSize + 1);
})

canvasSizeSubtractButton.addEventListener('click', function() {
    changeCanvasSize(pixelCanvasSize - 1);
})

function refreshCanvasSizeInputBox(){
    canvasSizeContainer.removeChild(document.getElementById('canvas-size-input'));
    canvasSizeInputBox = canvasSizeContainer.insertBefore(createCanvasInputBox(), canvasSizeContainer.firstElementChild);
    canvasSizeInputBox.addEventListener('change', function(e) {
        changeCanvasSize(e.target.value);
    });
}

function changeCanvasSize(newCanvasPixelSize){
    if (newCanvasPixelSize < 0){
        pixelCanvasSize = 0;
    }
    else if ( newCanvasPixelSize <= 32){
        pixelCanvasSize = newCanvasPixelSize;
    }
    else {
        pixelCanvasSize = 32;
    }
    refreshCanvasSizeInputBox();
    sketchpad.removeChild(sketchpad.firstElementChild);
    sketchpad.appendChild(drawCanvas());
}

var eraserButton = document.getElementById('eraser-button');
var clearButton = document.getElementById('clear-button');

eraserButton.addEventListener('click', function(){
    if (!isEraserActive){
        isEraserActive = true;
        eraserButton.classList.add('class', 'pressed');
    }
    else {
        isEraserActive = false;
        eraserButton.classList.remove('class', 'pressed');
    }
})

clearButton.addEventListener('click', function() {
    changeCanvasSize(pixelCanvasSize);
})

var colorButtons = document.getElementsByClassName('color-button');

console.log(colorButtons);

for (var i = 0; i < colorButtons.length; i++){
    console.log(i);
    colorButtons[i].addEventListener('click', function(e) {
        for (var i2 = 0; i2 < PAINTCOLORS.length; i2++){
            if (e.target.classList.contains(PAINTCOLORS[i2])){
                currentActiveColorIndex = i2;
            }
        }
    })
}