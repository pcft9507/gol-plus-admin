var gulp = require('gulp');
var concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    fileinclude = require('gulp-file-include'),
    //scss = require('gulp-sass'); // sass 호출
    sourcemaps = require('gulp-sourcemaps'), //sourcemaps 호출
    browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'))

var src = {
    html : ['src/html/**/*.html'],
    js : ['src/js/*.js','js/**/**','js/**/**/*'],
    css : ['src/scss/*.scss'],
    fonts : ['src/fonts/**'],
    imgs : ['src/img/**','img/**/**','img/**/**/*']
}
var paths = {
    html: 'build',
    assets: {
      js : 'build/assets/js/',
      css : 'build/assets/css/',
      fonts : 'build/assets/fonts/',
      imgs : 'build/assets/img/'
    }
}
 
var scssOptions = {
    /** * outputStyle (Type : String , Default : nested) * CSS의 컴파일 결과 코드스타일 지정 * Values : nested, expanded, compact, compressed */
    outputStyle : "expanded",
 
    /** * indentType (>= v3.0.0 , Type : String , Default : space) * 컴파일 된 CSS의 "들여쓰기" 의 타입 * Values : space , tab */
    indentType : "tab",
 
    /** * indentWidth (>= v3.0.0, Type : Integer , Default : 2) * 컴파일 된 CSS의 "들여쓰기" 의 갯수 */
    indentWidth : 1,
 
    /** * outputStyle 이 nested, expanded 인 경우에 사용 /** * precision (Type : Integer , Default : 5) * 컴파일 된 CSS 의 소수점 자리수. */
    precision: 6,
 
    /** * sourceComments (Type : Boolean , Default : false) * 컴파일 된 CSS 에 원본소스의 위치와 줄수 주석표시. */
    sourceComments: true
};
 
function htmlComplie() {
  return gulp.src(src.html)
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      context: {
        subHeaderMenu: false,
      }
    }))
    .pipe(gulp.dest(paths.html))
    .pipe(browserSync.reload({stream:true}));
};
 
 
function scssCompile() {
  return gulp.src(src.css)
  // 소스맵 초기화(소스맵을 생성)
    .pipe(sourcemaps.init())

    // SCSS 함수에 옵션갑을 설정, SCSS 작성시 watch 가 멈추지 않도록 logError 를 설정
    .pipe(sass(scssOptions).on('error', sass.logError))

    // 위에서 생성한 소스맵을 사용한다.
    .pipe(sourcemaps.write())

    // 목적지(destination)을 설정
    .pipe(gulp.dest(paths.assets.css))

    //browserSync 로 브라우저에 반영;
    .pipe(browserSync.reload({stream:true}));
};
 
 
function concatJs() {
  return gulp.src(src.js)
    // .pipe(concat('ui.js'))
    // .pipe(gulp.dest(paths.js))
    // .pipe(uglify())
    // .pipe(rename('ui.min.js'))
    // .pipe(gulp.dest(paths.js))
    .pipe(gulp.dest(paths.assets.js))
    .pipe(browserSync.reload({stream:true}));
}
 
function fonts() {
  return gulp.src(src.fonts)
    .pipe(gulp.dest(paths.assets.fonts))
    .pipe(browserSync.reload({stream:true}));
}
 
function imgs() {
  return gulp.src(src.imgs)
    .pipe(gulp.dest(paths.assets.imgs))
    .pipe(browserSync.reload({stream:true}));
}
 
function watchFiles(){
  gulp.watch(src.html).on('change',htmlComplie);
  gulp.watch(src.css, scssCompile);
  gulp.watch(src.js, concatJs);
  gulp.watch(src.fonts, fonts);
  gulp.watch(src.imgs, imgs);
}
 
function brwSync(){
  browserSync.init({
    server:{
        baseDir:'build'
    }
  });
}
  
gulp.task('default', gulp.parallel(gulp.series(htmlComplie, scssCompile, concatJs, fonts, imgs),brwSync, watchFiles));