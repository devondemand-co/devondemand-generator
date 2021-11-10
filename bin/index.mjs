
import  * as logger  from './src/logger.mjs';
import startProcess from './src/process.mjs';
import {askIntialQustions}  from './src/questions.mjs';


// Process Start
(async function(){
  logger.initial();
  const intialAnswers = await askIntialQustions()
  startProcess(intialAnswers)
  logger.end(intialAnswers);

})();
