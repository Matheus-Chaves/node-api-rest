const fs = require('fs'); //file system
const path = require('path')

// fs.readFile("./assets/bob.jpg", (erro, buffer) => {  //função SÍNCRONA. Lê um arquivo e gera um buffer dele
//   console.log("Imagem foi 'bufferizada' ")
//   console.log(buffer)

//   fs.writeFile("./assets/bob2.jpg", buffer, (erro) => { //Escreve (ou cria e escreve) em um arquivo o que for passado como parâmetro no 2° item
//     console.log("imagem foi escrita com sucesso")
//   })
// })

module.exports = (caminho, nomeDoArquivo, callbackImagemCriada) => { //exporta uma função que precisa de 3 parâmetros: caminho do arquivo; nome do arquivo; função de callback
  const tiposValidos = ['jpg', 'jpeg', 'png']
  const tipo = path.extname(caminho) //Pega a extensão (tipo) do arquivo (.png, .txt, .jpg etc.)
  const tipoEhValido = (tiposValidos.indexOf(tipo.substring(1)) !== -1) //Se -1 é pq não é um tipo válido. Verifica se o tipo é válido, usa substring(1) para remover o ponto da extensão (.png vira png)
  const novoCaminho = `./assets/images/${nomeDoArquivo}${tipo}`

  if (tipoEhValido) {
    fs.createReadStream(caminho) //Função assíncrona, cria uma Stream de leitura da imagem
      .pipe(fs.createWriteStream(novoCaminho)) //Faz com que a Stream de leitura seja transformada em uma stream de escrita
      .on('finish', () => callbackImagemCriada(false, novoCaminho)) //'on' é ativado quando a condição ('finish') é atingida. Nesse caso, o callback acontece assim que o pipe é finalizado
  } else {
    const erro = "O tipo da imagem é inválido!"
    console.log("Erro! O tipo da imagem é inválido!")
    callbackImagemCriada(erro)
  }
}