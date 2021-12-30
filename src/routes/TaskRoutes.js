const express = require('express');
const router = express.Router();

const TaskController = require('../controller/TaskController');
const TaskValidation = require('../middlewares/TaskValidation');


router.post('/', TaskValidation, TaskController.create);
router.put('/:id', TaskValidation,  TaskController.update); //put atualizar uma unica tarefa  - id
router.get('/:id', TaskController.show); //get mostrar uma unica tarefa - id
router.delete('/:id', TaskController.delete); //delete deletar uma unica tarefa - id
router.put('/:id/:done', TaskController.done);  // identifica a tarefa - id e atualizar o status - done

router.get('/filter/all/:macaddress',   TaskController.all);
router.get('/filter/late/:macaddress',  TaskController.late); //filtro de tarefa atrasada
router.get('/filter/today/:macaddress', TaskController.today); 
router.get('/filter/week/:macaddress',  TaskController.week);
router.get('/filter/month/:macaddress', TaskController.month);
router.get('/filter/year/:macaddress',  TaskController.year);


module.exports = router;