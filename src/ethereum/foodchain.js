import web3 from './web3';
import FoodChain from './build/FoodChain';
import Common from "../constants/Common";

const contractInstance = new web3.eth.Contract(
    JSON.parse(FoodChain.interface),
    Common.FOODCHAIN_CONTRACT_ADDRESS
);

export default contractInstance;