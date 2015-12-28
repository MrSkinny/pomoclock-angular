(function(){

	function TaskListCtrl($scope, Tasks){
		var ctrl = this;

		var createDate = function(){
			var date = new Date();
			return(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
		}
		
		ctrl.tasks = Tasks.all;

		$scope.addTask = function(task){
			ctrl.tasks.$add({
				text: task,
				completed: false,
				created_at: createDate()
			});
		};

		$scope.removeTask = function(task){
			ctrl.tasks.$remove(task);
		};

	}

	angular
		.module('pomoClock')
		.controller('TaskListCtrl', ['$scope', 'Tasks', TaskListCtrl]);
}());