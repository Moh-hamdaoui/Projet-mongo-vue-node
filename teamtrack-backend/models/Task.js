const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, enum: ['à faire', 'en cours', 'terminé'], default: 'à faire' },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});
module.exports = mongoose.model('Task', taskSchema);
