var app = angular.module('bowlingGameApp', ["ngRoute","bowlingCtrlModule"]);

app.factory('httpRequestInterceptor', function () {
	  return {
	    request: function (config) {

	      config.headers['Content-Type'] = 'application/json';

	      return config;
	    }
	  };
	});

app.config(function ($httpProvider) {
	  $httpProvider.interceptors.push('httpRequestInterceptor');
	});


function createCORSRequest(method, url, params, isAsync,headers)  {
	console.log("Create CORS req methos called"); 
	var xhr = new XMLHttpRequest();
	  if ("withCredentials" in xhr) {
		// XHR for Chrome/Firefox/Opera/Safari.
		xhr.open(method, url, true);
		for (var key in headers) {
		if (headers.hasOwnProperty(key)) {
		  var value = headers[key];
		  xhr.setRequestHeader(key, value);
		}
	  }
	  
	  } else if (typeof XDomainRequest != "undefined") {
		// XDomainRequest for IE.
		xhr = new XDomainRequest();
		xhr.open(method, url, true);
		for (var key in headers) {
		if (headers.hasOwnProperty(key)) {
		  var value = headers[key];
		  xhr.setRequestHeader(key, value);
		}
	  }
		
	  } else {
		// CORS not supported.
		xhr = null;
	  }
	  console.log("Create CORS req method exit");
	  return xhr;
}



/** Factory method to for all service request of LoginApp.
 * 
 */
app.service('LoginAppService', function() {
	 console.log("LoginApp service called");
	return {
		
	getJsonResponse : function makeCorsRequest(method, url, params, isAsync,headers,callback) {
			  // All HTML5 Rocks properties support CORS.
			
			//if((url.indexOf(configDetails.tokenURL) > -1 )||(typeof undefined != typeof headers.Authorization && null != headers.Authorization && "" != headers.Authorization && "error" //!= headers.Authorization)){

			  console.log("getJsonResponse method called");
			  var xhr = createCORSRequest(method, url, params, isAsync,headers);
			  var result;
			  if (!xhr) {
				console.log('CORS not supported');
				return;
			  }
			  
			  xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
				  // defensive check
				  if (typeof callback == "function") {
					if (xhr.status == 200) {
						console.log("Success");
							callback.apply(xhr.responseText);
					}else{
						console.log("Failure");
						callback.apply("{\"error\": \""+xhr.status+"\"}");
					}
					
				  }
				}
			  }

			  // Response handlers.
			  /**xhr.onload = function() {
				//alert('Response from CORS request to ' + url + ': ' + title);
				result = xhr.responseText;
			  };**/

			  /** xhr.onerror = function() {
				result = "{\"error\": xhr.status}"  ;
			  }; **/
	
			  console.log("Before making AJAX call");
			  
			  xhr.send(params);
			  
		

		//}else{
		//		callback.apply("{\"error\": \"error\"}");
		//	}	
			
			
			// Make the actual CORS request.
	}		
	};
});

app.service('playerArray', [function () {

    // private
	var players = [];

	return {
	    addPlayer: addPlayer,
	    getPlayerList: getPlayerList,
	    setPlayerList : setPlayerList,
	    clearPlayerList:clearPlayerList
	  };
	
	
     function addPlayer(player) {
    	players.push(player);
       //return [].concat(players);
    }
    function getPlayerList(){
        // will return a copy of the personArray at the time of request
        return players;
    }   
    
    function setPlayerList(players){
    	this.players =  players;
    }
    
    function clearPlayerList(){
    	players = [];
    }

}]);


app.directive('buttons',function(){
	return {
		templateUrl : 'views/buttons.html' 
	}
});

app.directive('scoretable',function(){
	return {
		templateUrl : 'views/scoretable.html' 
	}
})

app.config(function($routeProvider,$locationProvider){
	
	 $locationProvider.hashPrefix('');
	
	$routeProvider
		.when('/',{
			templateUrl:'views/login.html',
			controller:"LoginCtrl"
		})
		.when("/landingpage",{
			templateUrl:'views/landing.html',
			controller:"PlayerInfoCtrl"
		})
		.when("/details/:noofplayers",{
			templateUrl:'views/details.html',
			controller:"PlayerInfoCtrl"
		})
		.when("/scoresheet",{
			templateUrl:'views/scoresheet.html',
			controller:"BowlingScoreCtrl"
		})
		.when("/forgotpassword",{
			templateUrl:"forgot-password.html",
			controller:"TutorialCtrl2"
		})
		.when("/registration",{
			templateUrl:"registration.html",
			controller:"TutorialCtrl2"
		})
		.otherwise({
			redirectTo:"/"
		});


});