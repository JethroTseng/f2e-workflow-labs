var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyHTML = require('gulp-minify-html');
var minifyCSS = require('gulp-minify-css');
var less = require('gulp-less');
var path = require('path');

gulp.task('default', ['mytask1', 'mytask2'], function() {
	console.log('Hello Gulp');
});

gulp.task('mytask1', function(cb) {
	console.log('my task1');
	// cb();
});

gulp.task('mytask2', function(cb) {
	console.log('my task2');
	cb();
});

gulp.task('output1', function(){
	
	gulp
		.src('assets/vendor/bootstrap/**/*.js')
		.pipe(gulp.dest('output1'));
	
});


gulp.task('output2', ['clean2'], function(){
	
	gulp
		.src('assets/vendor/bootstrap/**/*.js', 
		{
			base: 'assets/vendor/'
		})
		.pipe(gulp.dest('output2'));
	
});


gulp.task('output3', ['clean3'],  function(){
	
	gulp
		.src([
			'assets/vendor/**/*.js',
			'assets/vendor/**/*.css'
			],
			{
				base: 'assets/vendor'
			}
			)
		.pipe(gulp.dest('output3'));
	
});

gulp.task('output4', ['clean4'], function(){
	
	gulp
		.src([
			'assets/**/*.js',
			'assets/**/*.css'
			],
			{
				base: 'assets'
			}
			)
		.pipe(gulp.dest('output4'));
	
});

gulp.task('output5', ['clean5'], function(){
	
	gulp
		.src([
			'assets/**/*.js',
			'assets/**/*.css'
			],
			{
				base: 'assets'
			}
			)
		.pipe(gulp.dest('output5'));
	
});

gulp.task('clean2', function(cb){	
	del(['output2/bootstrap/**', '!output2/bootstrap']).then(function (paths){
		console.log('Deleted files/folders:\n', paths.join('\n'));
		cb();	
	});
});


gulp.task('clean4', function(){	
	del(['output4/**', '!output4']).then(function (paths){
		console.log('Deleted files/folders:\n', paths.join('\n'));
		// cb();	
	});
});

gulp.task('clean5', function(cb){	
	del(['output5/**', '!output5']).then(function (paths){
		console.log('Deleted files/folders:\n', paths.join('\n'));
		cb();	
	});
});


gulp.task('output-app', ['clean-app'], function(){
	gulp
		.src('app/**/*.js')
		.pipe(gulp.dest('output-app'));
});

gulp.task('clean-app', function(cb){
	del(['output-app/**', '!output-app']).then(function (paths){
		console.log('Deleted files/folders:\n', paths.join('\n'));
		cb();	
	});
});

gulp.task('watch_app', function(){
	
	gulp
		.watch('app/**/*.js', ['app']);
	
});


gulp.task('app_origin', function(){
	
	gulp.src([
		'app/**/*.module.js',
		'app/**/*.js'
	])
	.pipe(concat('app.js'))
	.pipe(gulp.dest('assets'));
	
});

gulp.task('app', function(){
	
	gulp
		.src([
			'app/**/*.module.js',
			'app/**/*.js'
		])
		.pipe(gulp.dest('assets'))
		.pipe(concat('app.js'))
		.pipe(gulp.dest('assets'))
		.pipe(uglify({
			mangle: false
		}))
		.pipe(rename({
			extname: '.min.js'
		}))
		.pipe(gulp.dest('assets'));
		
	var opts = {
		conditionals: true,
		spare:true
	};
	gulp
		.src('index.html')
		.pipe(minifyHTML(opts))
		.pipe(rename({
			extname: '.min.html'
		}))
		.pipe(gulp.dest('dist'))
		.pipe(gulp.dest('./'));
		
	gulp
		.src(['assets/styles.css'])
		.pipe(minifyCSS({compatibility: 'ie8'}))
		.pipe(rename({
			extname: '.min.css'
		}))
		.pipe(gulp.dest('assets/'));
	
	/*less to css*/	
	gulp
		.src(['assets/styles.less'])
		.pipe(less({
      		paths: [ path.join(__dirname, 'less', 'includes') ]
    	}))
		.pipe(gulp.dest('less_to_css/'))
		.pipe(minifyCSS({compatibility: 'ie8'}))
		.pipe(rename({
			extname: '.less.css'
		}))
		.pipe(gulp.dest('assets'));
	
});


