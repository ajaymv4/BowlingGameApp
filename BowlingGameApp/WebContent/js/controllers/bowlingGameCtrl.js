angular.module("bowlingCtrlModule",[])

.controller("LoginCtrl",["$scope","$log","$location","$http","LoginAppService",function($scope,$log,$location,$http,LoginAppService){

	console.log("Controller called");
	
$scope.loginObj={};

$scope.loginObj.title = "Bowling Game League";

var myFunc = this;
$scope.myFunc = function (){
	
	console.log($scope.loginObj.userName);
	console.log($scope.loginObj.password);
	
}

$scope.removeLoginPageErrors= function(){
	$('.errorMsgSpace').addClass('hide');
	$('.loginUserNameFrm').removeClass('has-error');
	$('.loginUserNameFrm .emailIdError').addClass('hide');
	$('.loginPasswordFrm').removeClass('has-error');
	$('.loginPasswordFrm .passwordError').addClass('hide');
	
}


var passwordValidation = function(){
	if(typeof undefined != typeof $scope.password && null != $scope.password && "" != $scope.password){
    	
    	var regex =  new RegExp(/^[a-zA-Z0-9]*$/);
		var regex2 = new RegExp(/^((?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?!.*\s)(?!.*\\)|(?=.*[a-z])(?=.*\d)(?=.*[\$\%\&\@\^\-\_\!\+\=\[\]\{\}\|\:\'\,\.\?\/\`\~\(\)\;\<\>\*\#])(?!.*\s)(?!.*\\)|(?=.*[A-Z])(?=.*\d)(?=.*[\$\%\&\@\^\-\_\!\+\=\[\]\{\}\|\:\'\,\.\?\/\`\~\(\)\;\<\>\*\#])(?!.*\s)(?!.*\\)|(?=.*[A-Z])(?=.*[a-z])(?=.*[\$\%\&\@\^\-\_\!\+\=\[\]\{\}\|\:\'\,\.\?\/\`\~\(\)\;\<\>\*\#])(?!.*\s)(?!.*\\)).{8,16}$/);
    	if((null != $scope.password.match(regex) || null != $scope.password.match(regex2)) &&  $scope.password.length >= 8 && $scope.password.length <= 20){
            $('.loginPasswordFrm').removeClass('has-error');
        	$('.loginPasswordFrm .passwordError').addClass('hide');
        	allowPassword = 1;
        	isPasswordValid = true;
        }else{
            $('.loginPasswordFrm').addClass('has-error');
        	$('.loginPasswordFrm .passwordError').removeClass('hide');
          // $('.errorMsgSpace').removeClass('hide');
        }
    }else{
	   $('.loginPasswordFrm').addClass('has-error');
    	$('.loginPasswordFrm .passwordError').removeClass('hide');
   }
}

$scope.isUserNameValid = false;

$scope.isPasswordValid = false;

$scope.validate = function (event){
	
		console.log($scope);
	if(event.target.id === "inputEmail" || event.target.id === "submit" ){
		if($scope.myForm.username.$invalid){
			$('.loginUserNameFrm').addClass('has-error');
			$('.loginUserNameFrm .emailIdError').removeClass('hide');
				isUserNameValid = false;
		} else{
				isUserNameValid = true;
				$scope.removeLoginPageErrors();
		}
	} else if(event.target.id === "inputPassword" || event.target.id === "submit"){
			passwordValidation();
			
	} else{
			isPasswordValid = true;
			$scope.removeLoginPageErrors();
	}
		
		/*
		 * if( typeof loginUserNameFrmVal != typeof undefined && "" !=
		 * loginUserNameFrmVal && null != loginUserNameFrmVal){ var atpos =
		 * loginUserNameFrmVal.indexOf("@"); var dotpos =
		 * loginUserNameFrmVal.lastIndexOf("."); var userNameRegex = new
		 * RegExp(/^[a-zA-Z0-9]*$/); var str =
		 * loginUserNameFrmVal.match(userNameRegex); if (loginUserNameFrmVal == "" ||
		 * atpos<1 || dotpos<atpos+2 || dotpos+2>=loginUserNameFrmVal.length ||
		 * /\s/g.test(loginUserNameFrmVal) || loginUserNameFrmVal.length >50) {
		 * if(atpos == -1){ $('.loginUserNameFrm').addClass('has-error');
		 * $('.loginUserNameFrm .emailIdError').removeClass('hide'); } else
		 * if(loginUserNameFrmVal.length <5 || loginUserNameFrmVal >30 || null ==
		 * str || "" == str ){ $('.loginUserNameFrm').addClass('has-error');
		 * $('.loginUserNameFrm .emailIdError').removeClass('hide'); } } }
		 */ 
}   

$(".btn.btn-lg.btn-primary.btn-block.btn-signin").click( function(e){
	
	$scope.removeLoginPageErrors();
	
	console.log("After removing all error from fields");
	
	if(isUserNameValid && isPasswordValid){
	
		var userLoginData = {'userName': $scope.userName, 'password': $scope.password };
		
		console.log(userLoginData);
		
		
		console.log("Before preparing for ajax call");
		
		var url = "http://localhost:8090/bowlingengine/login";
		var method = "POST";
		var isAsync = false;
		var params = params = JSON.stringify(userLoginData);				
		var headers = {'Content-Type':'application/json; charset=UTF-8','Accept': 'application/json'};
		
		console.log($scope);
		
		LoginAppService.getJsonResponse(method, url, params, isAsync,headers,function(){
			var data = JSON.parse(this);
			if(data.status === "success"){
				$scope.removeLoginPageErrors();
				$location.url("/landingpage");
				$scope.$apply();
			} else{
				$('.errorMsgSpace').removeClass('hide');
				$location.url("/");
				$scope.$apply();
			}
	   		
		});
		
		
	}
	
});




}])


.controller("PlayerInfoCtrl",["$scope","$routeParams","$location","playerArray",function($scope,$routeparams,$location,playerArray){

	// var players = [];
	
	$scope.noofplayers = $routeparams.noofplayers;
	
	$scope.players = playerArray.getPlayerList();
	
	$scope.submit=function(){
		playerArray.clearPlayerList();
		console.log($scope.noofplayers);
		for(var i=0;i<$scope.noofplayers;i++){
			// players.push({"PlayerNo":i,"Name":""});
			playerArray.addPlayer({"PlayerNo":i,"Name":"","scoreList":""});
			
		}
		console.log("Array entries are==>"+playerArray.getPlayerList());
		$location.url("/details/"+$scope.noofplayers);
	}
	
	$scope.saveAllNames = function(){
		console.log($scope.players);
		playerArray.setPlayerList($scope.players);
		var newArray = playerArray.getPlayerList();
		for(var j=0;j<newArray.length;j++){
			console.log("Contents of the Array are "+newArray[j].name);
		}
		
		$location.url("/scoresheet");
	}
	
	console.log("$routeparams.noofplayers==>"+$routeparams.noofplayers)
	
	console.log($scope);
	
	// $scope.players = players;
	
	
}])



.controller("BowlingScoreCtrl",["$scope","playerArray","LoginAppService",function($scope,playerArray,LoginAppService){

	$scope.players = playerArray.getPlayerList();
	
	$scope.counter = 0;
	
	$scope.scoreList = [];
	
		console.log("This is from BowlingScoreCtrl");
		
		$scope.chance1Value = "";
		
		$scope.chance2Value = "";
		
		$scope.chance1Valuef10 = "";
		$scope.chance2Valuef10 = "";
		$scope.chance3Valuef10 = "";
		
		$scope.isGameComplete = false;
		
		
		function frameScore(x,y) {this.chance1Score=x,this.chance2Score=y};
		
		$scope.chanceValue=function(value){
			
			//frameScore = {"chance1Score":$scope.chance1Value,"chance2Score":$scope.chance2Value};
		if(!($scope.isGameComplete)){
			if($scope.counter==10){
				$scope.chance3Value = value;
				$scope.frame10Score =  $scope.players[0].scoreList[8].frameScore+$scope.players[0].scoreList[9].chance1Score+$scope.players[0].scoreList[9].chance2Score+value;
				$scope.isGameComplete=true;
			}
			if($scope.counter<=9){
				if(isEmpty($scope.chance1Value)){
					var frame = new frameScore();
					$scope.scoreList.push(frame);
					$scope.chance1Value = value;
					$scope.scoreList[$scope.counter].chance1Score = value;
					if(value == 10 && $scope.counter<9){
						$scope.chance2Value = 0;
						$scope.scoreList[$scope.counter].chance2Score = 0;
						scoreCalculator();
						
					} 
				} else{
					$scope.chance2Value = value;
					$scope.scoreList[$scope.counter].chance2Score = value;
					scoreCalculator();
				}
			}
			/*}else{
				
				if(isEmpty($scope.chance1Valuef10)){
					$scope.chance1Valuef10 = value;
				}else if(isEmpty($scope.chance2Valuef10)){
					$scope.chance2Valuef10 = value;
					if($scope.chance1Valuef10+$scope.chance2Valuef10<10){
						$scope.frame10Score=$scope.scoreList[counter-1].frameScore + $scope.chance1Valuef10+$scope.chance2Valuef10;
					}
				} else{
					 $scope.chance3Scoref10 = value;
					 $scope.frame10Score=$scope.scoreList[counter-1].frameScore + $scope.chance1Valuef10+$scope.chance2Valuef10+value;
					
				}
				
				if($scope.players[0].scoreList[8].isSpare && isEmpty($scope.players[0].scoreList[8].frameScore)){
					$scope.players[0].scoreList[8].frameScore = $scope.chance1Valuef10+$scope.players[0].scoreList[8].chance1Score
																	+$scope.players[0].scoreList[8].chance2Score;
				}else if($scope.players[0].scoreList[8].isStrike && isEmpty($scope.players[0].scoreList[8].frameScore)){
					$scope.players[0].scoreList[8].frameScore = $scope.chance1Valuef10+$scope.chance1Valuef10+$scope.players[0].scoreList[8].chance1Score;
				}
				
			}*/
		}
		
		};
		
		function scoreCalculator(){
			
			console.log("players Array is "+$scope.players);
			
			console.log("Before preparing for ajax call");
			
			var url = "http://localhost:8090/bowlingengine/calculatescore";
			var method = "POST";
			var isAsync = false;
			var params = params = JSON.stringify($scope.scoreList);				
			var headers = {'Content-Type':'application/json; charset=UTF-8','Accept': 'application/json'};
			
			LoginAppService.getJsonResponse(method, url, params, isAsync,headers,function(){
				var data = JSON.parse(this);
				console.log(data);
				$scope.players[0].scoreList = data;
				
				
				//console.log($scope.players[0].scoreList[0].chance1Value);
				if($scope.counter==9 && $scope.players[0].scoreList[8].strike && $scope.chance1Value+$scope.chance2Value==20){
					$scope.players[0].scoreList[8].frameScore=$scope.players[0].scoreList[7].frameScore+30;
				}
				if($scope.counter==9 && $scope.scoreList[9].chance1Score+$scope.scoreList[9].chance2Score<10){
					$scope.frame10Score =  $scope.players[0].scoreList[8].frameScore+$scope.scoreList[9].chance1Score+$scope.scoreList[9].chance2Score;
					$scope.isGameComplete=true;
				}
				
				$scope.chance1Value = "";
				$scope.chance2Value = "";
				
				$scope.counter = $scope.counter + 1;
				$scope.$apply();
		});
		}
		
		function isEmpty(val){
		    return (val === undefined || val == null || val.length <= 0 ||  typeof val === 'undefined') ? true : false;
		}
		
		
}]);
