$(document).ready(function()
{
    $(document).scroll(function()
    { 
        if($(this).scrollTop() > 20)
            $("header").css("box-shadow", "0px 0px 60px #00284B");
        else
            $("header").css("box-shadow", "0px 0px 15px #00284B");
    });
});