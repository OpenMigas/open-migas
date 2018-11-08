const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

function createWindow(){
    const win = new BrowserWindow({width: 800, height: 600, frame: false, icon: './app/img/openmigas-icon.png'});
    win.loadFile('./app/index.html');
    win.openDevTools();
    win.on('close', function(){
        win = null;
    });
}

app.on('ready', createWindow);