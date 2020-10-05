const logger = require('./src/logger');
const startProcess = require('./src/process');
const { askIntialQustions } = require('./src/questions');


// Process Start
(async function(){
  logger.initial();
  const intialAnswers = await askIntialQustions()
  await startProcess(intialAnswers)
  logger.end(intialAnswers);

})();
