import React from "react";
import { reactTestingRender } from "test-utils";
import { Books } from "./connect";

const store = {
  books: {
    loadBooks: jest.fn(),
    books: [
      {
        id: 1,
        title: "Pipers at the gates dawn",
        author: "Johnathan Cott",
        chargePerDay: 1,
        category: "Novel",
        chargePerDay: 1,
        day1Charge: 4.5,
        day2Charge: 4.5,
      },
      {
        id: 2,
        title: "Figuring",
        author: "Maria Popova",
        category: "Regular",
        chargePerDay: 1.5,
        day1Charge: 2,
        day2Charge: 1,
      },
    ],
    loading: false,
    hasError: false,
    error: {},
  },
};

describe("Book View test", () => {
  it("should allow the user to see the books list", () => {
    const { getByText } = reactTestingRender(<Books store={store} />);

    expect(getByText("Books")).toBeInTheDocument();
    expect(getByText("Title")).toBeInTheDocument();
    expect(getByText("Author")).toBeInTheDocument();
    expect(getByText("Charges")).toBeInTheDocument();

    expect(getByText("Figuring")).toBeInTheDocument();
    expect(getByText("At least 1 day @ $2")).toBeInTheDocument();
    expect(getByText("First 2 days @ $1")).toBeInTheDocument();
    expect(getByText("3 days and over @ $1.5")).toBeInTheDocument();
    expect(getByText("Maria Popova")).toBeInTheDocument();
  });

  it("should show me the loading text", () => {
    const loadingStore = store;
    loadingStore.books.loading = true;

    const { getByText } = reactTestingRender(<Books store={loadingStore} />);

    expect(getByText("Loading...")).toBeInTheDocument();
  });

  it("should show me an error when loading books", () => {
    const bookStoreWithError = store;
    bookStoreWithError.books.books = [];
    bookStoreWithError.books.loading = false;
    bookStoreWithError.books.hasError = true;
    bookStoreWithError.books.error.message = "404 Route not found";

    const { getByText } = reactTestingRender(
      <Books store={bookStoreWithError} />
    );

    expect(getByText("Something went wrong")).toBeInTheDocument();
    expect(getByText("404 Route not found")).toBeInTheDocument();
  });
});
