//key bindings
var key1 = "z";
var key2 = "x";
var escapeKey = "Escape";
var submitKey = "Enter";

var difficulty = 3; // easy 3 | normal 4 | hard 5 | insane 6 | hell 7 | impossible 8
var goal = 10; //easy 10 | normal 15 | hard 20 | insane 25 | hell 30 | impossible 35

var size;

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
});