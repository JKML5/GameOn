function editNav() {
  var x = document.querySelector(".nav");
  if (x.className === "nav") {
    x.className += " responsive";
  } else {
    x.className = "nav";
  }
}

// DOM Elements
const modalbg       = document.querySelector(".bground");
const modalBtn      = document.querySelectorAll(".modal-btn");
const modalBody     = document.querySelector(".modal__body");
const modalConfirm  = document.querySelector('.modal__confirmation');

const formData      = document.querySelectorAll(".formData");
const modalCloseBtn = document.querySelectorAll(".close, .btn--close");
const heroContent   = document.querySelector(".hero-content");

// DOM Form Elements
const formFirstName = document.getElementById("first");
const formLastName  = document.getElementById("last");
const formEmail     = document.getElementById("email");
const formBirthdate = document.getElementById("birthdate");
const formQuantity  = document.getElementById("quantity");
const formLocation  = document.getElementsByName("location");
const formCGU       = document.getElementById("checkbox1");

const errorMessages = {
  'firstNameNull'     : 'Merci de renseigner votre prénom',
  'firstNameTooShort' : 'Votre prénom doit comporter au moins 2 caractères',
  'lastNameNull'      : 'Merci de renseigner votre nom',
  'lastNameTooShort'  : 'Votre nom doit comporter au moins 2 caractères',
  'emailNull'         : 'Merci de renseigner votre adresse e-mail',
  'emailError'        : 'Le format de l’adresse e-mail incorrect',
  'birthdateNull'     : 'Merci de renseigner votre date de naissance',
  'quantityNull'      : 'Merci d’indiquer le nombre de tournois déjà participés',
  'quantityError'     : 'Merci de renseigner un nombre valide',
  'locationNull'      : 'Merci de sélectionner au moins une ville',
  'CGUUnchecked'      : 'Veuillez accepter les conditions d’utilisation',
};

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal event
Array.prototype.forEach.call(modalCloseBtn, function(elt) {
  elt.addEventListener("click", closeModal);
});

// close modal form
function closeModal() {
  modalbg.style.display = "none";
  modalBody.classList.remove("hide");
  modalConfirm.classList.add("hide");
}

// Validate radio buttons
function validateRadioButtons(elements) {
  for (let element of elements) {
    if (element.checked === true)
      return true;
  } 

  return false;
}

function showError(elt, message, data) {
  elt.setAttribute("data-error-visible", "true"); 
  elt.setAttribute("data-error", message); 
  data.nbErrors++;
}

// Validate form
function validate() {
  let data = {
    nbErrors : 0
  };

  // Delete all error messages
  Array.prototype.forEach.call(document.querySelectorAll(".formData"), function(node) {
    node.setAttribute("data-error-visible", "false"); 
  });

  // First name
  formFirstName.value = formFirstName.value.trim();
  if (formFirstName.value == '') {
    showError(formFirstName.parentElement, errorMessages.firstNameNull, data)
  } else if (formFirstName.value.length < formFirstName.getAttribute('minlength')) {
    showError(formFirstName.parentElement, errorMessages.firstNameTooShort, data)
  }

  // Last name
  formLastName.value = formLastName.value.trim();
  if (formLastName.value == '') {
    showError(formLastName.parentElement, errorMessages.lastNameNull, data)
  } else if (formLastName.value.length < formLastName.getAttribute('minlength')) {
    showError(formLastName.parentElement, errorMessages.lastNameTooShort, data)
  }

  // Email validation
  // @see https://www.w3resource.com/javascript/form/email-validation.php
  formEmail.value = formEmail.value.trim();
  if (formEmail.value == '') {
    showError(formEmail.parentElement, errorMessages.emailNull, data)
  } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formEmail.value)) {
    showError(formEmail.parentElement, errorMessages.emailError, data)
  }
  
  // Number of participations
  if (formBirthdate.value == '') {
    showError(formBirthdate.parentElement, errorMessages.birthdateNull, data)
  }
  
  // Number of participations
  if (formQuantity.value == '') {
    showError(formQuantity.parentElement, errorMessages.quantityNull, data)
  } else if (!Number.isInteger(parseInt(formQuantity.value))) {
    showError(formQuantity.parentElement, errorMessages.quantityError, data)
  }

  // Tournament location
  if (!validateRadioButtons(formLocation)) {
    showError(document.querySelector(".location"), errorMessages.locationNull, data)
  }

  // CGU
  if (!formCGU.checked) {
    showError(formCGU.parentElement, errorMessages.CGUUnchecked, data)
  }

  if (data.nbErrors <= 0) {
    modalBody.classList.add("hide");
    modalConfirm.classList.remove("hide");
  }

  return false;
}