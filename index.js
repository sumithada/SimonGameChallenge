var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var start = false;
var level = 0;

$(document).keypress(function () {
    if (!start) {
        $("#level-title").text("level " + level)
        nextSequence();
        start = true;
    }
})


function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3")
    audio.play();
}


function nextSequence() {
    userClickedPattern=[];
    level++;
    $("#level-title").text("level " + level)
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColors[randomNumber];
    console.log(randomChosenColour);
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100)
    playSound(randomChosenColour);
}


$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed")
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed")
    }, 100);
}

function checkAnswer(currentLevel){
if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
console.log("success");
if(userClickedPattern.length===gamePattern.length){
setTimeout(function(){
    nextSequence();
},1000);
}  
}else{
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, press any key to restart");
    startOver();
}

}

function startOver(){
    level=0;
    gamePattern=[];
    start=false;
}
