quickDrawDataset = [
  "aircraft carrier",
  "airplane",
  "alarm clock",
  "ambulance",
  "angel",
  "animal migration",
  "ant",
  "anvil",
  "apple",
  "arm",
  "asparagus",
  "axe",
  "backpack",
  "banana",
  "bandage",
  "barn",
  "baseball",
  "baseball bat",
  "basket",
  "basketball",
  "bat",
  "bathtub",
  "beach",
  "bear",
  "beard",
  "bed",
  "bee",
  "belt",
  "bench",
  "bicycle",
  "binoculars",
  "bird",
  "birthday cake",
  "blackberry",
  "blueberry",
  "book",
  "boomerang",
  "bottlecap",
  "bowtie",
  "bracelet",
  "brain",
  "bread",
  "bridge",
  "broccoli",
  "broom",
  "bucket",
  "bulldozer",
  "bus",
  "bush",
  "butterfly",
  "cactus",
  "cake",
  "calculator",
  "calendar",
  "camel",
  "camera",
  "camouflage",
  "campfire",
  "candle",
  "cannon",
  "canoe",
  "car",
  "carrot",
  "castle",
  "cat",
  "ceiling fan",
  "cello",
  "cell phone",
  "chair","chandelier",
  "church",
  "circle",
  "clarinet",
  "clock",
  "cloud",
  "coffee cup",
  "compass",
  "computer",
  "cookie",
  "cooler",
  "couch",
  "cow",
  "crab",
  "crayon",
  "crocodile",
  "crown",
  "cruise ship",
  "cup",
  "diamond",
  "dishwasher",
  "diving board",
  "dog",
  "dolphin",
  "donut",
  "door",
  "dragon",
  "dresser",
  "drill",
  "drums",
  "duck",
  "dumbbell",
  "ear",
  "elbow",
  "elephant",
  "envelope",
  "eraser",
  "eye",
  "eyeglasses",
  "face",
  "fan",
  "feather",
  "fence",
  "finger",
  "fire hydrant",
  "fireplace",
  "firetruck",
  "fish",
  "flamingo",
  "flashlight",
  "flip flops",
  "floor lamp",
  "flower",
  "flying saucer",
  "foot",
  "fork",
  "frog",
  "frying pan",
  "garden",
  "garden hose",
  "giraffe",
  "goatee",
  "golf club",
  "grapes",
  "grass",
  "guitar",
  "hamburger",
  "hammer",
  "hand",
  "harp",
  "hat",
  "headphones",
  "hedgehog",
  "helicopter",
  "helmet",
  "hexagon",
  "hockey puck",
  "hockey stick",
  "horse",
  "hospital",
  "hot air balloon",
  "hot dog",
  "hot tub",
  "hourglass",
  "house",
  "house plant",
  "hurricane",
  "ice cream",
  "jacket",
  "jail",
  "kangaroo",
  "key",
  "keyboard",
  "knee",
  "knife",
  "ladder",
  "lantern",
  "laptop",
  "leaf",
  "leg",
  "light bulb",
  "lighter",
  "lighthouse",
  "lightning",
  "line",
  "lion",
  "lipstick",
  "lobster",
  "lollipop",
  "mailbox",
  "map",
  "marker",
  "matches",
  "megaphone",
  "mermaid",
  "microphone",
  "microwave",
  "monkey",
  "moon",
  "mosquito",
  "motorbike",
  "mountain",
  "mouse",
  "moustache",
  "mouth",
  "mug",
  "mushroom",
  "nail",
  "necklace",
  "nose",
  "ocean",
  "octagon",
  "octopus",
  "onion",
  "oven",
  "owl",
  "paintbrush"
]

randomNumber = Math.floor((Math.random() * quickDrawDataset.length) + 1);
console.log(quickDrawDataset[randomNumber]);
sketch = quickDrawDataset[randomNumber];
document.getElementById("desenho").innerHTML = "Esboço a Ser Desenhado: " + sketch;
drawSketch = "";
answerHolder = "";
score = 0;
timerCounter = 0;
timerCheck = "";

function updateCanvas()
{ 
  background("white");
  randomNumber = Math.floor((Math.random() * quickDrawDataset.length) + 1);
  console.log(quickDrawDataset[randomNumber]);
  sketch = quickDrawDataset[randomNumber];
  document.getElementById('desenho').innerHTML = 'Esboço a ser desenhado: ' + sketch;
}

function preload()
{ 
  classifier = ml5.imageClassifier('DoodleNet');
}

function setup()
{ 
  canvas = createCanvas(280, 280);
  canvas.center();
  background("white");
  canvas.mouseReleased(classifyCanvas);
}

function draw()
{ 
  strokeWeight(5);
  stroke(0);
  if(mouseIsPressed)
  { 
    line(pmouseX, pmouseY, mouseX, mouseY); 
  }
  checkSketch();
  if(drawSketch == sketch)
  { 
    answerHolder = "set";
    score++;
    document.getElementById('pontuacao').innerHTML = 'Pontuação: ' + score;
  }
}

function classifyCanvas()
{ 
  classifier.classify(canvas, gotResult);
}

function gotResult(error, results)
{ if(error)
  { 
    console.error(error);
  }
  console.log(results);
  drawnSketch = results[0].label;
  document.getElementById('esboco').innerHTML = 'Seu esboço: ' + drawnSketch.replace("_", " ");
  document.getElementById('precicao').innerHTML = 'Precisão: ' + Math.round(results[0].confidence * 100) + '%';
}

function checkSketch()
{ 
  timerCounter++;
  document.getElementById('tempo').innerHTML = 'Tempo: ' + timerCounter;
  console.log(timerCounter)
  if(timerCounter > 400)
  { 
    timerCounter = 0; timerCheck = "completed"
  }
  if(timerCheck =="completed" || answerHolder == "set")
  { 
    timerCheck = ""; answerHolder = ""; updateCanvas();
  }
}