const mongoose = require('mongoose'); //importaçao do mongoose

const url = 'mongodb://localhost:2717/todo'; //url de conexao com o mongo
mongoose.connect(url, {useNewUrlParser: true}); //se conectar na url - ser compativel a outros --v 

module.exports = mongoose;