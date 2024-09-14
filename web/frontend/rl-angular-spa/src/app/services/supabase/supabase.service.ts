import {Injectable} from '@angular/core';
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
} from '@supabase/supabase-js';

import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private readonly _supabaseClient: SupabaseClient;

  constructor() {
    this._supabaseClient = createClient(
        environment.SUPABASE_URL,
        environment.SUPABASE_KEY,
    );
  }

  _session: AuthSession | null = null;

  get session() {
    this._supabaseClient.auth.getSession().then(({data}) => {
      this._session = data.session;
    });
    return this._session;
  }

  authChanges(
      callback: (event: AuthChangeEvent, session: Session | null) => void,
  ) {
    return this._supabaseClient.auth.onAuthStateChange(callback);
  }

  signUpWithEmail(email: string, password: string) {
    return this._supabaseClient.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${environment.FRONT_END_URL}/login`,
      },
    });
  }

  signInWithEmail(email: string, password: string) {
    return this._supabaseClient.auth.signInWithPassword({
      email,
      password,
    });
  }

  signInWithGoogle() {
    return this._supabaseClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${environment.FRONT_END_URL}/login-in-progress`,
      },
    });
  }

  signInWithGitHub() {
    return this._supabaseClient.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${environment.FRONT_END_URL}/login-in-progress`,
      },
    });
  }

  signOut() {
    return this._supabaseClient.auth.signOut();
  }
}
