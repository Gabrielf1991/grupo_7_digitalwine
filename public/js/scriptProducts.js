const form = document.querySelector("#product-form");
const name = document.querySelector("#name");
const description = document.querySelector("#detail");
const price = document.querySelector("#price");
const wine_cellar = document.querySelector("#wine_cellar");
const image = document.querySelector('#image');
const errorsElement = document.querySelector(".error");
const small = document.querySelector(".smallError");
const imageValue = document.querySelector("#image")

form.addEventListener("submit", function(event) {

    event.preventDefault();
    checkInputs();
})

function checkInputs (){
    
    let error = false;
    const nameValue = (name.value.trim().length >= 5) ;
    const descriptionValue = (description.value.trim().length >= 20);
    const priceValue = (price.value.trim().length >= 2);
    const wine_cellarValue = (wine_cellar.value.trim().length >= 3);

    if (nameValue == ''){
        error = true;
        setErrorFor(name, "El nombre debe tener al menos 5 caracteres")
    } else {
        setSuccesFor(name);
    }

    if (descriptionValue == ''){
        error = true;
        setErrorFor(description, "La descripción debe tener al menos 20 caracteres")
    } else {
        setSuccesFor(description);
    }

    if (priceValue == ''){
        error = true;
        setErrorFor(price, "El campo precio es obligatorio")
    } else {
        setSuccesFor(price);
    }

    if (wine_cellarValue == ''){
        error = true;
        setErrorFor(wine_cellar, "El campo bodega es obligatorio")
    } else {
        setSuccesFor(wine_cellar);
    }

    if(imageValue == '' && section == "create"){
        error = true;
        setErrorFor(image, "Debe seleccionar una imagen")
    } else if (fileValidation(imageValue) && section == "create"){
        error = true;
        setErrorFor(image, "La imagen debe tener extensión .jpg, .jpeg, .png, o .gif")
    } else {
        setSuccesFor(image);
    }

    if(!error){
        form.submit();
    }
}

function fileValidation() { 

    // Allowing file type 
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i; 
      
    if (!allowedExtensions.exec(imageValue)) { 
        return false; 
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