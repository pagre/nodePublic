var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css');
//clean-css的前身是minify

// 定义任务
gulp.task('sass', function () {
    gulp.src('style/scss/*.scss')
        //路径和自己的比对
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(gulp.dest('style'))
    //本来在style下面还有个css的文件夹，然而发现装的这个sass编译路径时只能向上跳一级，故而直接放在style文件夹下了,anyone有方法求赐教
});

// 实时监测
gulp.task('complierInstant', function () {
    //complierInstant只是自己定义的名字
    gulp.watch('style/scss/*.scss', ['sass']);
    //让谁做什么
});