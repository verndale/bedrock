const path = require('path');
const mandelbrot = require('@frctl/mandelbrot');
const fractal = module.exports = require('@frctl/fractal').create();

fractal.set('project.title', 'Verndale UI Components');

const hbs = require('@frctl/handlebars')({
  helpers: {
    isDisabled: function(disabled) {
      if(!disabled) return '';

      return 'disabled'
    }
  }
});

fractal.components.set('path', path.join(__dirname, 'src/components'));
fractal.components.set('default.preview', '@preview');
fractal.components.set('default.status', 'wip');
fractal.docs.set('default.status', 'draft');
fractal.components.engine(hbs);

const theme = mandelbrot({
  skin: 'black'
});

fractal.web.theme(theme);
fractal.web.set('builder.dest', __dirname + '/dist/fractal');
fractal.web.set('static.path', path.join(__dirname, 'public'));
fractal.docs.set('path', path.join(__dirname, 'docs'));
