let startBtn = document.querySelector(".startBtn");
let resetBtn = document.querySelector(".resetBtn");
let quitBtn = document.querySelector(".quitBtn");
let body = document.querySelector("body");

let cardList = document.querySelectorAll(".card");
let display = document.querySelector(".display");

let isStart = false;
let clickSeq = [];
let blinkSeq = [];
let level = 0;
let score = 0;

startBtn.addEventListener("click", function() {
    startBtn.classList.toggle("hidden");
    resetBtn.classList.toggle("hidden");
    quitBtn.classList.toggle("hidden");
    isStart = true;

    levelUp();
});
resetBtn.addEventListener("click", function() {
    isStart = true;
    resetGame();
    levelUp();
});
quitBtn.addEventListener("click", function() {
    startBtn.classList.toggle("hidden");
    resetBtn.classList.toggle("hidden");
    quitBtn.classList.toggle("hidden");
    resetGame();
    isStart = false;
    display.innerText = "Click start button to start the Game";
});

for (card of cardList) {
    card.addEventListener("click", function() {
        blink(this);
        let clickColor = this.getAttribute("id");
        clickSeq.push(clickColor);
        checkSeq(clickSeq.length - 1);
    });
}

function blink(card) {
    card.classList.add("blinkCard");
    setTimeout(function() {
        card.classList.remove("blinkCard");
    }, 400);
}

function levelUp() {
    level++;
    display.innerHTML = `Level ${level} <br>Score ${score}`;
    let randomColorIndex = Math.floor(Math.random() * 6);
    let randomCard = cardList[randomColorIndex];
    let randomColor = randomCard.getAttribute("id");
    
    blinkSeq.push(randomColor);
    console.log(blinkSeq);
    let delay = 500;
    
    blinkSeq.forEach((color, index) => {
        setTimeout(function() {
            let card = document.querySelector(`.${color}`);
            blink(card);
        }, delay * index);
    });
    
    clickSeq = [];
}

function checkSeq(idx) {
    if (clickSeq[idx] == blinkSeq[idx]) {
        score++;
        if (clickSeq.length == blinkSeq.length) {
            setTimeout(function() {
                levelUp();
            }, 1000);
        }
    } else {
        display.innerHTML = `Game Over press start to start the game again <br> Score ${score}`;
        
        // Trigger the red flashing background
        flashRed(body);

        startBtn.classList.toggle("hidden");
        resetBtn.classList.toggle("hidden");
        quitBtn.classList.toggle("hidden");
        resetGame();
    }
}

function resetGame() {
    level = 0;
    clickSeq = [];
    blinkSeq = [];
    score = 0;
}

function flashRed(body) {
    // Add the red-bg class to trigger the animation
    body.classList.add("red-bg");
    
    // Remove the class after 1 second to stop the animation and revert the background
    setTimeout(function() {
        body.classList.remove("red-bg");
    }, 1000);  // Duration of the flash effect
}