class Rover {
   constructor(position) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   }
   receiveMessage(message) {
      let results = {
         message: message.name,
         result: []
      };
      
      for (let command of message.commands) {
        

        if(command.commandType === 'MODE_CHANGE') {
         this.mode = command.value;
         results.result.push({ completed: true }) 
      } 
      
         else if(command.commandType === 'STATUS_CHECK') {
         results.result.push({ 
            
            completed: true,
            roverStatus: { 
               mode: this.mode,
               generatorWatts: this.generatorWatts,
               position: this.position,

            },
            
         });
      } 
      
         else if (command.commandType === 'MOVE') {
            if (this.mode === 'LOW_POWER') {
               results.result.push({ completed: false })
         } else {
               this.position = command.value;
               results.result.push({ completed: true })
         }
      } 
      
   }
   
   return results


   }
}


module.exports = Rover;
// let message = new Message('Dang this is hard af')

// let rover = new Rover(1234)
// let test = rover.receiveMessage(message)

// console.log(test)



//    let rover = new Rover(100);
//     let commands = [
//        new Command('MOVE', 4321),
//        new Command('STATUS_CHECK'),
//        new Command('MODE_CHANGE', 'LOW_POWER'),
//        new Command('MOVE', 3579),
//        new Command('STATUS_CHECK')
//     ]

// let message = new Message('My spoon is too big', commands)

// let test = rover.receiveMessage(message)

// console.log(test)

