import Web3 from 'web3';
import Common from '../constants/Common';

export default new Web3(new Web3.providers.HttpProvider(Common.FOODCHAIN_WEB3J_RINKEBY_HTTPSERVICE_URL));