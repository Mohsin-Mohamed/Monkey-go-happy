PLAY = 1
END = 0
var gameState = 1
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage, ground
var FoodGroup, obstacleGroup
var score
var survivalTime = 0

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,350);

  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  console.log(ground.x);
  
  obstacleGroup = createGroup();
  FoodGroup = createGroup();
}


function draw() {
  background(255)
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score :" + score, 500, 50);
  
  stroke("black")
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time: " + survivalTime, 100, 50)
  
  if(gameState === PLAY) {
  
  ground.velocityX = -4;
  
  if (ground.x < 450) {
      ground.x = ground.width / 2;
    }
    
  if (keyDown("space") && monkey.y >= 200) {
      monkey.velocityY = -12;
    }
  monkey.velocityY = monkey.velocityY + 1;

  spawnObstacles();
  
  spawnBanana();
  
  monkey.collide(ground);
  if (FoodGroup.isTouching(monkey)) {
      FoodGroup.destroyEach();
    }
  if (obstacleGroup.isTouching(monkey)) {
      gameState = END;
    }
  } else if(gameState === END) {
    
    textSize(20);
    text("Game Over, Buddy!", 200, 200);
    ground.velocityX = 0;

    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    monkey.velocityX = 0;
    monkey.visible = false;
  }
  drawSprites();
}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
    obstacles = createSprite(600, 323, 10, 10);
    obstacles.setCollider("circle", 0, 0, 40);
    obstacles.addImage(obstacleImage);
    obstacles.scale = 0.12;
    obstacles.velocityX = -5
    obstacles.lifetime = 140;
    obstacleGroup.add(obstacles);
  }
}

function spawnBanana() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    banana = createSprite(600, 200, 40, 10);
    banana.y = Math.round(random(100, 200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4;
    banana.lifetime = 200;
    FoodGroup.add(banana);
  }
}