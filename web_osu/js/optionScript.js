//key bindings
var key1 = "z";
var key2 = "x";
var escapeKey = "Escape";

var difficulty = 3; // easy 3 - 10 | normal 4 - 15 | hard 5 - 20 | insane 6 - 25 | hell 7 - 30 | impossible 8 - 35
var goal = 10;

$("#mode").change(function(){ // change difficulty
    difficulty = parseInt($(this).val());
    goal = parseInt($(this).find('option[value="'+$(this).val()+'"]').attr('data-goal'));
    $("#container").removeClass();

    switch (difficulty){
        case 3: //easy
            $("#container").addClass("sizeEasy");
        break;
        case 4: //normal
            $("#container").addClass("sizeNormal");
        break;
        case 5: //hard
            $("#container").addClass("sizeHard");
        break;
        case 6: //insane
            $("#container").addClass("sizeInsane");
        break;
        case 7: //hell
            $("#container").addClass("sizeHell");
        break;
        case 8: //impossible
            $("#container").addClass("sizeImpossible");
        break;
    }
    start();
});