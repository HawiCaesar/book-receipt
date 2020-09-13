import React from "react";

export const Particulars = ({ name, totalPay, booksRented }) => {
  return (
    <React.Fragment>
      <p className="py-2">{`${name}'s rental charge is $${totalPay}`}</p>
      {booksRented.map((book, index) => {
        return (
          <React.Fragment key={`${book.id}-${index}`}>
            <p className="pt-2 font-semibold">
              {book.title} @ ${book.chargePerDay} / Day
            </p>
            <hr className="py-2" />
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
};
