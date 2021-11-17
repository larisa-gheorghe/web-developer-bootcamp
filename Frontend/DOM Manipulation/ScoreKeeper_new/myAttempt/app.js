let button1 = document.querySelector('#button1');
let button2 = document.querySelector('#button2');
let resetButton = document.querySelector('#resetButton');
let player1Display = document.querySelector('#player1');
let player2Display = document.querySelector('#player2');
let winnerScore = document.querySelector('#winnerScore');
let player1Score = 0;
let player2Score = 0;
let maxNum = 5;

button1.addEventListener('click', function(){
    player1Score++;
    if (player1Score === maxNum) {
        player1Display.classList.add('winner')
        player2Display.classList.add('loser')
        button1.disabled = true;
        button2.disabled = true;
    }
    player1Display.textContent = player1Score;
});

button2.addEventListener('click', function(){
    player2Score++;
    if (player2Score === maxNum) {
        player1Display.classList.add('loser')
        player2Display.classList.add('winner')
        button1.disabled = true;
        button2.disabled = true;
    }
    player2Display.textContent = player2Score;
});

winnerScore.addEventListener('change', function(){
    reset();
    maxNum = parseInt(this.value);  //e.target can be replaced by 'this'
});

resetButton.addEventListener('click', reset);

function reset(){
    player1Score = 0;
    player2Score = 0;
    player1Display.textContent = 0;
    player2Display.textContent = 0;
    player1Display.classList.remove('winner', 'loser')
    player2Display.classList.remove('loser', 'winner')
    button1.disabled = false;
    button2.disabled = false;
};