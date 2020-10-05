const execa = require('execa');
const Listr = require('listr');
const {install, projectInstall} = require('pkg-install');
const { generateMaterialUIRelatedFiles, addRequiredFolders } = require('./helper');

const startProcess = (options) => {

  const tasks = new Listr([
    {
      title: 'Creating new GatsbyJs app and installing its dependencies',
      enabled: () => options.technology === 'GatsbyJS',
      task: async() => {
        return execa('./node_modules/.bin/gatsby', ['new', options.appName, 'https://github.com/gatsbyjs/gatsby-starter-default']).catch((e) => {
          throw new Error(e);
        })
      }
    }, 
    {
      title: 'Creating new NextJs app and installing its dependencies',
      enabled: () => options.technology === 'NextJS',
      task: async() => {
        return execa('./node_modules/.bin/create-next-app', [options.appName]).catch((e) => {
          throw new Error(e);
        })
      }
    }, 
    {
      title: 'Creating new React app and installing its dependencies',
      enabled: () => options.technology === 'Pure React',
      task: async() => {
        return execa('./node_modules/.bin/create-react-app', [options.appName]).catch((e) => {
          throw new Error(e);
        })
      }
    },
    // IF material ui is enabled.. install material ui inside new project
    {
      title: 'Adding MaterialUI to your project',
      enabled: () => options.library === 'Material UI',
      task: () => install(
        {
          '@material-ui/core': undefined,
          '@material-ui/icons': undefined,
          ...( options.technology === 'GatsbyJS' ? {
            'gatsby-plugin-material-ui': undefined,
            'typeface-roboto': undefined
          }:  {})
        },
        {
          prefer: options.technology === 'GatsbyJS' ? 'npm': 'yarn',
          cwd: options.appName
        }
      )
    },
    // IF material ui is enabled.. add related files and folders
    {
      title: 'Adding MaterialUI related files and folders to your project',
      enabled: () => options.library === 'Material UI',
      task: () => {
        return generateMaterialUIRelatedFiles(options)
      }
    },
    {
      title: 'Adding required folder structure',
      task: () => {
        return addRequiredFolders(options)
      }
    },
   
  ]);

  return tasks
    .run()
    .catch(err => {
      console.error(err);
    });
}

module.exports = startProcess