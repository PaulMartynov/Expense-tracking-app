export function filterTransactionsByText(
  text: string,
  transactions: Transaction[]
): Transaction[] {
  if (!text || text === "") {
    return transactions;
  }
  const filterText = text.toLowerCase();
  return transactions.filter((t) => {
    return (
      t.description.toLowerCase().includes(filterText) ||
      t.category.toLowerCase().includes(filterText) ||
      t.subcategory?.toLowerCase().includes(filterText) ||
      t.childSubCategory?.toLowerCase().includes(filterText)
    );
  });
}

export function filterCategoriesByText(
  text: string,
  categories: ExpCategory[]
): ExpCategory[] {
  if (!text || text === "") {
    return categories;
  }
  const filterText = text.toLowerCase();
  const filtered: ExpCategory[] = [];
  categories.forEach((cat) => {
    let catPushed = false;
    if (cat.categoryName.toLowerCase().includes(filterText)) {
      filtered.push(cat);
      catPushed = true;
    }
    cat.subCategoriesList.forEach((subCat) => {
      if (subCat.name.toLowerCase().includes(filterText) && !catPushed) {
        filtered.push(cat);
        catPushed = true;
      }
      subCat.children.forEach((child) => {
        if (child.toLowerCase().includes(filterText) && !catPushed) {
          filtered.push(cat);
          catPushed = true;
        }
      });
    });
  });
  return filtered;
}
