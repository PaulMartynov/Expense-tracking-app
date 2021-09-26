import { sortTransactionsBy } from "./Sort";

const testData: Transaction[] = [
  {
    amount: 200,
    type: "expense",
    uuid: "125",
    date: new Date().getTime() - 5000,
    description: "test-125",
    category: "b",
    subcategory: "c",
    childSubCategory: "d",
  },
  {
    amount: 100,
    type: "expense",
    uuid: "123",
    date: new Date().getTime(),
    description: "test-125",
    category: "c",
    subcategory: "b",
    childSubCategory: "e",
  },
  {
    amount: 0,
    type: "expense",
    uuid: "124",
    date: new Date().getTime() - 100000,
    description: "test-123",
    category: "a",
    subcategory: "b",
    childSubCategory: "e",
  },
  {
    amount: 20,
    type: "expense",
    uuid: "128",
    date: new Date().getTime() - 100,
    description: "test-123",
    category: "z",
    subcategory: "b",
    childSubCategory: "e",
  },
  {
    amount: 300,
    type: "expense",
    uuid: "126",
    date: new Date().getTime() - 100000,
    description: "test-123",
    category: "a",
    subcategory: "b",
    childSubCategory: "e",
  },
  {
    amount: 100,
    type: "expense",
    uuid: "127",
    date: new Date().getTime(),
    description: "test-125",
    category: "b",
    subcategory: "b",
    childSubCategory: "e",
  },
];

describe("testing sortTransactionsBy function", () => {
  test("it is a function", () => {
    expect(sortTransactionsBy).toBeInstanceOf(Function);
  });
  test("sorting", () => {
    expect(sortTransactionsBy("DATE-FROM-NEW", testData)[0].uuid).toBe("123");
    expect(sortTransactionsBy("DATE-FROM-OLD", testData)[0].uuid).toBe("124");
    expect(sortTransactionsBy("AMOUNT-FROM-BIGGEST", testData)[0].uuid).toBe(
      "126"
    );
    expect(sortTransactionsBy("AMOUNT-FROM-SMALL", testData)[0].uuid).toBe(
      "124"
    );
    expect(
      sortTransactionsBy("DESCRIPTION-FORM-A-TO-Z", testData)[0].uuid
    ).toBe("124");
    expect(
      sortTransactionsBy("DESCRIPTION-FORM-Z-TO-A", testData)[0].uuid
    ).toBe("123");
    expect(sortTransactionsBy("CATEGORY-FORM-A-TO-Z", testData)[0].uuid).toBe(
      "124"
    );
    expect(sortTransactionsBy("CATEGORY-FORM-Z-TO-A", testData)[0].uuid).toBe(
      "128"
    );
  });
});
