import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {DialogService} from 'primeng/dynamicdialog';
import {take, tap} from 'rxjs';

import {
  CookiesNoticeDialogComponent,
} from '../../components/lib/dialogs/cookies-notice-dialog/cookies-notice-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class CookiesNoticeService {
  static COOKIE_NOTICE_ACCEPTED_KEY: string = 'Cookies-Notice';
  static COOKIE_NOTICE_IS_ACCEPTED_TRUE: string = 'Accepted';
  private static COOKIE_NOTICE_EXPIRY_TIME_MONTHS: number = 1;

  constructor(
    private cookieService: CookieService,
    private readonly dialogService: DialogService,
  ) {}

  public triggerIfNotAccepted(): void {
    if (
      this.cookieService.get(
          CookiesNoticeService.COOKIE_NOTICE_ACCEPTED_KEY,
      ) !== CookiesNoticeService.COOKIE_NOTICE_IS_ACCEPTED_TRUE
    ) {
      setTimeout(() => this.openCookiesNoticeDialog(), 1500);
    }
  }

  public doAccept(): void {
    const expiryDate = new Date();
    expiryDate.setMonth(
        expiryDate.getMonth() +
        CookiesNoticeService.COOKIE_NOTICE_EXPIRY_TIME_MONTHS,
    );
    this.cookieService.set(
        CookiesNoticeService.COOKIE_NOTICE_ACCEPTED_KEY,
        CookiesNoticeService.COOKIE_NOTICE_IS_ACCEPTED_TRUE,
        {secure: true, expires: expiryDate, sameSite: 'Strict'},
    );
  }

  private openCookiesNoticeDialog() {
    const dialogRef = this.dialogService.open(CookiesNoticeDialogComponent, {
      closable: true,
      modal: true,
      header: 'Financially Supporting this Project',
      footer: 'We will only show this message once',
      width: '50vw',
      breakpoints: {'1199px': '75vw', '575px': '90vw'},
    });
    dialogRef.onClose.pipe(
        take(1),
        tap(() => {
          this.doAccept();
        }),
    ).subscribe();
  }
}
