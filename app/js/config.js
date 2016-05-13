requirejs.config({
   //baseUrl: '/',
   paths:{
      'domReady':'../bower_components/domReady/domReady',
      'angular':'../bower_components/angular/angular.min',
      'uiRouter':'../bower_components/angular-ui-router/release/angular-ui-router.min',
      'jquery':'../bower_components/jquery/dist/jquery.min',
      'ngDraggable': '../bower_components/ngDraggable/ngDraggable'
      //'bootstrap':'../bower_components/bootstrap/js'
   },
   shim:{
      'jquery':{
         exports:'$'
      },
      'angular':{
         deps:['jquery'],
         exports:'angular'
      },
      'uiRouter':{
         deps:['angular']
      },
      'ngDraggable':{
         deps:['angular'],
         exports:'ngDraggable'
      }
   },
   deps:['../js/bootstrap']
});
