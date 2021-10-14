const conexao = require('./conexao')

const executaQuery = (query, parametros = '') => { //Coloca-se string vazia para que quando a função for chamada sem utilizar o segundo parâmetro, automaticamente ela recebe vazio e não gera erro
  return new Promise((resolve, reject) => { //A promise é assíncrona, resolve = tudo ok; reject = rejeitou, deu ruim
    conexao.query(query, parametros, (erros, resultados, campos) => {
      if (erros) {
        reject(erros)
      } else {
        resolve(resultados)
      }
    })
  })
}

module.exports = executaQuery