var balloon,balloonImage1,balloonImage2;
var database, balloonPosRef ;
var position ;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage2);
  balloon.scale=0.5;

  textSize(20); 

  var balloonPosRef = database.ref("balloon/position");

  balloonPosRef.on("value",function(data){
    position = data.val();
    balloon.x = position.x ;
    balloon.y = position.y ;
  },function(error){
    console.log("Error " + error.code);
  })
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    changePosition(-2,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    changePosition(2,0);
  }
  else if(keyDown(UP_ARROW)){
    changePosition(0,-2);
  }
  else if(keyDown(DOWN_ARROW)){
    changePosition(0,2);
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}
function changePosition(x,y){
  database.ref("balloon/position").set({
    x : position.x + x ,
    y : position.y + y
  })
}
