const fetchBitcoinPrice = async () => {
    try {
        const res = await fetch('https://api.cryptonator.com/api/ticker/btc-usd')
        const data = await res.json();
        console.log(data.ticker.price);
    } catch {
        console.log('Something went wrong');
    }
    
}


// fetch('https://api.cryptonator.com/api/ticker/btc-usd')  
//                 .then(res => {
//                         console.log('response, waiting to parse...', res)
//                         return res.json()     
//                 })
//                 .then(data => {
//                         console.log('Data parsed', data)
//                         console.log(data.ticker.price)
//                 })
//                 .catch (err => {
//                         console.log('error',err)
//                 })