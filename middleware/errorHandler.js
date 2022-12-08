const { logEvents } = require("./logEvents");
const errorHandler = (err, req, res, next) => {
  logEvents(`${err.name}\t${err.message}`, "errorLog.txt");
  console.log(err);
  res.status(400).json(err.message);
};

module.exports = errorHandler;
