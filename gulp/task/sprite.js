import gulp from 'gulp';
import rename from 'gulp-rename';
import spritesmith from 'gulp.spritesmith';
import merge from 'merge-stream';
  
export default function js() {  
  const spriteData = gulp.src('src/css/sprites/*.png')
    .pipe(spritesmith({
      imgName: 'sprite.png',
      cssName: 'sprite.css'
    }));

  const imgStream = spriteData.img
    .pipe(gulp.dest('dist/assets/'));

  const cssStream = spriteData.css
    .pipe(rename({
      extname: ".styl"
    }))
    .pipe(gulp.dest('src/css/tools/'));

  return merge(imgStream, cssStream);
}
