import { Component } from '@angular/core';
import { WalletService } from 'src/app/services/wallet.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.scss'],
})
export class TitlebarComponent {
  public walletConnected: boolean = false;
  public walletAddress: string = '';

  constructor(
    private walletService: WalletService,
    private messageService: MessageService
  ) {}

  connectWallet = async () => {
    let chainId = await this.checkChainId();
    if (chainId === -1) {
      return;
    }
    await this.walletService
      .connectWallet()
      .then(() => this.checkWalletConnected());
  };

  // check functions

  checkChainId = async (): Promise<number> => {
    let chainId = await this.walletService.checkChainId();
    if (chainId === 8081) {
      return chainId;
    }
    const res = await this.walletService.changeToLibertyChain();
    if (!res.result) {
      this.displayToast('error', res.response as string);
      return -1;
    }
    chainId = await this.walletService.checkChainId();
    return chainId as number;
  };

  checkWalletConnected = async () => {
    const accounts = await this.walletService.checkWalletConnected();
    if (accounts.length > 0) {
      this.walletConnected = true;
      this.walletAddress = accounts[0];
      this.displayToast(
        'success',
        'DApp is connected to: ' +
          this.walletAddress.substring(0, 10) +
          '...' +
          this.walletAddress.substring(this.walletAddress.length - 4)
      );
    } else {
      this.walletConnected = false;
      this.walletAddress = '';
      this.displayToast(
        'error',
        'Failed to connect to wallet. Please try again.'
      );
    }
  };

  // helper functions
  displayToast(_severity: string, _detail: string) {
    this.messageService.add({
      severity: _severity,
      summary: _severity.charAt(0).toUpperCase() + _severity.slice(1),
      detail: _detail,
      life: _severity === 'error' ? 10000 : 3000,
    });
  }
}
