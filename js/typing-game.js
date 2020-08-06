$(function(){

  let questionList = [
    '欲望に満ちた青年団',
    'アンサイズニア',
    'キミシダイ列車',
    'カゲロウ',
    '未完成交響曲',
    '内秘心書',
    'カサブタ',
    'エトセトラ',
    'ゼイタクビョウ',
    '残響残響リファレンス',
    '皆無',
    '欠落オートメーション',
    'カラス',
    'ゆめゆめ',
    '夜にしか咲かない満月',
    '独り言ロンリーナ',
    '後悔役に立たず',
  ];
  
  //上で定義した配列をランダムな順番にする
  for(var i = questionList.length - 1; i > 0; i--){
    var r = Math.floor(Math.random() * (i + 1));
    var tmp = questionList[i];
    questionList[i] = questionList[r];
    questionList[r] = tmp;
  }

  let score = 0;
  let number = 0;
  let times = 0;

  function displayQuestion(){
    if(times === 5){
      $('#question').html("ゲーム終了！！");
    }else{
      $('#question').html(questionList[times]);
    }
  }

  displayQuestion();

  // 問題と入力した文字列を比較する関数
  function comparison(){

    var lastQuestion = $("#question").text();                                                 //問題の文字列を取得
    var inputAnswer = $("#answer").val();                                                     //入力した文字列を取得
    var lastQuestionArray = lastQuestion.split('');                                           //問題の文字列を１文字ずつ分割し配列にする
    var inputAnswerArray = inputAnswer.split('');                                             //入力した文字列を１文字ずつ分割し配列にする
    var subtractionLength = Math.abs(lastQuestionArray.length - inputAnswerArray.length)      //配列同士の文字数の差の絶対値を取得
    var sameLength;                                                                           //2つのうち短い配列の文字数を取得
    
    // 問題と入力した文字列の短い方の文字数を取得
    if(lastQuestionArray.length > inputAnswerArray.length){
      sameLength = inputAnswerArray.length;
    }else if(lastQuestionArray.length < inputAnswerArray.length){
      sameLength = lastQuestionArray.length;
    }else{
      sameLength = lastQuestionArray.length;
    }

    //文字列の長さが共通な部分を一文字ずつ比較し、異なる文字があれば加点する
    score += subtractionLength;
    for (var i = 0; i < sameLength; i++) {
      if(lastQuestionArray[i] != inputAnswerArray[i]){
        score += 1;
      }
    }
  }

  $("#answerBtn").on('click', function(e) {

    if(times > 4){
      return;
    }

    $('#resultText').html("");
    comparison();

    times ++;
    displayQuestion();

    $("#answer").val("");
    $("#answer").focus();
    
    if (times === 5){
      finish();
    }
    startTime = new Date();
    finishTime = new Date(startTime.getTime() + sec * 1000);
    countDown();
    count = 10;
    clearInterval(timer);
  });

  function finish(){
  
    if(score >= 9){
      $('#resultText').html("頑張りましょう。");
    }else if(score >= 4){
      $('#resultText').html("まだまだです。");
    }else if(score >= 1){
      $('#resultText').html("おしい！");
    }else{
      $('#resultText').html("完璧！");
    }
  
    $('#leftTime').css("visibility", "hidden");
    
  }
  
  function countDown(){
    if(number === 5){
      return;
    }
    timer = setInterval(function(){
      count--;
      startTime = new Date();
      $('#leftTime').html(count + 1);
      if(startTime.getTime() >= finishTime.getTime()){
        $('#answerBtn').click();
        clearInterval(timer);
      }
    }, 1000);
  }
  
  var sec = 10;
  var startTime = new Date();
  var finishTime = new Date(startTime.getTime() + sec * 1000);
  var count = 9;
  var timer;
  countDown();

});