

// regiser variables 
let fullName = document.querySelector('#fullName');
let email = document.querySelector('#email');
let password = document.querySelector('#password');
let registerBtn = document.querySelector('#registerBtn');

let welcomeDiv = document.querySelector('.welcomeDiv');

// alerts
let fullnameAlrt = document.querySelector('.fullname');
let emailAlrt = document.querySelector('.email');
let passAlrt = document.querySelector('.password');
let alertSuccess = document.querySelector('.alert-success');
let emailNotValid = document.querySelector('.emailNotValid');
let emailExist = document.querySelector('.emailExist');

let localData = localStorage.getItem('database');

// login variables


if (localData) {
  console.log('data found with name = database');
  var userInform = JSON.parse(localData);
  console.log(userInform);
} else {
  console.log('no database found');
  var userInform = [];
}


// create
function register() {

  if (validateName() && validateEmail() && validatePass() && isValidEmail(email.value) && validateEmailExist()) {

    // Make a new object with data coming from users
    let userInputs = {
      userName: fullName.value,
      email: email.value,
      password: password.value
    };

    localStorage.setItem('userName', fullName.value);

    // push the new object into the array
    userInform.push(userInputs);

    // save to localStorage
    saveInLocal();

    // redirect to home.html
    window.location.href = 'home.html';
  }

}

// saves the array into the localStorage
function saveInLocal() {
  // save the local array to the localStorage
  localStorage.setItem('database', JSON.stringify(userInform));

  // alert what happened
  alertSuccess.classList.contains('d-none') ?  alertSuccess.classList.remove('d-none') : '';
  fullName.style.border = '';

  // reset the fields
  fieldsReset();
}

// resert Fields
function fieldsReset() {
  fullName.value = '';
  email.value = '';
  password.value = '';
}

// validation
function validateName() {
  if (!fullName.value) {
    fullName.style.border = '3px solid red';
    fullnameAlrt.classList.contains('d-none') ? fullnameAlrt.classList.remove('d-none') : '';
    alertSuccess.classList.contains('d-none') ?  '' : alertSuccess.classList.add('d-none');
    return false;
  } else {
    return true;
  }
}

function validateEmail() {
  if (!email.value) {
    email.style.border = '3px solid red';
    emailAlrt.classList.contains('d-none') ?  emailAlrt.classList.remove('d-none') : '';
    alertSuccess.classList.contains('d-none') ?  '' : alertSuccess.classList.add('d-none');
    return false;
  } else {
    return true;
  }
}

function validatePass() {
  if (!password.value) {
    password.style.border = '3px solid red';
    passAlrt.classList.contains('d-none') ?  passAlrt.classList.remove('d-none') : '';
    alertSuccess.classList.contains('d-none') ?  '' : alertSuccess.classList.add('d-none');
    return false;
  } else {
    return true;
  }
}

function validateEmailExist() {
  let foundUser = findUserByEmail(email.value);
  if (foundUser) {
    email.style.border = '3px solid red';
    emailExist.classList.contains('d-none') ?  emailExist.classList.remove('d-none') : '';
    return false;
  } else {
    email.style.border = '';
    return true;
  }
}

// check if the email exist
function findUserByEmail(emailToFind) {
  return userInform.find(element => element.email === emailToFind);
}

function isValidEmail(anyEmail) {
  // Regular expression for basic email validation
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (emailRegex.test(anyEmail)) {
    return true;
  } else {
    email.style.border = '3px solid red';
    emailNotValid.classList.contains('d-none') ?  emailNotValid.classList.remove('d-none') : '';
    return false;
  }
}

// login
function login() {

  // Example usage
  let emailToSearch = email.value;
  let foundUser = findUserByEmail(emailToSearch);

  if (foundUser) {
    // console.log('User found:');
    // console.log('Username:', foundUser.userName);
    // console.log('Email:', foundUser.email);
    // console.log('Password:', foundUser.password);
    if (password.value == foundUser.password) {
      // set the name
      localStorage.setItem('userName', foundUser.userName);
      // redirect to home.html
      window.location.href = 'home.html';
    } else {
      alert('access Denied');
    }
  } else {
    alert('User not found.');
  }
}

// log out
function logout() {
  localStorage.removeItem('userName');
  location.reload();
}






