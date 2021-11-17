let colorName = document.querySelector('h1');
let button = document.querySelector('button');

button.addEventListener('click', function(){
    const newColor = makeRandomColor();
    document.body.style.backgroundColor = newColor;
    colorName.innerText = newColor;
});


const makeRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const sum = r + g + b;

    if (sum < 200) {
        colorName.style.color = 'white';
    } else {
        colorName.style.color = 'black';
    }

    return `rgb(${r},${g},${b})`;
}
