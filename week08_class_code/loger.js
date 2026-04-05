function logMessage(name, message) {
  name = name || "Abbas";
  message = message || "Hi";
  return name + ", " + message;
}

module.exports.message = logMessage;
