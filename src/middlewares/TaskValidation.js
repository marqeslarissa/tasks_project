const TaskModel = require('../model/TaskModel');


const TaskValidation = async (req, res, next) => {
  const { macaddress, type, title, description, when } = req.body;

  if(!macaddress)
    return res.status(400).json({error: 'Macaddress é obrigatório'});
  else if(!type)
   return res.status(400).json({error: 'Tipo é obrigatório'});
   else if(!title)
   return res.status(400).json({error: 'Título é obrigatório'});
   else if(!description)
   return res.status(400).json({error: 'Descrição é obrigatório'});
    next();
}
module.exports = TaskValidation;