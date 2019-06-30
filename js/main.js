(function(){
  'use strict';
    const startBtn = document.getElementById('start');
    const genre = document.getElementById('genre');
    const diff = document.getElementById('difficulty');
    const qs = document.getElementById('qs');
    const answs = document.getElementById('answers');
    const qsNum = document.getElementById('qs-num');
    const btn = document.getElementsByClassName('btn');
    const genreArea = document.getElementById('genreArea');
    let score = 0;
    let count = 0;
    let answsArr = [];

    //API
    fetch('https://opentdb.com/api.php?amount=10')
    .then(response =>{
      return response.json();
    })
    .then(data =>{
      setQuiz(data);
    });

     //クイズをセットする処理
     function setQuiz(data){
       let qsCount = count + 1;
       genre.innerText = "[ジャンル] " + data.results[count].category;
       genre.style.display = "block";
       diff.innerText = "[難易度] " + data.results[count].difficulty;
       diff.style.display = "block";
       qs.innerText = data.results[count].question;
       qsNum.innerText ="問題" + qsCount;

       buildAnsChoises(data);

     }

     // 回答選択肢の作成
     function buildAnsChoises(data){
        // correct_answerを配列answsArrへプッシュ
       answsArr.push(data.results[count].correct_answer);
       // incorrect_answersを配列answsArrへプッシュ
       for(let i = 0; i < data.results[count].incorrect_answers.length; i ++){
         answsArr.push(data.results[count].incorrect_answers[i])
       }
       // answsArrをシャッフル
       let length = answsArr.length;
       for(let i = length - 1; i > 0; i --) {
         let j = Math.floor(Math.random() * (i + 1));
         let tmp = answsArr[i];
         answsArr[i] = answsArr[j];
         answsArr[j] = tmp;
       }

       // DOM生成処理
       for(let i = 0; i < answsArr.length; i ++){
         let dd = document.createElement('dd');
         let inp = document.createElement('input');
         answs.appendChild(dd);
         dd.appendChild(inp);
         inp.type = "button";
         inp.className = "btn";
         inp.value = answsArr[i];
       }

       // btn押下時処理
       const btns = Array.from(btn);
       btns.forEach(function(el){
         el.addEventListener('click',function(){
           count ++;
           if(this.value === data.results[count].correct_answer){
             score ++;
           }
           // １０問目が終了した時の表示
           if(count === 10){
              qsNum.innerHTML = "あなたの正解数は" + score + "です！";
              qs.innerHTML = "再度チャレンジする場合は以下をクリック";
              genreArea.textContent = "";
           }
           answsArr = [];
           answs.textContent = [];
           setQuiz(data);
        });
      });
     }
})();
