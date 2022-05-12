$(document).ready(function()
{
    $(document).trigger("resize");

    var scroll = true;

    $(".leaderboardGrid").mouseenter(function(){ scroll = false; });
    $(".leaderboardGrid").mouseleave(function(){ scroll = true; });

    $(document).on("wheel", function(event){
        if(scroll && event.originalEvent.deltaY !== 0)
            if(event.originalEvent.deltaY > 0)
                switchTo("leaderboard", $(".leaderboardPage"));
            else
                switchTo("game", $(".gamePage"));
    });
});

function switchTo(pageIn, element)
{
    var pageOff;
    pageIn === "leaderboard" ? pageOff = "game" : pageOff = "leaderboard";

    if(!element.hasClass("active"))
    { 
        $(".gamePage, .leaderboardPage").toggleClass("active");
        animationPage(pageOff, "out");
        animationPage(pageIn, "in");
        sortLeaderboard("time", "asc");
    }
}

function animationPage(page, direction)
{
    var page = page == "game" ? $(".game") : $(".leaderboard");
    if(direction == "out")
        page.fadeOut("fast");
    else
        page.delay(200).fadeIn("fast");
}