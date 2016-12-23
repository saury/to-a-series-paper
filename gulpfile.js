'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    autoprefixer = require('gulp-autoprefixer'),
    reload = browserSync.reload,
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer');


gulp.task('sass', function () {
    return gulp.src('./style/**/*.scss')
        .pipe(sass({sourcemap: true}).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./style/'))
        .pipe(reload({stream: true}));
});

gulp.task('browserify', ['browserify_aSeriesPaper']); 

gulp.task('browserify_aSeriesPaper', function() {  
  return browserify({
        entries: './src/aSeriesPaper.js',
        debug: true,
        standalone: 'ASeriesPaper'
    })
    .bundle()
    .pipe(source('aSeriesPaper.js')) // gives streaming vinyl file object
    .pipe(buffer()) // <----- convert from streaming to buffered vinyl file object
    .pipe(gulp.dest('./dist/'));
});

gulp.task('serve', ['sass','browserify'], function () {
    browserSync.init({
        server: {
            baseDir: ['./', './example']
        }
    });
    gulp.watch('./style/**/*.scss', ['sass']);
    gulp.watch('./style/*.scss', ['sass']);
    gulp.watch('./src/*.js', ['browserify']);

    gulp.watch('./example/*.html').on('change', reload);
    gulp.watch('./src/*.js').on('change', reload);
});
