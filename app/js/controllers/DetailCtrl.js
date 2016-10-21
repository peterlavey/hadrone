define(['./module', 'jquery'], (app, $)=>{
  'use strict';
  app.controller('DetailCtrl', ['$scope', 'COMMANDS', ($scope, COMMANDS)=>{
     let spawn = require('child_process').spawn;
     $scope.project=$scope.$parent.projects[$scope.$parent.project.index];
     $scope.command={
        'prompt':'',
        'logs':[]
     };
     $scope.msg;
     $scope.writeLog=(id, msg)=>{
       $scope.msg= msg;
     };

     $scope.startApi=(project)=>{
        let promptArray=$scope.command.prompt.split(" ");
        let node=promptArray.shift();
        let promptArgs=promptArray;
        let exec = spawn(node, promptArgs, {cwd:project.url});

        console.info('Se generó proceso PID'+exec.pid);

        $scope.$parent.spawns.push(exec.pid);

        exec.stdout.on('data', (data)=> {
          $scope.writeLog(project.id, data.toString());
        });
        exec.stderr.on('data', (data)=> {
          $scope.writeLog(project.id, data.toString());
        });
     };
     $scope.startNode=(project)=>{
        let exec = spawn(COMMANDS.NODE, [project.main], {cwd:project.url});
        exec.stdout.on('data', (data)=> {
           $scope.writeLog(project.id, data.toString());
        });
        exec.stderr.on('data', (data)=> {
           $scope.writeLogError(project.id, data.toString());
        });
     };
     $scope.startDB=(project)=>{
        let exec = spawn(project.connection, [], {});
        exec.stdout.on('data', (data)=> {
           console.log(project.id);
           console.log('stdout: ' + data.toString());
           $scope.writeLog(project.id, data.toString());
        });
        exec.stderr.on('data', (data)=> {
           console.log(project.id);
           console.log('stdout: ' + data.toString());
           $scope.writeLogError(project.id, data.toString());
        });
     };
     $scope.showPrompt=(id)=>$('#'+id).show();
     $scope.hideePrompt=(id)=>$('#'+id).hide();
  }]);
});
