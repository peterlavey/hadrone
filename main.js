'use strict';

const { app, BrowserWindow } = require('electron');
const config = require('./config/electron.config');

let mainWindow;

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
