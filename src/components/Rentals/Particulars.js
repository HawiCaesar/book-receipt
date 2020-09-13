import React from "react";

export const Particulars = ({ name, totalPay, noOfDays, booksRented }) => {
  return (
    <React.Fragment>
      <p className="py-2 font-semibold">{`${name}'s Total rental charge is $${totalPay} for ${noOfDays} days`}</p>
      {booksRented.map((book, index) => {
        return (
          <React.Fragment key={`${book.id}-${index}`}>
            {book.category === "Regular" || book.category === "Novel" ? (
              <React.Fragment>
                <p className="pt-2 font-semibold">{book.title}</p>
                <ol>
                  <li className="pt-2">
                    At least 1 day @ ${book.day1Charge}, totalling $
                    {book.priceForDay1}
                  </li>

                  <li className="pt-2">
                    First 2 days @ ${book.priceForDay2}, totalling $
                    {book.priceForDay2}
                  </li>
                  <li className="pt-2">
                    3 days and over @ ${book.chargePerDay}, totalling $
                    {book.priceForDay3AndOver}
                  </li>
                </ol>
              </React.Fragment>
            ) : (
              <p className="pt-2 font-semibold">
                {book.title} @ ${book.chargePerDay}, totalling ${book.bookTotal}
              </p>
            )}
            <hr className="py-2" />
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
};
