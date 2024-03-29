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
cartItem = [];

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
            name: itemName.textContent,
            cost: itemCost.textContent.replace('$', ''),
            color: colorSelection
        };
        console.log(order);

        let orderString = JSON.stringify(order);

        cartItem.push(orderString)

        cart.setItem(cart.length++, cartItem);

        window.location.replace('./checkout.html')
    });
};

function displayCart() {

    if(cart.length === 0) {
        const main = document.querySelector('main');
        let emptyCart = document.createElement('p');
        emptyCart.textContent = 'Your shopping cart is currently empty.';
        emptyCart.classList.add('bg-warning', 'p-2');
        main.prepend(emptyCart);
    }  else {
        // console.log(cart);
        for(let i = 0; i < cart.length; i++) {
            let item = JSON.parse(cart[i]);
            // console.log(item);
            // console.log(item.name)

            let cartItem = document.createElement('div');
            cartItem.classList.add('d-flex', 'justify-content-between', 'pb-1');

            let itemName = document.createElement('p');
            itemName.textContent = item.name;
            itemName.classList.add('col-3')

            let itemPrice = document.createElement('p');
            itemPrice.textContent = '$' + item.cost;
            itemPrice.classList.add('col-3', 'price');

            let itemColor = document.createElement('p');
            itemColor.textContent = item.color;
            itemColor.classList.add('col-3')

            let deleteButton = document.createElement('button');
            deleteButton.textContent = 'Remove';
            deleteButton.classList.add('btn', 'btn-danger', 'col-3');



            cartItem.appendChild(itemName);
            cartItem.appendChild(itemColor);
            cartItem.appendChild(itemPrice);
            cartItem.appendChild(deleteButton);

            const checkout = document.getElementById('cart');
            checkout.appendChild(cartItem);

        }

    }
};

function cartTotal() {
    let totalAlt = 0;
    for(let i = 0; i < cart.length; i++) {
        let item = JSON.parse(cart[i]);
        let cost = parseInt(item.cost);

        totalAlt = totalAlt + cost;
    };
    let totalCost = document.getElementById('total-cost');
    totalCost.textContent = '$' + totalAlt;
    sessionStorage.setItem('total', totalAlt);
};

function placeOrder() {
    // make it submit only if the form is valid
    // event listener for invalid event
    let form = document.getElementById('contact-form');
    

    document.getElementById('place-order').addEventListener('click', function(event){
        event.preventDefault()
      });
    if(cart.length >= 1) {
        let orderButton = document.getElementById('place-order');
        orderButton.addEventListener('click', function() {
            if (form.checkValidity()) {
            console.log('ding');
            let products = [];
            let contact = {
                firstName: document.getElementById('first-name').value,
                lastName: document.getElementById('last-name').value,
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                email: document.getElementById('email').value
            }
            for(let i = 0; i < cart.length; i++) {
                let item = JSON.parse(cart[i]);
                products.push(item.id);
            }
            // console.log(orderIds);
    
            let order = {
                contact,
                products
            };
            console.log(order);
            let orderStr = JSON.stringify(order);
    
            let orderRequest = new XMLHttpRequest();
            orderRequest.open('POST', 'http://localhost:3000/api/teddies/order');
            orderRequest.setRequestHeader("Content-Type", "application/json");
            orderRequest.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 201) {
                    let response = this.responseText;
                    console.log(response);
                    sessionStorage.setItem('order', response);
                    window.location.replace('./complete.html');
                } //else statement here
            }
            orderRequest.send(orderStr);
        }
        });
    } else {
        let orderButton = document.getElementById('place-order');
        orderButton.addEventListener('click', function() {
        const main = document.querySelector('main');
        let emptyCart = document.createElement('p');
        emptyCart.textContent = 'You cannot place an empty order.';
        emptyCart.classList.add('bg-danger', 'p-2');
        main.prepend(emptyCart);
        });
    };
};

function thankYou() {
    let orderDetails = JSON.parse(sessionStorage.order);

    let nameField = document.getElementById('name');
    let orderIdField = document.getElementById('order-id');

    let firstName = orderDetails.contact.firstName;
    let orderId = orderDetails.orderId;

    nameField.textContent = firstName + '!';
    orderIdField.textContent = orderId;
};