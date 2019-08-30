const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass');
const del = require('del');

// Clean dist folder
function clean() {
    return del(['./dist/']);
}

// Copy HTML files to dist
function html() {
    return gulp
        .src('./src/*.html')
        .pipe(gulp.dest('./dist/'));
}

// CSS stuff
function css() {
    return gulp
        .src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/css/'));
}

// Optimize images
function images() {
    return gulp
        .src('./src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images/'));
}


function watchFiles() {
    gulp.watch('./src/*.html', html);
    gulp.watch('./src/scss/*.scss', css);
    gulp.watch('./src/images/*', images);
}

const build = gulp.series(clean, gulp.parallel(html, css, images));
const watch = gulp.parallel(watchFiles);

exports.html = html;
exports.css = css;
exports.images = images
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = build;