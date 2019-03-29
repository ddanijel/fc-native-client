const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFoodChain = require('./build/FoodChain');
const rinkebyConnect = require('../config');


const provider = new HDWalletProvider(
    rinkebyConnect.walletMnomenic,
    rinkebyConnect.rinkebyAccessNode);


const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account: ', accounts[0]);

    const result = await new web3
        .eth
        .Contract(JSON.parse(compiledFoodChain.interface))
        .deploy({data: '0x' + compiledFoodChain.bytecode})
        .send({gas: 1500000, from: accounts[0]});

    console.log('Contract deployed to: ', result.options.address);
    // 0x668003AAa66E9f195e5626A3cBba543Ffb94fE20
};

deploy().catch(error => {
    console.log(error)
});