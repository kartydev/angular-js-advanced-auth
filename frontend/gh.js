angular.module('gh', [])

  .constant('GH_API', 'https://api.github.com')

  .value('ghAccessToken', null)

  .factory('ghRequest', function($http, GH_API, ghAccessToken) {
    return function(path) {
      return $http.get(GH_API + path + '?access_token=' + ghAccessToken);
    }
  })

  .factory('ghUserRepos', function(ghRequest) {
    return function() {
      return ghRequest('/user/repos');
    }
  });
