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
				var timePromise = null;

				var startTimer = function(){
					timePromise = $interval(function(){
						scope.time--;
					}, 1000);
				};

				var stopTimer = function(){
					$interval.cancel(timePromise);
					scope.time = scope.defaultTime;
					timePromise = null;
				};

				scope.getTime = function(){
					return scope.time;
				};

				scope.activate = function(){
					if (timePromise){
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