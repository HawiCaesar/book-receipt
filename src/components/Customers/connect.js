import React from "react";
import { observer, inject } from "mobx-react";
import { ErrorComponent } from "../ErrorComponent";
import { View } from "./View";

@inject("store")
@observer
class Customers extends React.Component {
  async componentDidMount() {
    const {
      store: { loadCustomers },
    } = this.props;

    await loadCustomers("customers");
  }

  render() {
    const {
      store: { loading, customers, hasError, error },
    } = this.props;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (hasError) {
      return <ErrorComponent error={error} />;
    }

    return <View customers={customers} />;
  }
}

export { Customers };
