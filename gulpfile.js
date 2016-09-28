var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var shell = require('gulp-shell');

gulp.task('webpack', shell.task([
  'webpack --watch --progress --colors'
]));

gulp.task('server', function (done) {
  nodemon({ script: 'server/app.js', ext: 'js html'})
    .on('restart', function () {
      console.log('server restarted');
    });
  done();
});

gulp.task('default', gulp.series(/*'webpack', */'server', function(done) {
  done();
}));
