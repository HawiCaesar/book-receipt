import React from "react";
import { Formik, Field, FieldArray } from "formik";
import { observer, inject } from "mobx-react";
import { rentalCalculations } from "./rentalCalculations";
import { Particulars } from "./Particulars";

@inject("store")
@observer
class Rentals extends React.Component {
  async componentDidMount() {
    const {
      store: {
        books: { loadBooks },
      },
    } = this.props;

    await loadBooks("books");
  }
  render() {
    const {
      store: {
        books: { books },
      },
    } = this.props;
    return (
      <div>
        <h2 className="text-3xl mb-4">Rentals</h2>
        <Formik
          initialValues={{
            name: "",
            noOfDaysToRent: 1,
            booksRented: [],
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const {
              store: {
                alert: { setAlertDetails, toggleAlert },
                books: { books, postRentalCharge },
              },
            } = this.props;

            if (!values.booksRented.length) {
              setAlertDetails(
                "Please pick an available book",
                "Error when submitting information",
                "danger"
              );
              toggleAlert(true);
              return;
            }

            const { totalPay, particulars } = rentalCalculations(
              values.booksRented,
              values.noOfDaysToRent,
              books
            );

            if (totalPay === -1) {
              setAlertDetails(
                `Something went wrong`,
                "Error when calculating rental charge",
                "danger"
              );
              toggleAlert(true);
            }

            const data = {
              rentCharged: totalPay,
              booksRented: particulars,
              noOfDaysToRent: values.noOfDaysToRent,
              name: values.name,
            };

            try {
              await postRentalCharge("customers", data);

              setAlertDetails(
                <Particulars
                  totalPay={totalPay}
                  name={values.name}
                  booksRented={particulars}
                  noOfDays={values.noOfDaysToRent}
                />,
                "Save Successful",
                "success"
              );
              toggleAlert(true);

              setTimeout(() => {
                //resetForm({});
                toggleAlert(false);
              }, 10000);
            } catch (error) {
              setTimeout(() => {
                console.log(error);
                setAlertDetails(
                  error.message ? error.message : "Something went wrong",
                  "Error when submitting information",
                  "danger"
                );
                setSubmitting(false);
              }, 5000);
            }
          }}
        >
          {(props) => {
            return (
              <form className="w-full max-w-lg" onSubmit={props.handleSubmit}>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-first-name"
                    >
                      Name
                    </label>
                    <Field
                      validate={(value) =>
                        !value ? "Please fill out the customers name." : false
                      }
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                      type="text"
                      placeholder="Jane"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      name="name"
                      value={props.values.name}
                      aria-label="customer-name"
                    />
                    {props.errors.name && (
                      <p
                        className="text-red-500 text-xs italic"
                        data-testid="error-customer-name"
                      >
                        {props.errors.name}
                      </p>
                    )}
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-last-name"
                    >
                      Number of days renting
                    </label>
                    <Field
                      validate={(value) =>
                        value <= 0 ? "Please enter a non-zero day value" : false
                      }
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-last-name"
                      aria-label="number-of-days-renting"
                      type="number"
                      name="noOfDaysToRent"
                      value={props.values.noOfDaysToRent}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                    {props.errors.noOfDaysToRent && (
                      <p
                        className="text-red-500 text-xs italic"
                        data-testid="error-day-for-rent"
                      >
                        {props.errors.noOfDaysToRent}
                      </p>
                    )}
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-last-name"
                    >
                      Available Books
                    </label>
                    <FieldArray
                      name="booksRented"
                      render={(arrayHelpers) => (
                        <table className="table-auto w-120">
                          <thead>
                            <tr>
                              <th className="px-4 py-2">Title</th>
                              <th className="px-4 py-2">Category</th>
                              <th className="px-4 py-2">Charge Per Day</th>
                            </tr>
                          </thead>
                          <tbody>
                            {books.map((book, index) => (
                              <tr key={book.id}>
                                <td className="border px-4 py-2">
                                  <label className="flex justify-start items-start">
                                    <div className="bg-white w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">
                                      <Field
                                        name={`booksRented[${index}].id`}
                                        data-testid={`booksRented-test`}
                                        type="checkbox"
                                        value={book.id}
                                        checked={props.values.booksRented.includes(
                                          book.id
                                        )}
                                        onChange={(e) => {
                                          if (e.target.checked) {
                                            arrayHelpers.push(book.id);
                                          } else {
                                            const idx = props.values.booksRented.indexOf(
                                              book.id
                                            );
                                            arrayHelpers.remove(idx);
                                          }
                                        }}
                                      />
                                    </div>
                                    <div className="select-none">
                                      {book.title}
                                    </div>
                                  </label>
                                </td>
                                <td className="border px-4 py-2">
                                  {book.category}
                                </td>
                                <td className="border px-4 py-2">
                                  {book.category === "Regular" ||
                                  book.category === "Novel" ? (
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
                            ))}
                          </tbody>
                        </table>
                      )}
                    />
                    {props.errors.booksRented && (
                      <p className="text-red-500 text-xs italic">
                        {props.errors.booksRented}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <div className="w-full px-3">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="submit"
                      data-testid="submit-rental-charge"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    );
  }
}

export { Rentals };
