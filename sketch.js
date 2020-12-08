var bg,bgI
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup,obstacleGroup,chilliGroup
var score
var chilli,chilliI;
var ground,groundI
var die,dieI
var reset,resetI
var score=0
var time=0
var dieSound;
var gameover,gameoverI
var serve=1;
var PLAY=2;
var END=0;
var gamestate=serve;


function preload(){
  
  bgI=loadImage("background.jpg")
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundI=loadImage("ground.png")
  chilliI=loadImage("chilli.png")
  gameoverI=loadImage("unnamed.png")
  resetI=loadImage("reset.png")
  dieI=loadImage("die.png")
  dieSound=loadSound("monkey1.mp3")
 
 
}

function setup() {
  createCanvas(550,400);
  
  bg=createSprite(0,200)
  bg.addImage(bgI)
  bg.velocityX=-5
  bg.x=bg.width/2
  bg.scale=1.1
  
  die=createSprite(275,250)
  die.addImage(dieI)
  die.scale=0.5
  
  ground=createSprite(80,380)
  ground.addImage(groundI)
  ground.scale=0.3
  ground.setCollider("rectangle",0,0,50,50)
  ground.visible=false
  
  reset=createSprite(270,345)
  reset.addImage(resetI)
  reset.scale=0.2
  
  monkey=createSprite(80,330)
  monkey.addAnimation("moving",monkey_running)
  monkey.scale=0.15
  
  FoodGroup=new Group ();
  obstacleGroup=new Group();
  chilliGroup=new Group();
  
}


function draw() {
  background("white")
  
if (gamestate===serve){
  
  bg.velocityX=-5
  
  reset.visible=false
  die.visible=false
  //gameover.visible=false
  monkey.visible=true
  
   if(bg.x<0){
  bg.x=bg.width/2
  }
  
  if (keyDown("space") && monkey.y >= 300){ 
  monkey.velocityY=-22
     }
  
  monkey.velocityY=monkey.velocityY+0.8
     
  monkey.collide(ground)
  
}
  
  Banana();
  Obstacle();
  Chilli();
  
  if (gamestate===END){
    
    time=time+0
    
    if (mousePressedOver(reset)){
      Reset();
    }
    
    reset.visible=true
    die.visible=true
    bg.velocityX=0
    //monkey.destroy();
    
    obstacleGroup.setVelocityXEach(0)
    FoodGroup.setVelocityXEach(0)
    chilliGroup.setVelocityXEach(0)
  }
  
  
  if (obstacleGroup.isTouching(monkey)){
    gamestate=END
    dieSound.play();
    monkey.velocityY=0
    obstacleGroup.destroyEach();
    chilliGroup.destroyEach();
    FoodGroup.destroyEach();
    monkey.destroy();
    
    gameover=createSprite(275,100)
    gameover.addImage(gameoverI)
    gameover.scale=0.5
    
  }
  
  if (chilliGroup.isTouching(monkey)){
    dieSound.play();
    gamestate=END
    monkey.destroy();
    monkey.velocityY=0
    obstacleGroup.destroyEach();
    chilliGroup.destroyEach();
    FoodGroup.destroyEach();
    
    gameover=createSprite(270,100)
    gameover.addImage(gameoverI)
    gameover.scale=0.5
    
  }
  
  if (FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score=score+1
  }
    
  drawSprites(); 
  
  fill ("red")
  text("BANANA'S EATEN :"+score,400,375)
  
  fill ("red")
  text ("SURVIVAL TIME :"+time,50,375)
  time=time+1
}

function Reset(){
  gamestate=serve
  gameover.visible=false
  monkey=createSprite(80,330)
  monkey.addAnimation("moving",monkey_running)
  monkey.scale=0.15
  score=0
  time=0
  
}

function Banana(){
    if (frameCount % 60 === 0) {
  banana=createSprite(600,Math.round(random(2,200)));
  banana.addImage(bananaImage);
  banana.scale=0.1
  banana.velocityX=-5
  banana.lifetime=120
  banana.depth=monkey.depth
  monkey.depth=monkey.depth+1
  FoodGroup.add(banana)  
 }
}

function Obstacle(){
    if (frameCount % 300 === 0) {
     obstacle=createSprite(600,330);
     obstacle.addImage(obstacleImage);
     obstacle.velocityX=-6
     obstacle.scale=0.2
     obstacleGroup.add(obstacle)
      
}
}

function Chilli(){
  if (frameCount % 200 === 0) {
  chilli=createSprite(600,Math.round(random(2,200)));
  chilli.addImage(chilliI);
  chilli.scale=0.2
  chilli.velocityX=-5
  chilli.lifetime=120
  chilli.depth=monkey.depth
  monkey.depth=monkey.depth+1
  chilliGroup.add(chilli)
    
  }
  
}