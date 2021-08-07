img = "";
status = "";
objects = [];

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting the objects...";
}

function modelLoaded(){
    console.log("Model is loaded 🤖🤖🤖🤖");
    status = true;
}

function preload(){
    img = loadImage("dog_cat.jpg");
}

function draw(){
    image(video, 0, 0, 380, 380);
    if(status != ""){
        r = random(255);
        g = random(255);
        b = random(255);        
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: objects detected!";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are: "+objects.length;
            fill(r, g, b);
            var name = floor(objects[i].confidence*100);
            text(objects[i].label + " " + name + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
    
}

function gotResult(error, results){
if (error){
    console.log(error);
}
console.log(results);
objects = results;
}