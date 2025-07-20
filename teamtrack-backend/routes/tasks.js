const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/authMiddleware');
const { taskValidation } = require('../middleware/validators');
const { validationResult } = require('express-validator');

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post('/', auth, taskValidation, handleValidation, taskController.createTask);
router.get('/project/:projectId', auth, taskController.getTasksByProject);
router.put('/:id', auth, taskValidation, handleValidation, taskController.updateTask);
router.delete('/:id', auth, taskController.deleteTask);

module.exports = router;
