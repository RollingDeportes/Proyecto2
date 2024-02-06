export function validateName(input) {
  const regexName = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s']+$/;
  if (
    input.value.trim().length >= 7 &&
    input.value.trim().length <= 60 &&
    regexName.test(input.value)
  ) {
    input.className = `mb-3 form-control is-valid`;
    return true;
  } else {
    input.className = `mb-3 form-control is-invalid`;
    return false;
  }
}

export function validateEmail(input) {
  const regexEmail =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  if (
    input.value.trim().length >= 8 &&
    input.value.trim().length <= 60 &&
    regexEmail.test(input.value)
  ) {
    input.className = `mb-3 form-control is-valid`;
    return true;
  } else {
    input.className = `mb-3 form-control is-invalid`;
    return false;
  }
}

export function validatePassword(input) {
  const regexPassword = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
  if (regexPassword.test(input.value)) {
    input.className = `mb-3 form-control is-valid`;
    return true;
  } else {
    input.className = `mb-3 form-control is-invalid`;
    return false;
  }
}

export function checkPassword(passwor1, passwor2) {
  if(validatePassword(passwor2) == true){
  if (passwor1.value === passwor2.value) {
    passwor2.className = `mb-3 form-control is-valid`;
    return true;
  } else {
    passwor2.className = `mb-3 form-control is-invalid`;
    return false;
  }
  }
}

export function ValidateForm(inpName, inpEmail, inpPassword1, inpPassword2) {
  if (
    validateName(inpName) &&
    validateEmail(inpEmail) &&
    validatePassword(inpPassword1) &&
    checkPassword(inpPassword1, inpPassword2)
  ) {
    return true;
  } else {
    return false;
  }
}

export function LoadUserAdmin() {
  let listUsers = JSON.parse(localStorage.getItem("Users"));
  if (listUsers === null) {
    listUsers = [];
    const userAdmin = {
      nombre: "Administrador",
      email: "admin@admin.com",
      password: "Admin123",
      role: "administrador",
    };
    listUsers.push(userAdmin);
    localStorage.setItem("Users", JSON.stringify(listUsers));
  }
}
