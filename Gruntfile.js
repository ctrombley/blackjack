module.exports = function(grunt) {

  grunt.initConfig({
    mochaTest: {
      all: {
        src: ['test/**/*.js']
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'server.js', 'app.js', 'app/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'mochaTest']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');
};
