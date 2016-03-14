"use strict";

angular.module('Controller', [])
.controller('Dashboard', ($scope)=>{
  $scope.name="Hadrone";
  $scope.file;

  $scope.showContent = function($fileContent, $filePath){
    $scope.content = $fileContent;
    $scope.file = JSON.parse($fileContent);
    $scope.filePath = $filePath.substring(0, $filePath.length - 12);
    $scope.img = $scope.filePath + 'icon.png';
  };
});
