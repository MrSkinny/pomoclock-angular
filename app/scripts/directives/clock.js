(function(){

	function clock($interval, DEFAULTS, SoundBox){
		return {
			restrict: 'E',
			templateUrl: '/templates/directives/clock.html',
			scope: {
				time: '=',
				defaultTime: '='
			},

			link: function(scope,el,attrs){
				var lastStartTime;

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

				var toggleOnBreak = function(){
					scope.onBreak = scope.onBreak ? false : true;
				};

				scope.workSessions = 0;
				scope.onBreak = false;
				scope.timePromise = null;

				scope.$watch('onBreak', function(val){
					scope.clockMessage = val ? "Now Resting" : "Time to Work!";
				});

				scope.$watch('time', function(val){
					if (val === 0) { 
					// TIMER ENDED
						stopTimer();

						if (!scope.onBreak) {
						// COMPLETED WORK

							SoundBox.play('dingdong');
							scope.workSessions++;

							if (scope.workSessions === 4){
								resetTimeTo(DEFAULTS.longRestStart);
								scope.workSessions = 0;
							} else {
								resetTimeTo(DEFAULTS.restStart);
							}

						} else {
						// COMPLETED REST

							SoundBox.play('bell');
							resetTimeTo(DEFAULTS.workStart);
						}

						scope.toggleOnBreak();
					}
				});

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


				// ======================================
				// debug
				// ======================================
				scope.increaseWorkSessions = function(){
					scope.workSessions++;
				};

				scope.playSound = function(name){
					SoundBox.play(name);
				};

				scope.toggleOnBreak = function(options){
					toggleOnBreak();
				};
				// -------------------------------------

			}
		};
	}

	angular
		.module('pomoClock')
		.directive('clock', ['$interval', 'DEFAULTS', 'SoundBox', clock]);
}());