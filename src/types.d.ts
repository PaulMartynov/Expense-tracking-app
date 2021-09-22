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
interface TransactionData {
  date: number;
  type: "expense" | "income";
  amount: number;
  description: string;
  category: string;
  subcategory?: string;
  childSubCategory?: string;
}
interface Transaction extends TransactionData {
  uuid: string;
}
interface TransactionsState {
  transactionsList: Transaction[];
  transactionsIsLoaded: boolean;
  transactionIsSaved: boolean;
}
