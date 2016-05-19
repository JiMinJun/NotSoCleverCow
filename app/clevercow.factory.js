
(function() {
	'use strict';

	angular.module('CleverCowApp')
		.factory('CleverCowFactory', [
			'$http',
			'$q', 
			function($http, $q){

				var vm = this;
				
				function askCow(parsedResponse) {
					var defer = $q.defer();
					
					$http({
	  					method: 'GET', 
	  					url: 'https://thibaultcha-fortunecow-v1.p.mashape.com/say', 
	  					headers: {},
	  					params: {
	  						cow: 'www',
	  						face: 'default',
	  						t: parsedResponse
	  					}
					}).then(function(cowResp) {
						defer.resolve(cowResp);
					});
					return defer.promise;
				};

				function askBot(input) {
					var defer = $q.defer();

					$http({
						method: 'GET',
						url: "https://jeannie.p.mashape.com/api",
						params: {
							'input': input,
							locale: 'en',
						},
						headers: {'X-Mashape-Key': ''}	
					}).then(function(botResp) {
							console.log(botResp);
							console.log(botResp.data.output[0].actions.say.text);
							defer.resolve(botResp.data.output[0].actions.say.text);
						});
					return defer.promise;		  			
				};

				return {
					askBot: askBot,
					askCow: askCow
				}
			}
		]);

})();
