const { zip } = require('zip-a-folder');
const fs = require('fs-extra');

const README = `
######################################################################

                              bip39.xyz

######################################################################

This app can be used on devices with no internet connection.

This is ideal for generating wallets safely and securely, as it ensures
no malware or viruses can compromise your mnemonic phrase.

Steps:

1) Open the index.html file in a web browser.
2) Click "Record" to record a sample of audio.
3) Click "Stop" to stop recording.
4) Copy the mnemonic phrase and use it to generate a new wallet.
`;

const archiveBuildDirectory = async () => {
  fs.writeFileSync('build/README.txt', README);
  await zip('build', 'bip39.xyz.zip');
  await fs.move('bip39.xyz.zip', 'build/bip39.xyz.zip');
};

archiveBuildDirectory();
