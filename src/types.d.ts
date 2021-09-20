interface UserInfo {
  userId: string | null | undefined;
  username: string | null | undefined;
}
interface AuthState extends UserInfo {
  isAuthenticated: boolean;
}
interface ExpCategory {
  mainCategory: string;
  categoryName: string;
}
interface CategoryState {
  categoryList: ExpCategory[];
  isLoaded: boolean;
}
