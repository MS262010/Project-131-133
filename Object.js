pic = localStorage.getItem("pic");
item_no = localStorage.getItem("item_no");

function preload() {
    img = loadImage(pic);
}

function back() {
    window.location.assign("index.html");
}
function setup() {
    canvas = createCanvas(600, 400);
    canvas.position(500, 260);
    objDetect = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";

}

Status = "";
objects = [];
img = "";

function draw() {
    image(img, 0, 0, 600, 400);
    if (Status != "") {
        objDetect.detect(img, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("lblObjects").innerHTML = "There are " + item_no + " large objects, out of which CoCossd detected " + objects.length + " objects";

            fill('red');
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, +objects[i].y + 15);
            noFill();
            stroke('red');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
function modelLoaded() {
    Status = 'true';
    console.log('Model Loaded!')
}
function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}