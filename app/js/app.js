define(['angular', 'uiRouter', './controllers/controller', './directives/directive', './services/service', './constants/constants'], (ng)=>{
   'use strict';
   return ng.module('app', ['ui.router', 'app.controllers', 'app.directives', 'app.services', 'app.constants'])
   .config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider)=> {
   $stateProvider.state('dashboard',{
      url: '/dashboard',
      templateUrl: 'components/dashboard.html'
   })
   .state('detail',{
      url: '/detail',
      templateUrl: 'components/detail.html'
   })
   .state('home',{
      url: '/home',
      templateUrl: 'components/home.html'
   })
   $urlRouterProvider.otherwise('/dashboard');
   }]);
});
