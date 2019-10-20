const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
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

// JS stuff
function js() {
    return gulp
        .src('./src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(terser())
        // .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'));
}

// libraries
function lib() {
    return gulp
        .src('./src/lib/*')
        .pipe(gulp.dest('./dist/lib/'));
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
    gulp.watch('./src/lib/*', lib);
    gulp.watch('./src/js/*.js', js);
    gulp.watch('./src/images/*', images);
}

const build = gulp.series(clean, gulp.parallel(html, css, lib, js, images));
const watch = gulp.parallel(watchFiles);

exports.html = html;
exports.css = css;
exports.lib = lib;
exports.js = js;
exports.images = images
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = build;