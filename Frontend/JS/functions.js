//Ex 1
function isEven(x) {
    if (x % 2 === 0) {
        return true;
    }
    else {
        return false;
    }
}

//Second version
function isEven2(x) {
    return x % 2 === 0;   //
}


//Ex 2
function factorial(x) {
    
   //define a result variable
    let fact = 1;
    //calculate factorial and store value in result
    for (var i = 1; i <= x; i++) {
        fact *= i;
    }
    //return the result variable
    return fact;
}

// function factorial(x) {
    
//     if (x === 0) {
//         return 1;
//     }
   
//     let fact = 1;
//     for (var i=1;i <= x; i++) {
//       console.log(`before  fact = ${fact} i=${i}`);
//         fact = fact * i
//         console.log(`after fact= ${fact} i=${i}`);
//     }
    
//     // for (var i= x-1; i >=1 ; i--) {
//     //     x=x*i;
//     // }
//     return fact;
// }



// function kebabToSnake(name) {
//     var newname = name.replace(/-/g, "_");
//     return newname
// }



// function sing() {
//     console.log("twinkle twinkle...")
//     console.log("how i wonder...")
// }

// setInterval(sing, 1000)  //this function will call whatever is in sing at an interval of 1000 mseconds

