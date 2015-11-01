var currentdate = new Date(); 
var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " at "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
                
var appMain = angular.module('appMain', ['ui.router', 'ngAnimate', 'anim-in-out', 'angular-loading-bar', 'ncy-angular-breadcrumb']);

appMain.config(['$stateProvider', '$urlRouterProvider', '$sceDelegateProvider', '$locationProvider', '$breadcrumbProvider', function ($stateProvider, $urlRouterProvider, $sceDelegateProvider, $locationProvider, $breadcrumbProvider) {
	/****************************************/
	/*										*/
	/*			Configure HTML5 Mode		*/
	/*										*/
	/****************************************/ 
	$locationProvider.html5Mode(false),
	/****************************************/
	/*										*/
	/*			Configure source whitelist	*/
	/*										*/
	/****************************************/ 
	$sceDelegateProvider.resourceUrlWhitelist(["self", "http://*.googleapis.com/**"]);
		/****************************************/
	/*										*/
	/*			Configure UI-Router			*/
	/*										*/
	/****************************************/
	$urlRouterProvider.otherwise('/');
	/****************************************/
	/*										*/
	/*			Index (Abstract) State		*/
	/*										*/
	/****************************************/
	$stateProvider.state('index', {
		abstract: false,
		url: '/',
		views: {
			'main@': {
				templateUrl: 'templates/index.html',
				controller: 'IndexCtrl'
			},
			'header@': {
				templateUrl: 'templates/header.html',
				controller: 'HeaderCtrl'
			}
		},
		resolve: {
			data:  function ($q, $http, $filter){
				return $http({
					method: 'GET', 
					url: 'http://beta.json-generator.com/api/json/get/NJ5T56RZx'
				}).then (function (result) {
					console.log(result.data);
					return result.data;
				});
			}
		}
	})
	$stateProvider.state('index.merchant', {
		url: '{url}',
		views: {
			'main@': {
				templateUrl: 'templates/merchant.html',
				controller: 'MerchantCtrl'
			}
		},
		resolve: {
			// Extract the data we need based on current state url (GUID)
			current: ['$stateParams', '$filter', 'data', function($stateParams, $filter, data){
				return $filter('filter')(data, $stateParams.url)[0];
			}]
		}
	})
}]);

appMain.run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
	console.log('Application start on '+datetime);
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
}]);

appMain.controller('HeaderCtrl', ['$scope', '$stateParams', '$filter', 'data', function($scope, $stateParams, $filter, data){
	console.log('Run HeaderCtrl on '+datetime);
}]);
appMain.controller('IndexCtrl', ['$scope', '$stateParams', '$filter', 'data', function($scope, $stateParams, $filter, data){
	console.log('Run IndexCtrl on '+datetime);
	$scope.merchants = data;
}]);
appMain.controller('MerchantCtrl', ['$scope', '$stateParams', '$filter', 'current', function($scope, $stateParams, $filter, current){
	console.log('Run MerchantCtrl on '+datetime);
	$scope.merchant = current;
}]);