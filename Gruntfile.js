module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: 'assets/',
            src: ['**', '!styles/**'],
            dest: 'dist/'
          }
        ],
      },
      bower_components: {
        files: [
          {
            expand: true,
            cwd: 'bower_components/',
            src: ['**'],
            dest: 'dist/vendor/'
          }
        ],
      }
    },

    watch: {
      options: {
        livereload: 35730
      },
      html: {
        cwd: 'assets/',
        files: ['**'],
        tasks: ['copy:main']
      }
    },

    clean: {
      release: ["dist"]
    },

    connect: {
      server: {
        options: {
          port: 8001,
          base: 'dist',
          hostname: 'localhost',
          livereload: true
        }
      }
    },

    buildcontrol: {
      options: {
        dir: 'dist',
        commit: true,
        push: true,
        message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
      },
      pages: {
        options: {
          remote: 'git@github.com:is-hosted-by/ip-ranges.git',
          branch: 'gh-pages'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-build-control');

  grunt.registerTask('default', ['copy']);
  grunt.registerTask('run', ['clean', 'default', 'connect', 'watch']);
  grunt.registerTask('deploy', ['clean', 'default', 'buildcontrol']);
};
