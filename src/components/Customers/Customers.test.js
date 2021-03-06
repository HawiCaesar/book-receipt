import React from "react";
import { reactTestingRender } from "test-utils";
import { Customers } from "./connect";

const store = {
  books: {
    loadCustomers: jest.fn(),
    customers: [
      {
        id: 1,
        name: "Test customer 1",
        booksRented: [
          { id: 2, title: "Animal Farm", chargePerDay: 1.5 },
          { id: 5, title: "Aminata", chargePerDay: 3 },
        ],
        noOfDaysToRent: 5,
        rentCharged: 22.5,
      },
      {
        id: 2,
        name: "Test customer 2",
        booksRented: [
          {
            id: 2,
            title: "Figuring",
            category: "Regular",
            chargePerDay: 1.5,
            day1Charge: 2,
            day2Charge: 1,
          },
        ],
        noOfDaysToRent: 2,
        rentCharged: 3,
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
    expect(getByText("Aminata @ $3")).toBeInTheDocument();
    expect(getByText("Animal Farm @ $1.5")).toBeInTheDocument();
    expect(getByText("$22.5")).toBeInTheDocument(); // total Rent

    expect(getByText("Test customer 2")).toBeInTheDocument();
    expect(getByText("Figuring")).toBeInTheDocument();
    expect(getByText("At least 1 day @ $2")).toBeInTheDocument();
    expect(getByText("First 2 days @ $1")).toBeInTheDocument();
    expect(getByText("3 days and over @ $1.5")).toBeInTheDocument();
    expect(getByText("$3")).toBeInTheDocument(); // total rent
  });

  it("should show me the loading text on the customer page", () => {
    const loadingStore = store;
    loadingStore.books.loading = true;

    const { getByText } = reactTestingRender(
      <Customers store={loadingStore} />
    );

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
