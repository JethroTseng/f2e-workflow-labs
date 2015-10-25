/* global __dirname */
/* global path */
var gulp = require('gulp');
var del = require('del');
var config = require('../config');

var $ = require('gulp-load-plugins')();

// var concat = require('gulp-concat');
// var uglify = require('gulp-uglify');
// var rename = require('gulp-rename');
// var minifyHTML = require('gulp-minify-html');
// var minifyCSS = require('gulp-minify-css');
// var less = require('gulp-less');
// var path = require('path');
// var sourcemaps = require('gulp-sourcemaps');


gulp.task('watch_app', function(){
	
	gulp
		.watch(['app/**/*.js', 'gulp/**/*.js'], ['app']);
	
});

gulp.task('app', function(){
	
	/* make sourcemaps */
	gulp
		.src([
			'app/**/*.module.js',
			'app/**/*.js'
		])
		.pipe(gulp.dest(config.assetDir + 'src/'))
		.pipe($.sourcemaps.init())
			.pipe($.concat('app.js'))
			.pipe(gulp.dest(config.assetDir))
			.pipe($.uglify(config.uglifyOptions))
			.pipe($.rename({
				extname: '.min.js'
			}))
		.pipe($.sourcemaps.write('./'))
		.pipe(gulp.dest(config.assetDir))
		
	var opts = {
		conditionals: true,
		spare:true
	};
	gulp
		.src('index.html')
		.pipe($.minifyHtml(opts))
		.pipe($.rename({
			extname: '.min.html'
		}))
		.pipe(gulp.dest('dist'))
		.pipe(gulp.dest('./'));
		
	gulp
		.src([config.assetDir + 'styles.css'])
		.pipe($.minifyCss(config.assetDir))
		.pipe($.rename({
			extname: '.min.css'
		}))
		.pipe(gulp.dest(config.assetDir + ''));
	
	/*less to css*/	
	gulp
		.src([config.assetDir + 'styles.less'])
		.pipe($.less({
      		// paths: [ path.join(__dirname, 'less', 'includes') ]
    	}))
		.pipe(gulp.dest('less_to_css/'))
		.pipe($.minifyCss(config.assetDir))
		.pipe($.rename({
			extname: '.less.css'
		}))
		.pipe(gulp.dest(config.assetDir));
	
	
});


