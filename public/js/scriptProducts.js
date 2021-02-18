const form = document.querySelector("#product-form");
const name = document.querySelector("#name");
const description = document.querySelector("#description");
const image = document.querySelector('#image');
const errorsElement = document.querySelector(".error");
const small = document.querySelector(".smallError");
const imageValue = image.files[0].name;


form.addEventListener("submit", function(event) {

    event.preventDefault();
    checkInputs();
})

function checkInputs (){
    
    const nameValue = (name.value.trim().length >= 5) ;
    const descriptionValue = (description.value.trim().length >= 20);
    console.log("image: ", image.value)
    console.log("image: ", image.files[0].name)

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
    if(imageValue == ''){
        setErrorFor(image, "Debe seleccionar una imagen")
    } else if (fileValidation(imageValue)){
        setErrorFor(image, "La imagen debe tener extensión .jpg, .jpeg, .png, o .gif")
    } else {
        setSuccesFor(image);
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