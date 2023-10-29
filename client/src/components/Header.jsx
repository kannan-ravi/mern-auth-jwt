import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="bg-slate-200">
      <div className="container mx-auto flex justify-between items-center p-3">
        <Link to="/">
          <h1 className="font-bold text-base">KANNA AUTH</h1>
        </Link>
        <div className="flex items-center gap-5 text-xs">
          <Link
            to="/"
            className="font-medium hover:text-blue-500  duration-300 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="font-medium hover:text-blue-500 duration-300 transition-colors"
          >
            About
          </Link>
          <Link
            to="/sign-in"
            className="font-medium hover:text-blue-500 duration-300 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
