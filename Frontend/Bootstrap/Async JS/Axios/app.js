// axios.get('https://api.cryptonator.com/api/ticker/btc-usd')
//     .then( res => {
//         console.log(res.data.ticker.price)
//     })
//     .catch(err => {
//         console.log('error!!!!',err)
//     })


// const fetchBitcoinPrice = async () => {
//     try {
//         const res = await axios.get('https://api.cryptonator.com/api/ticker/btc-usd')
//         console.log(`Current Price is $${res.data.ticker.price}`)
//     }
//     catch(e){
//         console.log('Something went wrong',e)
//     }
        
// }

// // Click a button to get a joke
// const button = document.querySelector('button')
// const list = document.querySelector('#jokes')

// const getDadJoke = async () => {
//     const config = {headers: {Accept: 'application/json'}}
//     const res = await axios.get('https://icanhazdadjoke.com/', config)  //we need to pass a second argument 
//     const newLi = document.createElement('li')
//     newLi.append(res.data.joke)
//     jokes.append(newLi)                  
// }

// button.addEventListener('click', getDadJoke);

// // Refactoring/ Click a button to get a joke
// const button = document.querySelector('button')
// const list = document.querySelector('#jokes')

// const addNewJoke = async () => {
//     const jokeText = await getDadJoke();
//     const newLi = document.createElement('li')
//     newLi.append(jokeText)
//     jokes.append(newLi)    
// }
// const getDadJoke = async () => {
//     const config = {headers: {Accept: 'application/json'}}
//     const res = await axios.get('https://icanhazdadjoke.com/', config)  //we need to pass a second argument 
//     return res.data.joke;              
// }

// button.addEventListener('click', addNewJoke);



// Adding try and catch
const button = document.querySelector('button')
const list = document.querySelector('#jokes')

const addNewJoke = async () => {
    const jokeText = await getDadJoke();
    const newLi = document.createElement('li')
    newLi.append(jokeText)
    jokes.append(newLi)    
}
const getDadJoke = async () => {
    try {
        const config = {headers: {Accept: 'application/json'}}
        const res = await axios.get('https://icanhazdadjoke.com/', config)  //we need to pass a second argument 
        return res.data.joke;    
    } catch(e) {
        return "No jokes available!Sorry :("
    }
              
}

button.addEventListener('click', addNewJoke);