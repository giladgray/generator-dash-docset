'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the perfect' + chalk.red('DashDocset') + ' generator!'
    ));

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

      done();
    }.bind(this));
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
  }
});
