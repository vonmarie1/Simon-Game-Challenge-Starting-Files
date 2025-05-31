var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0

$(document).keypress(function(){
    if(!started){
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").on("click", function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    console.log(userClickedPattern);
    checkAnwser(userClickedPattern.length-1);
});

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    var delay = 100;
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, delay);
}

function checkAnwser(currentLevel){
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length == gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    
    else{
        var wrong = new Audio("sounds/wrong.mp3")
        wrong.play();
        $("h1").text("Game over, press any key to restart.");
        startOver();
        console.log("wrong");
    }
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber]; 
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}