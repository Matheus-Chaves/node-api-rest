//MODEL é a camada de regra de negócios da aplicação, realiza tudo referente às regras de negócio
const axios = require("axios")
const moment = require("moment")
const conexao = require("../infraestrutura/database/conexao")
const repositorio = require("../repositories/atendimento")
class Atendimento {
  constructor() {
    //Necessário transformar em funções o que lá embaixo antes era método, pois não temos mais acesso as variáveis
    this.dataIsValid = ({ data, dataCriacao }) => moment(data).isSameOrAfter(dataCriacao) //Verifica se a data é a mesma ou vem depois da data de criação
    this.clienteIsValid = (tamanho) => tamanho >= 5 //Verifica se o nome do cliente possui tamanho necessário para ser um nome

    this.valida = (parametros) => {
      this.validacoes.filter((campo) => {
        const { nome } = campo
        const parametro = parametros[nome]

        return !campo.valido(parametro)
      })
    }

    this.validacoes = [
      {
        nome: 'data',
        valido: this.dataIsValid,
        mensagem: 'A data deve ser maior ou igual a data atual.'
      },
      {
        nome: 'cliente',
        valido: this.clienteIsValid,
        mensagem: 'O cliente deve ter pelo menos 4 caracteres em seu nome.'
      }
    ]
  }

  adiciona(atendimento) {
    const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss') //precisamos colocar a data de criação atual - OBS: A variavel precisa ter o mesmo nome do campo, pois depois virará um objeto no estilo {nomeVariavel: valorVariavel}
    const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss') //convertendo a data recebida no padrao do banco de dados

    const parametros = {
      data: { data, dataCriacao },
      cliente: { tamanho: atendimento.cliente.length }
    }
    //const erros = validacoes.filter(campo => !campo.valido) //'filter' verifica a condição passada dentro dele e retorna todos os elementos que deram resultado true; Ex.: Se dataIsValid resultar em false, o função dentro do filter irá testar "!dataIsValid", resultando em 'true' e retornará o respectivo objeto dentro do array validacoes
    const existemErros = this.valida(parametros)

    if (existemErros) {
      return new Promise((resolve, reject) => { reject(erros) }) //não utilizaremos o resolve, pois a promise só é necessária para tratar erros
    } else {
      const atendimentoDatado = { ...atendimento, dataCriacao, data } //objeto contendo todas as informações de atendimento e a data de criação ao final - OBS: "...atendimento" recebe os valores dos objetos, mas no meio destes objetos nós já temos um campo chamado "date", ao fazer "...atendimento, date", o valor final do campo "date" será o inserido recentemente, não o que veio através do spread de atendimento (...atendimento)  

      return repositorio.adiciona(atendimentoDatado)
        .then((resultados) => { //aqui nós puxamos os resultados da Promise em caso de sucesso dela, ou seja, o valor passado em resolve()
          const id = resultados.insertId
          return { ...atendimento, id }
        })
    }
  }

  lista() {
    return repositorio.lista()
  }

  buscaPorId(id) {
    return repositorio.buscaPorId(id)
      .then(async (resultados) => {
        const atendimento = resultados[0] //Devolvemos o primeiro, dessa forma deixa de ser um array de objetos e sempre apenas um será listado um objeto
        const cpf = atendimento.cliente
        const { data } = await axios.get(`http://localhost:8082/${cpf}`) //retorna um objeto contendo o cpf, nome e dt nascimento
        atendimento.cliente = data
        return { atendimento }
      })
  }

  altera(id, valores) {
    if (valores.data) {
      valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
    }

    return repositorio.altera(id, valores)
      .then((resultados) => {
        return { ...valores, id }
      })
  }

  deleta(id) {
    return repositorio.deleta(id)
      .then((resultados) => {
        return ({ id: `${id} - [DELETADO]` })
      })
  }
}

module.exports = new Atendimento;