define(['./module', 'jquery'], (app, $)=>{
  'use strict';
  app.controller('MainCtrl', ['$scope', 'FileService', '$document', '$state', ($scope, FileService, $document, $state)=>{
     $scope.name="Hadrone";
     $scope.project={
        index: null,
        view: '',
        prompt:{
           msgs:''
        }
     };
     $scope.spawns=[];
     $scope.projects=[];

     $scope.config = require('../config/electron.config');

     $scope.readFile = ()=> FileService.readFile().success((data)=>{
        if(data) $scope.projects=data;
     }).error((err)=>{
        console.log("Error!!! Error!!! Destruir!! D:<");
     });

     angular.element($document).ready(()=>$scope.readFile());

     $scope.fusion=(data, handler, index)=>{
        $scope.projects[index].projects.push(data);
        $scope.projects.splice($scope.projects.indexOf(data), 1);
        FileService.writeFile($scope.projects);
     };
     $scope.guid=()=> $scope.s4()+$scope.s4()+'-'+$scope.s4()+'-'+$scope.s4()+'-'+$scope.s4()+'-'+$scope.s4()+$scope.s4()+$scope.s4();
     $scope.s4=()=> Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }]);
});
