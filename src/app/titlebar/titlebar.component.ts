import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { WalletService } from 'src/app/services/wallet.service';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.scss'],
})
export class TitlebarComponent implements AfterViewInit {
  public walletConnected: boolean = false;
  public walletAddress: string = '';

  constructor(private walletService: WalletService) {}
  ngAfterViewInit() {
    // this.walletService.addEthereumChain();
  }

  connectToWallet = async () => {
    console.log('connectToWallet');
    let chainId = await this.walletService.checkChainId();
    if (chainId !== 8081) {
      alert('Please connect to Liberty Testnet');
      return;
    }
    this.walletService.connectWallet().then(() => this.checkWalletConnected());
  };

  checkWalletConnected = async () => {
    const accounts = await this.walletService.checkWalletConnected();
    if (accounts.length > 0) {
      this.walletConnected = true;
      this.walletAddress = accounts[0];
    } else {
      this.walletConnected = false;
      this.walletAddress = '';
      alert('Failed to connect to wallet. Please try again.');
    }
  };
}
