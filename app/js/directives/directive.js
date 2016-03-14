"use strict";

angular.module('Directive', [])
.directive('onReadFile', ($parse)=>{
	return {
		restrict: 'A',
		scope: false,
		link: (scope, element, attrs)=>{
      let fn = $parse(attrs.onReadFile);
			element.on('change', (onChangeEvent)=>{
				const reader = new FileReader();
				reader.onload = (onLoadEvent)=>scope.$apply(()=>fn(scope, {$fileContent:onLoadEvent.target.result}));
				reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
			});
		}
	};
});
