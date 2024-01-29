  const captureAdminPage = document.getElementById("CaptureAdminPage");
  const UserLog = JSON.parse(sessionStorage.getItem("userLog"));
  const botonDeslogueo1 = document.getElementById("botonDeslogueo");
  const btnLogueo = document.getElementById("btnLogueo");
  const carrito =document.getElementById("carrito");

CaptureAdminPage1();

function CaptureAdminPage1(){
  

  if( UserLog.role === "administrador"){
    carrito.className="nav-item d-none";
    captureAdminPage.className="nav-item";
    
    
  }
  
 }


btnDeslogueo();

 function btnDeslogueo(){
  if(UserLog !== undefined){
    btnLogueo.className="nav-item d-none";
    botonDeslogueo1.className="nav-item";

  }

 }


 window.Deslogueo= function(){
  sessionStorage.removeItem("userLog");
  window.location.replace("../index.html");
 }

