const HDWalletProvider = require('truffle-hdwallet-provider');
const mnemonic = "inch series real impact arena couch toddler chat good dad benefit glare";

module.exports = {

  networks: {
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 7545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
     gas: 4000000,
    },
    rinkeby: {
      network_id: 4,
      provider: () => new HDWalletProvider (
        mnemonic,
        'https://rinkeby.infura.io/v3/eedaf943e8324f839ca99c004493313a'
      )
    }
  }
}
