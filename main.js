'use strict';

const electron = require('electron');
const ipc = electron.ipcMain;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const config = require('./config/electron.config');

let mainWindow;

//var Tray = electron.Tray;
//var Menu = electron.Menu;
//var path = require('path');

//var trayIcon = null;


/*ipc.on('synchronous-message', function(event, arg) {
  console.log(arg);  // prints "ping"
  event.returnValue = 'pong';
});*/

function createWindow () {
  mainWindow = new BrowserWindow(config.windowConfig());

  mainWindow.loadURL(config.pathStartup());
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
