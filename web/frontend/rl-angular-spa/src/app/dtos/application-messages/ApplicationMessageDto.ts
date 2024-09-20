import {Dto} from '../Dto';

export type ApplicationMessageSeverity = 'INFO' | 'WARNING' | 'ERROR';

export interface ApplicationMessageDto extends Dto {
  message: string;
  title: string;
  severity: ApplicationMessageSeverity;
  isShow: boolean;
  isPublic: boolean;
  routerLink?: string;
  routerLinkText?: string;
}
