var _  = require('underscore');
var OAuth2 = require('oauth').OAuth2;

var ghClientID = 'ff3b419eaba1a6ea958b';
var ghClientSecret = '94f4a4bfc7e5c4b51cab68dcbeb3143e92de921e';
var GhOAuth = new OAuth2(
  ghClientID,
  ghClientSecret,
  'https://github.com/', 
  'login/oauth/authorize', 
  'login/oauth/access_token'
);

var self;
module.exports = self = {
  login : function(req, res) {
     var authURL = GhOAuth.getAuthorizeUrl({
       redirect_uri: 'http://localhost:8888/api/oauth',
       scope: ['repo', 'user'],
       state: '12345'
     });
     res.redirect(authURL);
  },

  oauth : function(req, res) {
    var code = req.query.code;
    GhOAuth.getOAuthAccessToken(code, {'grant_type':'client_credentials'},
      function (e, access_token, refresh_token, results){
        self._tokens(req, res, access_token); 
     });
  },

  _tokens : function(req, res, token) {
    res.redirect('/?access_token=' + token + '#/repos');
  }
};
