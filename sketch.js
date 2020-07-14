//initiate Game STATEs
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var CloudsGroup,cloudImage;
var  ObstaclesGroup,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var score = 0;

var gameOver,restart,gameoverImage,restartImage;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage =  loadImage("cloud.png");
  
  gameoverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
  
  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")
}



function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collide", trex_collided);

  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  CloudsGroup = new Group();
  ObstaclesGroup = new Group();
  
  gameOver = createSprite(300,100,23,23);
    gameOver.addImage(gameoverImage);
    gameOver.scale = 1;
    reset = createSprite(300,140,23,23);
    reset.addImage(restartImage);
    reset.scale = 0.5;
    gameOver.visible = false;
    reset.visible = false;

}

function draw() {
  background("orange")
  
  text("Score : "+score,500,50);
  
  if(gameState === PLAY){
    if(keyDown("space")&& trex.y > 161) {
      trex.velocityY = -10;
    }  
    
    ground.velocityX = -(10+3*score/100);
    score = score+Math.round(getFrameRate()/60);
  
    trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    spawnClouds();
    spawnObstacles();
    if(ObstaclesGroup.isTouching(trex)){
      gameState = 0;
   //playSound("die.mp3");
    }
  }else if(gameState === END) {
    ground.velocityX = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    trex.velocityY = 0;
    trex.changeAnimation("collide",trex_collided);
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    gameOver.visible = true;
    reset.visible = true;

  }
  if (mousePressedOver(reset)){
  restart();
  }
  
  trex.collide(invisibleGround);
  drawSprites();
}

function restart(){ 
  gameOver.visible = false;
  reset.visible = false;
  gameState = PLAY;
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
  trex.changeAnimation("running",trex_running);
  count = 0;
 }

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(70,160));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = - -(20+3*score/100);
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    CloudsGroup.add(cloud); 
  }
  
}
 

 function spawnObstacles() {
    if (frameCount % 60 === 0){
      var obstacle = createSprite(600,165,11,11);
      var rand2 = Math.round(random(1,6));
      switch(rand2){
        case 1 : obstacle.addImage(obstacle1);  
          break;
       case 2 : obstacle.addImage(obstacle2);  
          break;
       case 3 : obstacle.addImage(obstacle3);  
          break;
       case 4 : obstacle.addImage(obstacle4);  
          break;
       case 5 : obstacle.addImage(obstacle5);  
          break;
       case 6 : obstacle.addImage(obstacle6);  
          break;
      default : break;
               
      }
      obstacle.velocityX = -(10+3*score/100);
      obstacle.scale = 0.5;
      obstacle.lifetime = 100;
      ObstaclesGroup.add(obstacle);
    }
  }

