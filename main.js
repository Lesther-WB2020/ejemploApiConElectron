const{app, BrowserWindow} = require('electron')
const path = require('path')
const {ipcMain} = require('electron') /* usada en preload.js*/
let libros = new Array()
let ventana;
function createWindow(){
    ventana = new BrowserWindow({
        width:500,
        height:500,
        webPreferences:{
            preload: path.join(app.getAppPath(),'preload.js')
        }
    })
    ventana.loadFile('index.html')
}
app.whenReady().then(createWindow)

ipcMain.on('enviarMain', (event,args) => {
    console.log(args)
    libros.push(args)
    ventana.webContents.send('respuestaRenderer',[args,'libreAgregado_true'])
})

