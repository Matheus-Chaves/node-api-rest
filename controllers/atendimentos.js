//CONTROLLER tem a responsabilidade de falar para onde enviaremos as coisas,
//responder nosso cliente. Será nosso intermediário para passar dados e recebê-los
//validações voltadas à segurança ficam aqui também.
const Atendimento = require('../models/atendimentos')

module.exports = app => {
  app.get('/atendimentos', (req, res) => {
    Atendimento.lista()
      .then(resultados => res.json(resultados)) //quando o status é 200, não é necessário colocar .status(200), pois este é o padrão
      .catch(erros => res.status(400).json(erros))
  })

  app.get('/atendimentos/:id', (req, res) => {
    //console.log(req.params) //Retorna o nome do parâmetro e seu valor. Ex.: url: /atendimentos/1 -> { id: '1'}
    const id = parseInt(req.params.id)

    Atendimento.buscaPorId(id, res)
  })

  app.post('/atendimentos', (req, res) => {
    const atendimento = req.body

    Atendimento.adiciona(atendimento)
      .then(atendimentoCadastrado => res.status(201).json(atendimentoCadastrado)) //recebe o retorno da promise do model atendimentos.js, que recebe a promise do repositório atendimento.js, que recebe a promise do queries.js
      .catch(erros => res.status(400).json(erros)) //catch trata os erros e só deve ser chamado no final, ou seja, aqui no controller, pois não pode ficar sendo jogado de arquivo em arquivo igual o nosso .then()
  })

  app.patch('/atendimentos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const valores = req.body

    Atendimento.altera(id, valores, res)
  })

  app.delete('/atendimentos/:id', (req, res) => {
    const id = parseInt(req.params.id)

    Atendimento.deleta(id, res)
  })
}