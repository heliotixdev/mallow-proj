export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  name?: string; // Optional if only some APIs provide it
}
