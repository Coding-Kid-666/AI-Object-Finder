var objects = [];
var current_status = false;

var object = "";
function preload() {
}

function setup(){
    canvas = createCanvas(480,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

}

function draw(){
    image(video, 0, 0, 480, 380);
    if (current_status == true) {
        objectDetector.detect(video, gotResults);
        for (i = 0; i < objects.length; i++){
            document.getElementById("status_now").innerHTML = "Status:Objects detected.";
            document.getElementById("number_thing").innerHTML = "Number of objects detected are - " + objects.length;

            fill("#ff0000");
            stroke("#ff0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);

            stroke("#09ff00");
            noFill();
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if (objects[i].label == object) {
                video.stop();
                document.getElementById("status_now").innerHTML = object + " has been found.";
            } else {
                document.getElementById("status_now").innerHTML = object + " isn't detected.";
            }
        }
    }

}

function start_something() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status_now").innerHTML = "Status:Firing up Object-Finder_1329"; 
    object = document.getElementById("object_name").value;

}

function modelLoaded(){
    console.log("CoCoSSD has sucessfully loaded.");
    current_status = true;
}

function gotResults(error, results){
    if (error) {
        console.error(error);
        document.getElementById("status_now").innerHTML = "Status: Error. ObjectDetector_Model-2290 powering down."
    } else {
        console.log(results);
        objects = results;
    }
}
