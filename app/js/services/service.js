define(['./module'], (app)=>{
   'use strict';
   app.factory('FileService', ['$http', ($http)=>{
      const fs = require('fs');
      return {
         readFile:()=> $http.get('../config.json'),
         writeFile : ($obj)=> fs.writeFile('config.json', JSON.stringify($obj), 'utf8'),
         copyFile:(srcFrom, srcTo, newName)=>fs.createReadStream(srcFrom).pipe(fs.createWriteStream(srcTo+'/'+newName)),
         exampleIPC:(data)=>{
            //const ipcRenderer = require('electron').ipcRenderer;
            //ipcRenderer.send('asynchronous-message', JSON.stringify(data));
         }
      };
   }]);
});
