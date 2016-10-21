define([
  'angular',
  'ngDraggable',
  'uiRouter',
  './controllers/MainCtrl',
  './controllers/DashboardCtrl',
  './controllers/DetailCtrl',
  './controllers/GuideCtrl',
  './controllers/HeaderCtrl',
  './directives/directive',
  './services/service',
  './constants/constants',
  './config/config',
  'ui.bootstrap'
], (ng)=>{
   'use strict';
   return ng.module('app', [
     'ngDraggable',
     'ui.router',
     'app.controllers',
     'app.directives',
     'app.services',
     'app.constants',
     'app.config',
     'ui.bootstrap'
   ]);
});
