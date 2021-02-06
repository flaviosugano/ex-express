const express = require('express');
const rescue = require('express-rescue');

const app = express();

app.use(express.json());

app.get(
  '/:operacao/:num1/:num2',
  rescue(function(req, res, next) {
    const { operacao, num1, num2 } = req.params;

    if (operacao === 'soma') {
      const resultado = parseInt(num1) + parseInt(num2);
      return res.send(`Resultado: ${resultado}`);
    }

    next();
  }),
  function(req, res, next) {
    const { operacao, num1, num2 } = req.params;

    if (operacao === 'subtracao') {
      const resultado = parseInt(num1) - parseInt(num2);
      return res.send(`Resultado: ${resultado}`)
    }
    
    next();
  }, function(req, res, next) {
    const { operacao, num1, num2 } = req.params;

    if (operacao === 'multiplicacao') {
      const resultado = parseInt(num1) * parseInt(num2);
      return res.send(`Resultado: ${resultado}`);
    }

    next();
  },
  rescue(function(req, res) {
    const { operacao, num1, num2 } = req.params;

    if (operacao === 'divisao') {
      const resultado = parseInt(num1) / parseInt(num2);
      return res.send(`Resultado: ${resultado}`);
    }
  })
);

app.listen(3000);