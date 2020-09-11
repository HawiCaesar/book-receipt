import React from "react";
import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <ul className="flex">
      <li className="mr-6">
        <Link to="/" className="text-blue-500 hover:text-blue-800">
          Books
        </Link>
      </li>
      <li className="mr-6">
        <Link to="/customers" className="text-blue-500 hover:text-blue-800">
          Customers
        </Link>
      </li>
      <li className="mr-6">
        <Link to="/rentals" className="text-blue-500 hover:text-blue-800">
          Rentals
        </Link>
      </li>
    </ul>
  );
};
