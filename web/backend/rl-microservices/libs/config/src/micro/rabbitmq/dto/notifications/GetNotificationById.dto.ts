import {AuthUser} from '@supabase/supabase-js';

export interface GetNotificationByIdDto {
  requestingUser: AuthUser;
  notificationId: string;
}
