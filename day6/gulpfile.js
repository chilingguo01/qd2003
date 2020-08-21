const gulp = require("gulp");
const htmlmin =require("gulp-htmlmin");
gulp.task("copy-html", function(){
    return gulp
    .src("*.html")
    .pipe(
        htmlmin({
            removeEmptyAttibutes: true, // 移出所有空属性
            collapseWhitespace: true, // 压缩 html
        })
    )
    .pipe(gulp.dest("dist/"))
    .pipe(connect.reload());
})
//处理图片
gulp.task("images", function(){
    return gulp
    .src("*.{jpg,png}")
    .pipe(gulp.dest("dist/images"))
    .pipe(connect.reload());
})
//处理js代码
gulp.task("scripts", function(){
    return gulp
    .src(["*.js", "!gulpfile.js"])
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload());
})
//处理数据
gulp.task("data", function(){
    return gulp
    .src(["*.json", "!package.json"])
    .pipe(gulp.dest("dist/data"))
    .pipe(connect.reload());
})
//处理css代码
const scss = require("gulp-sass");
const rename = require("gulp-rename");
const minifyCss = require("gulp-minify-css");
gulp.task("index-scss", function(){
    return gulp
    .src("stylesheet/index.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCss())
    .pipe(rename("index.mini.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})
gulp.task("login-scss", function(){
    return gulp
    .src("stylesheet/login.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCss())
    .pipe(rename("login.mini.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})
gulp.task("register-scss", function(){
    return gulp
    .src("stylesheet/register.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCss())
    .pipe(rename("register.mini.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})
//build任务
gulp.task("build", ["copy-html", "images", "scripts", "data", "index-scss", "login-scss", "register-scss"], function(){
    console.log("项目建立成功");
})
//添加监听
gulp.task("watch", function(){
    gulp.watch("*.html", ["copy-html"]);
    gulp.watch("*.{jpg,png}", ["images"]);
    gulp.watch(["*.json", "!package.json"], ["data"]);
    gulp.watch(["*.js", "!gulpfile.js"], ["scripts"]);
    gulp.watch("stylesheet/index.scss", ["index-scss"]);
    gulp.watch("stylesheet/login.scss", ["login-scss"]);
    gulp.watch("stylesheet/register.scss", ["register-scss"]);
})
//建立服务器
const connect = require("gulp-connect");
gulp.task("server", function(){
    connect.server({
        root: "dist",
        port: 8888,
        livereload: true,
    });
});
//同时启动
gulp.task("default", ["watch", "server"]);