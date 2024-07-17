export interface User {
  id: string;
  name: string;
  email: string;
}

export interface ApiUser {
  sub: string;
  email_verified: boolean;
  name: string;
  email: string;
  picture: string;
  locale: {
    country: string;
    language: string;
  };
  given_name: string;
  family_name: string;
}
