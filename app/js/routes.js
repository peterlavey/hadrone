define(['./app'], (app)=> {
    'use strict';
    return app.config(['$stateProvider', '$urlRouterProvider', ($stateProvider)=> {
      $urlRouterProvider.otherwise('dashboard');
      $stateProvider.state('dashboard', {
          // loaded into ui-view of parent's template
          templateUrl: '../components/index.html',
          controller: 'Dashboard'
      })
});
