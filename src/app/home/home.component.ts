import { Component } from '@angular/core';
import { WalletService } from '../services/wallet.service';
import { ToastService } from '../services/toast.service';
import { ApiService } from '../services/api.service';
import { ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(
    private walletService: WalletService,
    private toastService: ToastService,
    private apiService: ApiService
  ) {
    this.walletService.account.subscribe((account) => {
      console.log('account', account);
      this.account = account;
    });
    this.walletService.chainId.subscribe((chainId) => {
      console.log('chainId', chainId);
      this.chainId = chainId;
    });
    this.walletService.provider.subscribe((provider) => {
      console.log('provider', provider);
      this.provider = provider as Web3Provider;

      // update gas faucet balance
      this.provider.getBalance(this.gasFaucetAddress).then((balance) => {
        this.gasFaucetBalance = ethers.utils.formatEther(balance);
      });

      // update drip faucet balance
      this.provider.getBalance(this.dripFaucetAddress).then((balance) => {
        this.dripFaucetBalance = ethers.utils.formatEther(balance);
      });
    });
  }

  account: string = '';
  chainId: string = '';
  provider: Web3Provider | null = null;

  // gas faucet
  gasFaucetAddress: string = '0x731637A147a2eFEa91Ced8053667DF61C033DcBE';
  gasFaucetBalance: string = '';
  gasFaucetAbi: any = [{"inputs":[],"name":"cooldown","type":"error"},{"inputs":[],"name":"faucetNotFunded","type":"error"},{"inputs":[],"name":"useFaucet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userPreviousWithdrawTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
  gasFaucetLastWithdrawal: Date = new Date();

  // drip faucet
  dripFaucetAddress: string = '0xa6d76cb2ad1c948bc8888d348e33c05e4fa90475';
  dripFaucetBalance: string = '';
  lastWithdrawalTimeDrip: Date = new Date();

  // faucet withdrawals
  gasFaucetWithdraw() {
    console.log('gasFaucet');

    let contract = new ethers.Contract(
      this.gasFaucetAddress,
      this.gasFaucetAbi,
      this.provider?.getSigner()
    );

    contract.attach(this.gasFaucetAddress)['useFaucet']().then((tx: any) => {
      this.toastService.displayToast('success', 'Transaction sent');
      console.log('tx', tx);
    });
  }

  dripFaucetWithdraw() {
    console.log('dripFaucet');
    this.apiService.dripFaucet(this.account).subscribe((res: any) => {
      this.toastService.displayToast(
        res.status ? 'success' : 'error',
        res.message
      );
    });
  }

}
