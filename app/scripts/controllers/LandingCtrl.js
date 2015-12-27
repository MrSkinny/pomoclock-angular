(function(){

	function LandingCtrl(DEFAULTS){

		this.defaultTime = DEFAULTS.workStart;
		this.time = this.defaultTime;


	}

	angular
		.module('pomoClock')
		.controller('LandingCtrl', ['DEFAULTS', LandingCtrl]);
}());