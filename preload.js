/*  contextBridge es el api que nos va a ayudar a comunicarnos, exponiendo alguans funciones
    pero eventualmente de una forma mas limitada y por ende segura*/ 
const {ipcRenderer,contextBridge} = require('electron')

contextBridge.exposeInMainWorld(
    'comunicacion',
    {
        sendMessage:
        (mensaje) => {ipcRenderer.send('enviarMain',mensaje)}
        ,
        receiveMessage: 
        (channel,callback) => {ipcRenderer.on(channel,callback)}
    }
)
