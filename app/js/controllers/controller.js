define(['./module', 'jquery'], (app, $)=>{
  'use strict';

   app.controller('MainCtrl', ['$scope', 'FileService', '$document', '$state', ($scope, FileService, $document, $state)=>{
      $scope.name="Hadrone";
      $scope.project={
         index: null,
         view: '',
         prompt:{
            msgs:''
         }
      };
      $scope.projects=[];

      $scope.config = require('../config/electron.config');

      $scope.readFile = ()=> FileService.readFile().success((data)=>{
         if(data) $scope.projects=data;
      }).error((err)=>{
         console.log("Error!!! Error!!! Destruir!! D:<");
      });

      angular.element($document).ready(()=>$scope.readFile());
      $scope.writeLog=(promptId, msg)=>{
         if(!$('#'+promptId).hasClass('active')) $('#'+promptId).addClass('active');
         $('#'+promptId).append('<span style="color:rgb(49, 179, 8)">> '+msg+'</span></br>');
      };
      $scope.writeLogError=(promptId, msg)=>{
         $('#'+promptId).append('<span style="color:red">> '+msg+'</span></br>');
      };
      $scope.fusion=(data, handler, index)=>{
         $scope.projects[index].projects.push(data);
         $scope.projects.splice($scope.projects.indexOf(data), 1);
         FileService.writeFile($scope.projects);
      };
      $scope.guid=()=> $scope.s4()+$scope.s4()+'-'+$scope.s4()+'-'+$scope.s4()+'-'+$scope.s4()+'-'+$scope.s4()+$scope.s4()+$scope.s4();
      $scope.s4=()=> Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
   }]);

   app.controller('HeaderCtrl', ['$scope', 'FileService', '$state', ($scope, FileService, $state)=>{
      $scope.$state = $state;
      $scope.removeProject=(index)=>{
         $scope.projects.splice(index, 1);
         FileService.writeFile($scope.projects);
      };

      $scope.uploadDataBase=($fileContent, $filePath)=>{
         let filePath = $filePath.substring(0, $filePath.length - 9);
         let img = $scope.config.windowConfig().iconDb;
         $scope.projects.push({
            'id':$scope.guid(),
            'name':'MongoDB',
            'client':filePath+'mongo',
            'connection':filePath+'mongod',
            'icon':img,
            'type':'data-base'
         });
         FileService.writeFile($scope.projects);
         $scope.readFile();
      };

      $scope.showContent = ($fileContent, $filePath)=>{
         $scope.file = JSON.parse($fileContent);
         let filePath = $filePath.substring(0, $filePath.length - 12);
         let img = $scope.config.windowConfig().icon;

         $scope.projects.push({
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
            'type':'project',
            'projects':[]
         });
         FileService.writeFile($scope.projects);
         $scope.readFile();
      };

      $scope.uploadImage = (index, $filePath)=>{
         $scope.projects[index].icon=$filePath;
         FileService.copyFile($filePath, $scope.config.windowConfig().dirname+'\\img\\', $scope.projects[index].name+'.png');
         FileService.writeFile($scope.projects);
      };
   }]);

   app.controller('DashboardCtrl', ['$scope', ($scope)=>{
      $scope.setProjectIndex = (index)=> $scope.$parent.project.index=index;
   }]);

   app.controller('DetailCtrl', ['$scope', 'COMMANDS', ($scope, COMMANDS)=>{
      let spawn = require('child_process').spawn;
      $scope.project=$scope.$parent.projects[$scope.$parent.project.index];
      $scope.command={
         'prompt':'',
         'logs':[]
      };

      $scope.startApi=(project)=>{
         let promptArray=$scope.command.prompt.split(" ");
         let node=promptArray.shift();
         let promptArgs=promptArray;

         let exec = spawn(node, promptArgs, {cwd:project.url});

         //Pruebas stdin para intentar intersectar la respuesta de un proceso y escribir en el
         exec.stdin.on('readable', ()=>{
           let data = exec.stdin.read();
           if(data) $scope.writeLogError(data.toString());
         });
         exec.stdin.on('end', () => {
           exec.stdout.write('end');
         });

         exec.stdout.on('data', (data)=> {
            $scope.writeLog(project.id, data.toString());
         });
         exec.stderr.on('data', (data)=> {
            $scope.writeLogError(project.id, data.toString());
            exec.stdout.write('weeeeena');
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
