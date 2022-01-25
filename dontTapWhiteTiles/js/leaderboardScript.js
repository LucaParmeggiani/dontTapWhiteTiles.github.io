var leaderboardDiffName;

$(document).ready(function(){
    leaderboardDiffName = $("#mode :selected").text();
    
    $("#sort").change(function(){
        var sortMode = $(this).val();
        switch(sortMode)
        {
            case "time":
                var data = JSON.parse(localStorage["localScores"]);
                var temp = data[leaderboardDiffName];
                temp.sort(function(a, b){
                    return a.rawTime - b.rawTime;
                });
                data[leaderboardDiffName] = temp;

                leaderboardUpdate(leaderboardDiffName, data);
                break;
            case "date":
                var data = JSON.parse(localStorage["localScores"]);
                var temp = data[leaderboardDiffName];
                temp.sort(function(a, b){
                    return b.rawDate - a.rawDate;
                });
                data[leaderboardDiffName] = temp;

                leaderboardUpdate(leaderboardDiffName, data);
                break;
        }
    });

    $("#sort").trigger('change');
});

function leaderboardUpdate(leaderboardDiffName, arr)
{
    $(".bodyGrid").empty();
    $(arr[leaderboardDiffName]).each(function(i, e){
        var temp = $(".leaderboardTemplate").clone();
        temp.removeClass("leaderboardTemplate");
        temp.addClass("leaderboardField");
        temp.find(".leaderboardName").text(e.id);
        temp.find(".leaderboardTime").text(e.time);
        temp.find(".leaderboardDate").text(e.date);
        temp.attr("id", e.rawDate);
        $(".bodyGrid").append(temp);
    });
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