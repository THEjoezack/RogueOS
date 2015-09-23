var config = {
  sassPath: './public/resources/sass',
  bowerDir: './bower_components',
  fileName: 'rogue-os.js'   
}

// Gulp Dependencies
var gulp = require('gulp');

// Build Dependencies
var bower = require('gulp-bower');

// Development Dependencies
var jshint = require('gulp-jshint');

// Test Dependencies
var mocha = require('gulp-mocha');
var util = require('gulp-util');

// Publish Dependencies
var clean = require('gulp-clean');

// Tasks
gulp.task('lint-client', function() {
  return gulp.src('./client/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('lint-test', function() {
  return gulp.src('./test/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest(config.bowerDir))
});

gulp.task('test', ['lint-client', 'lint-test'], function() {
  return gulp.src('./test/index.html')
    .pipe(mocha({ reporter: 'spec' }))
    .on('error', util.log);
});

gulp.task('watch', function () {
    gulp.watch(['client/**', 'test/**'], ['test']);
});

gulp.task('clean', function(){
  return gulp.src(['./public/*'], {read:false})
    .pipe(clean());
});

gulp.task('publish',['clean'], function(){
  gulp.src(['client/**/*', 'bower_components/**/*'])
    .pipe(gulp.dest('./public'));
});
