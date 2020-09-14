import React from "react";
import { reactTestingRender } from "test-utils";
import { Alert } from "./Alert";

const store = {
  books: {
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
  },
  alert: {
    toggle: true,
    content: "Data is saved",
    color: "green",
    title: "Save Successful",
  },
};

describe("Alert component test", () => {
  it("should show the Alert component", () => {
    const { getByText } = reactTestingRender(<Alert store={store} />);

    expect(getByText("Save Successful")).toBeInTheDocument();
    expect(getByText("Data is saved")).toBeInTheDocument();
  });

  it("should not show the Alert component", () => {
    const noAlertStore = store;
    noAlertStore.alert.toggle = false;
    const { getByTestId } = reactTestingRender(<Alert store={noAlertStore} />);

    expect(getByTestId("no-Alert")).toBeInTheDocument();
  });

  it("should not show the Alert component", () => {
    const Component = () => {
      return <div>Custom component</div>;
    };
    const componentInAlert = store;
    componentInAlert.alert.toggle = true;
    componentInAlert.alert.content = <Component />;
    const { getByText } = reactTestingRender(
      <Alert store={componentInAlert} />
    );

    expect(getByText("Custom component")).toBeInTheDocument();
  });
});
