(function(){
  'use strict';
    var startBtn = document.getElementById('start');
    var genre = document.getElementById('genre');
    var diff = document.getElementById('difficulty');
    var qs = document.getElementById('qs');
    var ques = document.getElementById('question');
    var qsNum = document.getElementById('qs-num');
    var ansOne = document.getElementById('ans-one');
    var ansSec = document.getElementById('ans-sec');
    var ansThir = document.getElementById('ans-thir');
    var ansFour = document.getElementById('ans-four');
    var btn = document.getElementsByClassName('btn');
    var back = document.getElementById('back');
    var score = 0;
    var count = 0;
    var answs = [];
    fetch('https://opentdb.com/api.php?amount=10')
    .then(response =>{
      return response.json();
    })
    .then(data =>{
      // オブジェクトをシャッフル
      var objectKeysShuffled = function(dataresults){
        return shuffle(Object.keys(data.results));
      }
        setQuiz();
     //クイズをセットする処理
     function setQuiz(){
       var qsCount = count+1;
       console.log(data.results[count]);//テストアウトプット
       genre.innerText ="[ジャンル] "+data.results[count].category;
       genre.style.display="block";
       diff.innerText ="[難易度] "+data.results[count].difficulty;
       diff.style.display="block";
       qs.innerText = data.results[count].question;
       qsNum.innerText="問題"+qsCount;
       buildAnsChoises();
         //回答選択肢押下時処理
       for(var i=0; i<btn.length;i++){
           btn[i].addEventListener('click',function(){
           if(this.value===data.results[count].correct_answer){
             score++;
             count++;
           }else{
             count++;
           }
           if(count===10){
             qsNum.innerHTML="あなたの正解数は"+score+"です！";
             qs.innerHTML="再度チャレンジする場合は以下をクリック";
             genre.style.display="none";
             diff.style.display = "none";
           }
           answs=[];
           ques.textContent = [];
           setQuiz();
         });
       }
     }
     //  回答選択肢作成処理
     function buildAnsChoises(){
         // correct_answerを配列answsへプッシュ
       answs.push(data.results[count].correct_answer);
       //incorrect_answersを配列answsへプッシュ
       for(var i=0;i<data.results[count].incorrect_answers.length;i++){
         answs.push(data.results[count].incorrect_answers[i])
       }
       //answsをシャッフル
       var length = answs.length;
       for(var i = length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = answs[i];answs
        answs[i] = answs[j];
        answs[j] = tmp;
       }
       //DOM生成処理
       for(var i =0;i<answs.length;i++){
         var dd = document.createElement('dd');
         var inp = document.createElement('input');
         ques.appendChild(dd);
         dd.appendChild(inp);
         inp.type="button";
         inp.className="btn";
         inp.value = answs[i];
       }
     }
    });
})();

// プルリクエスト
