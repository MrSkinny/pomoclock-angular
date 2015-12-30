(function(){

	function Tasks($firebaseArray){
		var Tasks = {};

		var taskRef = new Firebase('https://test-pomo.firebaseio.com/tasks');
		var tasks = $firebaseArray(taskRef);

		Tasks.all = tasks;

		return Tasks;
	}

	angular
		.module('pomoClock')
		.factory('Tasks', ['$firebaseArray', Tasks]);
}());