let gulp = require('gulp'),
// common
    lr = require('tiny-lr'),
    livereload = require('gulp-livereload'),
    lec = require('gulp-line-ending-corrector'),
    concat = require('gulp-concat'),
    server = lr(),
    expect = require('gulp-expect-file'),
// css
    less = require('gulp-less'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
// js
    uglify = require('gulp-uglify'),
    fileinclude = require('gulp-file-include'),
    bower = require('gulp-bower'),
    angularFilesort = require('gulp-angular-filesort'),
    express = require('express'),
    vhost = require('vhost'),
    proxyMiddleware = require('http-proxy-middleware'),
    revHash = require('gulp-rev-hash'),
    hash_src = require("gulp-hash-src"),
    templateCache = require('gulp-angular-templatecache'),
    htmlmin = require('gulp-htmlmin'),
    https = require('https'),
    fs = require('fs');


let jsPaths = [
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/bootstrap/dist/js/bootstrap.min.js',
    'bower_components/angular/angular.min.js',
    'bower_components/atmosphere.js/atmosphere.min.js',
    'bower_components/angular-animate/angular-animate.min.js',
    'bower_components/angular-cookies/angular-cookies.min.js',
    'bower_components/angular-sanitize/angular-sanitize.min.js',
    'bower_components/angular-bootstrap/ui-bootstrap.min.js',
    'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
    'bower_components/angular-route/angular-route.min.js',
    'bower_components/angular-file-upload/dist/angular-file-upload.min.js',
    'bower_components/angular-environment/dist/angular-environment.min.js',
    'bower_components/angular-translate/angular-translate.min.js',
    'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js',
    'bower_components/angular-translate-storage-local/angular-translate-storage-local.min.js',
    'bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.min.js',
    'bower_components/angular-translate-handler-log/angular-translate-handler-log.min.js',
    'bower_components/angular-jquery/dist/angular-jquery.min.js',
    'sites/src/libs/logger/xlog.app.js',
    'sites/src/libs/intercom/intercom.min.js',
    'sites/src/libs/detect/detect.min.js',
    'sites/src/libs/lockable-storage/LockableStorage.js',
    'sites/src/libs/fabric/fabric.js'
];

/**
 * Сборка Vendor JS
 */
gulp.task('js-vendor', ['bower'], function(){
    return gulp.src(jsPaths)
        .pipe(expect(jsPaths))
        .pipe(concat('vendor.js'))
        .pipe(lec({ eolc: 'LF', encoding:'utf8'}))
        .pipe(gulp.dest('./sites/src/js'))
});

/**
 * Сборка всего JS
 */
let jsGen = function(name){
    return function(){
        let gulpUrl = './assets/' + name + '/**/*.js',
            gulpDest = './sites/' + name + '/js';
        return gulp.src([gulpUrl])
            .pipe(angularFilesort())
            .pipe(concat('script.js'))
            .pipe(lec({eolc: 'LF', encoding:'utf8'}))
            .pipe(gulp.dest(gulpDest))
    };
};
gulp.task('js-uspy', jsGen('uspy'));


/**
 * Сборка всего CSS + LESS
 */
let lessGen = function(name){
    return function (){
        let gulpSrc = './assets/' + name + '/core/styles/_common.less',
            gulpDest = './sites/' + name + '/css';
        return gulp.src(gulpSrc)
            .pipe(less({compress: true}))
            .pipe(autoprefixer())
            .pipe(concat('style.css'))
            .pipe(lec({eolc: 'LF', encoding:'utf8'}))
            .pipe(gulp.dest(gulpDest))
    };
};
gulp.task('less-uspy', lessGen('uspy'));


/**
 * Сборка всего HTML
 */
let htmlGen = function(name) {
    return function (){
        let gulpSrc = './assets/'+name+'/modules/index.html',
            gulpHashSrc = './sites/' + name,
            gulpHashPath = './assets/' + name + '/modules',
            gulpDest = './sites/' + name;
        return gulp.src([gulpSrc])
            .pipe(fileinclude({
                prefix: '@@',
                basepath: '@file'
            }))
            .pipe(revHash({assetsDir: './sites'}))
            .pipe(hash_src({build_dir: gulpHashSrc, src_path: gulpHashPath}))
            .pipe(gulp.dest(gulpDest))
    }
};
gulp.task('html-uspy',['js-uspy', 'templates'], htmlGen('uspy'));

/**
 * Сборка всех шаблонов в JS файл - kaskonokika
 */
function templateGen(name) {
    return function (){
        let gulpSrc = './assets/' + name + '/modules/**/*.html',
            gulpDest = './sites/' + name + '/js';
        return gulp.src([gulpSrc])
            .pipe(htmlmin({
                collapseWhitespace: true,
                conservativeCollapse: true
            }))
            .pipe(templateCache('templates.js', {
                module: name,
                root: '/'
            }))
            .pipe(gulp.dest(gulpDest))

    }
}
gulp.task('templates-uspy', [], templateGen('uspy'));


/**
 * Запуск bower install перед сборкой, что бы у всех всегда совпадали версии либ.
 */
gulp.task('bower', ['bower-prune'], function() {
    return bower();
});

gulp.task('bower-prune', function() {
    return bower({cmd: 'prune'});
});

gulp.task('uspy', ['js-uspy', 'less-uspy', 'html-uspy']);
gulp.task('templates', ['templates-uspy']);
gulp.task('html', ['html-uspy']);
gulp.task('build', ['uspy']);


// Watch
gulp.task('default', function() {
    livereload.listen();
    gulp.run('build');
    gulp.watch('assets/uspy/**/*.html',{cwd:'./'}, ['html-uspy','templates-uspy']).on('change', reloader);
    gulp.watch('assets/uspy/**/*.less',{cwd:'./'},['less-uspy']).on('change', reloader);
    gulp.watch('assets/uspy/**/*.js',{cwd:'./'},['js-uspy']).on('change', reloader);
    gulp.run('local-serverRu');
});

//Page reloader
function reloader() {
    setTimeout(function(){
        livereload.changed('./assets/uspy/modules/index.html')
    },200)
}


// configure proxy middleware options
let options = {
    target: 'http://api.uspy.ru', // target host
    changeOrigin: true,               // needed for virtual hosted sites
    ws: true,                         // proxy websockets
    secure: false,                   //for https
    onProxyRes: function(proxyRes, req, res) {
        let cook = proxyRes.headers['set-cookie'];

        if(cook !== undefined ) {
            if (cook[0].indexOf('PLAY_SESSION')>-1) {
                proxyRes.headers['set-cookie'] = cook[0].replace('Domain=.uspy.ru','Domain=.uspy.local');
                console.log('cookie created successfully');
            }
        }
    }
};

let proxy = proxyMiddleware(['/api','/uspy'], options);

let serverGen = function(proxy1, cb){
    let uspyApp = expressFunc('uspy');

    return function() {
        express()
            .use('/src', express.static('./sites/src'))
            .use(proxy1).on('upgrade', proxy1.upgrade)//
            .use(vhost('uspy.local', uspyApp))
            .listen(9360);
        cb()
    };

    function expressFunc(name) {
        return express()
            .use(express.static('./sites/' + name))
            .get('/*', function(req, res, next) {
                if (req.path.indexOf('/src') > -1) return next();
                res.sendFile("index.html", {"root": __dirname + '/sites/' + name});
            })
    }
};

// Local server
gulp.task('local-serverRu', serverGen(proxy, function(){}));