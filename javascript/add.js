
// event listener for adding product
let details = [];
let keys = [];
const productImage = document.querySelector("#product-image");
const cardImage = document.querySelector(".card-img-top");
const productId = document.querySelector("#product-id");
const productName = document.querySelector("#product-name");
const productPrice = document.querySelector("#product-price");
const productDescription = document.querySelector("#product-description");
const addProduct = document.querySelector(".addproduct");
const error = document.querySelector("#error");

// event listener for product image

productImage.addEventListener('change', () => {

    if(!productImage.files[0].name.match(/\.(jpg|jpeg|png|gif)$/i)) {
        productImage.files[0] = '';
        alert("Not an Imgae.\nPlease Upload an Image Only");
        window.location.reload();
    } else {
        const imageReader = new FileReader();
    
        imageReader.addEventListener('load', () => {
            details[0] = (imageReader.result);
            cardImage.setAttribute('src', imageReader.result);
        });
        imageReader.readAsDataURL(productImage.files[0]);
    }
    
    
});

// event listener for product id

productId.addEventListener('change', () => {
    if(productId.value && productId.value.toString().length >= 4 ) {
        details[1] = (productId.value);
    } 
});

// event listener for product name

productName.addEventListener('change', () => {
    details[2]= (productName.value);
});

// event listener for product price

productPrice.addEventListener('change', () => {
    details[3] = (productPrice.value);
});

// event listener for product description

productDescription.addEventListener('change', () => {
    details[4] = (productDescription.value);
});


// event listener to add product
let specialChars =  /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
addProduct.addEventListener('click', () => {
    if (! productImage.files[0]) {
        errordisplay('image');

    } else if(productId.value.toString().length < 4 ) {
        errordisplay('id');

    } else if (specialChars.test(productId.value) || productId.value.toString().trim().length <= 0) {
        errordisplay('id-specialchars');

    } else if (productName.value.toString().trim().length <= 0 ) {
        errordisplay('name');

    } else if (specialChars.test(productName.value)) {
        errordisplay('name-specialchars');

    } else if (isNaN(Number.parseFloat(productPrice.value))) {
        errordisplay('price');

    } else if (productDescription.value.toString().trim().length == 0) {
        errordisplay('description');

    } else if (specialChars.test(productDescription.value)) {
        errordisplay('description-specialchars');
        
    }  else if (localStorage.getItem(details[1])) {
              let msg = "product with same product id already exist !!! ";
              alert(msg);
              details[1] = '';
              productId.value = '';
    } else {
        localStorage.setItem(details[1], JSON.stringify(details));
        
        if(localStorage.getItem('keys')) {
            let keyvalue = JSON.parse(localStorage.getItem('keys'));
            if(keyvalue.includes(details[1])) {
                alert('cannot add into keys . Already exist');
            } else {
                keyvalue.push(details[1]);
                localStorage.setItem('keys', JSON.stringify(keyvalue));
            }
            
        } else {
            keys.push(details[1]);
            localStorage.setItem('keys', JSON.stringify(keys));
        }
        alert('Product added Successfully');
        window.location.reload();
    }
    ;
})


// function to display errors 

function errordisplay(type) {
    if(type == "id") {
       alert("Id cannot be null or less than 4 characters");
        
    }else if(type == "id-specialchars") {
        alert("Id cannot contain special chars");
        
    } else if(type == "name") {
        alert("Name cannot be null");

    }else if(type == "name-specialchars") {
        alert("Name cannot contain special chars");
        
    } else if(type == "price") {
        alert("Price cannot be null, text or special characters");
    
    }else if(type == "description") {
        alert("Product description cannot be null");
        
    }else if(type == "description-specialchars") {
        alert("Description cannot contain special characters");
        
    } else if(type == "image") {
        alert("Image for the product is necessary");
        

    } 
}
