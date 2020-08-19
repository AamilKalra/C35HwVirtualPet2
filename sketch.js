//Create variables here
var database;
var dog, happyDog;
var foodS, foodStock;
var feed, add;
var fedTime, lastFed;
var foodObj; 
var dog_Img1, dog_Img2;

var addFood;
function preload()
{
	//load images here
dog_Img1 = loadImage("dogImg1.png");
dog_Img2 = loadImage("dogImg2.png")
}

function setup() {
	createCanvas(500,500);
  database = firebase.database();
  console.log(database);

  foodObj=new Food(300,300);

  dog = createSprite(420,300,40,40);
  dog.addImage(dog_Img1);
  dog.scale=0.2;

  foodStock=database.ref('Food');
  foodStock.on("value", readStock);

  feed = createButton("Feed The Dog")
  feed.position(650,60);
  feed.mousePressed(feedDog);

  add = createButton("ADD FOOD")
  add.position(780,60)
  add.mousePressed(addFoods);

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })
}


function draw() {  
  background(46,139,87);
  foodObj.display();
  drawSprites();
  
  //add styles here
  textSize(25)
  fill("yellow")
  text("FoodStock: "+foodS,30,30)
  
/*
text("Press UP_ARROW To Feed The Pet",30,100);
if (keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(dog_Img2);
  dog.scale=0.2
}
*/
  if (lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 30,80);
  }
  else if(lastFed==0){
    text("Last Feed : 12 AM", 30, 80);
  }
  else{
    text("Last Feed : "+lastFed + "AM",30,80);
  }

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1
  }
  database.ref('/').update({
    Food:x
  })
}
//function to update food stock and last fed time 
function feedDog(){
  dog.addImage(dog_Img2);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

//function to add food in stock
  function addFoods(){
    foodS++;
    database.ref('/').update({
    Food:foodS
  })
}

