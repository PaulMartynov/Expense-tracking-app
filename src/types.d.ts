interface UserInfo {
  userId: string | null | undefined;
  username: string | null | undefined;
}
interface AuthState extends UserInfo {
  isAuthenticated: boolean;
}
interface CategoryState {
  categoryList: ExpCategory[];
  isLoaded: boolean;
}
interface SubCategories {
  name: string;
  children: string[];
}
interface ExpCategory {
  categoryName: string;
  subCategoriesList: SubCategories[];
}
interface Transaction {
  uuid: string;
  date: number;
  amount: number;
  description: string;
  category: string;
  subcategory?: string;
  childSubCategory?: string;
}
interface TransactionsState {
  transactionsList: Transaction[];
  isLoaded: boolean;
  isSaved: boolean;
}
