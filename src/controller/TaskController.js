const TaskModel = require('../model/TaskModel');
const { 
  startOfDay, //pegar o primeiro hr:min do dia
  endOfDay,  //pegar o ultimo hr:min do dia
  startOfWeek, 
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear
 } = require('date-fns');

const current = new Date(); //guardar a data e hr atual

class TaskController {   //estrututa para cadastrar infor no mongo

  async create(req, res){   //async utiliza comando await para esperar consulta no banco
    const task = new TaskModel(req.body);   //tudo que vir pelo corpo da req, vai converter em teksmodel
    await task
          .save()
          .then(response => {
            return res.status(200).json(response);  //devolver a esposta no status 200 no conformato json
          })
          .catch(error => {
            return res.status(500).json(error);
          });
  }

  async update(req, res){   // await para o node esperar o mongo responder, passar o corpo da requisiçao, pq tem todas as infor que queremos atualizar. New: true sempre retornará os dados atualizados na resposta
    await TaskModel.findByIdAndUpdate({'_id': req.params.id}, req.body, { new: true })
    .then(response => {
      return res.status(200).json(response);
    })
    .catch(error => {
      return res.status(500).json(error);
    });

  }

  async all(req, res){
    
    await TaskModel.find({ macaddress: {'$in': req.params.macaddress }})
          .sort('when')
          .then(response => {
            return res.status(200).json(response);
          })
          .catch(error => {
            return res.status(500).json(error);
          });
  }

  async show(req, res){
    await TaskModel.findById(req.params.id)
    .then(response => {
      if(response)
        return res.status(200).json(response);
      else
        return res.status(404).json({error: 'tarefa não encontrada'});
    })
    .catch(error => {
      return res.status(500).json(error);
    });
  }

  async delete(req, res){
    await TaskModel.deleteOne({'_id': req.params.id})
          .then(response => {
            return res.status(200).json(response);
          })
          .catch(error => {
            return res.status(500).json(error);
          });
  }

  async done(req, res){
    await TaskModel.findByIdAndUpdate(   // vai buscar a tarefa pelo id
      {'_id': req.params.id},   //identifica a tarefa pra atualizar o status
      {'done': req.params.done},
      {new: true})    // sempre devolver os dados da tarefa atualizado
      .then(response => {
        return res.status(200).json(response);
      })
      .catch(error => {
        return res.status(500).json(error);
      });
  }

  async late(req, res){ //filtro de tarefas atrasadas
    await TaskModel
    .find({
      'when': {'$lt': current}, //procura baseada na hr - WHEN atual - CURRENT // operador $lt  lass then - menor que
      'macaddress': {'$in': req.params.macaddress} 
    })
    .sort('when') //devolver as tarefas organizadas por data/hr
    .then( response => {
      return res.status(200).json(response);
    })
    .catch(error => {
      return res.status(500).json(error);
    });
  }

  async today(req, res){ //filtro de tarefas do dia atual
    await TaskModel
          .find({ 
            'macaddress': {'$in': req.params.macaddress},
            'when': {'$gte': startOfDay(current), '$lte': endOfDay(current)} //$gte - >= hr atual,  $lte <= hr atual
          })
          .sort('when') //organizada por data/hr
          .then(response => {
            return res.status(200).json(response);
          })
          .catch(error => {
            return res.status(500).json(error);
          });
  }

  async week(req, res){ //filtro de tarefas da semana atual
    await TaskModel
          .find({ 
            'macaddress': {'$in': req.params.macaddress},
            'when': {'$gte': startOfWeek(current), '$lte': endOfWeek(current)}
          })
          .sort('when')
          .then(response => {
            return res.status(200).json(response);
          })
          .catch(error => {
            return res.status(500).json(error);
          });
  }

  async month(req, res){ //filtro de tarefas do mês atual
    await TaskModel
          .find({ 
            'macaddress': {'$in': req.params.macaddress},
            'when': {'$gte': startOfMonth(current), '$lte': endOfMonth(current)}
          })
          .sort('when')
          .then(response => {
            return res.status(200).json(response);
          })
          .catch(error => {
            return res.status(500).json(error);
          });
  }

  async year(req, res){ //filtro de tarefas do ano atual
    await TaskModel
          .find({ 
            'macaddress': {'$in': req.params.macaddress},
            'when': {'$gte': startOfYear(current), '$lte': endOfYear(current)}
          })
          .sort('when')
          .then(response => {
            return res.status(200).json(response);
          })
          .catch(error => {
            return res.status(500).json(error);
          });
  }

}

module.exports = new TaskController();
