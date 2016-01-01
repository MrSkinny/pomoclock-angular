(function(){

	function TaskListCtrl($scope, Tasks, Utilities){
		var ctrl = this;

		ctrl.tasks = Tasks.all;
		ctrl.taskInput = null;
    ctrl.activeTask = null;

		ctrl.addTask = function(){
			ctrl.tasks.$add({
				text: ctrl.taskInput,
				completed: false,
				created_at: Utilities.createDate(),
        workSessions: 0,
        interruptions: 0
			});
			ctrl.taskInput = null;
		};

		ctrl.removeTask = function(task){
			ctrl.tasks.$remove(task);
		};
    
    ctrl.makeActive = function(id){
      $scope.$emit('userSelectedTask', id);
    };
    
    ctrl.toggleComplete = function(task){
      task.completed = task.completed ? false : true;
      ctrl.tasks.$save(task);
    };
    
    $scope.$on('newTaskSelected', function(event, id){
      ctrl.activeTask = id;
    });
    
    $scope.$on('notifyWorkSessionCompleted', function(){
      if (ctrl.activeTask){
        var task = ctrl.tasks.$getRecord(ctrl.activeTask);
        if (task) {
          task.workSessions++;
          ctrl.tasks.$save(task);
        }
      } 
    });
    
    $scope.$on('notifySessionPaused', function(){
      if (ctrl.activeTask){
        var task = ctrl.tasks.$getRecord(ctrl.activeTask);
        if (task) {
          task.interruptions++;
          ctrl.tasks.$save(task);
        }
      } 
    });

	}

	angular
		.module('pomoClock')
		.controller('TaskListCtrl', ['$scope', 'Tasks', 'Utilities', TaskListCtrl]);
}());