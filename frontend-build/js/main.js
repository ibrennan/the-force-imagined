require.config({

	baseUrl: '_includes/js/vendor',

	urlArgs: "v=" + (new Date()).getTime(),

	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		},
		parse: {
			deps: [
				'jquery',
				'underscore'
			],
			exports: 'Parse'
		},
		hammerjs: {
			exports: 'Hammer'
		},
		facebook : {
			exports: 'FB'
		}
	},

	paths: {
		app: '../app',
		templates: '../templates',
		hammerjs: 'hammer',
		facebook: '//connect.facebook.net/en_US/all'
	}
	
});

require(['parse', 'app/router', 'facebook'], function (Parse, Router) {
	
	Parse.initialize(
		"htUmjtcoQ4ZX1nVrEsYIsQ6jpi8p6fjtPHuduRYu",
		"6tIHE2sbi46e1Oq8abQPzCBpknQsM1N7WIQ3DQla"
	);

	FB.init({
		appId : '1517285248523317',
	});

	var router = new Router();

	Backbone.history.start();

});