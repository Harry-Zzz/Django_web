var gulp = require("gulp");
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var bs = require("browser-sync").create();
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');



var path = {
    'html':'./templates/**/',
    'css':'./src/css/',
    'js':'./src/js',
    'images':'./src/images',
    'css_dist':'./dist/css',
    'js_dist':'./dist/js',
    'images_dist':'./dist/images'
};

//html文件
gulp.task('html',function () {
    gulp.src(path.html + '*.html')
        .pipe(bs.stream())
});


//css任务
gulp.task('css',function() {
    gulp.src(path.css + '*.scss')
        .pipe(sass().on('error',sass.logError))
        .pipe(cssnano())
        .pipe(rename({'suffix':'.min'}))
        .pipe(gulp.dest(path.css_dist))
        .pipe(bs.stream())
});

//js任务
gulp.task('js',function() {
    gulp.src(path.js + '*.js')
        .pipe(uglify())
        .pipe(gulp.dest(path.js_dist))
        .pipe(bs.stream())
});

//image任务
gulp.task('images',function() {
    gulp.src(path.images + '*.*')
        .pipe(cache(imagemin()))
        .pipe(gulp.dest(path.images_dist))
        .pipe(bs.stream())
});

//定义监听
gulp.task('auto',function(){
    gulp.watch(path.css + '*.scss',['css']);
    gulp.watch(path.js + '*.js',['js']);
    gulp.watch(path.images + '*.*',['images']);
    gulp.watch(path.html + '*.html',['html'])
});

//初始化任务
gulp.task('bs',function () {
    bs.init({
      'server':{
          'basedir':'./'
      }
    })
});

gulp.task('default',['bs','auto']);