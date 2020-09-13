import axios from "axios";
import { observable, action } from "mobx";

const fetchResource = (resouceString) => {
  return axios
    .get(
      `https://my-json-server.typicode.com/HawiCaesar/jsonplaceholders-demo/${resouceString}`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

const postResource = (resouceString, data) => {
  return axios
    .post(
      `https://my-json-server.typicode.com/HawiCaesar/jsonplaceholders-demo/${resouceString}`, data
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

export class BookStoreAPI {
  @observable books = [];
  @observable customers = [];
  @observable rentals = [];
  @observable loading = true;
  @observable hasError = false;
  @observable error = {};

  @action loadBooks = async (resource) => {
    try {
      this.books = await fetchResource(resource);
    } catch (error) {
      this.hasError = true;
      this.error = error;
    } finally {
      this.loading = false;
    }
  };

  @action loadCustomers = async (resource) => {
    try {
      this.customers = await fetchResource(resource);
    } catch (error) {
      this.hasError = true;
      this.error = error;
    } finally {
      this.loading = false;
    }
  };

  @action postRentalCharge = async (path, data) => {
    try {
      await postResource(path, data);
    } catch (error) {
      this.hasError = true;
      this.error = error;
    } 
  }
}
