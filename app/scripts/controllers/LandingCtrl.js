(function(){

	function LandingCtrl($scope, DEFAULTS){

		this.time = DEFAULTS.workStart;
    
    $scope.$on('userSelectedTask', function(event, id){
      $scope.$broadcast('newTaskSelected', id);
    });
    
    $scope.$on('workSessionCompleted', function(e){
      $scope.$broadcast('notifyWorkSessionCompleted');
    });
    
    $scope.$on('sessionPaused', function(event){
      $scope.$broadcast('notifySessionPaused');
    });

	}

	angular
		.module('pomoClock')
		.controller('LandingCtrl', ['$scope', 'DEFAULTS', LandingCtrl]);
}());