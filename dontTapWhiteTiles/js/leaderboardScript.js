var leaderboardDiffName;

$(document).ready(function(){
    leaderboardDiffName = $("#difficulty").val();
    
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

    $("#difficulty").change(function(){
        leaderboardDiffName = $(this).val();
        leaderboardUpdate(leaderboardDiffName);
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
        $(".bodyGrid").append(temp);
    });
}