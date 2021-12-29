const express = requise('express');
const router = express.Router();

const TaskController = require('../controller/TaskController');
const TaskValidation = require('../middlewares/TaskValidation');

router.post('/', TaskValidation, TaskController.create);//toda vez que chegar post em /task chama os tasks


module.exports = router;