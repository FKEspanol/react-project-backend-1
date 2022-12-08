const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
//const EventEmitter = require("events");

const logEvents = async (message, logName) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync("logs")) {
      await fsPromises.mkdir("logs", { recursive: true });
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logName),
      logItem
    );
  } catch (error) {
    console.log(error);
  }
};

const logger = function (req, res, next) {
  logEvents(
    `${req.method}\t${req.headers.origin}\t${req.url}`,
    "request.Log.txt"
  );
  next();
};

// class MyEmitter extends EventEmitter {}
// const myEmitter = new MyEmitter();

// myEmitter.on("log", (msg) => logEvents(msg));

// setTimeout(() => {
//   myEmitter.emit("log", "Log event emitted");
// }, 2000);

module.exports = { logger, logEvents };
