const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const auth = require('../middleware/authMiddleware');
const { projectValidation } = require('../middleware/validators');
const { validationResult } = require('express-validator');

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post('/', auth, projectValidation, handleValidation, projectController.createProject);

router.get('/', auth, projectController.getAllProjects);
router.get('/:id', auth, projectController.getProjectById);
router.put('/:id', auth, projectValidation, handleValidation, projectController.updateProject);
router.delete('/:id', auth, projectController.deleteProject);

router.post('/:id/collaborators', auth, projectController.addCollaborator);

module.exports = router;
