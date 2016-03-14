"use strict";

angular.module('Controller', [])
.controller('Dashboard', ($scope)=>{
  $scope.name="Hadrone";
  $scope.proyects=[];

  $scope.showContent = ($fileContent, $filePath)=>{
    $scope.file = JSON.parse($fileContent);
    let filePath = $filePath.substring(0, $filePath.length - 12);
    let img = filePath + 'icon.png';

    $scope.writeFile({'name':$scope.file.name, 'url':filePath, 'icon':img});
  };

  $scope.readFile = ()=>{
    const fs = require('fs');
    fs.stat('config.json', (err, stats)=>{
      if (!err && stats.isFile()){
        fs.readFile('config.json', 'utf8', (err, data) => {
          if (err) throw err;
          $scope.proyects=JSON.parse(data);
        });
      }
    });
  };

  $scope.writeFile = ($obj)=>{
    const ipcRenderer = require('electron').ipcRenderer;
    const fs = require('fs');
    $scope.proyects.push($obj);
    //ipcRenderer.send('asynchronous-message', JSON.stringify($scope.fileConfig));
    fs.writeFile('config.json', JSON.stringify($scope.proyects), 'utf8', (err) => {
      if (err) throw err;
      $scope.readFile();
    });
  };

  $scope.readFile();
});
