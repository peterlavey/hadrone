define(['./module'], (controllers)=>{
  'use strict';
  controllers.controller('Dashboard', ['$scope', ($scope)=>{
    $scope.name="Hadrone";
    $scope.proyects=[];

    $scope.showContent = ($fileContent, $filePath)=>{
      $scope.file = JSON.parse($fileContent);
      let filePath = $filePath.substring(0, $filePath.length - 12);
      let img = filePath + 'icon.png';

      $scope.writeFile({'name':$scope.file.name, 'url':filePath, 'icon':img});
    };

    const fs = require('fs');

    $scope.readFile = ()=>{
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
      $scope.proyects.push($obj);
      //ipcRenderer.send('asynchronous-message', JSON.stringify($scope.fileConfig));
      fs.writeFile('config.json', JSON.stringify($scope.proyects), 'utf8', (err) => {
        if (err) throw err;
        $scope.readFile();
      });
    };
    angular.element(document).ready(()=>$scope.readFile());

  }]);
});
