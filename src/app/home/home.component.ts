import { Component } from '@angular/core';
import { WalletService } from '../services/wallet.service';
import { ToastService } from '../services/toast.service';
import { ApiService } from '../services/api.service';

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
  ) {}

  address: string = '0x00';
  bobConnect() {
    console.log('bobConnect');
    this.apiService.dripFaucet(this.address).subscribe((res: any) => {
      this.toastService.displayToast(
        res.status ? 'success' : 'error',
        res.message
      );
    });
  }
}
