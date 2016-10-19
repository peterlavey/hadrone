const gulp = require('gulp');

const clean = require('gulp-clean');
const jshint = require('gulp-jshint');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

const bases = {
 app: 'app/',
 dist: 'dist/',
};

const paths = {
 scripts: ['js/**/*.js'],
 libs: ['vendor/angular/angular.min.js', 'vendor/domReady/domReady.js', 'vendor/angular-ui-router/release/angular-ui-router.min.js', 'vendor/jquery/dist/jquery.min.js', 'vendor/ngDraggable/ngDraggable.js', 'vendor/bootstrap/dist/js/bootstrap.min.js', 'vendor/requirejs/require.js'],
 styles: ['css/**/*.css', 'vendor/bootstrap/dist/css/bootstrap.min.css'],
 html: ['index.html'],
 templates:['templates/**/*.html'],
 components:['components/**/*.html'],
 configs:['js/main.js', 'js/require-config.js']
};

gulp.task('clean', ()=> gulp.src(bases.dist).pipe(clean()));

gulp.task('scripts', ['clean'], ()=>{
  gulp.src(paths.scripts, {cwd: 'app/**'})
  .pipe(babel({presets: ['es2015']}))
  .pipe(uglify())
  .pipe(gulp.dest(bases.dist));
});

gulp.task('copy', ['clean'], ()=>{
  gulp.src(paths.html, {cwd: bases.app}).pipe(gulp.dest(bases.dist));
  gulp.src(paths.templates, {cwd: bases.app}).pipe(gulp.dest(bases.dist + 'templates'));
  gulp.src(paths.components, {cwd: bases.app}).pipe(gulp.dest(bases.dist + 'components'));
  gulp.src(paths.styles, {cwd: bases.app}).pipe(gulp.dest(bases.dist + 'styles'));
  gulp.src(paths.libs, {cwd: 'app/**'}).pipe(gulp.dest(bases.dist));
});

gulp.task('watch', ()=> gulp.watch('app/**/*', ['scripts', 'copy']));

gulp.task('default', ['clean', 'scripts', 'copy']);
