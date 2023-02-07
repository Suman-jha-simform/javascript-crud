let updateDetails = [];

const cardImage = document.querySelector(".card-img-top");
const productImage = document.querySelector("#product-image");
const productName = document.querySelector("#product-name");
const productId = document.querySelector("#product-id");
const productPrice = document.querySelector("#product-price");
const productDescription = document.querySelector("#product-description");
const updateButton = document.querySelector("#update-button");



if(JSON.parse(localStorage.getItem('updateid'))) {
    let pid = JSON.parse(localStorage.getItem('updateid'));
    let details = JSON.parse(localStorage.getItem(pid));
    
    cardImage.setAttribute('src', details[0]);
    productId.value = details[1];
    productName.value = details[2];
    productPrice.value = details[3];
    productDescription.value = details[4];

    localStorage.setItem('updateid', JSON.stringify([]));
}
// event listener for product image

productImage.addEventListener('change', () => {
    const imageReader = new FileReader();
    
    imageReader.addEventListener('load', () => {
        updateDetails.push(imageReader.result);
        imgsrc = 1;
        cardImage.setAttribute('src', imageReader.result);
    });

    imageReader.readAsDataURL(productImage.files[0]);
    
});

// event listerner to update product

updateButton.addEventListener('click', () => {

    if(localStorage.getItem(productId.value) ) {
        if(Number.parseFloat(productPrice.value) < 0 ) {
            alert("Price cannot be less than 0 ");
        }
        else if(!isNaN(Number.parseFloat(productPrice.value)) || productPrice.value.length <= 0) {            

            let oldDetailsArray = JSON.parse(localStorage.getItem(productId.value));

            if( productImage.files.length == 0) {
                updateDetails[0] = '';
            }
            updateDetails[1] = (productId.value);
            updateDetails[2] = (productName.value);
            updateDetails[3] = (productPrice.value);
            updateDetails[4] = (productDescription.value);

            updateDetails.forEach((item, index) => {
                if(item == '') {
                    updateDetails[index] = oldDetailsArray[index];
                }
            })
            if(localStorage.getItem(productId.value) ){
                localStorage.setItem(productId.value, JSON.stringify(updateDetails))
                alert('Product Updated Succesfully');
                window.location.reload();
            } else {
                alert('Product cannot be upadated. Please Retry !!!');
                window.location.reload();
            }
            
        } else {
                alert('product price must be a number');
                return ;
        }
            
    } else {
            alert('Product with this id does not exist.\nYou can add and update later...');
    }  

});

