define(['./module', 'jquery'], (app, $)=>{
  'use strict';
  app.controller('HeaderCtrl', ['$scope', 'FileService', '$state', ($scope, FileService, $state)=>{
     const exec = require('child_process').exec;
     $scope.$state = $state;
     $scope.killSpawns=()=>{
       let PIDS="";
       $scope.$parent.spawns.forEach((PID)=> PIDS+=" /PID "+PID);
       exec('Taskkill'+PIDS+' /F', (error, stdout, stderr) => {
         if (error) {
           console.error(`exec error: ${error}`);
           return;
         }
         $scope.$parent.spawns=[];
         console.log(`stdout: ${stdout}`);
         console.log(`stderr: ${stderr}`);
       });
     };
     $scope.removeProject=(index)=>{
        $scope.projects.splice(index, 1);
        FileService.writeFile($scope.projects);
     };

     $scope.uploadDataBase=($fileContent, $filePath)=>{
        let filePath = $filePath.substring(0, $filePath.length - 9);
        let img = $scope.config.windowConfig().iconDb;
        $scope.projects.push({
           'id':$scope.guid(),
           'name':'MongoDB',
           'client':filePath+'mongo',
           'connection':filePath+'mongod',
           'icon':img,
           'type':'data-base'
        });
        FileService.writeFile($scope.projects);
        $scope.readFile();
     };

     $scope.showContent = ($fileContent, $filePath)=>{
        $scope.file = JSON.parse($fileContent);
        let filePath = $filePath.substring(0, $filePath.length - 12);
        let img = $scope.config.windowConfig().icon;

        $scope.projects.push({
           'id': $scope.guid(),
           'name':$scope.file.name,
           'version':$scope.file.version,
           'description':$scope.file.description,
           'main':$scope.file.main,
           'repository':$scope.file.repository,
           'author':$scope.file.author,
           'url':filePath,
           'icon':img,
           'scripts':$scope.file.scripts,
           'type':'project',
           'projects':[]
        });
        FileService.writeFile($scope.projects);
        $scope.readFile();
     };

     $scope.uploadImage = (index, $filePath)=>{
        $scope.projects[index].icon=$filePath;
        FileService.copyFile($filePath, $scope.config.windowConfig().dirname+'\\img\\', $scope.projects[index].name+'.png');
        FileService.writeFile($scope.projects);
     };
  }]);
});
