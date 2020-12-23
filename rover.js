const Message = require('./message.js');
const Command = require('./command.js');

class Rover {
  constructor(position) {
    this.position = position;
    this.mode = 'NORMAL';
    this.generatorWatts = 110;
  }
  receiveMessage(message) {
    let results = [];
    let {name, commands} = message;
    for (let command of commands) {
      let {commandType, value} = command;
      if (commandType === 'STATUS_CHECK') {
        results.push(this.checkStatus());
      }
      else if (commandType === 'MOVE') {
        results.push(this.moveRover(value));
      }
      else if (commandType === 'MODE_CHANGE') {
        results.push(this.modeChange(value));
      }
      else {
        let errorMessage = {completed:false, errorThrown: 'Unknown command type.'};
        results.push(errorMessage);
      }
    }
    let transmission = {name,results};
    return transmission;
  }
  checkStatus() {
    //handler for status command - no values are sent but it returns the current position, mode, and generatorWatts values - called in receiveMessage method
    let positionValue = this.position;
    let modeValue = this.mode;
    let wattValue = this.generatorWatts;
    let roverStatus = {completed:true,roverStatus:{position:positionValue,mode:modeValue,generatorWatts:wattValue}};
    return roverStatus
  }

  moveRover(positionValue) { 
    //handler for move command - send value into this and set position = to new value, return completed = true  - called in receiveMessage method
    let modeValue = this.mode;
    if (modeValue === 'LOW_POWER') {
      return {completed:false};
    } else {
        this.position = positionValue;
        return {completed:true};
      }
  }

  modeChange(modeValue) { 
    //handler for mode change command - called in receiveMessage method
    this.mode = modeValue;
    return {completed:true};
  }
}

module.exports = Rover;
