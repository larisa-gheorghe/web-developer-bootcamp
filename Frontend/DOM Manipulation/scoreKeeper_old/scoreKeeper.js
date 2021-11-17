var p1Button = document.getElementById("p1");
var p2Button = document.getElementById("p2");
var resetButton = document.getElementById("reset");
var span1 = document.querySelector("span");
var span2 = document.querySelectorAll("span")[1];
var numInput = document.querySelector("input");
var playingTo = document.querySelectorAll("span")[2];
var p1Score = 0;
var p2Score = 0;
var gameOver = false;
var winningScore = 5;

p1Button.addEventListener("click", function(){
    if (!gameOver){
        p1Score++;
        if (p1Score === winningScore){
            gameOver = true;
            span1.classList.add("winner");
        }
        span1.textContent = p1Score;
    }
    
})

p2Button.addEventListener("click", function(){
    if (!gameOver){
        p2Score++;
        if (p2Score === winningScore){
            gameOver = true;
            span2.classList.add("winner");
        }
    span2.textContent = p2Score;
    }
})

resetButton.addEventListener("click", function(){
    reset();
})

function reset(){
    p1Score = 0;
    p2Score = 0;
    span1.textContent = p1Score;
    span2.textContent = p2Score;
    span1.classList.remove("winner");
    span2.classList.remove("winner");
    gameOver = false;
}

numInput.addEventListener("change", function(){
    playingTo.textContent = this.value;
    winningScore = Number(this.value);
    reset();
})