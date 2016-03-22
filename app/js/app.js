define(['angular', './controllers/controller', './directives/directive', './services/service'], (ng)=>{
  'use strict';
  return ng.module('app', ['app.controllers', 'app.directives', 'app.services']);
});
