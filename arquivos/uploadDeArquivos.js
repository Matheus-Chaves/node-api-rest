const fs = require('fs'); //file system

// fs.readFile("./assets/bob.jpg", (erro, buffer) => {  //função SÍNCRONA. Lê um arquivo e gera um buffer dele
//   console.log("Imagem foi bufferizada")
//   console.log(buffer)

//   fs.writeFile("./assets/bob2.jpg", buffer, (erro) => { //Escreve (ou cria e escreve) em um arquivo o que for passado como parâmetro no 2° item
//     console.log("imagem foi escrita com sucesso")
//   })
// })

fs.createReadStream("./assets/bob.jpg") //Função assíncrona, cria uma Stream de leitura da imagem
  .pipe(fs.createWriteStream('./assets/bob-stream.jpg')) //Faz com que a Stream de leitura seja transformada em uma stream de escrita
  .on('finish', () => console.log("Imagem foi escrita com sucesso")) //'on' é ativado quando a condição ('finish') é atingida. Nesse caso, o callback acontece assim que o pipe é finalizado
