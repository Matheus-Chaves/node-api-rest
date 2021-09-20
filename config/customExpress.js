const express = require('express');
const consign = require('consign')

module.exports = () => {
  const app = express();

  consign() //chama o consign
    .include('controllers') //inclui todos os módulos da pasta de controllers
    .into(app) //dentro do nosso app
  //Ou seja, todos os elementos dentro da pasta irão receber acesso ao app
  return app
}