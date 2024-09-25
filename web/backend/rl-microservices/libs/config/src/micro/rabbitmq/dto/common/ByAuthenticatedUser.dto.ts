import {AuthUser} from '@supabase/supabase-js';

export interface ByAuthenticatedUserDto {
  requestingUser: AuthUser;
}
