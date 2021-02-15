function getAllItems(){
    return new Promise((resolve) => {
        let apiRequest = new XMLHttpRequest();
        apiRequest.onload = function() {
            if (apiRequest.readyState === 4) {
                if (apiRequest.status === 404) {
                    console.log('404 error');
                }
                resolve(JSON.parse(apiRequest.response));
            }
        }
        apiRequest.open('GET', 'http://localhost:3000/api/teddies');
        apiRequest.send();
    });
}

async function showAllItems() {
    const allItemsPromise = getAllItems();
    const allItems = await allItemsPromise;

    allItems.forEach((item) => {
        let newItem = document.createElement('section');
        newItem.classList.add('card');
        let newImage = document.createElement('img');
        newImage.setAttribute('src', item.imageUrl);
        newImage.classList.add('card-img-top', 'img-fluid');
        newImage.setAttribute('alt', item.name);

        let itemCard = document.createElement('div');
        itemCard.classList.add('card-body');

        let itemName = document.createElement('h2');
        itemName.classList.add('card-title');
        itemName.textContent = item.name;

        let itemPrice = document.createElement('p');
        itemPrice.classList.add('card-text');
        itemPrice.textContent = '$' + item.price/100;

        let itemView = document.createElement('a');
        itemView.classList.add('btn', 'btn-primary', 'product')
        itemView.setAttribute('href', 'product.html?id=' + item._id);
        itemView.textContent = 'View item';

        itemCard.appendChild(itemName);
        itemCard.appendChild(itemPrice);
        itemCard.appendChild(itemView);

        newItem.appendChild(newImage);
        newItem.appendChild(itemCard);

        const main = document.querySelector('main');
        main.appendChild(newItem);

    });
}
let itemName = document.getElementById('item-name');
let itemCost = document.getElementById('item-price');

function getOneItem() {
    let id = location.search.substring(4);
    // console.log(id);
    fetch('http://localhost:3000/api/teddies/' + id)
    .then(response => {
        // console.log(response.json);
        return response.json();
    })
    .then(data => {
        // console.log(data);
        let itemImage = document.getElementById('item-image');
        itemImage.setAttribute('src', data.imageUrl);
        itemImage.setAttribute('alt', 'Orinoco teddy bears ' + data.name);

        itemName.textContent = data.name;
        itemCost.textContent = '$' + data.price/100;

        let itemDescription = document.getElementById('description');
        itemDescription.textContent = data.description;

        data.colors.forEach((color) => {
            let itemColor = document.getElementById('color-selection');
            let newColor = document.createElement('option');
            newColor.setAttribute('value', color);
            newColor.textContent = color;
            itemColor.appendChild(newColor);
        });

    })
    .catch(error => console.log('Request failed', error));
}

const totalCount = document.getElementsByClassName('total-count');
cart = window.localStorage;
let displayCount = 0;
let totalItems = 0;
totalCount.textContent = totalItems;

function addToCart() {
    let addToCart = document.getElementById('add-to-cart');
    addToCart.addEventListener('click', function() {
        console.log('ding')

        if(displayCount < 1) {
            const main = document.querySelector('main');
            let notify = document.createElement('p');
            notify.textContent = 'Item has been added to your cart!';
            notify.classList.add('bg-success', 'p-2');
            main.prepend(notify);
            displayCount++
        }

        const id = location.search.substring(4);
        console.log(id);

        let color = document.getElementById('color-selection');

        let colorSelection = color.value;
        console.log(colorSelection);

        const order = {
            id: id,
            name : itemName.textContent,
            cost: itemCost.textContent,
            color: colorSelection
        };

        localStorage.setItem('why doesn\'t this work', JSON.stringify(order)); // fix this so multiples
        // of the same item can be added ffs
    });
}

console.log(cart);

// const product = document.getElementsByClassName('product');

// product.addEventListener('click', () => {

// });

// maybe store the ID of a product as a variable and have a
// request with the ID attached