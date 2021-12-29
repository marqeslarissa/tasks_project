const TaskModel = require('../model/TaskModel');
const { isPast } = require('date-fns');  //verificar se data ta no passado

const TaskValidation = async (req, res, next) => {
  const { macaddress, type, title, description, when } = req.body;

  if (!macaddress)
    return res.status(400).json({ error: 'Macaddress é obrigatório' });
  else if (!type)
    return res.status(400).json({ error: 'Tipo é obrigatório' });
  else if (!title)
    return res.status(400).json({ error: 'Título é obrigatório' });
  else if (!description)
    return res.status(400).json({ error: 'Descrição é obrigatório' });
  else if (!when)
    return res.status(400).json({ error: 'Data é obrigatório' });
  else if (isPast(new Date(when)))
    return res.status(400).json({ error: 'Coloque a data no presente ou futuro' });
  else {
    let exists;

    exists = await TaskModel.
      findOne
      ({
        'when': { '$eq': new Date(when) },  //$eq = igual ao
        'macaddress': { '$in': macaddress } // $in = se existe
      });
    if (exists) {
      return res.status(400).json({ error: 'Já existe uma tarefa nesse dia e horario' });
    }
    next();
  }
}
module.exports = TaskValidation;