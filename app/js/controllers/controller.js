define(['./module', 'jquery'], (app, $)=>{
  'use strict';

   app.controller('MainCtrl', ['$scope', 'FileService', '$document', '$state', ($scope, FileService, $document, $state)=>{
      $scope.name="Hadrone";
      $scope.proyect={
         index: null,
         view: ''
      };
      $scope.proyects=[];

      $scope.config = require('../config/electron.config');

      $scope.readFile = ()=> FileService.readFile().success((data)=>{
         if(data) $scope.proyects=data;
      }).error((err)=>{
         console.log("Error!!! Error!!! Destruir!! D:<");
      });

      angular.element($document).ready(()=>$scope.readFile());
      $scope.writeLog=(msg)=>$('.prompt').append('<span>> '+msg+'</span></br>');
      $scope.fusion=(data, handler, index)=>{
         $scope.proyects[index].proyects.push(data);
         $scope.proyects.splice($scope.proyects.indexOf(data), 1);
         FileService.writeFile($scope.proyects);
      };
      $scope.guid=()=> $scope.s4()+$scope.s4()+'-'+$scope.s4()+'-'+$scope.s4()+'-'+$scope.s4()+'-'+$scope.s4()+$scope.s4()+$scope.s4();
      $scope.s4=()=> Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
   }]);

   app.controller('HeaderCtrl', ['$scope', 'FileService', '$state', ($scope, FileService, $state)=>{
      $scope.$state = $state;
      $scope.removeProyect=(index)=>{
         $scope.proyects.splice(index, 1);
         FileService.writeFile($scope.proyects);
      }

      $scope.showContent = ($fileContent, $filePath)=>{
         $scope.file = JSON.parse($fileContent);
         let filePath = $filePath.substring(0, $filePath.length - 12);
         let img = $scope.config.windowConfig().icon;

         $scope.proyects.push({
            'id': $scope.guid(),
            'name':$scope.file.name,
            'version':$scope.file.version,
            'description':$scope.file.description,
            'main':$scope.file.main,
            'repository':$scope.file.repository,
            'author':$scope.file.author,
            'url':filePath,
            'icon':img,
            'scripts':$scope.file.scripts,
            'proyects':[]
         });
         FileService.writeFile($scope.proyects);
         $scope.readFile();
      };

      $scope.uploadImage = (index, $filePath)=>{
         $scope.proyects[index].icon=$filePath;
         FileService.copyFile($filePath, $scope.config.windowConfig().dirname+'\\img\\', $scope.proyects[index].name+'.png');
         FileService.writeFile($scope.proyects);
      };
   }]);

   app.controller('DashboardCtrl', ['$scope', ($scope)=>{
      $scope.setProyectIndex = (index)=> $scope.$parent.proyect.index=index;
   }]);

   app.controller('DetailCtrl', ['$scope', 'COMMANDS', ($scope, COMMANDS)=>{
      let spawn = require('child_process').spawn;
      $scope.proyect=$scope.$parent.proyects[$scope.$parent.proyect.index];
      $scope.command={
         'prompt':'',
         'logs':[]
      };
      $scope.startApi=()=>{
         let promptArray=$scope.command.prompt.split(" ");
         let node=promptArray.shift();
         let promptArgs=promptArray;

         let exec = spawn(node, promptArgs, {cwd:$scope.proyect.url});
         exec.stdout.on('data', (data)=> {
            console.log('stdout: ' + data)
            $scope.writeLog(data.toString());
         });
      };
      $scope.startNode=()=>{
         let exec = spawn(COMMANDS.NODE, [$scope.proyect.main], {cwd:$scope.proyect.url});
         exec.stdout.on('data', (data)=> {
            console.log('stdout: ' + data)
            $scope.writeLog(data.toString());
         });
      }
   }])

   app.controller('GuideCtrl', ['$scope', 'COMMANDS', 'HEROKU', ($scope, COMMANDS, HEROKU)=>{
      let spawn = require('child_process').spawn;

      $scope.toolbelt=HEROKU.TOOLBELT;
      $scope.register=HEROKU.REGISTER;

      $scope.profile={
         user:'',
         pass:''
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
            console.log('stdout: ' + data)
         });
      };
   }])
});
