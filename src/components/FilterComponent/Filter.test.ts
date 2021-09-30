import {
  allChecked,
  filterCategories,
  filterCategoriesByText,
  filterTransactionsByCheckList,
  filterTransactionsByText,
} from "./Filter";

describe("testing allChecked function", () => {
  test("its a function", () => {
    expect(allChecked).toBeInstanceOf(Function);
  });
  test("checking", () => {
    expect(allChecked({ "1": true, "2": true })).toBeTruthy();
    expect(allChecked({ "1": true, "2": false, "3": true })).toBeFalsy();
  });
});

describe("testing filterTransactionsByCheckList function", () => {
  const transactions: Transaction[] = [
    {
      amount: 0,
      type: "expense",
      uuid: "123",
      date: 0,
      description: "test-123",
      category: "test-123-1",
      subcategory: "test-123-2",
      childSubCategory: "test-123-3",
    },
    {
      amount: 0,
      type: "expense",
      uuid: "124",
      date: 0,
      description: "test-124",
      category: "test-124-1",
      subcategory: "test-124-2",
      childSubCategory: "test-124-3",
    },
  ];
  test("its a function", () => {
    expect(filterTransactionsByCheckList).toBeInstanceOf(Function);
  });
  [
    [{}, 0],
    [{ "test-123-1": false }, 0],
    [{ "test-123-1": true }, 1],
    [{ "test-123-1 test-123-2": true }, 1],
    [{ "test-123-1 test-123-2 test-123-3": true }, 1],
    [{ "test-124-1": true }, 1],
    [{ "test-124-1 test-124-2": true }, 1],
    [{ "test-124-1 test-124-2 test-124-3": true }, 1],
    [
      {
        "test-124-1 test-124-2 test-124-3": true,
        "test-123-1 test-123-2 test-123-3": true,
      },
      2,
    ],
    [
      {
        "test-123-1 test-123-2": true,
        "test-124-1 test-124-2": false,
        "test-124-1 test-124-2 test-124-3": true,
        "test-123-1 test-123-2 test-123-3": true,
      },
      2,
    ],
    [
      {
        "test-123-1": true,
        "test-124-1": true,
        "test-123-1 test-123-2": true,
        "test-124-1 test-124-2": true,
        "test-124-1 test-124-2 test-124-3": true,
        "test-123-1 test-123-2 test-123-3": true,
      },
      2,
    ],
    [
      {
        "test-123-1": true,
        "test-124-1": true,
        "test-123-1 test-123-2": true,
        "test-124-1 test-124-2": true,
        "test-124-1 test-124-2 test-124-3": false,
        "test-123-1 test-123-2 test-123-3": false,
      },
      2,
    ],
    [
      {
        "test-123-1": true,
        "test-124-1": true,
        "test-123-1 test-123-2": false,
        "test-124-1 test-124-2": false,
        "test-124-1 test-124-2 test-124-3": false,
        "test-123-1 test-123-2 test-123-3": false,
      },
      2,
    ],
    [
      {
        "test-123-1": true,
        "test-124-1": false,
        "test-123-1 test-123-2": true,
        "test-124-1 test-124-2": false,
        "test-124-1 test-124-2 test-124-3": false,
        "test-123-1 test-123-2 test-123-3": true,
      },
      1,
    ],
    [
      {
        "test-123-1": true,
        "test-124-1": false,
        "test-123-1 test-123-2": true,
        "test-124-1 test-124-2": true,
        "test-124-1 test-124-2 test-124-3": false,
        "test-123-1 test-123-2 test-123-3": true,
      },
      2,
    ],
  ].forEach(([checkList, count]) => {
    test(`for '${JSON.stringify(checkList)}' must be length='${count}'`, () => {
      expect(
        filterTransactionsByCheckList(checkList as CheckedList, transactions)
      ).toHaveLength(count as number);
    });
  });
});

describe("testing filterCategories function", () => {
  const testCategoryList = [
    {
      categoryName: "test",
      subCategoriesList: [
        {
          name: "test-sab",
          children: ["test-sub-child"],
        },
      ],
    },
    {
      categoryName: "test-2",
      subCategoriesList: [
        {
          name: "test-sab-2",
          children: ["test-sub-child-2"],
        },
      ],
    },
    {
      categoryName: "test-3",
      subCategoriesList: [
        {
          name: "test-sab-3",
          children: ["test-sub-child-3"],
        },
      ],
    },
  ];
  test("its a function", () => {
    expect(filterCategories).toBeInstanceOf(Function);
  });
  [
    [{}, 0],
    [{ test: false }, 0],
    [{ test: true }, 1],
    [{ "test test-sab": true }, 1],
    [{ "test test-sab test-sub-child": true }, 1],
    [{ "test-2 test-sab-2 test-sub-child-2": true }, 1],
    [
      {
        "test test-sab test-sub-child": true,
        "test-2 test-sab-2 test-sub-child-2": true,
      },
      2,
    ],
    [
      {
        "test test-sab test-sub-child": true,
        "test-2 test-sab-2 test-sub-child-2": true,
        "test-3 test-sab-3 test-sub-child-3": true,
      },
      3,
    ],
    [
      {
        "test test-sab": true,
        "test-2 test-sab-2": true,
        "test-3 test-sab-3": true,
      },
      3,
    ],
    [
      {
        "test test-sab": true,
        "test-2 test-sab-2": false,
        "test-3 test-sab-3": true,
      },
      2,
    ],
    [
      {
        "test test-sab": false,
        "test-2": true,
        "test-3 test-sab-3 test-sub-child-3": true,
      },
      2,
    ],
  ].forEach(([checkList, count]) => {
    test(`for '${JSON.stringify(checkList)}' must be length='${count}'`, () => {
      expect(
        filterCategories(checkList as CheckedList, testCategoryList)
      ).toHaveLength(count as number);
    });
  });
});

