var key1 = "z";
var key2 = "x";

var time = 30;
var score = 0;

var localScores = [];

$(document).ready(function()
{
    $(document).keydown(function (e) { 
        if(e.key == "Escape")
            start();
    });

    start();
});

function start()
{
    clearAll();
    var one = getRandomBetween(1, 10);
    do{
        var two = getRandomBetween(1, 10);
    } while(two == one)
    $("#"+one).addClass("black");
    $("#"+two).addClass("black");
    play();
}

function checkClick()
{
    $(".black").mouseover(function(){
        score++;
        $(this).removeClass("black");
        drawSquare();
    });
}

async function timeStart()
{
    var timer = setInterval(function(){
        time--;
        $(".time").text(time);
        if(time == 0)
        {
            localScores.push(score);
            clearInterval(timer);
            start();
        }
    }, 1000);
}

function play()
{
    $(document).keydown(function (e) { 
        if((e.key == key1) || (e.key == key2))
        {
            console.log("ciao");
            checkClick();
            timeStart();
            play();
        }       
    });
    /* quando viene cliccato un quadrato nero */drawSquare();
}

function drawSquare()
{

}

function getRandomBetween(min, max)
{
    return Math.floor(Math.random() * (max - min) + min);
}

function clearAll()
{
    $.each($(".container").children(), function (index, value)
    {
        $(value).removeClass("black");
    });
    time = 30;
    score = 0;
}