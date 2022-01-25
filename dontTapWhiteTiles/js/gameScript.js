//game variables
var score = null;
var time = 0;
var timer = null;
var coordinates = {x: 0, y: 0};
var preventDobuleInterval = false;
var gameEnded = false;
var modalStatus = false;

var localScore =
    {
        id: "",
        time: 0,
        rawTime: 0,
        date: new Date(),
        rawDate: 0
    };

var mouseInsideContainer = false;

$(document).ready(function()
{
    $(document).keydown(function (e) {
        if(!modalStatus)
        {
            if(e.key == escapeKey) // start or restart
            {
                e.preventDefault();
                start();
            }
    
            if((e.key == key1) || (e.key == key2))
            {
                e.preventDefault();
                play("event");
            }
        }
        else
            if(e.key == submitKey)
            {
                e.preventDefault();
                $(".submit:visible").trigger("click");
            }
    });

    $("#gameContainer").mousemove(function(e) { // cursor coordinates
        if(mouseInsideContainer)
        {
            coordinates.x = e.pageX;
            coordinates.y = e.pageY;
        }
    });

    $("#gameContainer").mouseenter(function() {
        mouseInsideContainer = true;
    });

    $("#gameContainer").mouseleave(function(){
        mouseInsideContainer = false;
        coordinates.x = null;
        coordinates.y = null;
    });

    start();

    $(window).resize(function(){ // responsive
        if($(window).width() <= 750)
            $("#gameContainer").css("height", $("#gameContainer").width() + "px");
        else
            $("#gameContainer").css("height", "600px");
    });

    $(".restart").css("display", "flex");

    $(window).trigger("resize");
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
    $(".restart").fadeOut();
    timerHandler("stop");
    reset();
    createBoard();
    var one = getRandomBetween(1, Math.pow(difficulty, 2) + 1);
    do
        var two = getRandomBetween(1, Math.pow(difficulty, 2) + 1);
    while(two == one)
    $("#" + one + ",#" + two).attr("data-mode", "hit");
    $("#" + one + ",#" + two).addClass("point");
}

function createBoard() // create board according to the current difficulty
{
    for(var i = 1; i <= Math.pow(difficulty, 2); i++)
        $("#gameContainer #tileTemplate").clone().attr("id", i).appendTo("#gameContainer");
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
    }
}

function handleEndGame(win) // end game handler
{
    if($(".endgame:visible").length)
    {
        if($("#name:visible").length && !$("#name:visible").val())
            return false;

        if(win)
        {
            localScore.id = $("#name").val();
            localScore.time = $(".endtime").text();
            localScore.rawTime = time;
            var tempDate = new Date();
            var rawDate = Math.floor(new Date().valueOf()/1000);
            var day = tempDate.getDate();
            var month = tempDate.getMonth() + 1;
            var year = tempDate.getFullYear();
            localScore.date = (day < 10 ? "0" : "") + day + "/" + (month < 10 ? "0" : "") + month + "/" + year;
            localScore.rawDate = rawDate;

            if (!localStorage.getItem("localScores"))
            {
                var temp = {};
                $(".info select option").each(function(i, e){
                    temp[$(e).text()] = [];
                });
                temp[$('#mode').find('option[value="'+$("#mode").val()+'"]').text()].push(localScore);
            }
            else
            {
                var diffName = $("#mode option:selected").text();
                var temp = JSON.parse(localStorage["localScores"]);
                temp[diffName].push(localScore);
            }
            localStorage["localScores"] = JSON.stringify(temp);
            $("#sort").trigger("change");
        }

        $(".restart").css("display", "flex").hide().fadeIn();
        modalStatus = false;
        $(".endgame").hide();
        return false;
    }
    
    if(checkGameEnded())
    {
        $(".endgame").css("display", "flex");
        $(".winGame").css("display", "flex").next().hide();

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
    modalStatus = true;
    gameEnded = true;
}

function checkGameEnded()
{ return score >= goal; }

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

    score = null;
    $(".score, .timer").text("0");

    $("#gameContainer > .square:not(#tileTemplate)").each(function(){
        $(this).remove();
    })
    timerHandler("reset");
}