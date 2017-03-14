const gulp = require('gulp')	//gulp插件
						minify = require('gulp-minify-css')	//CSS压缩
						sprite = require('gulp.spritesmith')	//雪碧图生成
						uglify = require('gulp-uglify')	//JS压缩
						base64 = require('gulp-base64')	//图片转Base64
						concat = require('gulp-concat')	//多个JS、CSS合并为一
						rename = require('gulp-rename')	//文件重命名
						less = require('gulp-less')	//LESS转CSS
						sass = require('gulp-ruby-sass');	//SASS转CSS

gulp.task('css', function(){
	return gulp.src('css/*.css')	//输入路径
	.pipe(minify())
	.pipe(gulp.dest('dist'));	//输出路径
});

gulp.task('xb', function(){
	return gulp.src('xb/*.png')	//输入路径
	.pipe(sprite({
		imgName: 'sprite.png',
		cssName: 'sprite.css',
		padding: 10,
		algorithm: 'binary-tree',
	}))
	.pipe(gulp.dest('dist'));	//输出路径
});

gulp.task('js', function(){
	return gulp.src('js/*.js')	//输入路径
	.pipe(uglify())
	.pipe(gulp.dest('dist'));	//输出路径
});

gulp.task('b64', function () {
    return gulp.src('css/*.css')	//输入路径
        .pipe(base64({
            baseDir: 'public',
            extensions: ['png'],
            exclude:    [/\.server\.(com|net)\/dynamic\//, '--live.jpg'],
            maxImageSize: 8*1024, // bytes
            debug: true
        }))
        .pipe(gulp.dest('dist'));	//输出路径
});

 gulp.task('base64', ['b64'], function(){
 	return gulp.src('dist/*.css')	//输入路径
 	.pipe(minify())
 	.pipe(gulp.dest('dist'));	//输出路径
 });

gulp.task('hb', function(){
	return gulp.src('hb/*.css')	//输入路径
	.pipe(concat('all.css'))
	.pipe(gulp.dest('dist'))	//输出路径
	.pipe(minify())
	.pipe(rename('bundle.css'))
	.pipe(gulp.dest('dist'));	//输出路径
});

gulp.task('less', function () {
    gulp.src('less/*.less')
        .pipe(less())
        .pipe(gulp.dest('dist'))
});

gulp.task('sass', function() {
    return sass('sass/')
    .on('error', function (err) {
      console.error('Error!', err.message);
   })
    .pipe(gulp.dest('dist'))
});
