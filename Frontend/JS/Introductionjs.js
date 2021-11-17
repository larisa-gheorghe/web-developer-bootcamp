// alert ("Hello from the JS file!");

// var userName = prompt ("What is a your name?");
// alert ("Nice to meet you, " + userName +"!");
// console.log("Also great to meet you, " + userName + "!");

//JS Stalker Exercise
//=============================
// var userFirstName = prompt ("What is a your first name?");
// var userLastName = prompt ("What is a your last name?");
// var userAge = prompt ("What is a your age?");
// var userFullName = userFirstName + " " + userLastName;

// console.log ("Your full name is " + userFullName);
// console.log (userFirstName + " has " + userAge + " years.");

//Age Calculator
//=============================
// var userAge = prompt ("What is a your age?");
// var daysAlive = userAge * 365;
// alert ("You've been alive " + daysAlive + " days.")

//JS Conditionals
//=============================
// var age = Number(prompt("How old are you?"));

// if (age < 0) {
//     console.log("Invalid entry");
// }
// if (age === 21) {
//     console.log("Happy 21st birthday!!");
// }
// if (age % 2 === 1){
//     console.log("Your age is odd!");
// }
// if (age % Math.sqrt(age) === 0){
//     console.log("Perfect square");
// }


//Guessing Game with if conditional
//=============================
// var secretNumber = 4;
// var stringNumber = prompt("Guess a number!");
// var number = Number(stringNumber);

// if (number === secretNumber) {
//     alert ("You guessed it!");
// }
// else if (number > secretNumber) {
//     alert ("Too high. Try again.");
// }
// else {
//     alert("Too low. Try again.");
// }

//While Loops
//=============================
// var count = 1;

// while (count < 6) {
//     console.log("count is: " + count);
//     count++;     //count+=2;
// }

// var str = "hello";
// var count = 0;

// while (count < str.length) {
//     console.log(str[count]);
//     count++;
// }

//print all numbers between -10 and 19 while loop
//=============================

// console.log ("ex 1");
// var num = -10;

// while (num <=19) {
//     console.log(num);
//     num++;
// }

//print all numbers between -10 and 19 for loop
//=============================
console.log ("ex 1");
for (var num = -10; num < 19; num++) {
    console.log(num);
}

// //print all even numbers between 10 and 40 while loop
//=============================
// console.log ("ex 2");
// var counter = 10;

// while (counter < 40) {
//     if (counter % 2 === 0) {
//     console.log(counter);
//     }
//     counter++;
// }

// //print all even numbers between 10 and 40 for loop
//=============================
console.log ("ex 2");
for (var num = 10; num < 40; num++) {
    if (num % 2 === 0) {
        console.log(num);
    }
}

// //print all odd numbers between 300 and 333 while loop
//=============================
// console.log ("ex 3");
// var num3 = 300;

// while (num3 <= 333) {
//     if (num3 % 2 === 1) {
//     console.log(num3);
//     }
//     num3++;
// }

// //print all odd numbers between 300 and 333 for loop
//=============================
console.log ("ex 3");
for (var num = 300; num < 333; num++) {
    if (num % 2 === 1) {
        console.log(num);
    }
}

// //print all numbers divisible with 5 AND 3  between 5 and 50 while loop
//=============================
// console.log ("ex 4");
// var num4 = 5;

// while (num4 < 50) {
//     if ((num4 % 5 === 0) && (num4 % 3 === 0)) {
//     console.log(num4);
//     }
//     num4++;
// }


// //print all numbers divisible with 5 AND 3  between 5 and 50 for loop
//=============================
console.log ("ex 4");
for (var num = 5; num < 50; num++){
    if ((num % 5 === 0) && (num % 3 === 0)) {
        console.log(num);
        }
}

//Annoy-O-Matic
//===================
// var ask = prompt("Are we there yet?");

// while (ask !=="yes" && ask !=="yeah") {
//     var ask = prompt("Are we there yet?");
// }
// alert("Yey, we are here!");

//Annoy-O-Matic Version 2
//===================
// var ask = prompt("Are we there yet?");

// while (ask.indexOf("yes") === -1) {
//     var ask = prompt("Are we there yet?");
// }
// alert("Yey, we are here!");
