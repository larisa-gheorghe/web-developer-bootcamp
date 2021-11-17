//Selectors
// document.getElementById("first");
// document.getElementsByClassName("special")[0];
// document.getElementsByTagName("p")[0];
// document.querySelector("p");
// document.querySelector("h1 + p");
// document.querySelector(".special");
// document.querySelector("#first");
// document.querySelectorAll(".special")[0]


//Color changer
var button = document.querySelector("button");

button.addEventListener("click", function(){
    document.body.classList.toggle("backgroundColor");
});

// //Color changer
// var button = document.getElementsByTagName("button");
// var isPurple = false;

// button[0].addEventListener("click", function(){
//     if (isPurple){
//         document.body.style.background = "white";
//     }   else {
//         document.body.style.background = "purple";
//     }
//     isPurple = !isPurple;
// });