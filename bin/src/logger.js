const boxen = require('boxen');

const initial = () => {
  console.log(boxen('-- -- * Devondemand Generator * -- --', 
    {padding: 1, margin: 1, borderStyle: 'classic', borderColor:'blue', backgroundColor: 'magenta'}
  ));
  console.log("Welcome to Devondemand Generator...\n\n")
}

const end = (options) => {

  console.log(
    boxen(
      (('To Start the Development Server Run: \n\ncd ' + options.appName + '\n') +
        (options.technology === 'Pure React' ? 'yarn start' : 'yarn dev')
      ),
    {padding: 0, margin: 1, borderStyle: 'classic', borderColor:'blue',}
  ));
}

module.exports = {
  initial,
  end
}