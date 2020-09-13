import React from "react";

export const ErrorComponent = (error) => {
  const {
    error: { message },
  } = error;
  let errorMessage = message ? message : "Not sure what happened";
  return (
    <div role="alert">
      <div className="mt-48 bg-red-500 text-white font-bold rounded-t px-4 py-2">
        Something went wrong
      </div>
      <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
        <p>{errorMessage}</p>
      </div>
    </div>
  );
};
