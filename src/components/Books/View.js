import React from "react";

export const View = ({ books }) => {
  return (
    <React.Fragment>
      <h2 className="text-3xl mb-4">Books</h2>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Author</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Charges</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => {
            return (
              <tr key={book.id}>
                <td className="border px-4 py-2">{book.title}</td>
                <td className="border px-4 py-2">{book.author}</td>
                <td className="border px-4 py-2">{book.category}</td>
                <td className="border px-4 py-2">
                  {book.category === "Regular" || book.category === "Novel" ? (
                    <React.Fragment>
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
                    `$${book.chargePerDay}`
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </React.Fragment>
  );
};
