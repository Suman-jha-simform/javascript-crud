const searchBarQuery = document.querySelector("#delete-bar");
const searchBarButton = document.querySelector("#delete-bar-button");
const searchAllButton = document.querySelector("#search-all-button");
const clearButton = document.querySelector("#clear-button");
const container = document.querySelector('.container');


// event listener for search all button 

searchAllButton.addEventListener('click', () => {
    if(container.hidden == false) {
        container.innerHTML = '';
    }
    searchAllButton.style.outline = 'none';
    searchAllButton.style.boxShadow = 'none'; 
    searchBarButton.disabled = true;
    searchBarQuery.disabled = true;

    let keys = JSON.parse(localStorage.getItem('keys'));
    if(keys.length <= 0) {
        alert('No items to delete. please add an item first');
        searchBarButton.disabled = false;
        searchBarQuery.disabled = false;
        return ;
    } else {
        keys.forEach(element => {
            let currentitem = JSON.parse(localStorage.getItem(element));
            childappend(currentitem[0], currentitem[1], currentitem[2], currentitem[3], currentitem[4]);
        });
    }
    
});

//event listener for search bar button

searchBarButton.addEventListener('click', () => {
    if(searchBarQuery.value.length == 0) {
        alert ('Product id cannot be empty');
        searchBarQuery.value = '';

    } else if( ! localStorage.getItem(searchBarQuery.value)) {
        alert ('Product with this Id does not exist.');
        searchBarQuery.value = '';

    } else {
        
        let productid = searchBarQuery.value;
        let productarray = JSON.parse(localStorage.getItem(productid));

        let imagesrc = productarray[0];
        let pid = productarray[1];
        let pname = productarray[2];
        let pprice = productarray[3];
        let pdescription = productarray[4];
        childappend(imagesrc, pid, pname, pprice , pdescription);
        searchBarQuery.value = '';
    }
});



// event listener for clear button
clearButton.addEventListener('click', () => {
    if(container.innerHTML == '') {
        alert('Nothing to clear');
        clearButton.style.backgroundColor = '#d93444';
    } else {
        clearButton.style.outline = 'none';
        clearButton.style.boxShadow = 'none';
        clearButton.style.backgroundColor = '#d93444';
        searchBarQuery.value = '';
        container.innerHTML = '';
        container.hidden = true;
        searchBarButton.disabled = false;
        searchBarQuery.disabled = false;
    }
    
    
});


// function to append child into body

function childappend(imagesrc, pid ,pname,  pprice, pdescription) {
    container.hidden = false;
    let child = document.createElement('div');
    child.className = `col-12 col-md-4 col-lg-4 ms-2 mt-5 border-5 search-result`;
    child.setAttribute('id', pid);
    child.innerHTML = ` <div class="card"><img src=${imagesrc} class="card-img-top" alt="..."><div class="card-body "> \
    <table><tr><th><h6 class="card-title">Name</h6></th>   <td><p class="card-title product-name">${pname}</p></td></tr> <tr> \
    <th><h6 class="card-title">Id</h6></th> <td><p id="product-id" class="card-text ">${pid}</p></td></tr><tr>\
    <th><h6 class="card-title">Price</h6></th> <td><p class="card-text product-price">${pprice}</p></td></tr><tr>\
    <th><h6 class="card-title">Description</h6></th> <td><p class="card-text product-description text-break">${pdescription}</p></td>\
    </tr> </table><button  onclick="deleteproduct('${pid}');" class="btn btn-danger">Delete Product</button></div></div>`;
    container.appendChild(child);
    
}

// function to delete a product

function deleteproduct(itemid) {
    const itemToBeDeleted = document.getElementById(itemid);

    if(container.getElementsByTagName('div').length / 3 <= 1 ) {

        localStorage.removeItem(itemid);
        searchBarButton.disabled = false;
        searchBarQuery.disabled = false;
        let keys = JSON.parse(localStorage.getItem('keys'));
        if( keys.length == 1) {
            localStorage.setItem('keys', '[]');
        } else {
            keys = keys.filter(item => item.toString() !== itemid);
            localStorage.setItem('keys', JSON.stringify(keys));
        }

        container.removeChild(itemToBeDeleted);
        container.hidden = true;
        container.innerHTML = '';
        
    } else {
        localStorage.removeItem(itemid);
        let keys = JSON.parse(localStorage.getItem('keys'));
        keys = keys.filter(item => item.toString() !== itemid);
        localStorage.setItem('keys', JSON.stringify(keys));
        container.removeChild(itemToBeDeleted);
    }

   
}