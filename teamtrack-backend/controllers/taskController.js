const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  try {
    const { title, description, status, project, assignedTo } = req.body;

    const newTask = new Task({
      title,
      description,
      status,
      project,
      assignedTo: assignedTo || null,
      createdBy: req.user.id
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: 'Erreur lors de la création de la tâche', error });
  }
};


exports.getTasksByProject = async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId }).populate('assignedTo', 'name')
    res.status(200).json(tasks)
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des tâches', error })
  }
}

exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la tâche', error });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }
    res.status(200).json({ message: 'Tâche supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la tâche', error });
  }
};
