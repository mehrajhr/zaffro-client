import React from "react";

const ErrorMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-base-200 rounded-lg shadow-md mx-4 md:mx-0">
      <svg
        className="w-16 h-16 text-red-500 mb-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v2m0 4h.01M12 2a10 10 0 1010 10A10 10 0 0012 2z"
        />
      </svg>
      <h2 className="text-2xl font-bold text-black mb-2">Oops!</h2>
      <p className="text-gray-700 text-center max-w-md">Failed to load. Please try again.</p>
    </div>
  );
};

export default ErrorMessage;
