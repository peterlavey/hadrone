"use strict";

angular.module('Controller', [])
.controller('Dashboard', ($scope)=>{
  $scope.name="Hadrone";
  $scope.img;
  $scope.showContent = function($fileContent){
    $scope.content = $fileContent;
  };
});
