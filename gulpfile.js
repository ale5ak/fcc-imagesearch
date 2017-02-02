const gulp = require('gulp');
const babel = require('gulp-babel');
const nodemon = require('nodemon');
const notify = require('gulp-notify')

gulp.task('default', function() {
    // place code for your default task here
    console.log("running gulp")

});


var paths = {
    scripts: ['src/**/*.js'],
    images: 'client/img/**/*'
};



gulp.task('scripts', () => {
    return gulp.src('src/server.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist'));
});


gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['scripts']);
//    gulp.watch(paths.scripts, ['scripts']);
//    gulp.watch(paths.images, ['images']);
});


gulp.task('server', function() {
    // configure nodemon
    nodemon({
        // the script to run the app
        script: 'dist/server.js',
        // this listens to changes in any of these files/routes and restarts the application
        watch: ["server.js", "app.js", "routes/", 'public/*', 'public/*/**'],
        ext: 'js'
        // Below i'm using es6 arrow functions but you can remove the arrow and have it a normal .on('restart', function() { // then place your stuff in here }
    }).on('restart', () => {
        gulp.src('dist/server.js')
        // I've added notify, which displays a message on restart. Was more for me to test so you can remove this
            .pipe(notify('Running the start tasks and stuff'));
    });
});