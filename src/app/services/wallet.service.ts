import { Injectable } from '@angular/core';
import { ethers } from 'ethers';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  public ethereum;
  constructor() {
    this.ethereum = (window as any).ethereum;
  }

  public connectWallet = async () => {
    try {
      if (!this.ethereum) return alert('Please install Metamask');
      const accounts = await this.ethereum.request({
        method: 'eth_requestAccounts',
      });
      return accounts[0];
    } catch (e) {
      throw new Error('Error connecting to Metamask');
    }
  };

  public checkWalletConnected = async () => {
    try {
      if (!this.ethereum) return alert('Please install Metamask');
      const accounts = await this.ethereum.request({ method: 'eth_accounts' });
      return accounts;
    } catch (e) {
      throw new Error('Error getting accounts from Metamask');
    }
  };

  public checkChainId = async () => {
    try {
      if (!this.ethereum) return alert('Please install Metamask');
      const chainId = await this.ethereum.request({ method: 'eth_chainId' });
      return parseInt(chainId, 16);
    } catch (e) {
      throw new Error('Error getting chainId from Metamask');
    }
  };

  // public addEthereumChain = async () => {
  //   try {
  //     if (!this.ethereum) return alert('Please install Metamask');
  //     const chainId = await this.ethereum.request({
  //       method: 'wallet_addEthereumChain',
  //       params: [
  //         {
  //           chainId: '0x1f41',
  //           chainName: 'Liberty Testnet',
  //           nativeCurrency: {
  //             name: 'Liberty',
  //             symbol: 'LBT',
  //             decimals: 18,
  //           },
  //           rpcUrls: ['https://liberty-testnet1.dappchains.com/rpc'],
  //           blockExplorerUrls: ['https://liberty-testnet1.dappchains.com/'],
  //         },
  //       ],
  //     });
  //     return chainId;
  //   } catch (e) {
  //     throw new Error('Error adding chain to Metamask');
  //   }
  // };
}
