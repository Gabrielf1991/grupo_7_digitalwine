const form = document.querySelector("#product-form");
const name = document.querySelector("#name");
const description = document.querySelector("#description");
const image = document.querySelector('#image');
const errorsElement = document.querySelector(".error");
const small = document.querySelector(".smallError");


form.addEventListener("submit", function(event) {

    event.preventDefault();
    checkInputs();
})

function checkInputs (){
    
    const nameValue = (name.value.trim().length >= 5) ;
    const descriptionValue = (description.value.trim().length >= 20);

    if (nameValue == ''){
        setErrorFor(name, "El nombre debe tener al menos 5 caracteres")
    } else {
        setSuccesFor(name);
    }
    if (descriptionValue == ''){
        setErrorFor(description, "La descripción debe tener al menos 20 caracteres")
    } else {
        setSuccesFor(description);
    }
}


function setErrorFor(input, message){
    const formControl = input.parentElement;
    const small = formControl.querySelector('.smallError');
    formControl.className = 'form-control error';
    small.innerText = message;
}

function setSuccesFor(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}