define(['./module'], (services)=>{
  'use strict';
  services.factory('FileService', ['$http', ($http)=>{
    return {
      readFile:()=> $http.get('../config.json'),
      writeFile : ($obj)=>{
        const fs = require('fs');
        fs.writeFile('config.json', JSON.stringify($obj), 'utf8', (err) => {
          if (err) throw err;
          return;
        });
      },
      exampleIPC:(data)=>{
        //const ipcRenderer = require('electron').ipcRenderer;
        //ipcRenderer.send('asynchronous-message', JSON.stringify(data));
      }
    };
  }]);
});
