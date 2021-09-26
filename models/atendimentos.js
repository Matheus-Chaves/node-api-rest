const conexao = require("../infraestrutura/conexao")

class Atendimento {
  adiciona(atendimento) {
    const sql = "INSERT INTO Atendimentos SET ?" //interrogação indica que o que for inserido irá para a tabela

    conexao.query(sql, atendimento, (erro, resultados) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log(resultados)
      }
    }) // o segundo parâmetro pode ser um objeto recebido através do parâmetro POST. Exemplo: {cliente: 'Matheus', pet: 'Bob'}
  }
}

module.exports = new Atendimento;