describe("testing filterCategoriesByText function", () => {
  const testCategoryList = [
    {
      categoryName: "test",
      subCategoriesList: [
        {
          name: "test-sab",
          children: ["test-sub-child"],
        },
      ],
    },
    {
      categoryName: "test-2",
      subCategoriesList: [
        {
          name: "test-sab-2",
          children: ["test-sub-child-3"],
        },
      ],
    },
    {
      categoryName: "test-3",
      subCategoriesList: [
        {
          name: "test-sab-3",
          children: ["test-sub-child-3"],
        },
      ],
    },
  ];
  test("its a function", () => {
    expect(filterCategoriesByText).toBeInstanceOf(Function);
  });
  [
    [
      "r4545",
      {
        test: false,
        "test test-sab": false,
        "test test-sab test-sub-child": false,
        "test-2": false,
        "test-2 test-sab-2": false,
        "test-2 test-sab-2 test-sub-child-3": false,
        "test-3": false,
        "test-3 test-sab-3": false,
        "test-3 test-sab-3 test-sub-child-3": false,
      },
    ],
    [
      "",
      {
        test: true,
        "test test-sab": true,
        "test test-sab test-sub-child": true,
        "test-2": true,
        "test-2 test-sab-2": true,
        "test-2 test-sab-2 test-sub-child-3": true,
        "test-3": true,
        "test-3 test-sab-3": true,
        "test-3 test-sab-3 test-sub-child-3": true,
      },
    ],
    [
      "test",
      {
        test: true,
        "test test-sab": true,
        "test test-sab test-sub-child": true,
        "test-2": true,
        "test-2 test-sab-2": true,
        "test-2 test-sab-2 test-sub-child-3": true,
        "test-3": true,
        "test-3 test-sab-3": true,
        "test-3 test-sab-3 test-sub-child-3": true,
      },
    ],
    [
      "test-2",
      {
        test: false,
        "test test-sab": false,
        "test test-sab test-sub-child": false,
        "test-2": true,
        "test-2 test-sab-2": false,
        "test-2 test-sab-2 test-sub-child-3": false,
        "test-3": false,
        "test-3 test-sab-3": false,
        "test-3 test-sab-3 test-sub-child-3": false,
      },
    ],
    [
      "test-sab",
      {
        test: true,
        "test test-sab": true,
        "test test-sab test-sub-child": false,
        "test-2": true,
        "test-2 test-sab-2": true,
        "test-2 test-sab-2 test-sub-child-3": false,
        "test-3": true,
        "test-3 test-sab-3": true,
        "test-3 test-sab-3 test-sub-child-3": false,
      },
    ],
    [
      "test-sub",
      {
        test: true,
        "test test-sab": true,
        "test test-sab test-sub-child": true,
        "test-2": true,
        "test-2 test-sab-2": true,
        "test-2 test-sab-2 test-sub-child-3": true,
        "test-3": true,
        "test-3 test-sab-3": true,
        "test-3 test-sab-3 test-sub-child-3": true,
      },
    ],
    [
      "test-new",
      {
        test: false,
        "test test-sab": false,
        "test test-sab test-sub-child": false,
        "test-2": false,
        "test-2 test-sab-2": false,
        "test-2 test-sab-2 test-sub-child-3": false,
        "test-3": false,
        "test-3 test-sab-3": false,
        "test-3 test-sab-3 test-sub-child-3": false,
      },
    ],
    [
      "test-sub-child-3",
      {
        test: false,
        "test test-sab": false,
        "test test-sab test-sub-child": false,
        "test-2": true,
        "test-2 test-sab-2": true,
        "test-2 test-sab-2 test-sub-child-3": true,
        "test-3": true,
        "test-3 test-sab-3": true,
        "test-3 test-sab-3 test-sub-child-3": true,
      },
    ],
  ].forEach(([text, count]) => {
    test(`for text='${text}'`, () => {
      expect(
        filterCategoriesByText(text as string, testCategoryList)
      ).toStrictEqual(count);
    });
  });
});

describe("testing filterTransactionsByText function", () => {
  const transactions: Transaction[] = [
    {
      amount: 0,
      type: "expense",
      uuid: "123",
      date: 0,
      description: "test-123",
      category: "test-123-1",
      subcategory: "test-123-2",
      childSubCategory: "test-123-3",
    },
    {
      amount: 0,
      type: "expense",
      uuid: "124",
      date: 0,
      description: "test-124",
      category: "test-124-1",
      subcategory: "test-124-2",
      childSubCategory: "test-124-3",
    },
    {
      amount: 0,
      type: "expense",
      uuid: "125",
      date: 0,
      description: "test-125",
      category: "test-123-1",
      subcategory: "test-124-2",
      childSubCategory: "test-123-3",
    },
  ];
  test("its a function", () => {
    expect(filterTransactionsByText).toBeInstanceOf(Function);
  });
  [
    ["", 3],
    ["test", 3],
    ["test-124", 2],
    ["test-124-3", 1],
    ["test-new", 0],
    ["123", 2],
  ].forEach(([txt, count]) => {
    test(`for '${txt}', must be length='${count}'`, () => {
      expect(
        filterTransactionsByText(txt as string, transactions)
      ).toHaveLength(count as number);
    });
  });
});
