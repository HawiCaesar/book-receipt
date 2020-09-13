export const rentalCalculations = (booksToBeRented, noOfdays, books) => {
  let totalPay = 0;
  let particulars = [];

  booksToBeRented.forEach((book) => {
    let rentingbookId = book;

    const bookFound = books.find((book) => book.id === rentingbookId);

    if (bookFound) {
      let bookTotal = 0;

      if (bookFound.category === "Regular" || bookFound.category === "Novel") {
        bookFound.priceForDay3AndOver = 0;
        for (let i = 1; i <= noOfdays; i++) {
          if (i === 1) {
            bookTotal += bookFound.day1Charge;
            bookFound.priceForDay1 = bookFound.day1Charge;
          } else if (i === 2) {
            bookTotal += bookFound.day2Charge;
            bookFound.priceForDay2 = bookFound.day2Charge;
          } else {
            let chargePerDay = bookFound.chargePerDay;
            bookTotal += chargePerDay;
            bookFound.priceForDay3AndOver += chargePerDay;
          }
        }
      } else {
        bookTotal = bookFound.chargePerDay * noOfdays;
      }

      bookFound.bookTotal = bookTotal;
      particulars.push(bookFound);
      totalPay = totalPay + bookTotal;
    }

    if (!bookFound) return -1;
  });

  return { totalPay, particulars };
};
