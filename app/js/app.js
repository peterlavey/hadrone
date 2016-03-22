define(['angular', './controllers/index', './directives/index', './services/index'], (angular)=>{
  'use strict';
  return angular.module('app', ['app.controllers', 'app.directives', 'app.services']);
});
