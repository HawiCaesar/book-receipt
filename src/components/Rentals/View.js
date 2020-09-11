import React from "react";
import { Formik, Field, FieldArray } from "formik";
import { observer, inject } from "mobx-react";
import { rentalCalculations } from "./rentalCalculations";

@inject("store")
@observer
class Rentals extends React.Component {
  async componentDidMount() {
    const {
      store: { loadBooks },
    } = this.props;

    await loadBooks("books");
  }
  render() {
    const {
      store: { books, postRentalCharge },
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
          onSubmit={async (values, actions) => {
            console.log(values, "!!!!!");

            const totalPay = rentalCalculations(
              values.booksRented,
              values.noOfDaysToRent
            );

            const data = {
              rentCharged: totalPay,
              ...values,
            };

            try {
              await postRentalCharge("customers", data);

              //open some modal / alert to show the receipt
              setTimeout(() => {
                alert(`${values.name}'s rental charge is ${totalPay}`);
                actions.setSubmitting(false);
              }, 1000);
            } catch (error) {
              console.log(error);
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
                    />
                    {props.errors.name && (
                      <p className="text-red-500 text-xs italic">
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
                      type="number"
                      name="noOfDaysToRent"
                      value={props.values.noOfDaysToRent}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                    {props.errors.noOfDaysToRent && (
                      <p className="text-red-500 text-xs italic">
                        {props.errors.noOfDaysToRent}
                      </p>
                    )}
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-last-name"
                    >
                      Books Renting
                    </label>
                    <FieldArray
                      name="booksRented"
                      render={(arrayHelpers) => (
                        <table className="table-auto w-120">
                          <thead>
                            <tr>
                              <th className="px-4 py-2">Title</th>
                              <th className="px-4 py-2">Charge Per Day</th>
                            </tr>
                          </thead>
                          <tbody>
                            {books.map((book) => (
                              <tr key={book.id}>
                                <td className="border px-4 py-2">
                                  <label className="flex justify-start items-start">
                                    <div className="bg-white border-2 rounded border-gray-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">
                                      <input
                                        className="opacity-0 absolute"
                                        name="booksRented"
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
                                      <svg
                                        className="fill-current hidden w-4 h-4 text-green-500 pointer-events-none"
                                        viewBox="0 0 20 20"
                                      >
                                        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                                      </svg>
                                    </div>
                                    <div className="select-none">
                                      {book.title}
                                    </div>
                                  </label>
                                </td>
                                <td className="border px-4 py-2">
                                  {book.chargePerDay}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <div className="w-full px-3">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="submit"
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
