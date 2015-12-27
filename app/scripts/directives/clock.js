(function(){

	function clock($interval, DEFAULTS){
		return {
			restrict: 'E',
			templateUrl: '/templates/directives/clock.html',
			scope: {
				time: '=',
				defaultTime: '='
			},

			link: function(scope,el,attrs){
				scope.workSessions = 0;
				scope.onBreak = false;
				var lastStartTime;

				scope.$watch('onBreak', function(val){
					scope.clockMessage = val ? "Now Resting" : "Time to Work!";
				});

				scope.$watch('time', function(val){
					if (val === 0) { // if timer ends
						stopTimer();

						if (!scope.onBreak) {
							scope.workSessions++;
							if (scope.workSessions === 4){
								resetTimeTo(DEFAULTS.longRestStart);
								scope.workSessions = 0;
							} else {
								resetTimeTo(DEFAULTS.restStart);
							}
						} else {
							resetTimeTo(DEFAULTS.workStart);
						}

						scope.toggleOnBreak();
					}
				});

				scope.timePromise = null;

				var startTimer = function(){
					scope.timePromise = $interval(function(){
						scope.time--;
					}, 1000);
				};

				var stopTimer = function(){
					if (scope.timePromise) {
						$interval.cancel(scope.timePromise);
						scope.timePromise = null;
					}
				};

				var resetTimeTo = function(num){
					scope.time = num;
					lastStartTime = num;
				};

				scope.getTime = function(){
					return scope.time;
				};

				scope.activate = function(){
					if (scope.timePromise){
						stopTimer();
						resetTimeTo(lastStartTime);
					} else {
						startTimer();
					}
				};

				scope.toggleOnBreak = function(options){
					scope.onBreak = scope.onBreak ? false : true;
				};

				// debug
				scope.increaseWorkSessions = function(){
					scope.workSessions++;
				};

			}
		};
	}

	angular
		.module('pomoClock')
		.directive('clock', ['$interval', 'DEFAULTS', clock]);
}());