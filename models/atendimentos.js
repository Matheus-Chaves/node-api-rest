const axios = require("axios")
const moment = require("moment")
const conexao = require("../infraestrutura/conexao")
class Atendimento {
  adiciona(atendimento, res) {
    const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss') //precisamos colocar a data de criação atual - OBS: A variavel precisa ter o mesmo nome do campo, pois depois virará um objeto no estilo {nomeVariavel: valorVariavel}
    const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss') //convertendo a data recebida no padrao do banco de dados

    const dataIsValid = moment(data).isSameOrAfter(dataCriacao) //Verifica se a data é a mesma ou vem depois da data de criação
    const clienteIsValid = atendimento.cliente.length >= 4 //Verifica se o nome do cliente possui tamanho necessário para ser um nome

    const validacoes = [
      {
        nome: 'data',
        valido: dataIsValid,
        mensagem: 'A data deve ser maior ou igual a data atual.'
      },
      {
        nome: 'cliente',
        valido: clienteIsValid,
        mensagem: 'O cliente deve ter pelo menos 4 caracteres em seu nome.'
      }
    ]

    const erros = validacoes.filter(campo => !campo.valido) //'filter' verifica a condição passada dentro dele e retorna todos os elementos que deram resultado true; Ex.: Se dataIsValid resultar em false, o função dentro do filter irá testar "!dataIsValid", resultando em 'true' e retornará o respectivo objeto dentro do array validacoes
    const existemErros = erros.length

    if (existemErros) {
      res.status(400).json(erros)
    } else {
      const atendimentoDatado = { ...atendimento, dataCriacao, data } //objeto contendo todas as informações de atendimento e a data de criação ao final - OBS: "...atendimento" recebe os valores dos objetos, mas no meio destes objetos nós já temos um campo chamado "date", ao fazer "...atendimento, date", o valor final do campo "date" será o inserido recentemente, não o que veio através do spread de atendimento (...atendimento)  

      const sql = "INSERT INTO Atendimentos SET ?" //interrogação indica que o que for inserido irá para a tabela

      conexao.query(sql, atendimentoDatado, (erro, resultados) => {
        if (erro) {
          res.status(400).json(erro);
        } else {
          res.status(201).json(atendimento)
        }
      }) // o segundo parâmetro pode ser um objeto recebido através do parâmetro POST. Exemplo: {cliente: 'Matheus', pet: 'Bob'}
    }
  }

  lista(res) {
    const sql = 'SELECT * FROM Atendimentos'

    conexao.query(sql, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro)
      } else {
        res.status(200).json(resultados)
      }
    })
  }

  buscaPorId(id, res) {
    const sql = `SELECT * FROM Atendimentos WHERE id=${id}`

    conexao.query(sql, async (erro, resultados) => { //precisa do async, pois iremos requisitar algo
      const atendimento = resultados[0] //Devolvemos o primeiro, dessa forma deixa de ser um array de objetos e sempre apenas um será listado um objeto
      const cpf = atendimento.cliente
      if (erro) {
        res.status(400).json(erro)
      } else {
        const { data } = await axios.get(`http://localhost:8082/${cpf}`)
        console.log(data)
        atendimento.cliente = data
        res.status(200).json(atendimento)
      }
    })
  }

  altera(id, valores, res) {
    if (valores.data) {
      valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
    }

    const sql = `UPDATE Atendimentos SET ? WHERE Id=?`

    conexao.query(sql, [valores, id], (erro, resultados) => { //[valores, id] -> o primeiro '?' recebe 'valores', enquanto o segundo '?' recebe 'id'
      if (erro) {
        res.status(400).json(erro)
      } else {
        //res.status(200).json(resultados)
        res.status(200).json({ ...valores, id })
      }
    })
  }

  deleta(id, res) {
    const sql = `DELETE FROM Atendimentos WHERE id = ${id}`

    conexao.query(sql, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro)
      } else {
        res.status(200).json({ id: `${id} - [DELETADO]` })
      }
    })
  }
}

module.exports = new Atendimento;