var leaderboardDiffName;

$(document).ready(function(){
    leaderboardDiffName = $("#mode :selected").text();
    sortLeaderboard("time", "asc");
});

function sortLeaderboard(mode, dir)
{
    switch (mode)
    {
        case "time":

            if($("#stateArrowTime").attr("src") == "assets/icons/arrow.svg")
                $("#stateArrowTime").toggleClass("rotateUp rotateDown");
            else
            {
                $("#stateArrowTime").addClass("slideOut");
                animationEnd("Time", "arrow");
            }

            if($("#stateArrowDate").attr("src") == "assets/icons/arrow.svg")
            {
                $("#stateArrowDate").addClass("slideOut");
                animationEnd("Date", "none");
                $("#stateArrowDate").removeClass("rotateUp rotateDown");
            }

            if(dir == "dec")
            {
                $(".headerTime").attr("onclick", "sortLeaderboard('time', 'asc')");
                $("#stateArrowTime").addClass("rotateUp");
            }
            else
            {
                $(".headerTime").attr("onclick", "sortLeaderboard('time', 'dec')");
                $("#stateArrowTime").addClass("rotateDown");
            }

            var data = JSON.parse(localStorage["localScores"]);
            var temp = data[leaderboardDiffName];
            temp.sort(function(a, b){
                return a.rawTime - b.rawTime;
            });
            if(dir == "dec")
                temp.reverse();
            data[leaderboardDiffName] = temp;

            leaderboardUpdate(leaderboardDiffName, data);
            break;
        case "date":

            if($("#stateArrowDate").attr("src") == "assets/icons/arrow.svg")
                $("#stateArrowDate").toggleClass("rotateUp rotateDown");
            else
            {
                $("#stateArrowDate").addClass("slideOut");
                animationEnd("Date", "arrow");
            }

            if($("#stateArrowTime").attr("src") == "assets/icons/arrow.svg")
            {
                $("#stateArrowTime").addClass("slideOut");
                animationEnd("Time", "none");
                $("#stateArrowTime").removeClass("rotateUp rotateDown");
            }

            if(dir == "dec")
            {
                $(".headerDate").attr("onclick", "sortLeaderboard('date', 'asc')");
                $("#stateArrowDate").addClass("rotateUp");
            }
            else
            {
                $(".headerDate").attr("onclick", "sortLeaderboard('date', 'dec')");
                $("#stateArrowDate").addClass("rotateDown");
            }

            var data = JSON.parse(localStorage["localScores"]);
            var temp = data[leaderboardDiffName];
            temp.sort(function(a, b){
                return b.rawDate - a.rawDate;
            });
            if(dir == "dec")
                temp.reverse();
            data[leaderboardDiffName] = temp;

            leaderboardUpdate(leaderboardDiffName, data);
            break;
    }
}

function animationEnd(mode, replace)
{
    $("#stateArrow" + mode).one('animationend', function(){
        $("#stateArrow" + mode).attr("src", "assets/icons/"+ replace +".svg");
        $("#stateArrow" + mode).toggleClass("slideOut slideIn");
    });
    $("#stateArrow" + mode).one("animationend", function(){
        $("#stateArrow" + mode).removeClass("slideIn slideOut");
    });
}

function leaderboardUpdate(leaderboardDiffName, arr)
{
    $(".bodyGrid").empty();
    for(var i = 0; i < 50; i++)
    {
        if(arr[leaderboardDiffName][i])
        {
            var temp = $(".leaderboardTemplate").clone();
            temp.removeClass("leaderboardTemplate");
            temp.addClass("leaderboardField");
            temp.find(".leaderboardName").text(arr[leaderboardDiffName][i].id);
            temp.find(".leaderboardTime").text(arr[leaderboardDiffName][i].time);
            temp.find(".leaderboardDate").text(arr[leaderboardDiffName][i].date);
            temp.attr("id", arr[leaderboardDiffName][i].rawDate);
            $(".bodyGrid").append(temp);
        }
    }
}

function deleteModal(idScore)
{
    $(".deleteModal").attr("data-delete", idScore);
    $(".deleteModal").find(".deleteName").text($("#"+idScore).find(".leaderboardName").text());
    $(".deleteModal").find(".deleteTime").text($("#"+idScore).find(".leaderboardTime").text());
    $(".deleteModal").find(".deleteDate").text($("#"+idScore).find(".leaderboardDate").text());
    $(".deleteScore").css("display", "flex");
    $(".deleteModal").css("display", "flex");
}

function deleteScore(idScore)
{
    if(idScore != -1)
    {
        var data = JSON.parse(localStorage["localScores"]);
        var temp = data[leaderboardDiffName];
        $(data[leaderboardDiffName]).each(function(i, e){
            if(this.rawDate == idScore)
            {
                temp.splice(i, 1);
                data[leaderboardDiffName] = temp;
                return;
            }
        });
        localStorage["localScores"] = JSON.stringify(data);
        leaderboardUpdate(leaderboardDiffName, data);
    }
    $(".deleteScore").css("display", "none");
    $(".deleteModal").css("display", "none");
}