const TaskModel = require('../model/TaskModel');

class TaskController { //estrututa para cadastrar infor no mongo
  
  async create(req, res){ //async utiliza comando await para esperar consulta no banco
    const task = new TaskModel(req.body); //tudo que vir pelo corpo da req, vai converter em teksmodel
    await task
      .save()
      .then(response => { // se tudo der certo
        return res.status(200).json(response); //devolver a esposta no status 200 no conformato json
      })
      .catch(error => {
        return res.status(500).json(error);
      })
  }
}
module.exports = new TaskController();
