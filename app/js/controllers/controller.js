"use strict";

angular.module('Controller', [])
.controller('Dashboard', ['$scope', ($scope)=>{
  $scope.name="Hadrone";
  $scope.img;

  $scope.getFile = ()=>{
    let inputFile = document.getElementById("container");
    let rawFile = new XMLHttpRequest();

    $scope.img = inputFile.files[0].path.substring(0, inputFile.files[0].path.length - 9) + 'icon.png';

    rawFile.open("GET", "file:///"+inputFile.files[0].path, false);
    rawFile.setRequestHeader("Content-type", "application/json; charset=utf-8");
    rawFile.onreadystatechange = ()=>{
        if(rawFile.readyState === 4){
            if(rawFile.status === 200 || rawFile.status == 0){
                let allText = rawFile.responseText;
                var asd = JSON.parse(allText);
            }
        }
    }
    rawFile.send(null);
  };

  $scope.getFile2 = ($scope, fileReader)=> {
    $scope.getFile = ()=>{
        $scope.progress = 0;
        fileReader.readAsDataUrl($scope.file, $scope).then((result)=>$scope.imageSrc = result);
    };
    $scope.$on("fileProgress", (e, progress)=>$scope.progress = progress.loaded / progress.total);
  };

}]);
