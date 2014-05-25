'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// '<%= config.dir.src %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= config.dir.src %>/templates/pages/**/*.hbs'

module.exports = function (grunt) {

	require('time-grunt')(grunt);
	require('load-grunt-tasks')(grunt);

	grunt.loadNpmTasks('assemble');

	// Project configuration.
	grunt.initConfig({

		config: {
			dir: {
				src: 'src',
				dist: 'dist',
				bower: 'bower_components'	
			}
		},

		watch: {
			assemble: {
				files: ['<%= config.dir.src %>/{content,data,templates}/{,*/}*.{md,hbs,yml}'],
				tasks: ['assemble']
			},
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
					'<%= config.dir.dist %>/{,*/}*.html',
					'<%= config.dir.dist %>/assets/{,*/}*.css',
					'<%= config.dir.dist %>/assets/{,*/}*.js',
					'<%= config.dir.dist %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
				]
			}
		},

		connect: {
			options: {
				port: 9000,
				livereload: 35729,
				// change this to '0.0.0.0' to access the server from outside
				hostname: 'localhost'
			},
			livereload: {
				options: {
					open: true,
					base: [
						'<%= config.dir.dist %>'
					]
				}
			}
		},

		assemble: {
			pages: {
				options: {
					flatten: true,
					assets: '<%= config.dir.dist %>/assets',
					layout: '<%= config.dir.src %>/templates/layouts/default.hbs',
					data: '<%= config.dir.src %>/data/*.{json,yml}',
					partials: '<%= config.dir.src %>/templates/partials/*.hbs',
					plugins: ['assemble-contrib-sitemap'],
				},
				files: {
					'<%= config.dir.dist %>/': ['<%= config.dir.src %>/templates/pages/*.hbs']
				}
			}
		},

		// Before generating any new files,
		// remove any previously-created files.
		clean: {
			dev: ['.sass-cache'],
			dist: ['<%= config.dir.dist %>/**/*.{html,xml}']
		},


		sass: {
			static: {
				options: {
					style: 'compact'
				},
				files: {
					'<%= config.dir.dist %>/assets/css/main.css': '<%= config.dir.src %>/stylesheets/styles.scss',
				}
			}
		},


		autoprefixer: {
			options: {
				browsers: ['last 1 version']
			},
			static: {
				src: '<%= config.dir.dist %>/assets/css/*.css'
			}
		},


		copy: {
			js: {
				files: [
					{
						expand: false,
						flatten: true,
						src: '<%= config.dir.bower %>/jquery/dist/jquery.js',
						dest: '<%= config.dir.dist %>/assets/js/libs/jquery.js'
					}
				]
			},
		},

	});


	/**
	 * Tasks
	 */

	grunt.registerTask('flush', ['clean']);

	grunt.registerTask('build', [
		'flush',
		'assemble',
		'autoprefixer',
		'sass',
		'copy',
	]);

	grunt.registerTask('server', [
		'build',
		'connect:livereload',
		'watch'
	]);


	// default
	grunt.registerTask('default', [
		'build'
	]);

};
