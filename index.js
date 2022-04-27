const express = require('express');
const exphbs = require('express-handlebars');
const fs = require('fs');
const app = express();
const PORT = process.envPORT || 3000;

app.set('view engine', '.hbs');
app.engine(
  'hbs',
  exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/components',
    defaulLayout: 'main',
    extname: '.hbs',
  })
);

app.use(express.static(__dirname + '/public'));

app.use(
  '/bootstrap',
  express.static(__dirname + '/node_modules/bootstrap/dist/css')
);
app.use(
  '/bootstrap_js',
  express.static(__dirname + '/node_modules/bootstrap/dist/js/bootstrap.js')
);
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));

app.get('/', (req, res) => {
  const productos = JSON.parse(
    fs.readFileSync(__dirname + '/public/productos.json', 'utf-8')
  ).productos;
  res.render('Home', {
    productos: productos,
  });
});

app.listen(PORT, () =>
  console.log(`Servidor se esta ejecutando en puerto ${PORT}`)
);
