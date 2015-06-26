/**
 * Created by tommyZZM on 2015/6/19.
 */
var gulp = require("gulp");

var server = require("gulp-easy-server");

var jade = require("gulp-jade");
var jsminify = require("gulp-uglify");
var contact = require("gulp-concat");
//
gulp.task("default",function(){
    return gulp.start(["source"])//"vendor"
});

gulp.task("source",function(){
    gulp.src(["./index.jade"])
        .pipe(jade())
        .pipe(gulp.dest("./"));
    return gulp.src(["./scripts/**/*.js"])
        .pipe(contact("game.min.js"))
        .pipe(jsminify())
        .pipe(gulp.dest("dist"));
});

//release 包括压缩合并代码
gulp.task("vendor",function(){
    return gulp.src(["./vendor/**/*.js","bower_components/phaser/build/phaser.js"])
        .pipe(contact("vendor.min.js"))
        .pipe(jsminify())
        .pipe(gulp.dest("dist"));
});

//release 包括压缩合并代码
gulp.task("createjs",function(){
    gulp.src(["./libs/**/*.js"])
        .pipe(contact("createjs.min.js"))
        .pipe(jsminify())
        .pipe(gulp.dest("out/dist"));
});

//server
gulp.task("server",function(){
    gulp.src("./")
        .pipe(server({port:50012,index:"./index.html",bowser:"chrome"}));
});