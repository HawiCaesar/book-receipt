import React from "react";
import { observer, inject } from "mobx-react";

@inject("store")
@observer
class Alert extends React.Component {
  render() {
    const {
      store: {
        alert: { toggle, content, color, title },
      },
    } = this.props;
    return toggle ? (
      <div role="alert">
        <div className={`mt-12 bg-${color}-500 text-white font-bold rounded-t px-4 py-2`}>
        {title}
        </div>
        <div className={`border border-t-0 border-${color}-400 rounded-b bg-${color}-100 px-4 py-3 text-${color}-700`}>
          <p>{content}</p>
        </div>
      </div>
    ) : (
      <div data-test-id="no-Alert" />
    );
  }
}

export { Alert };
