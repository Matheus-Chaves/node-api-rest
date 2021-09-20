const express = require('express');
const consign = require('consign');

module.exports = () => {
  const app = express();

  //Não é mais necessário utilizar a biblioteca body-parser. Utilize o próprio express
  app.use(express.json()); //o servidor consegue ler dados em json que foram enviados para a API. Isso depende do Content-Type (application/json)
  app.use(express.urlencoded({ extended: true })); //servidor consegue ler dados urlencoded que foram enviados para a API. (application/x-www-form-urlencoded)

  consign() //chama o consign
    .include('controllers') //inclui todos os módulos da pasta de controllers
    .into(app) //dentro do nosso app
  //Ou seja, todos os elementos dentro da pasta irão receber acesso ao app
  return app
}