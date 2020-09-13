import React from "react";
import { observable, action } from "mobx";

const color = {
  danger: "red",
  success: "green",
};

class AlertStore extends React.Component {
  @observable toggle = false;
  @observable content = "";
  @observable color = "green";
  @observable title = "";

  @action setAlertDetails = (content, title, type) => {
    this.content = content;
    this.title = title;
    this.color = color[type];
  };

  @action toggleAlert = (value) => {
    this.toggle = value;
  };

  @action resetAlert = () => {
    this.toggle = false;
    this.content = "";
    this.color = "green";
    this.title = "";
  };
}

export { AlertStore };
