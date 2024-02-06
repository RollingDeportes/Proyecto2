import {
    LoadUserAdmin,
    ValidateForm,
    checkPassword,
    validateEmail,
    validateName,
    validatePassword,
  } from "./hellpers.js";
  
  LoadUserAdmin();
  let listUsers = JSON.parse(localStorage.getItem("Users"));
  //obtengo la accion a realizar, puede ser login o register
  const action = window.location.search.slice(8);
  let articleLogin = document.getElementById("articleLogin");
  let articleRegister = document.getElementById("articleRegister");
  // ----------------Regitro-----------------------------------
  if (action === "register") {
    articleLogin.className = `col-12 col-sm-6 my-auto p-2 d-none`;
    imgLogin.className = `col-12 col-sm-6 text-center d-none`;
    imgRegister.className = `col-12 col-sm-6 text-center d-flex flex-column justify-content-center order-2 order-sm-1  `;
    articleRegister.className = `col-12 col-sm-6 my-auto p-2 order-1 order-sm-2`;
  
    let nameRegister = document.getElementById("nameRegister");
    let emailRegister = document.getElementById("emailRegister");
    let passwordRegister = document.getElementById("passwordRegister");
    let passwordRegister2 = document.getElementById("passwordRegister2");
  
    let formRegister = document.getElementById("formRegister");
  
    formRegister.addEventListener("submit", (event) => {
      event.preventDefault();
      if (
        ValidateForm(
          nameRegister,
          emailRegister,
          passwordRegister,
          passwordRegister2
        )
      ) {
        if (listUsers.find((user) => user.email === emailRegister.value)) {
          emailRegister.className = `mb-3 form-control is-invalid`;
          Swal.fire({
            imageUrl: "../img/error.jpeg",
            text: "El correo ingresado ya se encuentra registrado, ingrese otro correo.",
            confirmButtonColor: "#0d6efd",
            color: "#008000",
           
          });
        } else {
          const user = {
            nombre: nameRegister.value,
            email: emailRegister.value,
            password: passwordRegister.value,
            role: "cliente",
          };
          listUsers.push(user);
          Swal.fire({
            position: "top-center",
            icon: "success",
            color: "##008000",
            title: "Se realizo el registro con exito.",
            showConfirmButton: false,
            timer: 1500,
          });
          localStorage.setItem("Users", JSON.stringify(listUsers));
          setTimeout(() => {
            window.location.replace("login-register.html?action=login");
          }, 1500);
        }
      } else {
        Swal.fire({
          imageUrl: "../img/error.jpeg",
          text: "No se pudo realizar el registro, intenta de nuevo.",
          confirmButtonColor: "#0d6efd",
          color: "#008000",
        });
      }
    });
    nameRegister.addEventListener("blur", () => validateName(nameRegister));
    emailRegister.addEventListener("blur", () => validateEmail(emailRegister));
    passwordRegister.addEventListener("blur", () =>
      validatePassword(passwordRegister)
    );
    passwordRegister2.addEventListener("blur", () =>
      checkPassword(passwordRegister, passwordRegister2)
    );
  }
  //---------------FIN REGISTRO --------------------------------
  //---------------LOGIN----------------------------------------
  if (action === "login") {
    let emailLogin = document.getElementById("emailLogin");
    let passwordLogin = document.getElementById("passwordLogin");
    let formLogin = document.getElementById("formLogin");
  
    formLogin.addEventListener("submit", (event) => {
      event.preventDefault();
      const userSearch = listUsers.find(
        (user) =>
          user.email === emailLogin.value && user.password === passwordLogin.value
      );
  
      if (userSearch !== undefined) {
        const userLog = {
          nombre: userSearch.nombre,
          email: userSearch.email,
          role: userSearch.role,
        };
        sessionStorage.setItem("userLog", JSON.stringify(userLog));
        Swal.fire({
          position: "top-center",
          color: "#008000",
          icon: "success",
          title: `Bienvenido ${userLog.nombre}`,
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.replace("./home.html");
        }, 1500);
      } else {
        Swal.fire({
          imageUrl: "../img/error.jpeg",
          text: "Correo y/o contraseña incorrecta.",
          confirmButtonColor: "#0d6efd",
          color: "#008000",
        });
      }
    });
    emailLogin.addEventListener("blur", () => validateEmail(emailLogin));
    passwordLogin.addEventListener("blur", () =>
      validatePassword(passwordLogin)
    );

  }
  //---------------FIN LOGIN---------------------------------
  
  window.passwordRecover = function () {
    Swal.fire({
      title: "Recupero de contraseña.",
      input: "email",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Recuperar",
      showLoaderOnConfirm: false,
      confirmButtonColor: "#0d6efd",
      inputPlaceholder: "Ingrese su correo electrónico",
      cancelButtonText: "Cancelar",
      color: "##008000",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.replace("./home.html");
      }
    });
  };
  