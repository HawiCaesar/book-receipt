import React from "react";
import { reactTestingRender } from "test-utils";
import { NavBar } from "./index";

describe("NavBar test", () => {
  it("should show the all NavBar Links", () => {
    const { getByText } = reactTestingRender(<NavBar />);

    expect(getByText("Books")).toBeInTheDocument();
    expect(getByText("Customers")).toBeInTheDocument();
    expect(getByText("Rentals")).toBeInTheDocument();
  });
});
