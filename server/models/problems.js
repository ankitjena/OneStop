const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var problemSchema = new Schema({
  category: { type: String, required: true},
  subject: { type: String, required: true},
  description: { type: String, required: true},
  filename: { type: String, required: true},
  upvotes: {type: Number, default: 0},
  downvotes: {type: Number, default: 0},
  comments : [],
  author: { type: String, default:'ankit'},
  timestamp: { type: Date, default: Date.now}
});

// Need to add callback functions And check them after implementation
problemSchema.methods.addUpVote = function (id) {
  this.findByIdAndUpdate(id, { $inc: {upvotes : 1 }});
  return this.upvotes;
  }
//
// problemSchema.methods.downVote = function (id) {
//   this.findByIdandUpdate(id, { $inc: {downvotes : 1}});
//   })
// }
//
// problemSchema.methods.addComment = function (id, comment) {
//   this.findByIdandUpdate(id, { $push: {comments: comment }});
//   })
// }

var problemModel = mongoose.model('problem', problemSchema);
module.exports = problemModel;
