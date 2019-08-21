import fs from 'fs-extra';
import gulp from 'gulp';
import eslint from 'gulp-eslint';
import reporter from 'eslint-detailed-reporter';
import del from 'del';
import gulpSvgstore from 'gulp-svgstore';
import gulpImagemin from 'gulp-imagemin';
import rename from 'gulp-rename';
import { log, colors, PluginError } from 'gulp-util';
import fractal from './fractal';
import webpack from 'webpack';
import webpackConfig from './webpack.config.babel';

const logger = fractal.cli.console;
const { NODE_ENV } = process.env;


//clean
function clean(){
  let files = [
    '**/.DS_Store',
    './public/**'
  ];

  if (NODE_ENV === 'production') {
    files = [
      ...files,
      './dist/**'
    ];
  }

  return del(files).then(paths => {
    log(
      colors.green.bold(`
--------------------------------------------------------------
${paths.length > 0 ? 'Deleted files and folders:' : 'Nothing to delete'}
--------------------------------------------------------------`)
    );

    log(colors.red.bold(paths.join('\n')));
  });
}

//fractal
function fractalStart(cb){
  log(
    colors.green.bold(`
--------------------------------------------------------------
Fractal start
--------------------------------------------------------------`)
  );

  const server = fractal.web.server({
    sync: true
  });

  server.on('error', err => logger.error(err.message));

  return server.start().then(() => {
    logger.success(`Fractal server is now running at ${server.urls.sync.local}`);

    cb();
  });
}

//js/webpack
function js(cb){
  log(
    colors.green.bold(`
--------------------------------------------------------------
Webpack
--------------------------------------------------------------`)
  );

  webpack(webpackConfig(NODE_ENV), (err, stats) => {
    if (err){
      throw new PluginError('webpack:build', err);
    }

    log('webpack', stats.toString({
      colors: true
    }));

    cb();
  });
}

//eslint report
function report() {
  log(
    colors.green.bold(`
--------------------------------------------------------------
ESLint report
--------------------------------------------------------------`)
  );

  return gulp.src('./src/components/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.format(reporter, results => {
      fs.ensureDir('./public/reports/eslint/')
        .then(() => {
          fs.writeFileSync('./public/reports/eslint/index.html', results);
        });
    }));
}

//svg store
function svgstore() {
  log(
    colors.green.bold(`
--------------------------------------------------------------
Combining SVG's
--------------------------------------------------------------`)
  );

  return gulp
    .src('./src/components/**/svg/*.svg')
    .pipe(
      gulpImagemin(
        [
          gulpImagemin.svgo({
            plugins: [{ removeViewBox: true }]
          })
        ],
        {
          verbose: true
        }
      )
    )
    .pipe(gulpSvgstore())
    .pipe(rename('svgsheet.svg'))
    .pipe(gulp.dest('./public/svg'));
}

//watch
function watch(cb) {
  const watchOptions = {
    cwd: './',
    awaitWriteFinish: true
  };

  log(
    colors.green.bold(`
--------------------------------------------------------------
Watch
--------------------------------------------------------------`)
  );

  //js
  gulp.watch([
    'src/components/**/*.js',
    '!src/components/**/*.config.js'
  ], watchOptions, gulp.series(report, js));

  cb();
}

//unit test
function test(cb){
  log(
    colors.green.bold(`
--------------------------------------------------------------
Test
--------------------------------------------------------------`)
  );

  const exec = require('child_process').exec;

  exec('karma start --single-run --no-auto-watch', () => {
    cb();
  });
}


//tasks for dev and prod
let tasks = gulp.series(
  clean,
  gulp.parallel(svgstore, report),
  //test,
  js,
  fractalStart,
  watch
);

if (NODE_ENV === 'production') {
  tasks = gulp.series(
    clean,
    gulp.parallel(svgstore, report),
    js
  );
}

//default task
gulp.task('default', tasks);
