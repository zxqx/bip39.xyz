const { zip } = require('zip-a-folder');
const fs = require('fs-extra');

const archiveBuildDirectory = async () => {
  await zip('build', 'bip39.zip');
  await fs.move('bip39.zip', 'build/bip39.zip');
};

archiveBuildDirectory();
