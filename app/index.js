'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var github = require ('./github');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: {
    github: function () {
      var done = this.async();

      this.log(yosay('Create your own ' + chalk.magenta('Dash') + ' docset with superpowers!'));

      var prompts = [{
        name: 'githubUser',
        message: 'Would you mind telling me your username on GitHub?',
        default: 'someuser'
      }];

      this.prompt(prompts, function (props) {
        this.githubUser = props.githubUser;

        done();
      }.bind(this));
    },

    docset: function () {
      var done = this.async();

      var prompts = [{
        type: 'prompt',
        name: 'apiName',
        message: 'What is the official API name of the library?',
      }, {
        type: 'prompt',
        name: 'website',
        message: 'Where is the documentation hosted?'
      }];

      this.prompt(prompts, function (props) {
        this.apiName = props.apiName;
        this.website = props.website;
        this.name = this._.slugify(props.apiName);
        this.repoName = 'dash-' + this.name + '-docset';

        done();
      }.bind(this));
    }
  },

  configuring: {
    userInfo: function () {
      var done = this.async();

      github.getUserInfo(this.githubUser, function (res) {
        /*jshint camelcase:false */
        this.realName = res.name;
        this.email = res.email;
        this.githubUrl = res.html_url;
        done();
      }.bind(this), this.log);
    }
  },

  writing: {
    app: function () {
      this.template('package.json');
      this.template('README.md');
      this.template('docset.coffee');

      this.mkdir('html');
    },

    projectfiles: function () {
      this.copy('editorconfig', '.editorconfig');
      this.copy('gitignore', '.gitignore');
      this.template('LICENSE');
    },

    docsetfiles: function () {
      this.template('docset.json');
      this.template('CONTRIB.md');
      this.template('dash.sh');
    },

    docsetfolder: function() {
      var docsetDir = this.name + '.docset';
      this.copy('Info.plist', docsetDir + '/Contents/Info.plist');
      this.mkdir(docsetDir + '/Contents/Resources/Documents');
    }
  },

  install: function () {
    // this.installDependencies({
    //   skipInstall: this.options['skip-install']
    // });
  },

  finish: function() {

  }
});
