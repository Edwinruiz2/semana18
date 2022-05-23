const fs = require('fs')


const  escribir =(_fullName,_email,_password)=>{

    fs.readFile('userData.js',(err, data)=>{
        if(err){
            throw err
        }
        var datos_text = data.toString()
        //var datos se guardaran como un areglo array
        var marca = 0
        //Contador en marca 0
        //ocupamos una funcion que todos conocemos llamada for 
        for(var i = datos_text.length; i >= 0 ; i -- ){
            if(datos_text[i]=== "]" ){
                marca = i
                break
            }    
        }

        var corte = datos_text.slice(0,marca-1)
        var new_dato = ", \n { \n fullname:'"+_fullName+"', \n email:'"+_email+"', \n password:'"+_password+"' \n } " 
        var datos = corte+new_dato+"]; \n module.exports = { data }" 

       // escribe en la pagina de datos 
        fs.writeFile('userData.js',datos,(err)=>{
            if(err){
                throw err
            }
        })
       
    })

}

module.exports = {escribir}