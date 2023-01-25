import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface MetaMaskResponse {
  result: boolean;
  response: string | number | null;
}

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  public ethereum;

  public account = new BehaviorSubject<string>('');
  
  constructor() {
    this.ethereum = (window as any).ethereum;
  }

  public connectWallet = async () => {
    try {
      if (!this.ethereum) {
        alert('Please install Metamask to access the Shardeum faucet');
        return false;
      }
      const accounts = await this.ethereum.request({
        method: 'eth_requestAccounts',
      });
      this.account.next(accounts[0]);
      return accounts[0];
    } catch (e) {
      throw new Error('Error connecting to Metamask');
    }
  };

  public checkWalletConnected = async () => {
    try {
      if (!this.ethereum) {
        alert('Please install Metamask to access the Shardeum faucet');
        return false;
      }
      const accounts = await this.ethereum.request({ method: 'eth_accounts' });
      this.account.next(accounts[0]);
      return accounts;
    } catch (e) {
      throw new Error('Error getting accounts from Metamask');
    }
  };

  public checkChainId = async (): Promise<MetaMaskResponse> => {
    try {
      if (!this.ethereum)
        return {
          result: false,
          response: 'Please install Metamask',
        };
      const chainId = await this.ethereum.request({ method: 'eth_chainId' });
      console.log('chainId', chainId);
      return {
        result: true,
        response: chainId,
      };
    } catch (e) {
      throw new Error('Error getting chainId from Metamask');
    }
  };

  public changeToLibertyChain = async (): Promise<MetaMaskResponse> => {
    if (!this.ethereum)
      return {
        result: false,
        response: 'Please install Metamask',
      };
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
