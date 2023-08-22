//alert("hello");
var gamePattern=[];
var userClickedPattern=[];
var buttonColours=["red", "blue", "green", "yellow"]

$(".btn").click(function(){
   var userChosenColour = this.id;
   userClickedPattern.push(userChosenColour);
   //console.log(userClickedPattern);
   playSound(userChosenColour);
   checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);
    var random_Number= Math.floor(Math.random()*4);
    //console.log(random_Number);
    var randomChosenColour=buttonColours[random_Number];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}

function playSound(name){
    var audio=new Audio("./sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColour){
    
    $("#"+currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
}


//step 7
var level = 0;
$("body").keydown(function(){
    
    if(level == 0){
        $("#level-title").text("Level " + level);
        nextSequence();
    }

});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("success");

        if (userClickedPattern.length === gamePattern.length){

            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
    }else{
        console.log("wrong");
        var song=new Audio("./sounds/wrong.mp3");
        song.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level=0;
    gamePattern=[];
}
