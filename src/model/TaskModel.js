const mongoose = require('../config/database');
const Schema = mongoose.Schema;//representacao de informaçao que serao armazenadas no banco

const TaskSchema = new Schema({
  macaddress: { type: String, required: true},
  type: {type: Number, required: true},
  title: {type: String, required: true},
  description: {type: String, required: true},
  when: {type: Date, required: true},   //mongo armazena data e hrs juntos
  done: {type: Boolean, default: false},
  created: {type: Date, default: Date.now()} //valor padrao e data e hr que foi cadastrada - Date.now
});

module.exports = mongoose.model('Task', TaskSchema) //Task nome que passará no banco, passa o obj taskSchema