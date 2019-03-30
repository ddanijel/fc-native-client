import web3 from './web3';
import FoodChain from './build/FoodChain.json';
import Common from "../constants/Common";


// export default (address) => {
//
//     const instance = new web3.eth.Contract(
//         JSON.parse(FoodChain.interface),
//         address
//     );
//
//     // const FoodChainContract = web3.eth.Contract(FoodChain, address);
//
//     // const foodChain = FoodChainContract.at(address);
//
//     // console.log('calling the address: ', address);
//     // web3.eth.getBlock('latest').then(console.log);
//     // return new web3.eth.Contract(
//     //     JSON.parse(FoodChain.interface),
//     //     address
//
//     return instance;
// };

const instance = new web3.eth.Contract(
    JSON.parse(FoodChain.interface),
    Common.FOODCHAIN_CONTRACT_ADDRESS
);

export default instance;