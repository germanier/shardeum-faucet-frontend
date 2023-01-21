import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { WalletService } from './services/wallet.service';
import { ToastService } from './services/toast.service';

// primeNG
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

// Components

import { TitlebarComponent } from './titlebar/titlebar.component';
import { FoxComponent } from './assets/fox/fox.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [AppComponent, TitlebarComponent, FoxComponent, HomeComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
  ],
  providers: [MessageService, ToastService, WalletService],
  bootstrap: [AppComponent],
})
export class AppModule {}
