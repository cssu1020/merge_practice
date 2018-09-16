function changeImage(){
    var element=document.getElementById('myimage');
    if(element.src.indexOf("bulbon")!=-1)
    {
        element.src="smart_home_web/images/pic_bulboff.gif";
    }else{
        element.src="smart_home_web/images/pic_bulbon.gif";
    }
}