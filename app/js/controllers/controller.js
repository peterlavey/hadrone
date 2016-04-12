define(['./module', 'jquery'], (controllers, $)=>{
  'use strict';

   controllers.controller('MainCtrl', ['$scope', 'FileService', '$document', ($scope, FileService, $document)=>{
      $scope.name="Hadrone";
      $scope.proyect={
         index: null
      };
      $scope.proyects=[];
      $scope.config = require('../config/electron.config');
      $scope.readFile = ()=> FileService.readFile().success((data)=>{
         if(data) $scope.proyects=data;
      }).error((err)=>{
         console.log("Error!!! Error!!! Destruir!! D:<");
      });
      angular.element($document).ready(()=>$scope.readFile());
   }]);

   controllers.controller('MenuCtrl', ['$scope', 'FileService', ($scope, FileService)=>{
      $scope.showContent = ($fileContent, $filePath)=>{
         $scope.file = JSON.parse($fileContent);
         let filePath = $filePath.substring(0, $filePath.length - 12);
         let img = $scope.config.windowConfig().icon;

         $scope.proyects.push({
            'name':$scope.file.name,
            'version':$scope.file.version,
            'description':$scope.file.description,
            'repository':$scope.file.repository,
            'author':$scope.file.author,
            'url':filePath,
            'icon':img,
            'scripts':$scope.file.scripts
         });
         FileService.writeFile($scope.proyects);
         $scope.readFile();
      };

      $scope.uploadImage = (index, $filePath)=>{
         $scope.proyects[index].icon=$scope.config.windowConfig().dirname+'\\img\\'+$scope.proyects[index].name+'.png';
         FileService.copyFile($filePath, $scope.config.windowConfig().dirname+'\\img\\', $scope.proyects[index].name+'.png');
         FileService.writeFile($scope.proyects);
         $scope.readFile();
      };
   }]);

   controllers.controller('DashboardCtrl', ['$scope', ($scope)=>{
      $scope.setProyectIndex = (index)=>{
         $scope.$parent.proyect.index=index;
      }
   }]);

   controllers.controller('DetailCtrl', ['$scope', ($scope)=>{
      $scope.proyect=$scope.$parent.proyects[$scope.$parent.proyect.index];
      $scope.command={
         'prompt':'',
         'logs':[]
      };
      $scope.startApi=()=>{
         let promptArray=$scope.command.prompt.split(" ");
         let node=promptArray.shift();
         let promptArgs=promptArray;
         const spawn = require('child_process').spawn;

         let exec = spawn(node, promptArgs, {cwd:$scope.proyect.url});
         exec.stdout.on('data', (data)=> {
            console.log('stdout: ' + data)
            $('#logContainer').append('<span>'+data.toString()+'</span></br>')
         });
      };
   }])
});
