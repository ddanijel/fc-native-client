const HDWalletProvider = require("truffle-hdwallet-provider");
import rinkebyConfig from './rinkebyConfig';



export default new HDWalletProvider(
    rinkebyConfig.accountPrivatekey,
    rinkebyConfig.rinkebyAccessNode
);