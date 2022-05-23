var express = require('express');
var router = express.Router();
const date = require('../userData');
const methods= require('../methods');
var Datos = require('../Datos')

//constante para rutas de constante
const loginPage = "../views/pages/login";
const registerPage ="../views/pages/register";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//register de rutas
router.get('/home', (req, res) =>{
  res.render('home');
});
router.get('/login', (req, res) =>{
  res.render(loginPage);
});
router.get('/register', (req, res) =>{
  res.render(registerPage);
});

router.post('/register', (req, res) =>{
  const {fullName, email, password, confirmPassword}=req.body;
  //validacion
  if (password===confirmPassword){
    if(date.data.find(u => u.email === email)){
      res.render(registerPage,{
        message:"El usuario ya esta registrado",
        MessageClass:"alert-danger"
      });
    }

    //encriptar el password

    const pHash=methods.getHashedPassword(password);
    //guardar datos
    date.data.push({
      fullName,
      email,
      password: pHash
    });
    Datos.escribir(fullName,email,password)
    res.render(loginPage,{
      message:"registro exitoso.  Inicie sesion",
      MessageClass:"alert-success"
    });

  }else{
    res.render(registerPage,{
      message:"Las contraseñas no son iguales",
      MessageClass:"alert-danger"
    });
  }
});
router.post('/login', (req,res) =>{
  const {email,password} =req.body;
  const pHash=methods.getHashedPassword(password);

  const dataU= date.data.find(u=>{
    var a = u.email === email && pHash === u.password; 
    //console.log(a)
    return a
  });
  
  if(dataU) {
    const authToken = methods.generateToken();
    //almacenar token de autenticacion
    methods.authTokens[authToken] = dataU;
    res.cookie('AuthToken', authToken);
    res.redirect('/home');
  } else {
    res.render(loginPage, {
      message: "El usuario o clave no coinciden",
      messageClass: "alert-danger"
    });
  }
});
module.exports = router;
