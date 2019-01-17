function setup() {

    let canvas = createCanvas(windowWidth/2,400, WEBGL);
    //Makes the canvas sit inside the sketch-holder div on the html page.
    canvas.parent("sketch-holder");
    canvas.style('display', 'block');

    atom = new Atom();
    //Adjusts the title at the top of the screen to reflect the name of the atom when the page is loaded.
    document.getElementById("title").innerHTML = "Aesthetic Atoms: " + atom.name;

    g = createGraphics(windowWidth/2, 400, WEBGL);
}

function draw() {

    //Allows user to drag and move around the world.
    orbitControl();

    if (atom.cubeEnabled) {
        //Draw to a p5.Renderer.
        atom.draw(g);
    } else {
        //Draw directly to the canvas.
        atom.draw();
    }

}

//Automatically adjusts the width of the canvas to half the window if the window is resized.

function windowResized() {
    resizeCanvas(windowWidth/2, 400);
}

//All the event listeners for the sliders and checkboxes on the form.

document.addEventListener("DOMContentLoaded", function(){

    let nr = document.getElementById("nucleusRadius");

    function changeNucleusRadius() {
        let val = nr.value;
        atom.nucleusRadius = val;
    }
    nr.addEventListener("change", changeNucleusRadius);

    let ec = document.getElementById("electronCount");

    function changeElectronCount() {
        let val = ec.value;
        atom.electronCount = val;
        //Adjusts the title at the top of the screen to reflect the name of the atom when the electronCount is changed.
        document.getElementById("title").innerHTML = "Aesthetic Atoms: " + atom.name;
    }
    ec.addEventListener("change", changeElectronCount);

    let nv = document.getElementById("nucleusVibrate");

    function changeNucleusVibrate() {
        let val = nv.checked;
        atom.nucleusVibrate = val;
    }

    nv.addEventListener("change", changeNucleusVibrate);

    let es = document.getElementById("electronSpeed");

    function changeElectronSpeed() {
        let val = es.value;
        atom.electronSpeed = val;
    }
    es.addEventListener("change", changeElectronSpeed);

    let ncol = document.getElementById("nucleusColor");

    function changeNucleusColor() {
        let val = ncol.value;
        atom.nucleusColor = val;
    }
    ncol.addEventListener("change", changeNucleusColor);

    let ecol = document.getElementById("electronColor");

    function changeElectronColor() {
        let val = ecol.value;
        atom.electronColor = val;
    }
    ecol.addEventListener("change", changeElectronColor);

    let ev = document.getElementById("electronVibrate");

    function changeElectronVibrate() {
        let val = ev.checked;
        atom.electronVibrate = val;
    }
    ev.addEventListener("change", changeElectronVibrate);

    let sx = document.getElementById("spinX");

    function changeSpinX() {
        let val = sx.checked;
        atom.spinX = val;
    }
    sx.addEventListener("change", changeSpinX);

    let sy = document.getElementById("spinY");

    function changeSpinY() {
        let val = sy.checked;
        atom.spinY = val;
    }
    sy.addEventListener("change", changeSpinY);

    let sz = document.getElementById("spinZ");

    function changeSpinZ() {
        let val = sz.checked;
        atom.spinZ = val;
    }
    sz.addEventListener("change", changeSpinZ);

    let n = document.getElementById("nucleusNoise");

    function changeNoise() {
        let val = n.checked;
        atom.nucleusNoise = val;
    }
    n.addEventListener("change", changeNoise);

    let sm = document.getElementById("smoothing");

    function changeSmoothing() {
        let val = sm.checked;
        atom.smoothing = val;
    }
    sm.addEventListener("change", changeSmoothing);

    let ncc = document.getElementById("nucleusColorCycle");

    function changeNucleusColorCycle() {
        let val = ncc.checked;
        atom.nucleusColorCycle = val;
    }
    ncc.addEventListener("change", changeNucleusColorCycle);

    let ecc = document.getElementById("electronColorCycle");

    function changeElectronColorCycle() {
        let val = ecc.checked;
        atom.electronColorCycle = val;
    }
    ecc.addEventListener("change", changeElectronColorCycle);

    let cube = document.getElementById("cube");

    function changeCubeStatus() {
        let val = cube.checked;
        atom.cubeEnabled = val;
    }
    cube.addEventListener("change", changeCubeStatus);

    let cf = document.getElementById("input_form");

    cf.addEventListener("submit", function (event){
        event.preventDefault()});
});