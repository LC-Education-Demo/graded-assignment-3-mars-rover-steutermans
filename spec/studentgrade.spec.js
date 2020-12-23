let mod = require('./helpers/reporter.js');
const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

let studentSpecs = mod.array;

describe("Grading suite", function() {

  it ("Correct number of passing specs", function() {
     expect(studentSpecs.length).toEqual(13);
     for (let i = 0; i < studentSpecs.length; i++)
     {
       expect(studentSpecs[i].status).toEqual("passed");
       expect(studentSpecs[i].passedExpectations.length).toBeGreaterThanOrEqual(1);
     }
   });

   it("Responds to TA message & commands", function() {
    let rover = new Rover(100);
    let commands = [
       new Command('MOVE', 4321),
       new Command('STATUS_CHECK'),
       new Command('MODE_CHANGE', 'LOW_POWER'),
       new Command('MOVE', 3579),
       new Command('STATUS_CHECK')
    ];
    let message = new Message('TA power', commands);
    let response = rover.receiveMessage(message);
    expect(response.name).toEqual('TA power');
    expect(response.results[0].completed).toBeTrue;
    expect(response.results[1].roverStatus.position).toEqual(4321);
    expect(response.results[2].completed).toBeTrue;
    expect(response.results[3].completed).toBeFalse;
    expect(response.results[4].roverStatus.position).toEqual(4321);
    expect(response.results[4].roverStatus.mode).toEqual('LOW_POWER');
    expect(response.results[4].roverStatus.generatorWatts).toEqual(110);
   });

});
