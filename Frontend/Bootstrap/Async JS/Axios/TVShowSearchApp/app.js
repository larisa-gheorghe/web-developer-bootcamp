//   http://api.tvmaze.com/search/shows?q=friends

const searchForm = document.querySelector('#search')
let blaImages = document.querySelectorAll('img')

searchForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    deleteImg(blaImages);
    const userInput = searchForm.elements.showName.value;
    let link = `http://api.tvmaze.com/search/shows`
    const res = await axios.get(link, {params: {q: userInput}})
    makeImages(res.data)
    searchForm.elements.showName.value = ''
})

const makeImages = (shows) => {
    for (let result of shows) {
        if(result.show.image){
            const img = document.createElement('img');
            img.src = result.show.image.medium;
            document.body.append(img);
        }
    blaImages = shows;    
    }
}

const deleteImg = (array) => {
    for (image of array) {
        if (array.lenght !== 0 && document.querySelectorAll('img')[0]) {
            document.body.removeChild(document.querySelectorAll('img')[0])
        }
    }
    
}

