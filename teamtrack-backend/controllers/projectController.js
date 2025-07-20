const Project = require('../models/Project');

exports.createProject = async (req, res) => {
  try {
    const project = await Project.create({ ...req.body, owner: req.user.id });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: 'Erreur création projet' });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({ 
      $or: [{ owner: req.user.id }, { collaborators: req.user.id }]
    })
      .populate('owner', 'name email')
      .populate('collaborators', 'name email');
      
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Erreur récupération projets' });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Projet non trouvé' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: 'Erreur mise à jour projet' });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Projet supprimé' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur suppression projet' });
  }
};

exports.addCollaborator = async (req, res) => {
  try {
    const { collaboratorId } = req.body;
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Projet non trouvé' });

    if (!project.collaborators.includes(collaboratorId)) {
      project.collaborators.push(collaboratorId);
      await project.save();
    }

    res.json(project);
  } catch (err) {
    res.status(500).json({ error: 'Erreur ajout collaborateur' });
  }
};