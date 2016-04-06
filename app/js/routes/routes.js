define(['./module'], (app)=>{
  'use strict';
  app.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider)=> {
    $stateProvider.state('dashboard',{
      url: '/dashboard',
      templateUrl: 'components/dashboard.html'
    })
    .state('home',{
          url: '/home',
          templateUrl: 'components/home.html'
      })
      .state('test',{
        url: '/test',
        templateUrl: 'components/test.html'
      });
      $urlRouterProvider.otherwise('dashboard');
    }]);
});
