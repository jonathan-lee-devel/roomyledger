import {Injectable} from '@angular/core';
import {MessageService} from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastWrapperService {
  constructor(private messageService: MessageService) {}

  public showToast(
      summary: string,
      detail: string,
      sticky?: boolean,
      closable?: boolean,
      severity?: string,
      life?: number,
  ) {
    this.messageService.add({
      key: 'general',
      summary,
      detail,
      sticky,
      closable,
      severity,
      life,
    });
  }

  public showConfirmMessage(
      summary: string,
      detail: string,
      sticky?: boolean,
      closable?: boolean,
      severity?: string,
      life?: number,
  ) {
    this.messageService.add({
      key: 'confirm',
      sticky,
      closable,
      severity,
      summary,
      detail,
      life,
    });
  }
}
