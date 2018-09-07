$(document).ready(function(){
    var currentQuiz=null;      //建立currentQuiz,儲存目前作答到第幾題
    $("#startButton").click(function() //當按下按鈕後,要做的事情放在{}裡
    {
        if(currentQuiz==null) //如果還沒開始作答從這裡開始
        {
            currentQuiz=0;     //設定目前作答到第 0 題
            $("#question").text(questions[0].question);  //顯示題目
            $("#options").empty();    //每次顯示選項前先將該區域清空(可以試著先不做這一步)       
            for(var x=0;x<questions[0].answers.length;x++) //將一個一個選項內容添加至選項區塊
            {
                $("#options").append("<input name='option' type='radio' value="+x+">"+"<label>"+questions[0].answers[x][0]+"</label><br><br>");
            }
            $("#startButton").attr("value","Next");   //將按鈕上的文字換成 Next 或下一題
        }
        else
        {
            $.each($(":radio"),function(i,val){             //巡訪每個選項是否有被選取
                if(val.checked)
                {
                    if(isNaN(questions[currentQuiz].answers[i][1]))     //使用者所選取的項目是否已產生最終結果(A~D)
                    {
                        var finalResult=questions[currentQuiz].answers[i][1];    //通往最終結果
                        //console.log(finalResult);
                        //alert(finalResult);         24 or 25 行,檢查有無跑到最後結果&最後結果是否是data.js的最後結果
                        $("#question").text(finalAnswers[finalResult][0]);        //顯示最終結果的標題
                        $("#options").empty();                                   //將選項區域清空
                        $("#options").append(finalAnswers[finalResult][1]+"<br><br>");   //顯示最終結果的詳細內容
                        currentQuiz=null;                                          //將目前作答到底幾題的變數清空
                        $("#startButton").attr("value","重新開始");                    //修改按鈕為重新開始
                    }
                    else
                    {
                        currentQuiz=questions[currentQuiz].answers[i][1]-1;       //***指定下一個要顯示的題目,由於原始資料是從1開始算,所以-1
                        $("#question").text(questions[currentQuiz].question);       //顯示新的題目
                        $("#options").empty();                                     //清空選項區塊
                        for(var x=0;x<questions[currentQuiz].answers.length;x++)    //顯示新的選項內容
                        {
                            $("#options").append("<input name='options' type='radio' value="+x+">"+"<label>"+questions[currentQuiz].answers[x][0]+"</label><br><br>");
                        }
                        
                    }
                    return false;              //完成後即可跳離迴圈
                }
            })
        }
    });
                            
});