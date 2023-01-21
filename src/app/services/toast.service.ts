import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private messageService: MessageService) {}

  displayToast = (type: string, message: string) => {
    this.messageService.add({
      severity: type,
      summary: type.charAt(0).toUpperCase() + type.slice(1),
      detail: message,
    });
  };
}
