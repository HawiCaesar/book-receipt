import "@testing-library/jest-dom/extend-expect";

import React from "react";
import PropTypes from "prop-types";

import { render } from "@testing-library/react";
import { Provider } from "mobx-react";
import { BrowserRouter } from "react-router-dom";

import * as stores from "../stores";

function customRender(
  ui,
  { provideRouter = true, otherStores = {}, ...options } = {}
) {
  function Wrapper({ children }) {
    const appStores = { ...stores };
    return provideRouter ? (
      <Provider {...appStores}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    ) : (
      <Provider {...appStores}>{children}</Provider>
    );
  }
  Wrapper.propTypes = {
    children: PropTypes.node,
  };

  return render(ui, { wrapper: Wrapper, ...options });
}

export * from "@testing-library/react";

export { customRender as reactTestingRender };
