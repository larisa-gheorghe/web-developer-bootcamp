const form = document.querySelector('form');
const list = document.querySelector('#list');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const qty = form.elements.qty.value;
    const product = form.elements.product.value;
    const listRow = `${qty} ${product}`;

    const newLi = document.createElement('li');
    newLi.innerText = listRow;
    list.appendChild(newLi);
    form.elements.qty.value = '';
    form.elements.product.value = '';
});