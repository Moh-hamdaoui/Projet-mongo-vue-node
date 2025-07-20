const { body } = require('express-validator');

module.exports.projectValidation = [
  body('title').notEmpty().withMessage('Le titre est requis'),
  body('description').notEmpty().withMessage('La description est requise')
];

module.exports.taskValidation = [
  body('title').notEmpty(),
  body('description').notEmpty(),
  body('status').isIn(['à faire', 'en cours', 'terminé']),
  body('project').isMongoId()
];
