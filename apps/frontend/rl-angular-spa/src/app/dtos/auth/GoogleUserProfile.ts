type GoogleUserProfileInfo = {
  email: string;
  name: string;
  given_name: string;
  family_name: string;
}

export type GoogleUserProfile = {
  info: GoogleUserProfileInfo;
}
