const mongoose = require('mongoose');

const { Schema } = mongoose;

const messageSchema = new Schema({
  fname: {
    type: String,
    required: true,
  },
  
  lname: {
    type: String,
    required: true,
  },
  
  email: {
    type: String,
    required: true,
  },

  tel: {
    type: String
  },

    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  }, { timestamps: true });

  const MessageModel = mongoose.model('Message', messageSchema);
  module.exports = MessageModel;