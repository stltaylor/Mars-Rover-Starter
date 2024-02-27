const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  
  // Test 7
  it('constructor sets position and default values for mode and generatorWatts', function(){
   let test = new Rover(100513);
    expect(test.position).toBe(100513);
    expect(test.mode).toBe('NORMAL');
    expect(test.generatorWatts).toBe(110);
    })
  
  // Test 8 
  it('response returned by receiveMessage contains the name of the message', function(){
    let rover = new Rover(100513);
    let message = new Message('My spoon is too big');
    let test = rover.receiveMessage(message);
    expect(test.message).toBe('My spoon is too big');

  });
  
  // Test 9
  it('response returned by receiveMessage includes two results if two commands are sent in the message', function(){
    let rover = new Rover(100513);
    let commands = [
      new Command('MODE_CHANGE', 'LOW_POWER'),
      new Command('STATUS_CHECK')
    ];
    let message = new Message('My spoon is too big', commands);
    let test = rover.receiveMessage(message);
    expect(test.result.length).toBe(2);
  });
  
  // test 10
  it('responds correctly to the status check command', function() {
    let rover = new Rover(100513);
    let command = [new Command('STATUS_CHECK')];
    let message = new Message('My spoon is too big', command);
    let test = rover.receiveMessage(message);
    expect(test.result[0].roverStatus.mode).toBe('NORMAL');
    expect(test.result[0].roverStatus.generatorWatts).toBe(110);
    expect(test.result[0].roverStatus.position).toBe(100513);
  });

  // test 11
  it('responds correctly to the mode change command', function() {
    let rover = new Rover(100513);
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('My spoon is too big', commands);
    let test = rover.receiveMessage(message);
    expect(test.result[0].completed).toBe(true);
    expect(rover.mode).toBe('LOW_POWER');
  });

  // test 12
  it('responds with a false completed value when attempting to move in LOW_POWER mode', function(){
    let rover = new Rover(100513);
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 262626)];
    let message = new Message('My spoon is too big', commands);
    let test = rover.receiveMessage(message);
    // let commands1 = [new Command('MODE_CHANGE', 'LOW_POWER')]
    // let message1 = new Message('I am a banana', commands1)
    // rover.receiveMessage(message1)
      
    
    expect(test.result[1].completed).toBe(false);
    expect(rover.position).toBe(100513)
  });

  // test 13
  it('responds with the position for the move command', function() {
    let rover = new Rover(100513);
    let commands = [new Command('MOVE', 262626)];
    let message = new Message("I'm a banana", commands);
    let test = rover.receiveMessage(message);
    expect(test.result[0].completed).toBe(true);
    expect(rover.position).toBe(262626)
  })
  
})

