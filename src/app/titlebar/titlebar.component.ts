import { Component } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { WalletService } from '../services/wallet.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.scss'],
})
export class TitlebarComponent implements AfterViewInit {
  public walletConnected: boolean = false;
  public walletAddress: string = '';

  constructor(
    private walletService: WalletService,
    private toastService: ToastService
  ) {}

  ngAfterViewInit(): void {
    this.checkWalletConnected();
  }

  connectWallet = async () => {
    let chainId = await this.changeToLibertyChain();
    if (chainId === -1 || chainId === 0) {
      return;
    }
    let res = await this.walletService
      .connectWallet()
      .then(() => this.checkWalletConnected());
    this.toastService.displayToast(res.result, res.response as string);
  };

  displayWalletStatus = async () => {
    const res = await this.checkWalletConnected();
    this.toastService.displayToast(res.result, res.response as string);
  };

  // check functions

  changeToLibertyChain = async () => {
    let chainId = await this.checkChainId();
    let res: any;
    if (chainId === 8081) {
      return 8081;
    } else if (chainId === -1) {
      return -1;
    } else {
      res = await this.walletService.changeToLibertyChain();
    }
    if (!res.result) {
      this.toastService.displayToast('error', res.response as string);
      return 0;
    }
    return 8081;
  };

  checkChainId = async (): Promise<number> => {
    let chainId = await this.walletService.checkChainId();
    if (!chainId.result) {
      this.toastService.displayToast('error', chainId.response as string);
      return -1;
    }
    return parseInt(chainId.response as string, 16) as number;
  };

  checkWalletConnected = async () => {
    const accounts = await this.walletService.checkWalletConnected();
    const chainId = await this.checkChainId();
    if (chainId !== 8081) {
      this.walletConnected = false;
      this.walletAddress = '';
      return {
        result: 'error',
        response:
          'DApp is not connected to Liberty Chain. Please try connecting again.',
      };
    }
    if (accounts.length > 0) {
      this.walletConnected = true;
      this.walletAddress = accounts[0];
      return {
        result: 'success',
        response:
          'DApp is connected to: ' +
          this.walletAddress.substring(0, 10) +
          '...' +
          this.walletAddress.substring(this.walletAddress.length - 4),
      };
    } else {
      this.walletConnected = false;
      this.walletAddress = '';
      return {
        result: 'error',
        response:
          'DApp is not connected to a wallet. Please try connecting again.',
      };
    }
  };
}
