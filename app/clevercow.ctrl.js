(function() {
	'use strict';
	angular.module('CleverCowApp').controller('CleverCowCtrl', [
		'$q',
		'CleverCowFactory',
		function($q, CleverCowFactory) {

			var vm = this;
			vm.name = 'CleverCowCtrl';
			console.log(vm.entry);

			vm.cowResponse = "";
			vm.chatLog = [];

			var updateChatLog = function(newMessage) {

				var defer = $q.defer();

				vm.chatLog.push(newMessage);
				responsiveVoice.speak(newMessage, "UK English Female");
			
				defer.resolve(newMessage);

				return defer.promise;
			};

			vm.askBot = function(entry) {
				vm.chatLog.push(entry);
				CleverCowFactory.askBot(entry)
					.then(function(newMessage) {		

						return updateChatLog(newMessage);

					}).then(function(newMessage) {
						
						return CleverCowFactory.askCow(newMessage); 
					
					}).then(function(resp) {
					
						vm.cowResponse = resp.data;
					
					}).catch(function(err) {

					});
					vm.entry = "";
			};



	}]);

})();