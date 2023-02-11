var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// starter function  ------ event listener
$(document).keypress(function() {
    if (!started) {
        newlevel();
        started = true;
    }
});

// add listener
$(".btn").click(function(){
    var userChosenColour = $(this).attr('id');

    makeSound(userChosenColour);
    blink(userChosenColour);

    if (started) {
        userClickedPattern.push(userChosenColour);
        checkAnswer(userClickedPattern.length-1);
    }
});

// helper function
function blink(key){
    $("#" + key).addClass("pressed");
    setTimeout(function() {
        $("#" + key).removeClass("pressed");
    }, 100);
}

function makeSound(key){
    var audio = new Audio("sounds/" + key + ".mp3");
    audio.play();
}

// change title to fail funciton
function fail(){
    var failSound = new Audio("sounds/wrong.mp3");
    failSound.play();
    $("body").addClass("game-over");
    $("#level-title").text("Gameover, Press A Key to Restart");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);
}

// generate a new level 
function newlevel(){
    level++;
    userClickedPattern = [];
    
    $("#level-title").text("Level "+level);

    var latest = Math.floor(Math.random()*4);

    blink(buttonColours[latest]);
    makeSound(buttonColours[latest]);
    gamePattern.push(buttonColours[latest]);
}

// check the user input
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                newlevel();
            }, 1000);
        }
    } else {
        fail();
        startOver();
    }
}

// reset all value
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}