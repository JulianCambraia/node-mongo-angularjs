const gulp = require('gulp');
const watch = require('gulp-watch');
const webserver = require('gulp-webserver');

// essa task monitora os arquivos da pasta App modificados para serem regerados e exibidos atualizados no browser
gulp.task('watch', () => {
    watch('app/**/*.html', () => gulp.start('app.html'))
    watch('app/**/*.css', () => gulp.start('app.css'))
    watch('app/**/*.js', () => gulp.start('app.js'))
    watch('assets/**/*.*', () => gulp.start('app.assets'));
});

// ao executar npm run dev  primeiro é chamado a task watch para depois chamar o server
// quando chamar a task watch é disparada a atualização na pasta public de qualquer modificação
// feita em arquivos html, css, js ou imagens. Daí só depois de atualizar os arquivos na pasta
// public é que será feito o livereload na porta 3000 e reaberto o browser com as atualizações.
gulp.task('server', ['watch'], () => {
    return gulp.src('public')
    .pipe(webserver({
        livereload: true,
        port:3000,
        open:true
    }));
});