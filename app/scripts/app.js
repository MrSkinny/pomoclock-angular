(function(){

	function config($stateProvider, $locationProvider){

		$locationProvider
			.html5Mode({
				enabled: true,
				requireBase: false
			});

		$stateProvider
			.state('landing', {
				url: '/',
				controller: 'LandingCtrl as landing',
				templateUrl: '/templates/landing.html'
			});

	}

	angular
		.module('pomoClock', ['ui.router', 'firebase'])
		.config(config)
		.constant('DEFAULTS', {
			workStart: 5,
			restStart: 10,
			longRestStart: 15
		});

}());

