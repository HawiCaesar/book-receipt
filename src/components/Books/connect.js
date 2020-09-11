import React from "react";
import { observer, inject } from "mobx-react";
import { ErrorComponent } from "../ErrorComponent";
import { View } from "./View";

@inject("store")
@observer
class Books extends React.Component {

  async componentDidMount() {
    const {
      store: { loadBooks },
    } = this.props;

    await loadBooks('books');
  }

  render() {
    const {
      store: { loading, books, hasError, error },
    } = this.props;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (hasError) {
      return <ErrorComponent error={error} />;
    }

    console.log(books, loading);
    return <View books={books} />;
  }
}

export { Books };
