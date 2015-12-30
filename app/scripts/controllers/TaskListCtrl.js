(function(){

	function TaskListCtrl(Tasks, Utilities){
		var ctrl = this;

		ctrl.tasks = Tasks.all;
		ctrl.taskInput = null;

		ctrl.addTask = function(){
			ctrl.tasks.$add({
				text: ctrl.taskInput,
				completed: false,
				created_at: Utilities.createDate()
			});
			ctrl.taskInput = null;
		};

		ctrl.removeTask = function(task){
			ctrl.tasks.$remove(task);
		};

	}

	angular
		.module('pomoClock')
		.controller('TaskListCtrl', ['Tasks', 'Utilities', TaskListCtrl]);
}());