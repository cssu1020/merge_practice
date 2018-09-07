$(document).ready(function(){
    $("input").click(function()
    {
        //alert("Hi");
        //$("H1").text("Hello");
        //$("H1").text($("li:first").text());
        //$("H1").text($("li:last").text());
        //$("H1").text($("li").eq(1).text());
        var numberOfListItem = $("#choices li").length;
        var randomChildNumber = Math.floor(Math.random()*numberOfListItem);
        console.log(randomChildNumber);
        $("H1").text($("#choices li").eq(randomChildNumber).text());
    });
});