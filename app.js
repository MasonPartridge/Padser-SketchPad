var sketchPadDiv = document.createElement('div');
sketchPadDiv.setAttribute('id', 'sketch-pad');
var isUserClicking = false;

for (var i = 0; i < 16; i++){
    let xDiv = document.createElement('div');
    xDiv.setAttribute('class','x-axis');
    sketchPadDiv.appendChild(xDiv);
    for (var i2 = 0; i2 < 16; i2++){
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

document.body.appendChild(sketchPadDiv);

document.body.onmousedown = function() {
    isUserClicking = true;
}

document.body.onmouseup = function() {
    isUserClicking = false;
}