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


	/**
	 * Project configuration
	 */
	grunt.initConfig({

		config: {
			pkg: grunt.file.readJSON('package.json'),
			dir: {
				src: 'src',
				dist: 'dist',
				bower: 'bower_components'	
			},
			banner: '/*! <%= config.pkg.title || config.pkg.name %> ' +
				'<%= grunt.template.today("dddd, mmmm dS, yyyy, h:MM:ss TT") %>' +
				'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= config.pkg.author.name %>; */\n\n',
		},

		watch: {
			assemble: {
				files: ['<%= config.dir.src %>/{content,data,templates}/{,*/}*.{md,hbs,yml}'],
				tasks: ['assemble']
			},
			sass: {
				files: [
					'<%= config.dir.src %>/stylesheets/**/*.scss',
				],
				tasks: ['sass', 'autoprefixer']
			},
			js: {
				files: [
					'<%= config.dir.src %>/scripts/**/*.js',
				],
				tasks: ['concat']
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
			dist: ['<%= config.dir.dist %>/**/*']
		},


		sass: {
			static: {
				options: {
					style: 'expanded'
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
//			reveal_scss: {
//				files: [
//					{
//						expand: true,
//						flatten: false,
//						cwd: '<%= config.dir.bower %>/reveal.js/css/theme/',
//						src: [
//							'**/*.scss',
//						],
//						dest: '<%= config.dir.src %>/stylesheets/vendor/revealjs/'
//					}
//				]
//			},
			reveal_deps: {
				files: [
					{
						expand: true,
						flatten: false,
						cwd: '<%= config.dir.bower %>/reveal.js/',
						src: [
							'lib/**/*',
							'plugin/**/*',
							'css/**/*',
						],
						dest: '<%= config.dir.dist %>/'
					}
				]
			},
			images: {
				files: [
					{
						expand: true,
						flatten: true,
						src: '<%= config.dir.src %>/images/*.{jpg,png,webp,gif}',
						dest: '<%= config.dir.dist %>/assets/images/'
					}
				]
			},
			fonts: {
				files: [
					{
						expand: true,
						flatten: true,
						src: '<%= config.dir.src %>/fonts/*.{eot,svg,ttf,woff}',
						dest: '<%= config.dir.dist %>/assets/fonts/'
					}
				]
			}
		},


		concat: {
			options: {
				banner: '<%= config.banner %>',
				separator: ';\n'
			},
			libs: {
				src: [
					'<%= config.dir.bower %>/jquery/dist/jquery.min.js',
					'<%= config.dir.bower %>/headjs/dist/1.0.0/head.min.js',
					'<%= config.dir.bower %>/reveal.js/js/reveal.min.js',
				],
				dest: '<%= config.dir.dist %>/assets/js/SP.libs.js',
			},
			main: {
				src: [
					'<%= config.dir.src %>/scripts/SP.slides.js',
				],
				dest: '<%= config.dir.dist %>/assets/js/SP.main.js',
			}
		},


		'gh-pages': {
			options: {
				base: 'dist',
				repo: 'https://github.com/elisechant/things-ive-learned-from-sass-plugins.git',
				message: 'Auto-generated commit',
			},
			src: ['**']
		}

	});


	/**
	 * Tasks
	 */

	grunt.registerTask('flush', ['clean']);

	grunt.registerTask('build', [
		'flush',
		'assemble',
		'copy',
		'sass',
		'autoprefixer',
		'concat',
	]);

	grunt.registerTask('server', [
		'build',
		'connect:livereload',
		'watch'
	]);

	grunt.registerTask('deploy', [
		'gh-pages',
	]);


	// default
	grunt.registerTask('default', [
		'build'
	]);

};
