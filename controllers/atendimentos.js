//CONTROLLER tem a responsabilidade de falar para onde enviaremos as coisas,
//responder nosso cliente. Será nosso intermediário para passar dados e recebê-los
//validações voltadas à segurança ficam aqui também.
const Atendimento = require('../models/atendimentos')

module.exports = app => {
  app.get('/atendimentos', (req, res) => {
    Atendimento.lista(res)
  })

  app.get('/atendimentos/:id', (req, res) => {
    //console.log(req.params) //Retorna o nome do parâmetro e seu valor. Ex.: url: /atendimentos/1 -> { id: '1'}
    const id = parseInt(req.params.id)

    Atendimento.buscaPorId(id, res)
  })

  app.post('/atendimentos', (req, res) => {
    const atendimento = req.body

    Atendimento.adiciona(atendimento, res)
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