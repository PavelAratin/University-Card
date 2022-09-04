//экспорт дефолтных методов галпа
const { src, dest, parallel, series, watch } = require('gulp');
//установленные модули
const sass = require('gulp-sass')(require('sass'));//препроцессор
const notify = require('gulp-notify');//оповещение об ошибках в scss
const autoprefixer = require('gulp-autoprefixer');//автопрефиксер
const sourcemaps = require('gulp-sourcemaps');// отслеживание ошибок в разных файлах
const browserSync = require('browser-sync').create(); //браузерсинк - автоперезагрузка браузера
const fileInclude = require('gulp-file-include'); // позволяет вкладывать файлы друг в друга
// const svgSprite = require('gulp-svg-sprite');// работа с свг-спрайтами
const ttf2woff = require('gulp-ttf2woff'); //конвертация шрифта
const ttf2woff2 = require('gulp-ttf2woff2'); //конвертация шрифта
const del = require('del');//удаление папки app после запуска галп
const webpack = require('webpack');
const webpackStream = require('webpack-stream');// слежение за js фалами
const tinyPng = require('gulp-tinypng-compress'); //сжатие фотографий в build-версии

//функция для конвертации шрифтов и перегонки шрифтов
const fonts = () => {
  src('./src/fonts/**.ttf')
    .pipe(ttf2woff())
    .pipe(dest('./app/fonts/'))
  return src('./src/fonts/**.ttf')
    .pipe(ttf2woff2())
    .pipe(dest('./app/fonts/'))
}
//функция для работы с свг-спрайтами
// const svgSprites = () => {
//   return src('./src/img/**.svg')
//     .pipe(svgSprite({
//       mode: {
//         stack: {
//           sprite: '../sprite.svg'
//         }
//       }
//     }))
//     .pipe(dest('./app/img'))
// }
//функция для scss
const styles = () => {
  return src('./src/scss/**.scss')
    .pipe(sourcemaps.init())//начало отслеживание ошибок в разхных вайлах scss
    .pipe(sass().on('error', notify.onError()))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(sourcemaps.write('.')) //отслеживание ошибок в разхных вайлах scss
    .pipe(dest('./app/css'))
    .pipe(browserSync.stream()) //отслеживание файлов в реальном времени
}

//функция для работы с html
const htmlInclude = () => {
  return src(['./src/index.html'])
    .pipe(fileInclude({
      prefix: '@',
      basepath: '@file'
    }))
    .pipe(dest('./app'))
    .pipe(browserSync.stream()); //отслеживание файлов в реальном времени
}
//простая перегонка картинок для dev-версии (в процессе разработки)
const imgToApp = () => {
  return src(['./src/img/**.jpg', './src/img/**.png', './src/img/**.jpeg', './src/img/**.svg'])
    .pipe(dest('./app/img'))
}
//функция для удаления папки app
const clean = () => {
  return del(['./app/*'])
}

//перегонка библиотеки chart.js
const chartToApp = () => {
  return src(['./src/chart/*'])
    .pipe(dest('./app/chart'))
}

const faviconToApp = () => {
  return src(['./src/favicon.ico'])
    .pipe(dest('./app/'))
}

const swiperToApp = () => {
  return src(['./src/swiper/*'])
    .pipe(dest('./app/swiper'))
}

//функция для работы со скриптами
const scipts = () => {
  return src('./src/js/main.js')
    .pipe(webpackStream({
      mode: 'development',//режим разработки
      output: {
        filename: 'main.js',
      },
      devtool: 'source-map',//карта проетк(из каких кусочков состоит)
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', {
                    debug: true,//вывод ошибок в консоль
                  }]
                ]
              }
            }
          }
        ]
      }
    }))
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./app/js'))
    .pipe(browserSync.stream());
}

//функция для слежения за файлами 
const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: './app' //базовый сервер для слежения установлен за всей папкой app
    }
  });
  //watch - дефолтный метод галпа
  watch('./src/scss/**/*.scss', styles);//как только будут изменения в стилях, вызовется функция styles
  watch('./src/index.html', htmlInclude);
  watch('./src/img**.jpg', imgToApp);
  watch('./src/img**.png', imgToApp);
  watch('./src/img**.jpeg', imgToApp);
  // watch('./src/img**.svg', svgSprites);
  watch('./src/fonts/**.ttf', fonts);
  watch('./src/js/**/*.js', scipts);
}

//делаем функции тасками
exports.styles = styles;
exports.fileInclude = htmlInclude;
exports.fonts = fonts;
exports.clean = clean;
exports.watchFiles = watchFiles;
exports.chartToApp = chartToApp;
exports.faviconToApp = faviconToApp;
exports.swiperToApp = swiperToApp;

//в дефолтном таске мы используем функции(вызываются первый раз перед вотчингом)
exports.default = series(clean, parallel(htmlInclude, scipts, chartToApp,swiperToApp, fonts, imgToApp, faviconToApp), styles, watchFiles);
//код для build-версии
//функция для работы со скриптами
const sciptsBuild = () => {
  return src('./src/js/main.js')
    .pipe(webpackStream({
      output: {
        filename: 'main.js',
      },
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { targets: "defaults" }]
                ]
              }
            }
          }
        ]
      }
    }))
    .pipe(dest('./app/js'))
}

//функция для scss
const stylesBuild = () => {
  return src('./src/scss/**.scss')
    .pipe(sass().on('error', notify.onError()))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(dest('./app/css'))
}
//сжатие фотографий
const tinypng = () => {
  return src(['./src/img/**.jpg', './src/img/**.png', './src/img/**.jpeg'])
    .pipe(tinyPng({
      key: 'JS9MWwCflHycV1FDcSlkjZ8GGjTfttNw',
      log: true
    }))
    .pipe(dest('./app/img'))
}
//dev-сборка
exports.build = series(clean, parallel(htmlInclude, sciptsBuild, chartToApp,swiperToApp, fonts, imgToApp, faviconToApp), stylesBuild, tinypng);