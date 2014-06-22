angular.module('MyApp', ['ngAnimate', 'ngRoute', 'gh'])

  .config(function($httpProvider, $routeProvider) {
    $httpProvider.interceptors.push('authenticationInterceptor');

    $routeProvider.when('/', {
      templateUrl : '/home.html',
      controller : function() { }
    });

    $routeProvider.when('/repos', {
      templateUrl : '/repos.html',
      controller : 'ReposCtrl as repos',
      resolve : {
        repos : function(ghUserRepos) {
          return ghUserRepos();
        }
      }
    });
  })

  .factory('ghAccessToken', function($window) {
    var match = $window.location.search.match(/access_token=(.+?)$/);
    return match && match[1];
  })

  .factory('authenticationInterceptor', function($q, $window) {
    return {
      responseError : function(rejection) {
        if(rejection.config.url.match(/api.github.com/)) {
          switch(rejection.status) {
            case 401:
              $window.location = '/api/login';
              return;
            break;
          }
        }
        return $q.reject(rejection);
      }
    }
  })

  .controller("ReposCtrl", function($scope, repos) {
    this.entries = repos.data;
  })
