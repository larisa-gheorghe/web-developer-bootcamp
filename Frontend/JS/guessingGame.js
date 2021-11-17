//enter your max number

//enter your first guess

//guess higher

//guess lower

//congrats

let max = parseInt(prompt("enter your max number"));
const target = Math.floor(Math.random() * max) + 1;

while (!max) {
    max = parseInt(prompt("enter a valid number"));
}

let guess = parseInt(prompt("enter your first guess"));
let attempts = 1;

while (parseInt(guess) !== target) {
    if (guess === "q") break;
    attempts++;
    if (guess < target) {
        guess = prompt("guess higher");
    } else {
        guess = prompt("guess lower");
    }
}

if (guess === 'q') {
    console.log("You quit");
} else {
    console.log(`Congrats! You got it! It took you ${attempts} guesses`);
}

