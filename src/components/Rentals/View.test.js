import React from "react";
import { reactTestingRender, fireEvent, waitForElement } from "test-utils";
import { Rentals } from "./View";

const store = {
  books: {
    loadBooks: jest.fn(),
    postRentalCharge: jest.fn(),
    books: [
      {
        id: 1,
        title: "Pipers at the gates dawn",
        author: "Johnathan Cott",
        category: "Novel",
        chargePerDay: 1.5,
        day1Charge: 4.5,
        day2Charge: 4.5,
      },
      {
        id: 2,
        title: "Figuring",
        author: "Maria Popova",
        chargePerDay: 1.5,
        category: "Regular",
        day1Charge: 2,
        day2Charge: 1,
      },
      {
        id: 3,
        title: "Animal Farm",
        author: "George Orwell",
        chargePerDay: 3,
        category: "Fiction",
      },
    ],
    loading: false,
    hasError: false,
    error: {},
  },
  alert: {
    toggle: false,
    content: "",
    color: "green",
    title: "",
    setAlertDetails: jest.fn(),
    toggleAlert: jest.fn(),
  },
};

describe("Rental Charge View test", () => {
  // Silence console warning as this version CRA uses react-dom < 16.9
  const originalError = console.error;
  beforeAll(() => {
    console.error = (...args) => {
      if (/Warning.*not wrapped in act/.test(args[0])) {
        return;
      }
      originalError.call(console, ...args);
    };
  });

  afterAll(() => {
    console.error = originalError;
  });

  it("should allow the user to see the rent charge from", () => {
    const { getByText, getAllByTestId } = reactTestingRender(
      <Rentals store={store} />
    );

    expect(getByText("Name")).toBeInTheDocument();
    expect(getByText("Number of days renting")).toBeInTheDocument();
    expect(getByText("Available Books")).toBeInTheDocument();

    expect(getAllByTestId("booksRented-test").length).toEqual(3);
  });

  it("should allow the user to add a customers rental charge", () => {
    const {
      getByText,
      getByLabelText,
      getAllByTestId,
      getByTestId,
    } = reactTestingRender(<Rentals store={store} />);

    const inputCustomerName = getByLabelText("customer-name");
    fireEvent.change(inputCustomerName, { target: { value: "Jason Bourne" } });
    expect(inputCustomerName.value).toBe("Jason Bourne");

    const inputRentingDays = getByLabelText("number-of-days-renting");
    fireEvent.change(inputRentingDays, { target: { value: 5 } });
    expect(inputRentingDays.value).toBe("5");

    // first book checked
    const firstBook = getAllByTestId("booksRented-test")[0];
    fireEvent.click(firstBook);
    expect(firstBook.checked).toEqual(true);

    // third book checked
    const secondBook = getAllByTestId("booksRented-test")[2];
    fireEvent.click(secondBook);
    expect(secondBook.checked).toEqual(true);

    const submitDataButton = getByTestId("submit-rental-charge");
    fireEvent.click(submitDataButton);

    waitForElement(() => {
      // succesful
      expect(
        getByText(`Jason Bourne's Total rental charge is is $28.5 for 5 days`)
      ).toBeInTheDocument();

      expect(getByText(`Pipers at the gates dawn`)).toBeInTheDocument();
      expect(getByText("At least 1 day @ $4.5")).toBeInTheDocument();
      expect(getByText("First 2 days @ $4.5")).toBeInTheDocument();
      expect(getByText("3 days and over @ $1.5")).toBeInTheDocument();

      expect(getByText(`Animal Farm @ $3, totalling $15`)).toBeInTheDocument();

      expect(getByTestId("alert-message-green")).toBeInTheDocument();
      expect(store.books.postRentalCharge).toBeHaveBeenCalled();
    });
  });

  it("should show an error when the customers name is not filled", async () => {
    const { getByLabelText, getAllByTestId, getByTestId } = reactTestingRender(
      <Rentals store={store} />
    );

    const inputCustomerName = getByLabelText("customer-name");
    fireEvent.change(inputCustomerName, { target: { value: "" } });

    const inputRentingDays = getByLabelText("number-of-days-renting");
    fireEvent.change(inputRentingDays, { target: { value: 5 } });

    const checkBook = getAllByTestId("booksRented-test")[1];
    fireEvent.click(checkBook);

    const submitDataButton = getByTestId("submit-rental-charge");
    fireEvent.click(submitDataButton);

    waitForElement(() =>
      expect(getByTestId("error-customer-name")).toBeInTheDocument()
    );
  });

  it("should show an error when the customers days for renting the books is not filled", async () => {
    const { getByLabelText, getAllByTestId, getByTestId } = reactTestingRender(
      <Rentals store={store} />
    );

    const inputCustomerName = getByLabelText("customer-name");
    fireEvent.change(inputCustomerName, { target: { value: "Kevin Njoroge" } });

    const inputRentingDays = getByLabelText("number-of-days-renting");
    fireEvent.change(inputRentingDays, { target: { value: "" } });

    const checkBook = getAllByTestId("booksRented-test")[1];
    fireEvent.click(checkBook);

    const submitDataButton = getByTestId("submit-rental-charge");
    fireEvent.click(submitDataButton);

    waitForElement(() =>
      expect(getByTestId("error-day-for-rent")).toBeInTheDocument()
    );
  });

  it("should show an alert when the customer has not picked a book", () => {
    const { getByText, getByLabelText, getByTestId } = reactTestingRender(
      <Rentals store={store} />
    );

    const inputCustomerName = getByLabelText("customer-name");
    fireEvent.change(inputCustomerName, { target: { value: "Allen Brown" } });

    const inputRentingDays = getByLabelText("number-of-days-renting");
    fireEvent.change(inputRentingDays, { target: { value: 5 } });

    const submitDataButton = getByTestId("submit-rental-charge");
    fireEvent.click(submitDataButton);

    waitForElement(() => {
      expect(getByText(`Please pick an available book`)).toBeInTheDocument();
      expect(getByTestId("alert-message-red")).toBeInTheDocument();
    });
  });
});
