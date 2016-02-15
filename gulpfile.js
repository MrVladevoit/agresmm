"use strict";
var gulp = require('gulp'),
	changed = require('gulp-changed'),
	fileinclude = require('gulp-file-include'),
	htmlmin = require('gulp-htmlmin'),
	htmlhint = require("gulp-htmlhint"),
	lessImport = require('gulp-less-import'),
	less = require('gulp-less'),
	LessPluginAutoPrefix = require('less-plugin-autoprefix'),
	autoprefix= new LessPluginAutoPrefix({ browsers: ["last 15 versions"] }),
	shorthand = require('gulp-shorthand'),
	uncss = require('gulp-uncss'),
	rename = require('gulp-rename'),
	spritesmith = require('gulp.spritesmith'),

	// svg
	svgstore = require('gulp-svgstore'),
	svgmin = require('gulp-svgmin'),
	svgcss = require('gulp-svg-css'),
	svgToCss = require('gulp-svg-to-css'),

	gulpif = require("gulp-if"),
	livereload = require('gulp-livereload'),
	connect = require('gulp-connect'),
	minifyCss = require('gulp-minify-css'),
	jshint = require('gulp-jshint'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	gulpCopy = require('gulp-copy'),
	open = require('gulp-open'),
	size = require('gulp-size'),
	plumber = require('gulp-plumber'),
	notify = require('gulp-notify'),
	gutil = require('gulp-util'),
	ftp = require('gulp-ftp'),
	clean = require('gulp-clean');


// server connect
gulp.task('connect', function() {
	connect.server({
		root: 'dest',
		port: 9001,
		livereload: true
	})
});

//html
gulp.task('html',function(){
  gulp.src(['src/*.html'])
	.pipe(fileinclude({
	  prefix: '@@',
	  basepath: '@file'
	}))
	.pipe(gulp.dest('dest/'))

	// html.min
	// .pipe(htmlmin({collapseWhitespace: true}))
	// .pipe(rename('index.min.html'))
	// .pipe(gulp.dest('dest/'))

	.pipe(connect.reload());
});

//less
gulp.task('less', function(done) {
	gulp.src('src/less/*.less')
	.pipe(lessImport('main.less'))
	.pipe(gulp.dest('src/less/'))
	.pipe(notify("LESS IMPORT!"))

	gulp.src('src/less/*.less')
	.pipe(lessImport('main.less'))
	.pipe(less())
	.pipe(rename('style.less'))
	.pipe(gulp.dest('dest/css'))

	gulp.src('src/less/*.less')
	.pipe(lessImport('main.less'))
	.pipe(less({
		plugins: [autoprefix]
		}).on('error', function(error) {
		// у нас ошибка
		done(error);
	}))
	.pipe(shorthand())
	.pipe(rename('style.css'))
	.pipe(gulp.dest('dest/css/'))
		.on('end', function() {
		// у нас все закончилось успешно
		done();
		})

	.pipe(minifyCss('dest/css/style.css'))
	.pipe(rename('style.min.css'))
	.pipe(gulp.dest('dest/css'))

	.pipe(notify("LESS DONE!"))
	.pipe(connect.reload());
});


//sprites
gulp.task('sprite', function () {
	var spriteData = gulp.src('src/images/sprite/*.png').pipe(spritesmith({
	imgName: 'sprite.png',
	cssName: 'sprite.css',
	imgPath:'../images/sprite/sprite.png'
}));

var imgStream = spriteData.img
	.pipe(gulp.dest('dest/images/sprite/'));

var cssStream = spriteData.css
	.pipe(shorthand())
	.pipe(gulp.dest('dest/css/'))

	.pipe(notify("SPRITES DONE!"))
	.pipe(connect.reload());

});

// svg sprite


gulp.task('svgSprite', function () {
	gulp.src('src/images/sprite/svg/*.svg')
	.pipe(svgmin())
	.pipe(svgstore())
	.pipe(rename({basename: 'sprite'}))
	.pipe(gulp.dest('dest/images/icons/'))

	gulp.src('src/images/sprite/svg/*.svg')
	.pipe(svgToCss('svgSprite.css'))
	.pipe(rename('svgSprite.less'))
	.pipe(gulp.dest('src/less/'))

	.pipe(notify("SPRITES SVG DONE!"))
	.pipe(connect.reload());
});


// JS
gulp.task('js', function(){
	gulp.src('src/js/*.js')
	.pipe(changed('dest/js/'))
		.pipe(uglify())
		.pipe(rename({
		extname: '.min.js'
		}))
		.pipe(size())
		.pipe(gulp.dest('dest/js/'))

	gulp.src('src/js/*.js')
		.pipe(concat('main.js'))
		.pipe(gulp.dest('dest/js/'))
		.pipe(rename('main.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dest/js/'))

		.pipe(notify("JS DONE!"))
		.pipe(connect.reload());
});

//uncss
gulp.task('uncss', function() {
	 gulp.src('dest/css/style.css')
	.pipe(uncss({
		html: ['dest/index.html']
	}))
	.pipe(size())
	.pipe(gulp.dest('dest/css/uncss'))
	.pipe(cssmin())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('dest/css/uncss'))

	.pipe(notify("UNCSS DONE!"))
	.pipe(connect.reload());
});


