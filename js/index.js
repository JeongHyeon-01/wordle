let attempts = 0;
let index = 0;
const correct = "APPLE";
let answer = "";
let timer

function appStart() {

  const HandleKeyboardClick = () => {
    const keyBtn = document.querySelector('.keyboard');
    keyBtn.addEventListener('click', function (event) {
      const dataKey = event.target.getAttribute('data-key');
      const thisBlock = document.querySelector(
        `.board-column[data-index='${attempts}${index}']`
      );
  
      if (!dataKey) return;
  
      if (dataKey === '←') {
        handleBackspace(thisBlock, index);
      } else if (dataKey === '↵') {
        if (index === 5) {
          handleEnterKey();
        }
      } else {
        if (index < 5) {
          thisBlock.innerText = dataKey.toUpperCase();
          index++;
        }
      }
    });
  };

  const displayGameOver = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료 되었습니다.";
    div.style =
      "display : flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:42vw; background-color:white; width:200px; height:100px;";
    document.body.appendChild(div);
  };
  const gameOver = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameOver();
    clearInterval(timer)
  };
  const nextLine = () => {
    if (attempts === 6) {
      return gameOver();
    }
    attempts += 1;
    index = 0;
  };
  const handleBackspace = () => {
    if (index > 0){
      const prevBlock = document.querySelector(
        `.board-column[data-index='${attempts}${index-1}']`
      );
      prevBlock.innerText = "";
    }
    if (index !== 0) {
      index -= 1;
    }
  };

  const handleEnterKey = () => {
    let correctCnt = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-column[data-index='${attempts}${i}']`
      );
      const inputText = block.innerText;
      const correctText = correct[i];
  
      // 정답인 경우
      if (inputText === correctText) {
        block.classList.add("correct");
        correctCnt += 1;
      }
      // 위치만 맞는 경우
      else if (correct.includes(inputText)) {
        block.classList.add("present");
      }
      // 틀린 경우
      else {
        block.classList.add("absent");
      }
    }
  
    // 정답을 모두 맞힌 경우
    if (correctCnt === 5) {
      gameOver();
    } else {
      nextLine();
    }
  };
  
  

  const handleKeydown = (e) => {
    const key = e.key;
    const keyCode = e.keyCode;
    const thisBlock = document.querySelector(
      `.board-column[data-index='${attempts}${index}']`
    );
    if (e.key === "Backspace") {
      handleBackspace(thisBlock, index);
    }
    else if (index === 5) {
      if (e.key === "Enter") {
        handleEnterKey();
      } else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key.toUpperCase();
      index++;
    }
  };
  const startTimer = () => {
    const startTime = new Date();

    function setTime() {
    const nowTime = new Date();
    const afterTime = new Date(nowTime - startTime);
    const min = afterTime.getMinutes().toString().padStart(2,"0");
    const sec = afterTime.getSeconds().toString().padStart(2,"0");
    const timeText = document.querySelector('#timer');
    timeText.innerText = `${min} : ${sec}`
    }
    timer = setInterval(setTime, 1000);
  }
  startTimer();
  HandleKeyboardClick();
  window.addEventListener("keydown", handleKeydown);
}




appStart();
