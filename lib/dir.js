const fs = require('fs');

/**
 * 
 * @param {String} dirPath
 * path or name of the directory
 */
const createDir = async (dirPath) => {
   try {
      if (!fs.existsSync(dirPath)) {
         await fs.promises.mkdir(dirPath, { recursive: true });
         //console.log('Directory created')
      }
   } catch (error) {
      console.log(error)
   }
}

module.exports = createDir;