import pkg  from 'enquirer';
const {prompt} = pkg;

const questions = [
  {
    type: 'input',
    name: 'appName',
    message: 'Enter your new application name',
    initial: '',
  },
  {
    type: 'select',
    name: 'technology',
    message: 'Pick a Technology',
    initial: 0,
    choices: ['Pure React', 'GatsbyJS', 'NextJS']
  },
  {
    type: 'select',
    name: 'library',
    message: 'Choose a Library',
    initial: 1,
    choices: ['Default', 'Material UI']
  }
];

const askIntialQustions = async () => {
  return await prompt(questions)
}

export{
  askIntialQustions
}