/**
 * Borrowed from yeoman/generator-generator.
 * @see https://github.com/yeoman/generator-generator/blob/master/app/index.js
 *
 * Functions to operate on GitHub API.
 */

'use strict';
/*jshint camelcase:false */
var url = require('url');
var GitHubApi = require('github');

var proxy = process.env.http_proxy || process.env.HTTP_PROXY ||
  process.env.https_proxy || process.env.HTTPS_PROXY || null;
var githubOptions = {
  version: '3.0.0'
};

if (proxy) {
  var proxyUrl = url.parse(proxy);
  githubOptions.proxy = {
    host: proxyUrl.hostname,
    port: proxyUrl.port
  };
}

var github = new GitHubApi(githubOptions);

if (process.env.GITHUB_TOKEN) {
  github.authenticate({
    type: 'oauth',
    token: process.env.GITHUB_TOKEN
  });
}

var emptyGithubRes = {
  name: '',
  email: '',
  html_url: ''
};

module.exports = {
  // Return the user info for the given username: {name, email, html_url}.
  getUserInfo: function (name, cb, log) {
    github.user.getFrom({
      user: name
    }, function (err, res) {
      if (err) {
        log.error('Cannot fetch your github profile. Make sure you\'ve typed it correctly.');
        res = emptyGithubRes;
      }
      cb(JSON.parse(JSON.stringify(res)));
    });
  }
};
