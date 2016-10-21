define(['./module', 'jquery'], (app, $)=>{
  'use strict';
  app.controller('DashboardCtrl', ['$scope', ($scope)=>{
     $scope.setProjectIndex = (index)=> $scope.$parent.project.index=index;
  }]);
});
