var gamePattern=[];
var userClickedPattern=[];
var buttonColors=["red","blue","green","yellow"];
var started=false;
var level=0;
$(document).keypress(function() {
  if(!started){
    $("level-title").text("Level "+level);
    nextSequence();
    started=true;
  }
});
$(".btn").click(function(){
  var userChosenColor=$(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});
function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log("success");
    if(userClickedPattern.length===gamePattern.length){
      setTimeout(function(){
        nextSequence();},1000);
      }
    }
    else{
      console.log("wrong");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function (){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("game over,Press any key to restart");
    startOver();
  }
}

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}
function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}
function animatePress(currentColor){
    var activeColor=$("."+currentColor);
    activeColor.addClass("pressed");
    setTimeout(function(){activeColor.removeClass("pressed");},100);
}
function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
