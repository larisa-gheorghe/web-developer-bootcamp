movies = [
    {name: "Harry Potter",
    rating: 5,
    hasWatched: true},
    {name: "Lord of The Ring",
    rating: 5,
    hasWatched: true},
    {name: "The Hobbit",
    rating: 4.5,
    hasWatched: true},
    {name: "Fantastic Beasts and Where to Find Them",
    rating: 4,
    hasWatched: false}      
]

// for (i = 0; i < movies.length; i++){
//     if (movies[i].hasWatched) {
//         console.log("You have " + "watched \"" + movies[i].name + "\" - " + movies[i].rating + " stars");
//     }   else {
//         console.log("You have " + "not watched \"" + movies[i].name + "\" - " + movies[i].rating + " stars");
//     }
    
// }

//Second version 
movies.forEach (function(movie){
    console.log(buildString(movie))
})

function buildString(movie){
    var result = "You have ";
    if (movie.hasWatched) {
        result += "watched ";
    }   else {
        result += "not seen ";
    }
    result += "\"" + movie.name + "\" ";
    result += movie.rating + " stars";
    return result;
}