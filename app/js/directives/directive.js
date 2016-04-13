define(['./module'], (app)=>{
   'use strict';
   app.directive('onReadFile', ['$parse', ($parse)=>{
		return {
			restrict: 'A',
			scope: false,
			link: (scope, element, attrs)=>{
	      let fn = $parse(attrs.onReadFile);
				element.on('change', (onChangeEvent)=>{
					const reader = new FileReader();
					reader.onload = (onLoadEvent)=>scope.$apply(()=>fn(scope, {$fileContent:onLoadEvent.target.result, $filePath:((onChangeEvent.srcElement || onChangeEvent.target).files[0].path)}));
					reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
				});
			}
		};
	}]);
   app.directive('menu', [()=>{
      return {
         restrict: 'E',
         transclude: true,
         templateUrl:'js/directives/templates/menu.html'
      }
   }]);
});
