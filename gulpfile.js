var gulp = require('gulp')
	minify = require('gulp-minify-css')
	sprite = require('gulp.spritesmith')
	uglify = require('gulp-uglify')
	base64 = require('gulp-base64')
	imageisux = require('gulp-imageisux')
	concat = require('gulp-concat')
	rename = require('gulp-rename')
	less = require('gulp-less')
	sass = require('gulp-ruby-sass');

gulp.task('css', function(){
	return gulp.src('css/*.css')
	.pipe(minify())
	.pipe(gulp.dest('dist'));
});

gulp.task('xb', function(){
	return gulp.src('xb/*.png')
	.pipe(sprite({
		imgName: 'sprite.png',
		cssName: 'sprite.css',
		padding: 10,
		algorithm: 'binary-tree',
	}))
	.pipe(gulp.dest('dist'));
});

gulp.task('js', function(){
	return gulp.src('js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('dist'));
});

gulp.task('b64', function () {
    return gulp.src('public/css/*.css')
        .pipe(base64({
            baseDir: 'public',
            extensions: ['png'],
            exclude:    [/\.server\.(com|net)\/dynamic\//, '--live.jpg'],
            maxImageSize: 8*1024, // bytes 
            debug: true
        }))
        .pipe(gulp.dest('dist'));
});
 
 gulp.task('base64', ['b64'], function(){
 	return gulp.src('dist/*.css')
 	.pipe(minify())
 	.pipe(gulp.dest('dist/mini'));
 });

gulp.task('imgmi', function(){
	return gulp.src(['img/*'])
	.pipe(imageisux('dest',true));
});

gulp.task('hb', function(){
	return gulp.src('hb/*.css')
	.pipe(concat('all.css'))
	.pipe(gulp.dest('dist'))
	.pipe(minify())
	.pipe(rename('bundle.css'))
	.pipe(gulp.dest('dist'))
});