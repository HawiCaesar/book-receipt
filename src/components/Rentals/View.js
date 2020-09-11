import React from "react";
import { Formik, Field, FieldArray } from "formik";
import { observer, inject } from "mobx-react";

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
      store: { books },
    } = this.props;
    return (
      <div>
        <h2>Rentals</h2>
        <Formik
          initialValues={{
            name: "",
            noOfDaysToRent: 1,
            booksRented: [],
            rentCharged: 0,
          }}
          onSubmit={(values, actions) => {
            console.log(values, "!!!!!");
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }, 1000);
          }}
        >
          {(props) => {
            console.log(props.errors);
            return (
              <form className="w-full max-w-lg" onSubmit={props.handleSubmit}>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-first-name"
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
                      for="grid-last-name"
                    >
                      Number of days renting
                    </label>
                    <Field
                      validate={(value) =>
                        value <= 0 ? "Please enter a non-zero day value" : false
                      }
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-last-name"
                      type="text"
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
                      for="grid-last-name"
                    >
                      Books Renting
                    </label>
                    <FieldArray
                      name="booksRented"
                      render={(arrayHelpers) => (
                        <div>
                          {books.map((book, index) => (
                            <div key={book.id}>
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
                                <div className="select-none">{book.title}</div>
                              </label>
                            </div>
                          ))}
                        </div>
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
