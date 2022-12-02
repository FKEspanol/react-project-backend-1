const mongoose = require("mongoose");

const schema = new mongoose.Schema({
   picture: {
      type: String,
      required: true
   },
   firstname: {
      type: String,
      required: true
   },
   lastname: {
      type: String,
      required: true
   },

   age: {
      type: Number,
      required: true
   },

   email: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   },

   job: {
      type: String,
      required: true,
   },

   refreshToken: {
      type: String,
      default: null
   }
});

module.exports = mongoose.connection.useDb("FreelanceSite").model('applicants', schema);