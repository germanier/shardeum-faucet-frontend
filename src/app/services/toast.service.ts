import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private messageService: MessageService) {}

  displayToast = (type: string, message: string) => {
    this.messageService.add({ severity: type, summary: type, detail: message });
  };
}
