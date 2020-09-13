import { BookStoreAPI } from "./BookStoreAPI";
import { AlertStore } from "./AlertStore";

export const books = new BookStoreAPI();
export const alert = new AlertStore();
