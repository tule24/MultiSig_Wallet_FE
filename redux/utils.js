import {ethers, utils} from 'ethers'
export const fetchContract = (contractAddress, contractABI, signerOrProvider) => new ethers.Contract(contractAddress, contractABI, signerOrProvider)
export const strToEth = (wei) => utils.parseEther(wei)
export const weiToEth = (eth) => utils.formatEther(eth)
