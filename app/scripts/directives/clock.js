(function(){

	function clock($interval, DEFAULTS, SoundBox, Tasks){
		return {
			restrict: 'E',
			templateUrl: '/templates/directives/clock.html',
			scope: {
				time: '='
			},

			link: function(scope,el,attrs){
        
        // ======
        // Private vars / methods
        // ------
        
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
        
        // ==============
        // PUBLIC props / methods
        // --------------
        
				scope.workSessions = 0;
				scope.onBreak = false;
        scope.onLongRest = false;
				scope.timePromise = null;
        scope.noOfPauses = 0;
        scope.activeTask = null;


        // - - - - - 
        // Listeners
        // - - - - - 
				scope.$watch('onBreak', function(val){
					scope.clockMessage = val ? "Now Resting" : "Time to Work!";
				});

				scope.$watch('time', function(val){
					if (val === 0) scope.$broadcast('timeExpired');
				});

				scope.$on('timeExpired', function(){
					// TIMER ENDED

					if (!scope.onBreak) {
					// COMPLETED WORK

						SoundBox.play('dingdong');
						scope.workSessions++;

						if (scope.workSessions === 4){
							resetTimeTo(DEFAULTS.longRestStart);
              scope.onLongRest = true;
							scope.workSessions = 0;
						} else {
							resetTimeTo(DEFAULTS.restStart);
						}

					} else {
					// COMPLETED REST

						SoundBox.play('bell');
            if (scope.onLongRest) scope.onLongRest = false;
						resetTimeTo(DEFAULTS.workStart);
					}

					toggleOnBreak();

				});
        
        // - - - - - -
        // METHODS
        // - - - - - - 

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
        
        scope.pause = function(){
          if (scope.timePromise){
            stopTimer();
            scope.noOfPauses++;
          } else {
            startTimer();
          }
        };
        
        scope.buttonLabel = function(){
          return scope.timePromise ? 'Reset' : 'Start';
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
		.directive('clock', ['$interval', 'DEFAULTS', 'SoundBox', 'Tasks', clock]);
}());