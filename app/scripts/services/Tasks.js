(function(){

	function Tasks($firebaseArray){
		var Tasks = {};

		var taskRef = new Firebase('https://brilliant-inferno-6177.firebaseio.com/tasks');
		var tasks = $firebaseArray(taskRef);

		Tasks.all = tasks;

		return Tasks;
	}

	angular
		.module('pomoClock')
		.factory('Tasks', ['$firebaseArray', Tasks]);
}());