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
         //transclude: true,
         templateUrl:'templates/menu.html'
      }
   }]);
   app.directive('modal', [()=>{
      return {
         restrict: 'E',
         //transclude: true,
         templateUrl:'templates/modal.html'
      }
   }]);
   /*app.directive('draggable', [()=>{
      return (scope, element)=>{
         var el = element[0];
         el.draggable=true;
         el.addEventListener('dragstart', (e)=>{
            e.dataTransfer.effectAllowed='move';
            e.dataTransfer.setData('Text', this.id);
            //this.classList.add('drag');
            return false;
         }, false);
         el.addEventListener('dragend', (e)=>{
            //this.classList.remove('drag');
            return false;
         }, false);
      }
   }]);
   app.directive('droppable', [()=>{
      return {
         scope:{},
         link:(scope, element)=> {
            var el=element[0];
         }
      }
   }]);*/
});
