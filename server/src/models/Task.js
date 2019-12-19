const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  state: {
    type: Boolean,
    default: false,
  },
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
  }
}, { collection: 'tasks' });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
