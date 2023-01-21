import { Injectable } from '@angular/core';

interface MetaMaskResponse {
  result: boolean;
  response: string | number | null;
}

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
      console.log('chainId', chainId);
      return parseInt(chainId, 16);
    } catch (e) {
      throw new Error('Error getting chainId from Metamask');
    }
  };

  public changeToLibertyChain = async (): Promise<MetaMaskResponse> => {
    try {
      await this.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x1f91' }],
      });
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await this.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x1f91',
                chainName: 'Shardeum Liberty 2.X',
                nativeCurrency: {
                  name: 'Shardeum',
                  symbol: 'SHM',
                  decimals: 18,
                },
                rpcUrls: ['https://liberty20.shardeum.org'],
                blockExplorerUrls: ['https://explorer-liberty20.shardeum.org'],
              },
            ],
          });
        } catch (addError) {
          return {
            result: false,
            response: 'Error adding Liberty 2.x to your wallet',
          };
        }
      }
      return { result: false, response: 'Error switching to Liberty 2.x' };
    }
    return { result: true, response: null };
  };

  // // check if metamask was disconnected
  // public checkMetamaskDisconnect = async () => {
  //   try {
  //     if (!this.ethereum) return alert('Please install Metamask');
  //     const accounts = await this.ethereum.request({ method: 'eth_accounts' });
  //     if (accounts.length === 0) {
  //       return true;
  //     }
  //     return false;
  //   } catch (e) {
  //     throw new Error('Error getting accounts from Metamask');
  //   }
  // }

  // // check if metamask chain was changed
  // public checkMetamaskChainChange = async () => {
  //   try {
  //     if (!this.ethereum) return alert('Please install Metamask');
  //     const chainId = await this.ethereum.request({ method: 'eth_chainId' });
  //     if (chainId !== '0x1f91') {
  //       return true;
  //     }
  //     return false;
  //   } catch (e) {
  //     throw new Error('Error getting chainId from Metamask');
  //   }
  // }
}
