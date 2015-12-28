(function(){

	function TaskListCtrl($scope, Tasks, Utilities){
		var ctrl = this;

		ctrl.tasks = Tasks.all;
		ctrl.taskInput = null;

		$scope.addTask = function(){
			ctrl.tasks.$add({
				text: ctrl.taskInput,
				completed: false,
				created_at: Utilities.createDate()
			});
			ctrl.taskInput = null;
		};

		$scope.removeTask = function(task){
			ctrl.tasks.$remove(task);
		};

	}

	angular
		.module('pomoClock')
		.controller('TaskListCtrl', ['$scope', 'Tasks', 'Utilities', TaskListCtrl]);
}());