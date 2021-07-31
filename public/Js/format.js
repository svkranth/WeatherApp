$("button").click(function(){
    $("button").addClass("button-format");
    setTimeout(function(){
        $("button").removeClass("button-format");
    },100);
});