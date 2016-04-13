define(['angular', 'uiRouter', './controllers/controller', './directives/directive', './services/service', './constants/constants', './config/config'], (ng)=>{
   'use strict';
   return ng.module('app', ['ui.router', 'app.controllers', 'app.directives', 'app.services', 'app.constants', 'app.config'])
});
