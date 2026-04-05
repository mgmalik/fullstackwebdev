const EventEmitter = require("events");
class Adder extends EventEmitter {
  sum;
  add(num1, num2) {
    num1 = num1 || 0;
    num2 = num2 || 0;
    this.sum = num1 + num2;
    this.emit("addedEvent");
  }
}
module.exports = Adder;
