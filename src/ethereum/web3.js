import Web3 from 'web3/types';
import Common from '../constants/Common';

export default new Web3.providers.HttpProvider(Common.FOODCHAIN_WEB3J_HTTPSERVICE_URL);