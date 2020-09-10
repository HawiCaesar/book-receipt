import axios from "axios";
import { observable, action } from "mobx";

const fetchBooks = () => {
  return axios
    .get(
      "https://my-json-server.typicode.com/HawiCaesar/jsonplaceholders-demo/books"
    )
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log("Error Fetching api data", error);
    });
};

export class BookStoreAPI {
  @observable books = [];
  @observable customers = [];
  @observable rentals = [];
  @observable loading = true;

  @action loadBooks = async () => {
    this.books = await fetchBooks();
    this.loading = false;
  };
}
