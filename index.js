const customExpress = require('./config/customExpress')
const conexao = require('./infraestrutura/database/conexao')
const Tabelas = require('./infraestrutura/database/tabelas')

conexao.connect(erro => {
  if (erro) {
    console.error(erro)
  } else {
    console.log('Conectado ao banco de dados MySQL com sucesso!')

    Tabelas.init(conexao)
    const app = customExpress()

    app.listen(3000, () => console.log('Servidor rodando na porta 3000 - http://localhost:3000'))
  }
})