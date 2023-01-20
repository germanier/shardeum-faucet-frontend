import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

// primeNG
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ButtonModule, InputTextModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
