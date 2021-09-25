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
): CheckedList {
  const checked: CheckedList = {};
  if (!text || text === "") {
    categories.forEach((cat) => {
      checked[cat.categoryName] = true;
      cat.subCategoriesList.forEach((sub) => {
        checked[`${cat.categoryName} ${sub.name}`] = true;
        sub.children.forEach((child) => {
          checked[`${cat.categoryName} ${sub.name} ${child}`] = true;
        });
      });
    });
    return checked;
  }
  const filterText = text.toLowerCase();
  categories.forEach((cat) => {
    checked[cat.categoryName] = cat.categoryName
      .toLowerCase()
      .includes(filterText);
    cat.subCategoriesList.forEach((sub) => {
      if (sub.name.toLowerCase().includes(filterText)) {
        checked[`${cat.categoryName} ${sub.name}`] = true;
        checked[cat.categoryName] = true;
      } else {
        checked[`${cat.categoryName} ${sub.name}`] = false;
      }
      sub.children.forEach((child) => {
        if (child.toLowerCase().includes(filterText)) {
          checked[`${cat.categoryName} ${sub.name} ${child}`] = true;
          checked[`${cat.categoryName} ${sub.name}`] = true;
          checked[cat.categoryName] = true;
        } else {
          checked[`${cat.categoryName} ${sub.name} ${child}`] = false;
        }
      });
    });
  });
  return checked;
}

export function filterCategories(
  checked: CheckedList,
  categories: ExpCategory[]
): ExpCategory[] {
  const filtered: ExpCategory[] = [];
  categories.forEach((cat) => {
    let pushed = false;
    if (checked[cat.categoryName]) {
      filtered.push(cat);
      pushed = true;
    }
    if (!pushed) {
      cat.subCategoriesList.forEach((sub) => {
        if (checked[`${cat.categoryName} ${sub.name}`]) {
          filtered.push(cat);
          pushed = true;
        }
        if (!pushed) {
          sub.children.forEach((child) => {
            if (checked[`${cat.categoryName} ${sub.name} ${child}`]) {
              filtered.push(cat);
              pushed = true;
            }
          });
        }
      });
    }
  });
  return filtered;
}

export function allChecked(checked: CheckedList): boolean {
  for (const key of Object.keys(checked)) {
    if (!checked[key]) {
      return false;
    }
  }
  return true;
}
