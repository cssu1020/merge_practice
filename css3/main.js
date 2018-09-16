$(document).ready(function() {
       var c=0;
       setInterval(function(){
           $("img#windmill").css("transform","rotate("+c+"deg)");
           c=c+30;
       },50);    
});
