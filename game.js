var gamepattern = [];
var userClickedPattern = [];
var buttoncolors = ["pink", "orange", "greenyellow", "blueviolet"];
var level = 0;
var ptr = 0;
function nextSequence() {
    level++;
    $("#level-title").text("Level " + level);
    var n = Math.floor(Math.random() * 4);
    var randomChosenColour = buttoncolors[n];
    gamepattern.push(n);
    playSound(randomChosenColour);
}

$(document).keypress(function () {
    if(level==0)
    {
        nextSequence();
    }
});

$("div[type=button]").click(userFunction);

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
    $("#" + name).fadeOut(100).fadeIn(100);
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed")
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}


function userFunction() {
    userChosenColour = this.id;
    var id = -1;
    for(var i=0;i<4;i++){if(userChosenColour==buttoncolors[i]){id=i;break;}}
    userClickedPattern.push(id);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkanswer();
}

function checkanswer() {
    if (gamepattern.length == 0 || gamepattern[ptr] !== userClickedPattern[ptr]) {
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
    else {
        ptr++;
        if (ptr == level) {
            ptr = 0;
            userClickedPattern = [];
            setTimeout(nextSequence, 800);
        }
    }
}

function startOver() {
    ptr = 0;
    userClickedPattern = [];
    gamepattern = [];
    level = 0;
}
