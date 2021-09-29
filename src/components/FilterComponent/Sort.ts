export function sortTransactionsBy(
  option: string,
  transactions: Transaction[]
): Transaction[] {
  switch (option) {
    case "DATE-FROM-NEW":
      return transactions.sort((a, b) => b.date - a.date);
    case "DATE-FROM-OLD":
      return transactions.sort((a, b) => a.date - b.date);
    case "AMOUNT-FROM-BIGGEST":
      return transactions.sort((a, b) => b.amount - a.amount);
    case "AMOUNT-FROM-SMALL":
      return transactions.sort((a, b) => a.amount - b.amount);
    case "DESCRIPTION-FORM-A-TO-Z":
      return transactions.sort((a, b) => {
        if (a.description > b.description) {
          return 1;
        }
        if (a.description < b.description) {
          return -1;
        }
        return 0;
      });
    case "DESCRIPTION-FORM-Z-TO-A":
      return transactions.sort((a, b) => {
        if (a.description > b.description) {
          return -1;
        }
        if (a.description < b.description) {
          return 1;
        }
        return 0;
      });
    case "CATEGORY-FORM-A-TO-Z":
      return transactions.sort((a, b) => {
        if (a.category > b.category) {
          return 1;
        }
        if (a.category < b.category) {
          return -1;
        }
        return 0;
      });
    case "CATEGORY-FORM-Z-TO-A":
      return transactions.sort((a, b) => {
        if (a.category > b.category) {
          return -1;
        }
        if (a.category < b.category) {
          return 1;
        }
        return 0;
      });
    default:
      return transactions;
  }
}
