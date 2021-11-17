
var todos = ["Buy new turtle"];
window.setTimeout(function() {
  var input = prompt("What would you like to do?");

  while(input !== "quit") {
    if(input === "list") {
            listTodos();
    }   else if (input === "new") {
            newTodos();
    }   else if (input === "delete") {
            deleteTodos();
    }
    input = prompt("What would you like to do?");
  }
  console.log("OK, you quit the app");

  function listTodos() {
    console.log("**********")
    todos.forEach(function(todo, index){
        console.log(index + ": " + todo);
    });
    console.log("**********")
  }

  function newTodos() {
    var newToDo = prompt("Enter new todo");  
    todos.push(newToDo);
    console.log("Added Todo");
  }

  function deleteTodos(){
    var removeIndex = prompt("Remove the following todo index");  
    todos.splice(removeIndex,1);
    console.log("Deleted Todo");
  }
}, 500);


// var numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];

// for (var i = 0; i < numbers.length; i++) {
//     if (numbers[i] % 3 === 0) {
//         console.log(numbers[i]);
//     }
// }