# gulp-engine
free set engine template and get pipe

```
var _swig = engine.swig(swig);
gulp.src('/path/to/*.swig')
    .pipe(_swig({}))
    .pipe(gulp.dest('/path/dist/'))
```
