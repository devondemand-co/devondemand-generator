const fs = require('fs');
const path = require('path');

const generateMaterialUIRelatedFiles = (options) => {
    return (new Promise((resolve,reject) => {
      try {
        if(options.technology === 'NextJS') {
          writeTofileinProject('/' + options.appName + '/src', 'theme.js', './data/nextjs/theme.js');
          writeTofileinProject('/' + options.appName + '/pages', '_app.js', './data/nextjs/_app.js');
          writeTofileinProject('/' + options.appName + '/pages', '_document.js', './data/nextjs/_document.js');
          resolve();
        } else if(options.technology === 'Pure React') {
          writeTofileinProject('/' + options.appName + '/src', 'index.js', './data/cra/index.js');
          writeTofileinProject('/' + options.appName + '/public', 'index.html', './data/cra/index.html');
          writeTofileinProject('/' + options.appName + '/src', 'theme.js', './data/cra/theme.js');
          resolve();
        } else if(options.technology === 'GatsbyJS') {
          writeTofileinProject('/' + options.appName, 'gatsby-browser.js', './data/gatsby/gatsby-browser.js');
          writeTofileinProject('/' + options.appName, 'gatsby-config.js', './data/gatsby/gatsby-config.js');

          resolve();
        } else {
          resolve();
        }
      } catch (error) {
        reject(error)
      }
    }))
}

const writeTofileinProject = (filePath, fileName, fileWithData) => {
  filePath = (process.cwd() + filePath).replace(/\\/g, '/')
  fileName = (filePath + '/' + fileName).replace(/\\/g, '/')
  fileWithData = path.resolve(__dirname, fileWithData).replace(/\\/g, '/')
  var data = fs.readFileSync(fileWithData, 'utf-8');
  fs.mkdirSync(filePath, { recursive: true });
  fs.writeFileSync(fileName, data, 'utf-8', {flag: 'wx'});
  return true
}

const addRequiredFolders = (options) => {
  return (new Promise((resolve,reject) => {
    try {
      if(options.technology === 'NextJS' || options.technology === 'Pure React') {
        fs.mkdirSync('/' + options.appName + '/src/api', { recursive: true });
        fs.mkdirSync('/' + options.appName + '/src/assets/data', { recursive: true });
        fs.mkdirSync('/' + options.appName + '/src/assets/fonts', { recursive: true });
        fs.mkdirSync('/' + options.appName + '/src/assets/icons', { recursive: true });
        fs.mkdirSync('/' + options.appName + '/src/assets/images', { recursive: true });
        fs.mkdirSync('/' + options.appName + '/src/components', { recursive: true });
        fs.mkdirSync('/' + options.appName + '/src/features', { recursive: true });
        fs.mkdirSync('/' + options.appName + '/src/helpers', { recursive: true });
        fs.mkdirSync('/' + options.appName + '/src/reducer', { recursive: true });
        fs.mkdirSync('/' + options.appName + '/src/themes', { recursive: true });
      } else if(options.technology === 'GatsbyJS') {
        fs.mkdirSync('/' + options.appName + '/src/api', { recursive: true });
        fs.mkdirSync('/' + options.appName + '/src/assets/data', { recursive: true });
        fs.mkdirSync('/' + options.appName + '/src/assets/fonts', { recursive: true });
        fs.mkdirSync('/' + options.appName + '/src/assets/icons', { recursive: true });
        fs.mkdirSync('/' + options.appName + '/src/assets/images', { recursive: true });
        fs.mkdirSync('/' + options.appName + '/src/layouts', { recursive: true });
        fs.mkdirSync('/' + options.appName + '/src/features', { recursive: true });
        fs.mkdirSync('/' + options.appName + '/src/helpers', { recursive: true });
        fs.mkdirSync('/' + options.appName + '/src/reducer', { recursive: true });
        fs.mkdirSync('/' + options.appName + '/src/themes', { recursive: true });
      }
      writeTofileinProject('/' + options.appName, '.eslintignore', './data/lint/.eslintignore');
      writeTofileinProject('/' + options.appName, '.eslintrc', './data/lint/.eslintrc');
      writeTofileinProject('/' + options.appName, '.prettierignore', './data/lint/.prettierignore');
      writeTofileinProject('/' + options.appName, '.prettierrc', './data/lint/.prettierrc');
      resolve();
    } catch (error) {
      reject(error)
    }
  }))
}

module.exports = {
  generateMaterialUIRelatedFiles,
  addRequiredFolders
}