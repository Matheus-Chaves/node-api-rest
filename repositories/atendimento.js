//REPOSITÓRIO: fica aqui tudo que está relacionado com nosso CRUD
//Camada de dados responsável por lidar com os dados, sem se importar com o banco de dados
const query = require('../infraestrutura/database/queries')

class Atendimento {
  adiciona(atendimento) {
    const sql = "INSERT INTO Atendimentos SET ?" //interrogação indica que o que for inserido irá para a tabela
    return query(sql, atendimento)
  }

  lista() {
    const sql = 'SELECT * FROM Atendimentos'
    return query(sql)
  }
}

module.exports = new Atendimento()