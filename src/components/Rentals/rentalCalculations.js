export const rentalCalculations = (booksToBeRented, noOfdays, books) => {
  let totalPay = 0;
  let particulars = [];

  booksToBeRented.forEach((book) => {
    let rentingbookId = book;

    const bookFound = books.find((book) => book.id === rentingbookId);

    if (bookFound) {
      let bookTotal = bookFound.chargePerDay * noOfdays;
      particulars.push(bookFound);
      totalPay = totalPay + bookTotal;
    }

    if (!bookFound) return -1;
  });

  return { totalPay, particulars };
};
