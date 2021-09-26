class Tabelas {
  init(conexao) { //init() é utilizado para inicializar a classe assim que ela for chamada
    this.conexao = conexao; //Variável conexão recebe o parâmetro enviado no index.js
    this.criarAtendimentos(); //Invoca a função
  }

  criarAtendimentos() {
    const sql = `
      CREATE TABLE IF NOT EXISTS Atendimentos (
        id int NOT NULL AUTO_INCREMENT,
        cliente varchar(50) NOT NULL,
        pet varchar(20),
        servico varchar(20) NOT NULL,
        status varchar(20) NOT NULL,
        observacoes text,
        PRIMARY KEY (id)
      )`

    this.conexao.query(sql, err => {
      err ? console.error(err) : console.log('Tabela Atendimentos criada com sucesso.')
    }) //o método 'query' recebe vários parâmetros, sendo o primeiro um código SQL e o último um código de erro
  }
}

module.exports = new Tabelas