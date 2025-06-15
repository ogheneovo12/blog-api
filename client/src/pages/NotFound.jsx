import React from "react";
import { Link } from "react-router";

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100 px-4">
    <h1 className="text-8xl font-extrabold text-blue-600 drop-shadow-lg mb-4">
      404
    </h1>
    <h2 className="text-3xl font-semibold text-gray-800 mb-2">
      Page Not Found
    </h2>
    <p className="text-lg text-gray-600 mb-8 text-center max-w-md">
      Sorry, the page you are looking for does not exist or has been moved.
    </p>
    <Link
      to="/"
      className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors font-medium"
    >
      Go Home
    </Link>
  </div>
);

export default NotFound;
