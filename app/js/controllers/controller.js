define(['./module'], (controllers)=>{
  'use strict';
  controllers.controller('DashboardCtrl', ['$scope', 'FileService', '$document', ($scope, FileService, $document)=>{
    $scope.name="Hadrone";
    $scope.proyects=[];
    $scope.config = require('../config/electron.config');

    $scope.uploadImage = (index, $fileContent, $filePath)=>{
      $scope.proyects[index].icon=$scope.config.windowConfig().dirname+'\\img\\'+$scope.proyects[index].name+'.png';
      FileService.copyFile($filePath, $scope.config.windowConfig().dirname+'\\img\\', $scope.proyects[index].name+'.png');
      FileService.writeFile($scope.proyects);
      $scope.readFile();
    };

    $scope.showContent = ($fileContent, $filePath)=>{
      $scope.file = JSON.parse($fileContent);
      let filePath = $filePath.substring(0, $filePath.length - 12);
      //let img = filePath + 'icon.png';
      let img = $scope.config.windowConfig().icon;

      $scope.proyects.push({'name':$scope.file.name, 'url':filePath, 'icon':img});
      FileService.writeFile($scope.proyects);
      $scope.readFile();
    };

    $scope.readFile = ()=> FileService.readFile().success((data)=>{
      if(data) $scope.proyects=data;
    }).error((err)=>{
      console.log("Error!!! Error!!! Destruir!! D:<");
    });

    angular.element($document).ready(()=>$scope.readFile());

  }]);
});
