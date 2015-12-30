(function(){

	function LandingCtrl(DEFAULTS){

		this.time = DEFAULTS.workStart;

	}

	angular
		.module('pomoClock')
		.controller('LandingCtrl', ['DEFAULTS', LandingCtrl]);
}());