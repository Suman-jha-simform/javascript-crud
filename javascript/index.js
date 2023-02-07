// event listener for navigation bar
const navbtn = document.querySelectorAll('.navbtns');

navbtn.forEach(button => {
    button.addEventListener('click', () => {
        if(button.innerText == 'Search') {
            window.location.href = 'search.html';
        } else if(button.innerText == 'Create') {
            window.location.href = 'add.html';
        } else if(button.innerText == 'Update') {
            window.location.href = 'update.html';
        } else if(button.innerText == 'Delete') {
            window.location.href = 'delete.html';
        }
    })
})

