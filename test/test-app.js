'use strict';
/* global describe, before, it */

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('dash-docset:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .withPrompt({
        githubUser: 'giladgray',
        apiName: 'Testacular Docset',
        website: 'http://testacular.com'
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      '.editorconfig',
      '.gitignore',
      'CONTRIB.md',
      'LICENSE',
      'README.md',
      'dash.sh',
      'docset.coffee',
      'docset.json',
      'package.json',
      'html/',
      'testacular-docset.docset/'
    ]);
  });
});
