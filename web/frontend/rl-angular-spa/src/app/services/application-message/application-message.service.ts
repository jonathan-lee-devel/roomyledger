import {HttpClient} from '@angular/common/http';
import {Injectable, inject} from '@angular/core';

import {environment} from '../../../environments/environment';
import {ApplicationMessageDto} from '../../dtos/application-messages/ApplicationMessageDto';

@Injectable({
  providedIn: 'root',
})
export class ApplicationMessageService {
  private readonly httpClient = inject(HttpClient);


  getPublicApplicationMessage() {
    return this.httpClient.get<ApplicationMessageDto[]>(`${environment.APPLICATION_MESSAGES_SERVICE_BASE_URL}/public`);
  }
}
