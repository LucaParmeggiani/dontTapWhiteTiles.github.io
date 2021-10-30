//game variables
var score = null;
var time = 0;
var timer = null;
var coordinates = {x: 0, y: 0};
var preventDobuleInterval = false;
var gameEnded = false;

var localScore =
    {
        id: "",
        time: 0,
        difficulty: 0,
        rawTime: 0
    };

var mouseInsideContainer = false;

$(document).ready(function()
{
    $(document).keydown(function (e) {
        if(e.key == escapeKey) // start or restart
            start();
        if((e.key == key1) || (e.key == key2))
            play("event");
    });

    $("#container").mousemove(function(e) { // cursor coordinates
        if(mouseInsideContainer)
        {
            coordinates.x = e.pageX;
            coordinates.y = e.pageY;
        }
    });

    $("#container").mouseenter(function() {
        mouseInsideContainer = true;
    });

    $("#container").mouseleave(function(){
        mouseInsideContainer = false;
        coordinates.x = null;
        coordinates.y = null;
    });

    start();
});

function play(type) // trigger click at cursor coordinates when binded keys are pressed
{
    if(coordinates.x != null && coordinates.y != null && type == "event")
        document.elementFromPoint(coordinates.x, coordinates.y).click();

    if(!score && !preventDobuleInterval)
    {
        preventDobuleInterval = true;
        timerHandler("start");
    }
}

function timerHandler(event) // start timer
{
    switch (event)
    {
        case "start":
            timer = setInterval(function(){
                time++;
                $(".timer").text(Math.floor(time / 100));
            },10);
            break;
        case "stop":
            clearInterval(timer);
            break;
        case "reset":
            time = 0;
            break;
    }
}

function start() // initial setup
{
    reset();
    createBoard();
    var one = getRandomBetween(1, Math.pow(difficulty, 2) + 1);
    do
        var two = getRandomBetween(1, Math.pow(difficulty, 2) + 1);
    while(two == one)
    $("#" + one).attr("data-mode", "hit");
    $("#" + two).attr("data-mode", "hit");
    $("#" + one).addClass("point");
    $("#" + two).addClass("point");
}

function createBoard() // create board according to the current difficulty
{
    for(var i = 1; i <= Math.pow(difficulty, 2); i++)
        $("#container #template").clone().attr("id", i).appendTo("#container");
}

function tap(elem, mode) // black or white square hitted
{
    if(gameEnded)
        return false;

    play();
    if(mode == "hit")
    {
        $(".score").text(++score);
        $(elem).removeClass("point");
        $(elem).attr("data-mode", "");
        drawSquare(elem.id);
    
        if(score >= goal)
        {
            timerHandler("stop");
            handleEndGame();
        }
    }
    else
    {
        timerHandler("stop");
        $(elem).addClass("blinkRed");
        setTimeout(function(){
            $(elem).removeClass("blinkRed");
            handleEndGame()
        },50);
        //game over
    }
}

function handleEndGame(win) // end game handler
{
    if($(".endgame:visible").length)
    {
        if(!$("#name").val().trim())
            return false;

        if(win)
        {
            localScore.id = $("#name").val();
            localScore.time = $(".endtime").text();
            localScore.rawTime = time;
            localScore.difficulty = difficulty;

            if (!localStorage.getItem("localScores"))
                localStorage["localScores"] = "[" + JSON.stringify(localScore) + "]";
            else
            {
                var tmp = JSON.parse(localStorage["localScores"]);
                tmp.push(localScore);

                localStorage["localScores"] = JSON.stringify(tmp);
            }
        }

        $(".endgame").hide();
        return false;
    }
    
    if(checkGameEnded())
    {
        $(".endgame").css("display", "flex");
        $(".winGame").css("display", "flex").next().hide();

        $('#name').val('');

        var min = "0" + Math.floor((time / 100) / 60);
        var sec = "0" + Math.floor((time - (min * 6000)) / 100);
        var cent = "0" + (time - (sec * 100));
        $(".endtime").text(min.slice(-2) + ":" + sec.slice(-2) + "." + cent.slice(-2));
    }
    else
    {
        $(".endgame").css("display", "flex");
        $(".loseGame").css("display", "flex").prev().hide();
    }

    gameEnded = true;
}

function checkGameEnded()
{
    return score >= goal;
}

function drawSquare(prevPoint) // new square
{
    do{
        var newPoint = getRandomBetween(1, Math.pow(difficulty, 2) + 1);
    } while($("#" + newPoint).hasClass("point") || newPoint == prevPoint)
    $("#" + newPoint).attr("data-mode", "hit");
    $("#" + newPoint).addClass("point");
}

function getRandomBetween(min, max) // random number
{
    return Math.floor(Math.random() * (max - min) + min);
}

function reset() //game reset
{
    preventDobuleInterval = false;
    gameEnded = false;

    score = -1;
    $(".score, .timer").text("0");

    $("#container > .square:not(#template)").each(function(){
        $(this).remove();
    })
    timerHandler("reset");
}