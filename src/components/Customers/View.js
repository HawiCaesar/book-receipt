import React from "react";

export const View = ({ customers }) => {
  return (
    <React.Fragment>
      <h2 className="text-3xl mb-4">Customers</h2>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">No. of Books Rented</th>
            <th className="px-4 py-2">Days Renting</th>
            <th className="px-4 py-2">Particulars Per Day</th>
            <th className="px-4 py-2">Total Rent Charged</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => {
            return (
              <tr key={customer.id}>
                <td className="border px-4 py-2">{customer.name}</td>
                <td className="border px-4 py-2">
                  {customer.booksRented.length}
                </td>
                <td className="border px-4 py-2">{customer.noOfDaysToRent}</td>

                <td className="border px-4 py-2">
                  {customer.booksRented.map((book, index) => {
                    return (
                      <React.Fragment key={`${book.id}-${index}`}>
                        {book.category === "Regular" ||
                        book.category === "Novel" ? (
                          <React.Fragment>
                            <p className="pt-2 font-semibold">{book.title}</p>
                            <p className="pt-2 font-semibold">
                              At least 1 day @ ${book.day1Charge}
                            </p>

                            <p className="pt-2 font-semibold">
                              First 2 days @ ${book.day2Charge}
                            </p>

                            <p className="pt-2 font-semibold">
                              3 days and over @ ${book.chargePerDay}
                            </p>
                          </React.Fragment>
                        ) : (
                          <p className="pt-2 font-semibold">
                            {book.title} @ ${book.chargePerDay}
                          </p>
                        )}
                        <hr className="py-2" />
                      </React.Fragment>
                    );
                  })}
                </td>
                <td className="border px-4 py-2">${customer.rentCharged}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </React.Fragment>
  );
};
