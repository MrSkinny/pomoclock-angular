(function(){

	function LandingCtrl(){

		this.defaultTime = 1500;
		this.time = 1500;


	}

	angular
		.module('pomoClock')
		.controller('LandingCtrl', [LandingCtrl]);
}());