(function(){

	function TaskListCtrl($scope, Tasks){

		$scope.tasks = Tasks.all;

		$scope.addTask = function(task){
			$scope.tasks.$add({
				text: task,
				completed: false
			});
		};

		$scope.removeTask = function(task){
			$scope.tasks.$remove(task);
		};

	}

	angular
		.module('pomoClock')
		.controller('TaskListCtrl', ['$scope', 'Tasks', TaskListCtrl]);
}());