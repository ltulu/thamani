module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-svgmin');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //Lancer la commande "grunt watch" pour surveiller/compiler/minifier chaque fichier sass/js du répertoire /assets

    watch:{
        CssFrontend: {
          files: 'assets/sass/*.scss',
          tasks: [ 'sass'],
        },
        JsFrontend: {
          files: [ 'assets/js/*.js', '!assets/js/*.min.js' ],
        },
        html: {
          files: ['apps/**/*.php'],
        }
    },
   // Lancer la commande "grunt clean" pour effacer tous les fichiers minifiés css/js des répertoires /assets et /lib
    clean :{
      JsFrontend: ["assets/js/*.min.js"],
      JsLib:{
        files: [{
          expand: true,
          cwd: 'lib/',
          src: [
            '**/*.min.js',
            ],
          dest: 'lib/'
        }]
      },
      CssFrontend: ["assets/css/*.min.css"],

      CssLib:{
        files: [{
          expand: true,
          cwd: 'lib/',
          src: [
            '**/*.min.css',
          ],
          dest: 'lib/'
        }]
      }
    },
    // Lancer la commande "grunt sass" pour compiler les fichiers sass du répertoire /assets en fichier css

    sass:{
     options: {
        style: 'expanded',
        noCache: true,
        sourcemap: 'inline'
      },
      frontend: {
        files: [{
          expand: true,
          cwd: 'assets/sass/',
          src: [ '*.scss' ],
          dest: 'assets/css/',
          ext: '.css'

        }]
      },
	  lib: {
        files: [{
          expand: true,
          cwd: 'lib/',
          src: [
            'lib/*.scss',
          ],
          dest: 'lib/',
          ext: '.css',
          extDot: 'last'
        }]
      }
    },

    //Lancer la commande "grunt cssmin" pour minifier les fichiers css des répertoires /assets et /lib
    cssmin:{
      options: {
        keepSpecialComments:0
      },
      frontend: {
        files: [{
          expand: true,
          cwd: 'assets/css/',
          src: [ '*.css', '!*.min.css' ],
          dest: 'assets/css/',
          ext: '.min.css'
        }]

      },
      lib: {
        files: [{
          expand: true,
          cwd: 'lib/',
          src: [
            '**/*.css',
            '!**/*.min.css',
          ],
          dest: 'lib/',
          ext: '.min.css',
          extDot: 'last'
        }]
      }
    },

    //Lancer la commande "grunt uglify" pour minifier les fichiers js des répertoires /assets et /lib

    uglify:{
      options: {
        preserveComments: false

      },
      frontend: {
        files: [{
          expand: true,
          cwd: 'assets/js/',
          src: [ '*.js' ],
          dest: 'assets/js/',
          ext: '.min.js'
        }]

      },
      lib: {
        files: [{
          expand: true,
          cwd: 'lib/',
          src: [
            '**/*.js',
            '!**/*.min.js',
          ],
          dest: 'lib/',
          ext: '.min.js'
        }]
      }
    },
    //Lancer la commande "grunt svgmin" pour minifier les svg du répertoire /assets
    svgmin: {
      options: {
        plugins: [
          {
            removeViewBox: false
          }, {
            removeUselessStrokeAndFill: false
          }
        ]
      },
      multiple: {
        files: [{
          expand: true,
          cwd: 'assets/images/',
          src: [
            '**/*.svg',
            '!**/*anim.svg'
          ],
          dest: 'assets/images/'
        }]
      }
    }
  });
  grunt.registerTask('default', ['sass', 'clean', 'cssmin', 'uglify', 'svgmin']);
};