//default
gulp.task('default',['connect','html','less','js','open','watch']);

//work
gulp.task('work',['connect','html','less','js','open','watch']);


//watch
gulp.task('watch', function(){
	gulp.watch('src/less/*.less',['less']);
	gulp.watch('src/*.html',['html']);
	gulp.watch('src/include/*.html',['html']);
	// gulp.watch('src/images/*',['images']);
	gulp.watch('src/images/sprite/svg/*.svg',['svgSprite']);
	gulp.watch('src/js/*.js',['js']);
});

//open
gulp.task('open', function(){
gulp.src('')
.pipe(open({app: 'chrome', uri: 'http://localhost:9001'}));
});


//clean
gulp.task('clean', function () {
	return gulp.src('node_modules/', {read: false})
		.pipe(clean())
});

//clean
gulp.task('clean-dest', function () {
	return gulp.src(['dest/'], {read: false})
		.pipe(clean())
});


// ftp
gulp.task('ftp', function () {
	gulp.src('dest/')
	.pipe(ftp({
		host: 'agresmm.gp-studio.ru',
		user: 'user53094_dev',
		pass: 'DnDev'
	}))
});

//copy
gulp.task('copy', function(){

	// COPY HTML
	gulp.src('dest/*.html')
	.pipe(gulp.dest('../copy agresmm /dest/'))


	gulp.src('src/*.html')
	.pipe(gulp.dest('../copy agresmm /src/'))

	gulp.src('src/include/*.html')
	.pipe(gulp.dest('../copy agresmm /src/include/'))


	// COPY LESS
	gulp.src('dest/css/*.css')
	.pipe(gulp.dest('../copy agresmm /dest/css/'))

	gulp.src('src/less/*.less')
	.pipe(gulp.dest('../copy agresmm /src/less/'))

	// COPY IMAGES
	gulp.src('dest/images/*')
	.pipe(gulp.dest('../copy agresmm /dest/images/'))

	gulp.src('src/images/*')
	.pipe(gulp.dest('../copy agresmm /src/images/'))


	// SPRITES
	gulp.src('dest/images/sprite/*')
	.pipe(gulp.dest('../copy agresmm /dest/images/sprite'))

	gulp.src('src/images/sprite/*')
	.pipe(gulp.dest('../copy agresmm /src/images/sprite'))


	// JS
	gulp.src('dest/js/*')
	.pipe(gulp.dest('../copy agresmm /dest/js/'))

	gulp.src('src/js/*')
	.pipe(gulp.dest('../copy agresmm /src/js/'))

	// UNCSS
	gulp.src('dest/css/uncss/*.css')
	.pipe(gulp.dest('../copy agresmm /dest/css/uncss/'))

	//PHP
	gulp.src('dest/*.php')
	.pipe(gulp.dest('../copy agresmm /dest/'))

	// FONT
	gulp.src('dest/fonts/*')
	.pipe(gulp.dest('../copy agresmm /dest/fonts'));

});