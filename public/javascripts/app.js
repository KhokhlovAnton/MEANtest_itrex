var app = angular.module('myApp', []);

app.controller('emailsCtrl', function($rootScope, $scope, $http, myFactory) {
	
	$scope.myFactory = myFactory;
		
	$scope.delEmail = function(){};
	$scope.closeDetails = function(){};
	$scope.sendEmail = function(){};
	$scope.showDetails = function(){};
	$scope.createNewEmail = function(){};
	
	$scope.logout = function(){
		myFactory.isAdmin = false;
		myFactory.isLoggined = false;	
	};

    $scope.emails = [];

    $http.get('http://localhost:8081/list').then(function(response) {
        console.log(response.data.result);
        $scope.emails = response.data.result;
    });

/*	$scope.emails=[
		{eTo:'Jani@gg.gg',
		 eSubj:'Norway',
		 eMess:'Lorem ipsum dolor sit amet, no sapientem patrioque vix, ne vim fabellas liberavisse, recteque sadipscing neglegentur sit cu. Eos omnis eligendi ne. Nibh evertitur te duo. Mel cu congue legimus, sonet causae inimicus eu ius. Exerci antiopam deterruisset pro ut, tollit senserit sea no, sumo autem percipit ei pri. Vis facer dicunt constituto id, has ea noluisse voluptatibus, mei enim quidam ex. Ut cum augue admodum, has movet scribentur persequeris at, ut illum similique pro. His at amet graecis gloriatur, ne essent admodum imperdiet his, at graecis iudicabit adipiscing vis. Te ius errem oporteat. Vix utinam scaevola ne, pri no erant probatus maluisset, an tation assueverit omittantur mel. Facete equidem mediocritatem ut has. Te voluptaria rationibus nam. Dicit nonumes te sed, vim ad verterem mediocritatem, cum definiebas temporibus eloquentiam ei. No nec euripidis neglegentur. Cu habeo accusam mel. Mel et minim legimus euripidis.',
		 eSndDate:'2018-03-01'},
		{eTo:'Dou@gg.gg',
		 eSubj:'Sweden',
		 eMess:'In quas civibus placerat nec, ne eum laudem placerat constituto. Ridens omnium sententiae pri eu. Ad oportere mnesarchum vix, error omittam no mea. Etiam mollis epicuri et quo. An vix malorum repudiandae, aliquid tibique ei pri. Has nostro facilisi ei, ei duo fugit constituto, ei has alii suavitate adolescens. Te voluptaria rationibus nam. Dicit nonumes te sed, vim ad verterem mediocritatem, cum definiebas temporibus eloquentiam ei. No nec euripidis neglegentur. Cu habeo accusam mel. Mel et minim legimus euripidis. Pro zril possit ea, at pri vero discere vivendum. Purto sadipscing sed cu. Ridens probatus forensibus est ei, corpora euripidis honestatis id sit. Dolor putant an mea. Dictas corpora suscipit vel in. Qui eleifend laboramus deterruisset cu, eirmod molestiae ad vix. Eos an audire inermis insolens, vim vidit pertinax ad, in alia aliquam per.',
		 eSndDate:'2018-03-02'},
		{eTo:'Kali@gg.gg',
		 eSubj:'Denmark',
		 eMess:'Sit dignissim efficiantur ne, postea possit laoreet te mei, ex vide mandamus evertitur sit. Purto nostrud vis no. Errem nonumes percipitur pro ei, no nam nostrum efficiantur, id sed offendit mediocritatem. Vel vidit habeo ea. Scaevola euripidis percipitur ius et. Nullam eleifend ut has. Vim in sonet nominavi, nobis oratio aliquip cum ad. Pertinax repudiandae nam at, vim persecuti adipiscing ut. Congue veniam impedit usu an. Te erat utroque per, ex vis solet euripidis. Ex ius saperet lobortis, at labore referrentur complectitur duo. Ne sea electram accusamus, eirmod dolorem sapientem ad mea, vim ullum reprimique id. Enim summo per ei. Vel viris vidisse et. Mel percipit atomorum maluisset te, est in omittam elaboraret scribentur, cu vel primis possit assentior. Nam ut duis molestie complectitur, eam ex ludus eirmod, omnes invenire liberavisse eu mea. Nam no brute utroque eloquentiam, nec ut inani definiebas, id eum iuvaret eleifend.',
		 eSndDate:'2018-03-04'}];
*/
});

app.controller('loginCtrl', function($rootScope, $scope, myFactory) {

	$scope.myFactory = myFactory;
	$scope.login = function(){
		console.log('login function');
		myFactory.isAdmin = false;
		var users = [
			{login:'Guest',pass:'tmp'},
			{login:'User',pass:'12345'},
			{login:'Admin',pass:'54321'}];
		myFactory.isLoggined = false;
		
		for(u of users)			
			if(($scope.uLogin === u.login)&&($scope.uPwd === u.pass)){	
				myFactory.isLoggined = true;		
				if($scope.uLogin === 'Admin') myFactory.isAdmin = true;
			}
		console.log('isLoggined '+myFactory.isLoggined );
	};	 
});

app.directive('loginDirective', function() {
    return {
        templateUrl : 'login.html'
    };
});

app.factory('myFactory', function(){
	return{
		isLoggined: false,
		isAdmin: false
	}
	
});