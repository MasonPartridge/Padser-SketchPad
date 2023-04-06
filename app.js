var isUserClicking = false;
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
            yDiv.onmouseover = function(){
                if (isUserClicking){
                    yDiv.classList.add('class', 'highlighted');
                }    
            }
            xDiv.appendChild(yDiv);
        }    
    }

    return sketchPadDiv;
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
    console.log(newCanvasPixelSize);
    if ( newCanvasPixelSize <= 32){
        pixelCanvasSize = newCanvasPixelSize;
    }
    else if (newCanvasPixelSize < 0){
        pixelCanvasSize = 0;
    }
    else {
        pixelCanvasSize = 32;
    }
    refreshCanvasSizeInputBox();
    sketchpad.removeChild(sketchpad.firstElementChild);
    sketchpad.appendChild(drawCanvas());
}