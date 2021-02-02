let apiRequest = new XMLHttpRequest();
apiRequest.open('GET', 'http://localhost:3000/api/teddies');
apiRequest.send();
apiRequest.onreadystatechange = () => {
    if (apiRequest.readyState === 4) {
        if (apiRequest.status === 404) {
            console.log('404 error');
        }
        const allItems = JSON.parse(apiRequest.response);

        allItems.forEach((item) => {
            let newItem = document.createElement('section');
            newItem.classList.add('card');
            let newImage = document.createElement('img');
            newImage.setAttribute('src', item.imageUrl);
            newImage.classList.add('card-img-top', 'img-fluid');
            newImage.setAttribute('alt', item.name);

            let itemCard = document.createElement('div');
            itemCard.classList.add('card-body');
            
            // let itemLink = document.createElement('a');

            let itemName = document.createElement('h2');
            itemName.classList.add('card-title');
            itemName.textContent = item.name;

            let itemPrice = document.createElement('p');
            itemPrice.classList.add('card-text');
            itemPrice.textContent = '$' + item.price/100;

            let itemView = document.createElement('a');
            itemView.classList.add('btn', 'btn-primary')
            itemView.setAttribute('href', '#');
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
}