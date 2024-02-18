let objectDetector;
let img;

function preload() {
  img = loadImage("images/doogcat.webp");
  // Models available are 'cocossd', 'yolo'
  objectDetector = ml5.objectDetector("cocossd", modelLoaded);
}

function modelLoaded() {
  console.log("Model Loaded!");
  objectDetector.detect(img, gotResult);
}

function setup() {
  createCanvas(640, 420);
  image(img, 0, 0);
}

// A function to run when we get any errors and the results
function gotResult(err, results) {
  if (err) {
    console.error(err);
    return;
  }

  for (let i = 0; i < results.length; i++) {
    noStroke();
    fill(0, 255, 0);
    text(
      `${results[i].label} ${(results[i].confidence * 100).toFixed(2)}%`,
      results[i].x + 5,
      results[i].y + 15
    );
    noFill();
    strokeWeight(4);
    stroke(0, 255, 0);
    rect(results[i].x, results[i].y, results[i].width, results[i].height);
  }
}
