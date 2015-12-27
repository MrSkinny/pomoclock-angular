(function(){

	function clock($interval){
		return {
			restrict: 'E',
			templateUrl: '/templates/directives/clock.html',
			scope: {
				time: '=',
				defaultTime: '='
			},

			link: function(scope,el,attrs){
				scope.timePromise = null;

				var startTimer = function(){
					scope.timePromise = $interval(function(){
						scope.time--;
					}, 1000);
				};

				var stopTimer = function(){
					$interval.cancel(scope.timePromise);
					scope.time = scope.defaultTime;
					scope.timePromise = null;
				};

				scope.getTime = function(){
					return scope.time;
				};

				scope.activate = function(){
					if (scope.timePromise){
						stopTimer();
					} else {
						startTimer();
					}
				};

			}
		};
	}

	angular
		.module('pomoClock')
		.directive('clock', ['$interval', clock]);
}());