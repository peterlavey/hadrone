define(['./module'], (services)=>{
  'use strict';
  services.factory('Test', ['$scope', ($scope)=>{
    return {
      test:() => 123
    }
  }]);
  /*.factory('File', ['$scope', ($scope)=>{
    return {
      readFile : ()=>{
        const fs = require('fs');
        fs.stat('config.json', (err, stats)=>{
          if (!err && stats.isFile()){
            fs.readFile('config.json', 'utf8', (err, data) => {
              if (err) throw err;
              return JSON.parse(data);
            });
          }else{
            return {};
          }
        });
      },
      writeFile : ($obj)=>{
        const ipcRenderer = require('electron').ipcRenderer;
        const fs = require('fs');
        //ipcRenderer.send('asynchronous-message', JSON.stringify($scope.fileConfig));
        fs.writeFile('config.json', JSON.stringify($obj), 'utf8', (err) => {
          if (err) throw err;
          readFile();
          return;
        });
      }
    };
  }]);*/
});
