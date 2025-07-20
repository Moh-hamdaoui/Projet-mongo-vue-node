const request = require('supertest')
const app = require('../app') 
const mongoose = require('mongoose')
const Project = require('../models/Project')

describe('GET /projects/:id', () => {
  let projectId

  beforeAll(async () => {
    await mongoose.connect('mongodb+srv://mohammedhamdaoui:Aitatta%401933@cluster0.mkvzvix.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    const project = await Project.create({
      title: 'Test Project',
      description: 'A project created for testing',
      owner: new mongoose.Types.ObjectId()
    })

    projectId = project._id
  })

  afterAll(async () => {
    await Project.deleteMany()
    await mongoose.connection.close()
  })

  it('doit retourner un projet avec un ID valide', async () => {
    const res = await request(app).get(`/projects/${projectId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('_id')
    expect(res.body.title).toBe('Test Project')
  })

  it('doit retourner 404 si le projet n\'existe pas', async () => {
    const fakeId = new mongoose.Types.ObjectId()
    const res = await request(app).get(`/projects/${fakeId}`)

    expect(res.statusCode).toBe(404)
    expect(res.body).toHaveProperty('error')
  })
})
