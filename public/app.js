var app = angular.module('chatapp', []);
app.controller('chatctl', function($scope) {
    this.user = null;
		this.socket = io.connect("http://104.131.180.13:80");
		this.setUsername=function(name){
			this.user = name;
     	this.socket.emit("join", name);
		}
		$scope.msgs=[]
		this.socket.on("chat",function(client, msg) {
			var newmsg={};
			newmsg.msg=msg;
			newmsg.client=client;
			$scope.msgs.push(newmsg);
			$scope.$apply();
    });
		this.send=function(msg){
			$scope.message="";
      this.socket.emit("send", msg);
			var newmsg={};
			newmsg.msg=msg;
			newmsg.client=this.user;
			$scope.msgs.push(newmsg);
		}
});
