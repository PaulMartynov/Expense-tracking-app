interface UserInfo {
  userId: string | null | undefined;
  username: string | null | undefined;
}
interface AuthState extends UserInfo {
  isAuthenticated: boolean;
}
