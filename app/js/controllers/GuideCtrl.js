define(['./module', 'jquery'], (app, $)=>{
  'use strict';

   app.controller('GuideCtrl', ['$scope', 'COMMANDS', 'HEROKU', ($scope, COMMANDS, HEROKU)=>{
      let spawn = require('child_process').spawn;

      $scope.toolbelt=HEROKU.TOOLBELT;
      $scope.register=HEROKU.REGISTER;

      $scope.profile={
         user:'',
         pass:''
      };

      $scope.nodeTest=()=>{
         let exec = spawn('node', ['qqq="xxx"'], {});
         exec.stdout.on('data', (data)=> {
            console.log('stdout: ' + data);
            exec = spawn('node ', ['qqq+"rrr"'], {});
            exec.stdout.on('data', (data)=> {
               console.log('stdout: ' + data);
            });
         });
      };

      $scope.loginHeroku2=()=>{
         let exec = spawn(COMMANDS.HEROKU, [COMMANDS.LOGIN], {});
         exec.stdout.on('data', (data)=> {
            console.log('stdout: ' + data);
         });
      };

      $scope.loginHeroku=()=>{
         let asd = require('child_process').exec;
         let exec = asd(COMMANDS.HEROKU + ' ' + COMMANDS.LOGIN, {});
         exec.stdout.on('data', (data)=> {
            console.log('stdout: ' + data);
         });
         exec.stderr.on('data', (data)=> {
            console.log('stderr: ' + data);
            exec.stdin.write('asd');
         });
         exec.on('Email:', (data)=> {
            console.log('stderr: ' + data);

         });
      };

      $scope.loginHeroku4=()=>{
         let spawnSync = require('child_process').spawnSync;
         let exec = spawnSync(COMMANDS.HEROKU, [COMMANDS.LOGIN], {input:'stdout'});
         exec.stdout.on('data', (data)=> {
            console.log('stdout: ' + data);
         });
         exec.stderr.on('data', (data)=> {
            console.log('stderr: ' + data);
         });
      };

      $scope.openBrowser=(url)=>{
         let exec = spawn(COMMANDS.NAVIGATE, [url], {});
         exec.stdout.on('data', (data)=> {
            console.log('stdout: ' + data);
         });
      };
   }]);
});
