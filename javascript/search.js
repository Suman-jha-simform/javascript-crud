// event listener and related code for searchong items

const searchBarQuery = document.querySelector("#search-bar-input");
const searchBarButton = document.querySelector("#search-bar-button");
const clearSearchButton = document.querySelector(".clear-searches-button");
const filters = document.querySelector(".filters");

const container = document.querySelector('.container');

//event listener for search bar button

let sortarray = [];

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
        
        if(sortarray.includes(pid)) {
            searchBarQuery.value = ' ';
            return;
        } else {
            sortarray.push(pid);
        }
        
        childappend(imagesrc, pid, pname, pprice , pdescription);
        searchBarQuery.value = '';
    }
});

// event listerner for clear button 
clearSearchButton.addEventListener('click', () => {
    container.innerHTML = '';
    container.hidden = true;
    searchBarButton.disabled = false;
    searchBarQuery.disabled = false;
    filters.selectedIndex = 0;
    clearSearchButton.style.outline = 'none';
    clearSearchButton.style.boxShadow = 'none';
    clearSearchButton.style.backgroundColor = '#d93444';
    sortarray = [];
});

// event listener for filters 
filters.addEventListener('change', ()=>{

    let keys = JSON.parse(localStorage.getItem('keys'));
    if(keys.length <= 0) {alert('No item to display. Add and item first. ');filters.selectedIndex = 0; return;}
    if(filters.value == 'all') {        // for filter to find all products
        if(container.hidden == false) {
            container.innerHTML = '';
        } 
        searchBarQuery.innerText = '';
        searchBarButton.disabled = true;
        searchBarQuery.disabled = true;
        let keys = JSON.parse(localStorage.getItem('keys'));
        keys.forEach(element => {
            let currentitem = JSON.parse(localStorage.getItem(element));
            if(sortarray.includes(currentitem[1])) {}
            else {
                sortarray.push(currentitem[1]);
            }
            childappend(currentitem[0], currentitem[1], currentitem[2], currentitem[3], currentitem[4]);
        });

    } else if(filters.value == 'sort-name'){ // for filter to sort using name
        if(sortarray.length <= 0) {
            alert('nothing to sort. please search for an item.');
            filters.selectedIndex = 0;
            return;
        }
        if(container.hidden == false) {
            container.innerHTML = '';
        } 
        searchBarButton.disabled = true;
        searchBarQuery.disabled = true;
        let namearray = [];
        let keys = sortarray;
        keys.forEach(element => {
            let currentitem = JSON.parse(localStorage.getItem(element));
            namearray.push(currentitem[2]+':'+currentitem[1]);
            
        });
        namearray.sort();
        namearray.forEach(element => {
            let currentitemarray = element.split(':');
            let currentitem = JSON.parse(localStorage.getItem(currentitemarray[1]));
            childappend(currentitem[0], currentitem[1], currentitem[2], currentitem[3], currentitem[4]);
        });
        

    } else if(filters.value == 'sort-id'){  // for filter to sort using id
        if(sortarray.length <= 0) {
            alert('nothing to sort. please search for an item.');
            filters.selectedIndex = 0;
            return;
        }
        if(container.hidden == false) {
            container.innerHTML = '';
        } 
        searchBarButton.disabled = true;
        searchBarQuery.disabled = true;
        let keys = sortarray;
        keys.sort();
        keys.forEach(element => {
            let currentitem = JSON.parse(localStorage.getItem(element));
            childappend(currentitem[0], currentitem[1], currentitem[2], currentitem[3], currentitem[4]);
        });
        

    }  else if(filters.value == 'sort-price-ascending'){  // for filter to sort using price
        if(sortarray.length <= 0) {
            alert('nothing to sort. please search for an item.');
            filters.selectedIndex = 0;
            return;
        }
        if(container.hidden == false) {
            container.innerHTML = '';
        } 
        searchBarButton.disabled = true;
        searchBarQuery.disabled = true;
        let namearray = [];
        let keys = sortarray;
        keys.forEach(element => {
            let currentitem = JSON.parse(localStorage.getItem(element));
            namearray.push(currentitem[3]+':'+currentitem[1]);
            
        });
        namearray.sort();
        namearray.forEach(element => {
            let currentitemarray = element.split(':');
            let currentitem = JSON.parse(localStorage.getItem(currentitemarray[1]));
            childappend(currentitem[0], currentitem[1], currentitem[2], currentitem[3], currentitem[4]);
        });
    } else if(filters.value == 'sort-price-descending'){  // for filter to sort using price
        if(sortarray.length <= 0) {
            alert('nothing to sort. please search for an item.');
            filters.selectedIndex = 0;
            return;
        }
        if(container.hidden == false) {
            container.innerHTML = '';
        } 
        searchBarButton.disabled = true;
        searchBarQuery.disabled = true;
        let namearray = [];
        let keys = sortarray;
        keys.forEach(element => {
            let currentitem = JSON.parse(localStorage.getItem(element));
            namearray.push(currentitem[3]+':'+currentitem[1]);
            
        });
        namearray.sort().reverse();
        namearray.forEach(element => {
            let currentitemarray = element.split(':');
            let currentitem = JSON.parse(localStorage.getItem(currentitemarray[1]));
            childappend(currentitem[0], currentitem[1], currentitem[2], currentitem[3], currentitem[4]);
        });
    } 
});


// function to append child into body

function childappend(imagesrc, pid ,pname,  pprice, pdescription) {
        container.hidden = false;
        let child = document.createElement('div');
        child.setAttribute('id', pid);
        child.className = 'col-12 col-md-4 col-lg-4 ms-2 mt-5 border-5 search-result';
        child.innerHTML = ` <div class="card"><img src=${imagesrc} class="card-img-top" alt="..."><div class="card-body "> \
        <table><tr><th><h6 class="card-title">Name</h6></th>   <td><p class="card-title product-name">${pname}</p></td></tr> <tr> \
        <th><h6 class="card-title">Id</h6></th> <td><p class="card-text product-id">${pid}</p></td></tr><tr>\
        <th><h6 class="card-title">Price</h6></th> <td><p class="card-text product-price">${pprice}</p></td></tr><tr>\
        <th><h6 class="card-title">Description</h6></th> <td><p class="card-text product-description text-break">${pdescription}</p></td>\
        </tr></table><button onclick="update(${pid});" id="update-button" class="btn btn-dark">Update Product</button></div></div>`;
        container.appendChild(child);
}

function update(pid) {
    let updateid = [];
    if(JSON.parse(localStorage.getItem('updateid'))) {
        updateid.push(pid);
        localStorage.setItem('updateid', JSON.stringify(pid));
        window.location.href = 'update.html';
    } else {
        localStorage.setItem('updateid', JSON.stringify(pid));
        window.location.href = 'update.html';

    }

}