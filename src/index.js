const express = require('express'); //carrego a pasta inteira dentro da const
const server = express(); // jogo dentro de server inicializado
server.use(express.json()); //nosso servidor vai receber e enviar informações no formato json

server.get('/teste', (req, res) => { //navegador só aceita GET - por isso usar insomnia para outros verbos
  res.send('TUDO CERTO COM A API');
});

// const TaskRoutes = require('./routes/TaskRoutes');
// server.use('/task', TaskRoutes); //use injeta na API

server.listen(3000, () => {  //ficar escutando na porta 3000 e executar a funcao
  console.log('API ONLINE');

});

