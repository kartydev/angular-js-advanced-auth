var gulp        = require('gulp'); 
var connect     = require('gulp-connect');
var uglify      = require('gulp-uglify');
var minifyHtml  = require('gulp-minify-html');
var minifyCss   = require('gulp-minify-css');
var usemin      = require('gulp-usemin');
var rev         = require('gulp-rev');
var clean       = require('gulp-clean');
var nodemon     = require('gulp-nodemon');
var taskListing = require('gulp-task-listing');
var karma       = require('gulp-karma');
var protractor  = require("gulp-protractor").protractor;
var webdriver   = require("gulp-protractor").webdriver_standalone;

gulp.task('build:copy', function() {
  gulp.src(['./frontend/**/*.html', '!./frontend/index.html'], {base: './frontend'})
  .pipe(gulp.dest('build/'));
});

gulp.task('build:usemin', function() {
  gulp.src('./frontend/index.html')
    .pipe(usemin({
      css: [minifyCss(), 'concat', rev()],
      js: [rev()]
    }))
    .pipe(gulp.dest('build/'));
});

function karmaTest(autotest) {
  gulp.src("./frontend/**/*Spec.js").pipe(karma({
    configFile: './karma-unit.conf.js',
    action: autotest ? 'watch' : 'run'
  }));
};

gulp.task('karma:test', function() {
  karmaTest();
});

gulp.task('karma:autotest', function() {
  karmaTest(true);
});

gulp.task('protractor:test', function() {
  gulp.src(["./e2e-tests/**/*Spec.js"])
    .pipe(protractor({
      configFile: "e2e-tests/protractor.conf.js",
      args: [
        '--baseUrl', 'http://127.0.0.1:7777'
      ]
    }));
});

gulp.task('protractor:webdriver', webdriver);

function expressServer(port) {
  nodemon({
    script: 'server.js',
    ext: 'js json',
    verbose : true,
    ignore: ['ignored.js', './node_modules', './frontend'],
    env: {
      'NODE_ENV': 'development',
      'PORT': port
    }, 
    nodeArgs: ['--debug=9999']
  });
};

gulp.task('serve:dev', function() {
  expressServer(8888);
});

gulp.task('serve:test', function() {
  expressServer(7777);
});

// Default Task
gulp.task('default', taskListing);
gulp.task('development', ['serve:dev']);
gulp.task('e2e', ['serve:test', 'protractor:webdriver', 'protractor:test']);
gulp.task('build', ['build:copy', 'build:usemin']);
