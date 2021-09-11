object = [];
status = "";

function preload() {

}

function setup() {
    canvas = createCanvas(600, 400);
    canvas.center();
    cam = createCapture(VIDEO);
    cam.hide();

}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Object";
    object_name = document.getElementById("object_input").value;
}

function modelLoaded() {
    console.log("model is loaded!@#");
    status = true;
}

function gotresult(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        object = results;
    }
}

function draw() {
    image(cam, 0, 0, 600, 400);

    if (status != "") {
        objectDetector.detect(cam, gotresult);

        for (i = 0; i < object.length; i++) {

            if (object[i].label = object_name) {

                document.getElementById("status").innerHTML = "Status : Objects Detected";

                document.getElementById("object_name").innerHTML = object_name + " found";

                fill("red");
                stroke("brown");
                noFill();

                percent = floor(object[i].confidence * 100);

                text(object[i].label + percent + "%", object[i].x, object[i].y);

                rect(object[i].x, object[i].y, object[i].width, object[i].height);
            }
            else {

                document.getElementById("object_name").innerHTML = object_name + "not found";
            }

            if (object.length == 0) {
                document.getElementById("object_name").innerHTML = "not found" + object_name;
            }
        }
    }

}