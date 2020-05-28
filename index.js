const {app, BrowserWindow} = require('electron')

function createWindow(){
    let win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    })
    win.loadFile('index.html')
    //win.webContents.openDevTools()
}

app.whenReady().then(createWindow)