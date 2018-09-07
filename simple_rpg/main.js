var mapArray, ctx, currentImgMainX, currentImgMainY;
var imgMountain, imgMain, imgEnemy;
/*mapArray:決定地圖中每個格子的元素
  ctx:HTML5 Canvas用
  currentImgMainX,currentImgMainY:決定主角的所在座標
  imgMountain, imgMain, imgEnemy:障礙物,主角,敵人的圖片物件*/
$(document).ready(function(){                      //當網頁元件載入完成後要做的事情
    mapArray = [0,1,1,0,0,0,3,1,2];                //遊戲地形設定-> 0:可走, 1:障礙, 2:終點, 3:敵人
    ctx = $("#myCanvas")[0].getContext("2d");
    
    imgMain = new Image();                        //擺上主角 - 使用預設位置  
    imgMain.src = "simple_rpg/images/spritesheet.png";
    currentImgMainX=0;
    currentImgMainY=0;
    imgMain.onload=function()
    {
        ctx.drawImage(imgMain,0,0,80,130,currentImgMainX,currentImgMainY,200,200);
    };
    imgMountain = new Image();                     //擺上障礙物和敵人。障礙物圖片物件
    imgMountain.src = "simple_rpg/images/material.png";
    imgEnemy = new Image();                        //敵人圖片物件
    imgEnemy.src = "simple_rpg/images/enemy.png";
    imgMountain.onload=function(){
        imgEnemy.onload=function(){
        for(var x in mapArray)
        {
            if(mapArray[x]==1)                      //擺上障礙物
            {
                ctx.drawImage(imgMountain,32,65,32,32,x%3*200,Math.floor(x/3)*200,200,200);
            }else if(mapArray[x]==3)               //擺上敵人
            {
                ctx.drawImage(imgEnemy,7,40,104,135,x%3*200,Math.floor(x/3)*200,200,200);
            }
        }
        }
    }
});
$(document).keydown(function(event){                 //當有人按下按鍵後要做的事情
    var targetImgMainX, targetImgMainY, targetBlock, cutImagePositionX;
    /*targetImgMainX, targetImgMainY:主角即將要移動過去的目標位置
      targetBlock:主角即將要移動過去的那一格編號
      cutImagePositionX:依據主角朝向什麼方向而決定的圖片*/
    event.preventDefault();                          //避免點擊鍵盤出現瀏覽器的其他行為. 如:捲動,放大,換頁...
    console.log(event.which);   //可以看到鍵盤對應到的 Case 數字
    switch(event.which){                            //依據使用者點擊按鍵. 計算出目標位置以及設定新的圖片
        case 37:
        case 65:    //往左走
            targetImgMainX = currentImgMainX-200;
            targetImgMainY = currentImgMainY;
            cutImagePositionX = 175;
            break;
        case 38:
        case 87:    //往上走
            targetImgMainX = currentImgMainX;
            targetImgMainY = currentImgMainY-200;
            cutImagePositionX = 355;
            break;
        case 39:
        case 68:    //往右走
            targetImgMainX = currentImgMainX+200;
            targetImgMainY = currentImgMainY;
            cutImagePositionX = 540;
            break;
        case 40:
        case 83:    //往下走
            targetImgMainX = currentImgMainX;
            targetImgMainY = currentImgMainY+200;
            cutImagePositionX = 0;
            break;
        default:                                  //當有人按了這四個按鍵以外的狀況
            return;
    }
    if(targetImgMainX<=400 && targetImgMainX>=0 && targetImgMainY<=400 && targetImgMainY>=0)                //沒有超出邊界
    {
        targetBlock=targetImgMainX/200+targetImgMainY/200*3;
    }else
    {
        targetBlock=-1;         //-1代表異常. 不移動
    }
    
    ctx.clearRect(currentImgMainX, currentImgMainY,200,200);                       //清除主角原本的所在位置
    if(targetBlock==-1 || mapArray[targetBlock]==1 || mapArray[targetBlock]==3){}    //目標位置異常 遇到障礙物 遇到敵人都不能走.在原地(但稍後會依移動方向轉頭)
    else
    {
        $("#talkBox").text("");
        currentImgMainX=targetImgMainX;
        currentImgMainY=targetImgMainY;
    }
        ctx.drawImage(imgMain,cutImagePositionX,0,80,130,currentImgMainX,currentImgMainY,200,200);
        switch(mapArray[targetBlock])
            {
                case undefined:
                    $("#talkBox").text("邊界");       //牆壁
                break;
                case 1:
                    $("#talkBox").text("有山");        //障礙
                break;
                case 2:
                    $("#talkBox").text("抵達終點!");     //終點
                break;
                case 3:
                    $("#talkBox").text("嗨~");          //有人
                break;
            }
});