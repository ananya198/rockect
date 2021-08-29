var rocket,rocketImg;
var meteor,meteorImg;
var star,starImg;
var space,spaceImg;
var starG,meteorG;
var endImg;
var Stars=0;
var Score=0;

var PLAY=1;
var END=0;
var gameState=PLAY;

var end, restart;

function preload(){
    rocketImg=loadImage("rockect-coding.jpg");
    meteorImg=loadImage("meteor-coding.png");
    starImg=loadImage("stars-coding.png");
    spaceImg=loadImage("stars.jpg");
    endImg=loadImage("endImage-coding.jpg");

}

function setup() {
    createCanvas(windowWidth,windowHeight);

    space=createSprite(width/2,200);
    space.addImage(spaceImg);
    space.velocityY=4;
    space.scale=3;

    rocket=createSprite(width/2,height-120,200,120);
    rocket.addImage(rocketImg);
    rocket.scale=0.5;

    end = createSprite(650,150);
    end.addImage(endImg);
    end.scale = 0.8;
    end.visible = false;  

    starG=new Group();
    meteorG=new Group();

 
}

function draw() {
    if(gameState===PLAY){
   rocket.x = World.mouseX;
        
    edges= createEdgeSprites();
    rocket.collide(edges);
        
        //code to reset the background
    if(space.y > height){
      space.y = height/2;
    }

    createStar();
    createMeteor();

    if (starG.isTouching(rocket)){
        starG.destroyEach();
        Stars=Stars+1;

    }else{
        if(meteorG.isTouching(rocket)){
            gameState=END;

            end.visible=true;
            textSize(30);
            text("Your rocket has crashed");
            text("Press Up Arrow to Restart the Game")
            rocket.x=200;
            rocket.y=300;
            rocket.scale=0.6;

            starG.destroyEach();
            meteorG.destroyEach();

            starG.setVelocityXEach(0);
            meteorG.setVelocityXEach(0);

            if(mousePressedOver(UpArrow)){
                reset();
              }

        }
    }

    drawSprites();
    textSize(30);
    fill(255);
    text("Stars:"+ Stars,5,30);

    textSize(30);
   fill(255);
   text("Score: "+ Score,5,60);
  
   if(gameState===PLAY){
    
      Score + Math.round(getFrameRate()/50);
    space.velocityX = -(6 + 2*Score/150);
 }

 if(path.x < 0 ){
    path.x = width/2;
  }

}
}

function createStar() {
    if (World.frameCount % 320 == 0) {
    var star = createSprite(Math.round(random(50, width-50),40, 10, 10));
    star.addImage(starImg);
    star.scale=0.03;
    star.velocityY = 3;
    star.lifetime = 150;
    star.add(star);
  }
  }

  function createMeteor(){
    if (World.frameCount % 530 == 0) {
    var meteor = createSprite(Math.round(random(50, width-50),40, 10, 10));
    meteor.addImage(swordImg);
    meteor.scale=0.1;
    meteor.velocityY = 3;
    meteor.lifetime = 150;
    meteorG.add(meteor);
    }
  }


  function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    rocket.addImage(rocket);
  
   Score=0;
  
  }