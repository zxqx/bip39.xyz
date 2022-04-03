const { zip } = require('zip-a-folder');
const fs = require('fs-extra');

const archiveBuildDirectory = async () => {
  await zip('build', 'bip39.xyz.zip');
  await fs.move('bip39.xyz.zip', 'build/bip39.xyz.zip');
};

archiveBuildDirectory();
