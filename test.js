

/* itemName.addEventListener('Click', () => {
    should do that takey thing
    I think I meant add to cart by that or that clicking
    on an item name should take the user to a generated
    item page, maybe both?
}*/

const products = document.getElementsByClassName('products');
const productLink = document.getElementById('product-link')
const product = document.getElementById('item');
const productImage = document.getElementsByClassName('product-image');
const ProductName = document.getElementsByClassName('product-name');
const addToCart = document.getElementsByClassName('add-to-cart');
const price = document.getElementsByClassName('price');
const itemDescription = document.getElementsByClassName('item-description');

console.log(typeof products);

let newItem = document.createElement('article');
let newImage = document.createElement('img');
let newName = document.createElement('h2');
let newText = document.createElement('p');
let newPrice = document.createElement('p');
let newDescription = document.createElement('p');

let apiRequest = new XMLHttpRequest();
apiRequest.open('GET', 'http://localhost:3000/api/teddies'); 
apiRequest.send();
apiRequest.onreadystatechange = () => {
    if (apiRequest.readyState === 4) {
        if (apiRequest.status === 404) {
            console.log('404 error')  
        }
        // add more error states
        const response = JSON.parse(apiRequest.response);
        // Console log of the response
        // console.log(response)

        for(let i = 0; i < response.length; i++) {
            let colorArray = response[i];
            for(let j = 0; j < response[i].colors.length; j++) {
                console.log(colorArray[j]);
            } //??
            // console.log(response[i]);
            // console.log(response[i].imageUrl)
            // console.log(response[i].name);
            // console.log(response[i].description)
            // console.log(response[i]._id)
            // console.log(response[i].price)
            console.log(response[i].colors.length)

            newImage = response[i].imageUrl;
            console.log(newImage);
            
            newName = response[i].name;
            console.log(newName); //works

            newPrice = response[i].price;
            console.log(newPrice)

            newDescription = response[i].description;
            console.log(newDescription);

            // broken
            newName.textContent = response[i].name;
            console.log(newName);

            newDescription.textContent = response[i].description;
            console.log(newDescription);

            newItem.append(newName);
            newItem.append(newDescription);

            console.log(newItem);

            newItem.classList.add('card-body');

            products.appendChild(newItem);


            // console.log(newName);
            // newItem.appendChild(newImage);
            // newItem.appendChild(newName);
            // newItem.appendChild(newPrice);
            // newItem.appendChild(newDescription);

            // newItem.classList.add("card")
            
            // for(let j = 0; j < response[i].colors.length; j++) {
            //     console.log(response[j]);
            // }

            // for loop for colors as well
            // has to be executed after server response
        // have a loop for populating the list

        }
    }
};

// loop for all objects to populate the results ? idk how
// this works

// look through server documentation again
