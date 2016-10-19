define(['./module'], (app)=>{
  'use strict';

   app.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider)=> {
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
   .state('heroku-guide',{
      url: '/heroku-guide',
      templateUrl: 'components/heroku-guide.html'
   });
   $urlRouterProvider.otherwise('/dashboard');
   }]);
});
