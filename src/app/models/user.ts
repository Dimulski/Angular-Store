import { Roles } from './roles';

export interface User {
  uid: string;
  email: string;
  roles: Roles;
  photoURL?: string;
  displayName?: string;
  favouriteColor?: string;
  cart: [],
  cartQ: []
}