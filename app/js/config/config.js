define(['./module'], (config)=>{
  'use strict';

   config.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider)=> {
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
