'use strict';

const electron = require('electron');
const ipc = electron.ipcMain;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const fs = require('fs');

let mainWindow;

//var Tray = electron.Tray;
//var Menu = electron.Menu;
//var path = require('path');

//var trayIcon = null;

ipc.on('asynchronous-message', function(event, arg) {
  //console.log(arg);  // prints "ping"
  //event.sender.send('asynchronous-reply', 'pong');
  fs.writeFile('config.json', arg, 'utf8', (err) => {
    if (err) throw err;
    console.log(arg);
  });
});

/*ipc.on('synchronous-message', function(event, arg) {
  console.log(arg);  // prints "ping"
  event.returnValue = 'pong';
});*/



function createWindow () {
  mainWindow = new BrowserWindow(
  {
    width: 800,
    height: 600,
    frame: true,
    resizable: true,
    fullscreen: false,
    //transparent: true,
    //backgroundColor: '#000',
    icon:__dirname+'/img/icon.png'
  });

  mainWindow.loadURL('file://' + __dirname + '/app/index.html');
  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', ()=>{
    mainWindow = null;
  });
}

app.on('ready', createWindow);
app.on('window-all-closed', ()=>{
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', ()=>{
  if (mainWindow === null) {
    createWindow();
  }
});
