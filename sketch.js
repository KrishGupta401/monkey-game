var PLAY = 0;
var END = 1;
var gameState = PLAY;
var monkey , monkey_running,monkeyCollide;
var ground, invisibleGround;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkeyCollide=("sprite_0.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 groundImage = loadAnimation("ground.jpg");
}



function setup() {
createCanvas(600,300);
  
obstacleGroup = createGroup();
bananaGroup = createGroup();
  
 
monkey = createSprite(80,230,10,10);
monkey.scale = 0.1;
monkey.addAnimation("monkey", monkey_running);
monkey.addAnimation("collide", monkeyCollide);
  

ground = createSprite(300,340,600,10);
ground.scale = 1;
ground.addAnimation("ground", groundImage);
 
invisibleGround = createSprite(300,278,600,7);
invisibleGround.visible = false;
  
} 

function draw() {
background("skyblue");
fill("black");
text("score: "+score, 520, 20);

  
if (gameState === PLAY){
obstacles();
bananas();
score = score + Math.round(getFrameRate()/60);
    
ground.velocityX = -(4+score*1.5/100);
  
if(keyDown("space")&&monkey.y >= 230) {
monkey.velocityY = -13; 
}
  
monkey.velocityY = monkey.velocityY + 0.8
  
if (ground.x < 0){
ground.x = ground.width/2;
}
    
if (monkey.isTouching(bananaGroup)){
bananaGroup.destroyEach();
}
    
if (monkey.isTouching(obstacleGroup)){
gameState = END;
}
    
}
  
if (gameState === END){
ground.velocityX = 0;
    
monkey.y = 235;
    monkey.scale = 0.1;
     monkey.changeAnimation("collide", monkeyCollide);
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    fill("red")
    stroke("black")
    textSize(30);
    text("GAMEOVER!!!", 220, 170);
    fill("black");
    textSize(15);
    text("Press 'R' to play again", 240, 200);
    
    if (keyDown("r")){
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.changeAnimation("monkey", monkey_running);
      score = 0;
      bananaScore = 0;
      gameState = PLAY; 
    }
  }
  
  
  
  drawSprites(); 
  
  monkey.collide(invisibleGround);
  
}

function bananas(){
  if (frameCount%80 === 0){
    
    banana = createSprite(620,120, 50, 50 )
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-(4+score*1.5/100);           
    banana.lifetime = 220;
    bananaGroup.add(banana);
    bananaGroup.add(banana);

    
  }
  

  
}

function obstacles(){
  if (frameCount%150 === 0){
    
    obstacle = createSprite(620,253,50,50);
    obstacle.addAnimation("obstacle", obstacleImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.13 ;
    obstacle.velocityX = -(4+score*1.5/100);
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
    
  }
  
  
}











