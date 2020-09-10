import React from "react";
import { observer, inject } from "mobx-react";

@inject("store")
@observer
class Books extends React.Component {
  async componentDidMount() {
    const {
      store: { loadBooks },
    } = this.props;

    await loadBooks();
  }

  render() {
    const {
      store: { loading, books },
    } = this.props;

    if (loading) {
      return <div>Loading...</div>;
    }
    console.log(books, loading);
    return <h2>Books</h2>;
  }
}

export { Books };
