app.controller('BroadcastCtrl', function($scope,$state, $rootScope, subscribers, Session){
	var connection = $rootScope.connection;


	console.log(subscribers);




	$scope.startBroadcast = function(data){
		//product a unique id for the broadcast
		data.channelId = connection.token();
		data.broadcasterId = Session.user.id;

		if (Session.user.id){
			for (let i=0; i<subscribers.length; i++){
				emailjs.send('gmail', 'broadcasting',{
					email: subscribers[i].subscriber.email, 
					subscriber: subscribers[i].subscriber.name,
					broadcaster: subscribers[i].broadcaster.name,
					channelId: data.channelId,
					coverimage: 'http://factoflife.net/upload/images/20160603/funny-cat-facts.jpg', //need more work, will be variable
				});
			}
		}




		$state.go('broadcastLive', {data: data, type: 'broadcast'})
	}

	$scope.joinBroadcast = function(data){
		$state.go('broadcastLive', {data: data, type: 'viewer'})
	}

	$scope.sendMessage = function(){
		for (let i=0; i<subscribers.length; i++){
			emailjs.send('gmail', 'notice',{
				email: subscribers[i].subscriber.email, 
				subscriber: subscribers[i].subscriber.name,
				broadcaster: subscribers[i].broadcaster.name,
				message: $scope.message, 
			});
		}
	}

});