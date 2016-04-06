define(['angular', 'uiRouter', './controllers/controller', './directives/directive', './services/service'], (ng)=>{
  'use strict';
  return ng.module('app', ['ui.router', 'app.controllers', 'app.directives', 'app.services'])
  .config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider)=> {
    $stateProvider.state('dashboard',{
      url: '/dashboard',
      templateUrl: 'components/dashboard.html'
    })
    .state('home',{
      url: '/home',
      templateUrl: 'components/home.html'
    })
    $urlRouterProvider.otherwise('/dashboard');
  }]);
});
