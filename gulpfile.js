const gulp = require('gulp');
const less = require('gulp-less');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const minify = require('gulp-csso');
const browserSync = require('browser-sync').create();
var imagemin = require("gulp-imagemin");
var mqpacker = require("css-mqpacker");
var rename = require("gulp-rename");



sass.compiler = require('node-sass');

/*Сборка SVG-спрайтов*/
var svgstore = require("gulp-svgstore");

/*Минификация SVG-файлов*/
var svgmin = require("gulp-svgmin");
var webp =require('gulp-webp');

var del = require("del");


gulp.task('style', function() {

    return gulp.src('source/less/style.less')
     .pipe(sourcemaps.init())
     
     .pipe(less())
     .pipe(postcss([    
      autoprefixer({browsers: [
        "last 2 versions"
      ]}),
      mqpacker({
        sort: true
      })
    ]))
    
     .pipe(gulp.dest("build/css"))
     .pipe(minify())
     .pipe(rename("style.min.css"))
     .pipe(gulp.dest("build/css"))
     .pipe(sourcemaps.write('./maps/'))
      
     .pipe(browserSync.stream());
});

gulp.task('sass', function () {
  return gulp.src('source/sass/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('build/css'))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(browserSync.stream());
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});


gulp.task("symbols", function() {
  return gulp.src("build/img/vector/*.svg")
    .pipe(svgmin())       /*Минифицируем SVG*/
    .pipe(svgstore({      /*Вырезает из SVG-файлов лишнюю инф-цию*/
      inLineSvg: true
    }))
    .pipe(rename("symbols.svg")) /*нужно переименовать, так как мы не снаем имя спрайта*/
    .pipe(gulp.dest("build/img"));
});



gulp.task('serve', function(){
    browserSync.init({
        server: {
            baseDir: './build'
        },
        tunnel: false,
        host: 'localhost',
        port: 9000
    });
    
    gulp.watch('source/less/**/*.less', gulp.series('style'));
    gulp.watch('source/sass/**/*.scss',gulp.series('sass'));
    gulp.watch('source/*.html',gulp.series('html:copy'));
    gulp.watch('source/js/*.js',gulp.series('js:copy'));
    gulp.watch('build/*.html').on('change', browserSync.reload);
    gulp.watch('build/js/*.js').on('change', browserSync.reload);
    
});

gulp.task('html:copy', function() {
  return gulp.src("source/*.html")
    .pipe(gulp.dest("build"));
    
});

gulp.task('js:copy', function() {
  return gulp.src("source/js/*.js")
    .pipe(gulp.dest("build/js"));
    
});
gulp.task('scripts', function() {
  return gulp.src(['source/js/script.js', 'source/js/scroll.js', 'source/js/modal.js','source/js/modal__image.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('source/js'));
});


/*Таск для копирования*/
gulp.task("copy", function() {
  return gulp.src([
    "source/fonts/**",
    "source/img/**",
    "source/js/**",
    "source/*.html"
    ], {
      /*gulp по умолчанию раскрывает путь до первых *(звездочек).
       Говорим что базовый путь начинается из корня*/
      base: "source/"
    })
  .pipe(gulp.dest("build"));
});
/* Таск для удаления */
gulp.task("clean", function() {
  return del("build");
});

gulp.task("images", function() {
  
  return gulp.src("build/img/*.{png,jpg,gif}")
    .pipe(imagemin([      
      imagemin.optipng({optimizationLevel: 3}), 
      imagemin.jpegtran({progressive: true}),  
      ]))
  
    .pipe(gulp.dest("build/img"));
});

gulp.task("webp", function(){
   return gulp.src("build/img/rester*.{jpg,png}")
    .pipe(webp({quality: 80}))
    .pipe(gulp.dest("build/img/raster"))
});


// Build task
gulp.task('build',gulp.series(['clean','copy','sass','images','webp','symbols']), function(done) { 
    
  done();
});;


// Default task
gulp.task('default',gulp.series(['clean','copy','sass','images','webp','symbols','serve']), function(done) { 
    
    done();
});;