var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var config = require('../config');


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
		.src(config.assetDir + 'vendor/bootstrap/**/*.js')
		.pipe(gulp.dest('output1'));
	
});


gulp.task('output2', ['clean2'], function(){
	
	gulp
		.src(config.assetDir + 'vendor/bootstrap/**/*.js', 
		{
			base: config.assetDir + 'vendor/'
		})
		.pipe(gulp.dest('output2'));
	
});


gulp.task('output3', ['clean3'],  function(){
	
	gulp
		.src([
			config.assetDir + 'vendor/**/*.js',
			config.assetDir + 'vendor/**/*.css'
			],
			{
				base: config.assetDir + 'vendor'
			}
			)
		.pipe(gulp.dest('output3'));
	
});

gulp.task('output4', ['clean4'], function(){
	
	gulp
		.src([
			config.assetDir + '**/*.js',
			config.assetDir + '**/*.css'
			],
			{
				base: config.assetDir
			}
			)
		.pipe(gulp.dest('output4'));
	
});

gulp.task('output5', ['clean5'], function(){
	
	gulp
		.src([
			config.assetDir + '**/*.js',
			config.assetDir + '**/*.css'
			],
			{
				base: config.assetDir
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

gulp.task('app_origin', function(){
	
	gulp.src([
		'app/**/*.module.js',
		'app/**/*.js'
	])
	.pipe(concat('app.js'))
	.pipe(gulp.dest(config.assetDir));
	
});