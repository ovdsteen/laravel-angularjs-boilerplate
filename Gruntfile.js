'use strict';

var fs = require('fs');

module.exports = function(grunt){
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	var config = {

		mkdir: {
			all: {
				options: {
					create: ['public/css', 'public/js']
				}
			}
		},

		concurrent: {
			install: {
				tasks: ['mkdir', 'sass', 'browserify', 'bower_concat', 'uglify' ],
				options:{
					limit: 5
				}
			},
			dev: {
				tasks: ['watch'],
				options: {
					logConcurrentOutput: true
				}
			}
		},

		sass: {
			options: {
				compress: true
			}
		},

		browserify: {
			dist: {
				files: {
					'public/js/base.js': ['src/js/base.js']
				}
			}
		},

		uglify: {
			targets: {
				files: {
					'public/js/base.min.js': ['public/js/base.js'],
					'public/js/lib.min.js': ['public/js/lib.js']
				}
			}
		},

		bower_concat: {
			all: {
				dest: './public/js/lib.js'
			},
		},

		nodemon: {
			dev: {}
		},

		watch: {
			options: {
				nospawn: true,
				livereload: true
			},
			js: {
				files: ['src/js/*.js', 'src/js/**/*.js'],
				tasks: ['browserify']
			},
			css: {
				files: ['src/css/*.scss', 'src/css/**/*.scss'],
				tasks: ['sass']
			},
			views: {
				files: ['app/views/**/*.php']
			}
		}
	};

	var readCssDir = function(dir, target){
		if (!fs.existsSync(dir)) return;

		var count = 0, hasSubdirs, filePath,
			match, name, input, output, globs;

		fs.readdirSync(dir)
		.forEach(function(fileName){
			if (/^_/.test(fileName)) return;

			if (!config.sass[target]){
				config.sass[target] = {files: {}};
			}

			filePath = dir + '/' + fileName;
			if (fs.statSync(filePath).isDirectory()){
				hasSubdirs = true;
				return;
			}

			match = fileName.match(/(.*)\.scss/);
			if (!match) return;

			name = fileName.match(/(.*)\.scss/)[1];
			input = dir + '/' + name + '.scss';
			output = 'public/css/' + name + '.css';
			config.sass[target].files[output] = input;
			count ++;
		});

		if (count > 0){
			globs = [dir + '/*.scss'];
			if (hasSubdirs){
				globs.push(dir + '/**/*.scss');
			}
			config.watch[target] = {
				files: globs,
				tasks: ['sass:' + target]
			};
		}
	};

	readCssDir(__dirname + '/src/css', 'base');

	grunt.initConfig(config);

	grunt.registerTask('default', [
		'concurrent:dev'
	]);
	grunt.registerTask('install', [
		'concurrent:install'
	]);

};
