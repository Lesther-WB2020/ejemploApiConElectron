import {getByAuthor,getByISBN} from './api.js'
var text = document.getElementById('contenido')
var bot = document.getElementById('peticion')
var opcion = document.getElementById('option-busqueda')
const resultados = document.getElementById('resultados')

bot.addEventListener('click',realizarPeticion)

async function realizarPeticion(){
    console.log(opcion.value)
        switch(opcion.value){
            case 'author':
                getByAuthor(text.value)
                    .then( resHTTP => resHTTP.json())
                    .then( resJSON => {
                        
                        let libros = resJSON.docs;

                            for(let i=0;i<libros.length;i++){
                                let autor = libros[i].author_name
                                let titulo = libros[i].title
                                let llave = libros[i].key
                                let impresion = libros[i].first_publish_year
                                let btn = document.createElement('input')
                                // input de tipo boton
                                btn.setAttribute('type','button')
                                // value solo es el texto que muestra el boton
                                btn.setAttribute('value','Favorito')
                                // el id es la llave del libro, la cual se obtiene de la api 
                                btn.setAttribute('id',llave)
                                
                                btn.addEventListener('click', (event) =>{
                                    window.comunicacion.sendMessage(llave)
                                })
                                
                                if(impresion){  
                                    if(impresion==0){
                                        impresion = "NA"
                                    }
                                }else{
                                    impresion = 'NA'
                                }
                                
                                let fila = document.createElement('tr') 
                                fila.innerHTML += 
                                `<tr>
                                <td>${autor[0]}</td>
                                <td>${titulo}</td>
                                <td>${impresion}</td>
                                </tr>`
                                fila.appendChild(btn)
                                resultados.appendChild(fila)
                            }
                           
                    })
                    .catch(err => console.log(err))
                break;
            case 'title':
                window.comunicacion.sendMessage('envio un sms desde libreria.js')
                break;
            case 'q':
                break;
            case 'isbn':
                getByISBN(text.value)
                .then(resHTTP => resHTTP.json())
                .then(resJSON => console.log(resJSON))
                .catch(err => console.log(err))
                break;
        }
}

opcion.addEventListener('change',function(event){
    console.log(event.target.value)
        switch(event.target.value){
            case "author":
                text.placeholder = "INGRESE EL AUTOR";
                break;
            case "title":
                text.placeholder = "INGRESE EL TITULO DEL LIBRO";
                break;
            case "q":
                text.placeholder = "INGRESE LA CONSULTA";
            break;
            case "isbn":
                text.placeholder = "INGRESE EL CODIGO";
            break;
        }
})

window.comunicacion.receiveMessage('respuestaRenderer',(event,args) => {
    if(args[1]=='libreAgregado_true'){
        document.getElementById(args[0]).value = 'NO FAVORITO'
    }
})