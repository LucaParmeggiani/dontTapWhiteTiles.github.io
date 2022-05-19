var key1 = "z";
var key2 = "x";
var openMenu = "o";
var escapeKey = "Escape";
var submitKey = "Enter";

var keyBindingArray = [key1, key2, openMenu];

var difficulty = 3; // easy 3 | normal 4 | hard 5 | insane 6 | hell 7 | impossible 8
var goal = 10; //easy 10 | normal 15 | hard 20 | insane 25 | hell 30 | impossible 35

var size;

$(document).ready(function() {
    if(!localStorage.getItem("keyBindings"))
        localStorage.setItem("keyBindings", JSON.stringify(keyBindingArray));

    data = JSON.parse(localStorage["keyBindings"]);
    key1 = data[0];
    key2 = data[1];
    openMenu = data[2];

    updateKeys();
});

function updateKeys()
{
    data = JSON.parse(localStorage["keyBindings"]);
    $(".keyBindingSub kbd").each(function(i, e){
        $(e).text(data[i]);
    });
}

$("#mode").change(function(){ // change difficulty
    difficulty = parseInt($(this).val());
    
    goal = parseInt($(this).find('option[value="'+$(this).val()+'"]').attr('data-goal'));
    $("#gameContainer").removeClass();

    switch (difficulty){
        case 3: //easy
            size = "sizeEasy";
        break;
        case 4: //normal
            size = "sizeNormal";
        break;
        case 5: //hard
            size = "sizeHard";
        break;
        case 6: //insane
            size = "sizeInsane";
        break;
        case 7: //hell
            size = "sizeHell";
        break;
        case 8: //impossible
            size = "sizeImpossible";
        break;
    }
    $("#gameContainer").addClass(size);
    start();

    leaderboardDiffName = $(this).find(':selected').text();
    leaderboardUpdate(leaderboardDiffName, JSON.parse(localStorage["localScores"]));
});

function options(option)
{
    if (option == "open")
    {
        $(".optionButton").addClass("menuOpenAnimation");
        $(".optionButton").attr("onclick", "options('close')");
        $(".menuLables").addClass("menuOpen");
    }
    else
    {
        $(".optionButton").removeClass("menuOpenAnimation");
        $(".optionButton").attr("onclick", "options('open')");
        $(".menuLables").removeClass("menuOpen");
    }
}

function openSubmenu(id)
{
    switch(id)
    {
        case "keyBindings":
            $(".optionsBg").css("display", "flex");
            $(".keyBindingSub").show();
            break;
        case "reportBug":
            if(confirm("Report a bug?"))
                window.open('mailto:parme.dev@gmail.com?subject=Report Bug');
            break;
        case "credits":
            $(".optionsBg").css("display", "flex");
            $(".creditsSub").show();
            break;
        default:
            console.log("Bruh, why are you here?");
            break;
    }
}

function closeMenu()
{
    $(".optionsBg").hide();
    $(".keyBindingSub").hide();
    $(".creditsSub").hide();
}

function changeKey(elem)
{
    var newKey = window.prompt("Change key", elem.text());
    var checkNewKey = newKey.split("");
    if(newKey == null || newKey == "" || checkNewKey[1] != null)
    {
        alert("Invalid key");
        return;
    }
    else
    {
        switch(elem.attr("class"))
        {
            case "key1":
                keyBindingArray[0] = newKey;
                break;
            case "key2":
                keyBindingArray[1] = newKey;
                break;
            case "optionKey":
                keyBindingArray[2] = newKey;
                break;
        }
        localStorage.setItem("keyBindings", JSON.stringify(keyBindingArray));
    }
    updateKeys();
}