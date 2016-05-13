define(['angular', 'ngDraggable', 'uiRouter', './controllers/controller', './directives/directive', './services/service', './constants/constants', './config/config'], (ng)=>{
   'use strict';
   return ng.module('app', ['ngDraggable', 'ui.router', 'app.controllers', 'app.directives', 'app.services', 'app.constants', 'app.config'])
});
