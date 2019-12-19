const express = require('express');
const taskModel = require('../models/Task');
const userModel = require('../models/User');
const app = express();


//*********************************** */
//          TASK ROUTES
//*********************************** */
app.get('/tasks', async (req, res) => {
  const tasks = await taskModel.find({}).populate('user', 'name-_id').select('description state user');

  try {
    res.send(tasks);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/tasks/:userId', async (req, res) => {
  const tasks = await taskModel.find({ user: req.params.userId }).populate('user', 'name-_id').select('description state');

  try {
    res.send(tasks);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const task = await new taskModel(req.body);

    task.save()
    res.send(task)

  } catch (err) {
    res.status(500).send(err)
  }
});


app.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await taskModel.findByIdAndDelete(req.params.id)

    if (!task) res.status(404).send("No tasks found")
    res.status(204).send()
  } catch (err) {
    res.status(500).send(err)
  }
});
  
app.patch('/tasks/:id', async (req, res) => {
  try {
    await taskModel.findOneAndUpdate(req.params.id, req.body)
    task = await taskModel.save()
    res.send(task)
  } catch (err) {
    res.status(500).send(err)
  }
})


//*********************************** */
//          USER ROUTES
//*********************************** */
app.get('/users', async (req, res) => {
  const users = await userModel.find({});

  try {
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/users/:id', async (req, res) => {
  const user = await userModel.findById(req.params.id);

  try {
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/users', async (req, res) => {
  const user = new userModel(req.body);

  try {
    await user.save();
    res.send(user);
  } catch (err) {
    res.status(500).send(err)
  }
});

app.patch('/users/:id', async (req, res) => {
  try {
    await userModel.findOneAndUpdate(req.params.id, req.body)
    console.log(req.body)
    console.log(req.params.id)

    await userModel.save()

  } catch (err) {
    res.status(500).send(err)
  }
})

app.delete('/users/:id', async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id)

    if (!user) res.status(404).send("No users found")
    res.status(204).send()
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = app;