const gulp = require('gulp');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();


gulp.task('vendor-css', () => {
    return gulp.src([
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrap/dist/css/bootstrap.min.css.map'
        ])
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('vendor-js', () => {
    return gulp.src([
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/bootstrap/dist/js/bootstrap.min.js',
            'node_modules/moment/moment.js',
            'node_modules/validator/validator.min.js'
        ])
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('dist/js/'));
});

gulp.task('app-js', () => {
    return gulp.src([
            'js/list.js',
            'js/edition.js',
            'js/display.js',
            'js/verification.js',
        ])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist/js/'));
});

gulp.task("serve", (cb) => {
    browserSync.init({
        server: './'
    });
    gulp.watch('*.html').on('change', browserSync.reload);
    gulp.watch('css/*.css').on('change', browserSync.reload);
    gulp.watch('js/*.js').on('change', gulp.series('app-js', browserSync.reload));

});

gulp.task('dev', gulp.series('vendor-js', 'vendor-css', 'app-js', 'serve'));