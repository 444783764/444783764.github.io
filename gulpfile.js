var gulp = require("gulp");
var cleanCSS = require("gulp-clean-css");
var htmlmin = require("gulp-html-minifier-terser");
var htmlclean = require("gulp-htmlclean");
var fontmin = require("gulp-fontmin");var terser = require("gulp-terser");
gulp.task("compress", () =>
    gulp
        .src(["./public/**/*.js", "!./public/**/*.min.js"])
        .pipe(terser())
        .pipe(gulp.dest("./public")));
gulp.task("minify-css", () => {
    return gulp
        .src(["./public/**/*.css"])
        .pipe(
           cleanCSS({
              compatibility: "ie11",
          })
        )
        .pipe(gulp.dest("./public"));});
gulp
    .task("minify-html", () => {
        return gulp
             .src("./public/**/*.html")
             .pipe(htmlclean())
            .pipe(htmlmin({
                removeComments: true,
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                //省略布尔属性的值，例如：<input checked="true"/> ==> <input />
               removeEmptyAttributes: true,
               //删除所有空格作属性值，例如：<input id="" /> ==> <input />
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
                 })
            )
            .pipe(gulp.dest("./public"));
    });
function minifyFont(text, cb) {
   .src("./public/fonts/*.ttf")
        .pipe(
            fontmin({ text: text,
             })
        )
        .pipe(gulp.dest("./public/fonts"))
        .om("end", cb);
            }
            gulp.task("mini-font",(cb)=> {
                var buffers = [];
                gulp
                    .src(["./public/**/*.html"])
                 .on("data", function (file) {
                     buffers.push(file.contents);
                  })
                    .on("end", function () {
                        var text = Buffer.concat(buffers).toString("utf-8");
                        minifyFont(text, cb);
                     });
            });
gulp.task(
    "default",
    gulp.parallel("compress", "minify-css", "minify-html", "min-font")
);

            })