import React from "react";
import { reactTestingRender } from "test-utils";
import { Customers } from "./connect";

const store = {
  books: {
    loadBooks: jest.fn(),
    customers: [
      {
        id: 1,
        name: "Test customer 1",
        booksRented: [1, 3],
        noOfDaysToRent: 5,
        rentCharged: 10,
      },
      {
        id: 2,
        name: "Test customer 2",
        booksRented: [2, 3],
        noOfDaysToRent: 2,
        rentCharged: 4,
      },
    ],
    loading: false,
    hasError: false,
    error: {},
  },
};

describe("Customers View test", () => {
  it("should allow the user to see the customers list", () => {
    const { getByText } = reactTestingRender(<Customers store={store} />);

    expect(getByText("Name")).toBeInTheDocument();
    expect(getByText("No. of Books Rented")).toBeInTheDocument();

    expect(getByText("Test customer 1")).toBeInTheDocument();
    expect(getByText(10)).toBeInTheDocument(); // rent charged

    expect(getByText("Test customer 2")).toBeInTheDocument();
    expect(getByText(4)).toBeInTheDocument(); // rent charged
  });

  it("should show me the loading text on the customer page", () => {
    const loadingStore = store;
    loadingStore.books.loading = true;

    const { getByText } = reactTestingRender(<Customers store={loadingStore} />);

    expect(getByText("Loading...")).toBeInTheDocument();
  });

  it("should show me an error when loaiding customers", () => {
    const customerError = store;
    customerError.books.customers = [];
    customerError.books.loading = false;
    customerError.books.hasError = true;
    customerError.books.error.message = "404 Route not found";

    const { getByText } = reactTestingRender(
      <Customers store={customerError} />
    );

    expect(getByText("Something went wrong")).toBeInTheDocument();
    expect(getByText("404 Route not found")).toBeInTheDocument();
  });
});
