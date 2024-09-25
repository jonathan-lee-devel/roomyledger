import {AuthUser} from '@supabase/supabase-js';

export interface AuthenticatedNotificationById {
  requestingUser: AuthUser;
  notificationId: string;
}
