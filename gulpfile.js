var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');

gulp.task('default', function() {
  nodemon({ script: 'src/app.js', ext: 'js html'})
    .on('restart', function() {
      console.log('server restarted');
    });
});
