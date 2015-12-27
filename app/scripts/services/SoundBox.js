(function(){

	function SoundBox(){
		var SoundBox = {};

		SoundBox.library = {
			bell: '/assets/sounds/bell.mp3',
			dingdong: '/assets/sounds/dingdong.mp3'
		}
		var currentSound;

		SoundBox.play = function(name){
			currentSound = new buzz.sound(SoundBox.library[name], {
				preload: true
			});

			currentSound.play();
		};

		return SoundBox;
	}

	angular
		.module('pomoClock')
		.factory('SoundBox', [SoundBox]);
}());