

/* itemName.addEventListener('Click', () => {
    should do that takey thing
    I think I meant add to cart by that or that clicking
    on an item name should take the user to a generated
    item page, maybe both?
}*/

const productImage = document.getElementsByClassName('product-image')
const ProductName = document.getElementsByClassName('product-name')
const addToCart = document.getElementsByClassName('add-to-cart')
const price = document.getElementsByClassName('price')
const itemDescription = document.getElementsByClassName('item-description')

let newContainer = document.createElement('div');
let newImage = document.createElement('img');
let newTitle = document.createElement('h2');
let newText = document.createElement('p');

// class item {
//     constructor(imageUrl, name, price, description, colors) {
//         this.imageUrl = imageUrl;
//         this.name = name;
//         this.price = price;
//         this.description = description;
//         this.colors = colors;
//     }
// }

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
            console.log(response[i])
            // newTitle = response[i];
            // for loop for colors as well
            // has to be executed after server response
        // have a loop for populating the list

        }
    }
};

// loop for all objects to populate the results ? idk how
// this works

// look through server documentation again
