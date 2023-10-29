import React from "react";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className="pt-6 max-w-md mx-auto">
      <h1 className="text-center mb-6 text-3xl font-bold">Sign Up</h1>
      <form className="flex flex-col items-center gap-4">
        <input
          type="text"
          placeholder="Username"
          className="p-2 text-sm border border-gray-400 rounded-md w-full"
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="p-2 text-sm border border-gray-400 rounded-md w-full"
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 text-sm border border-gray-400 rounded-md w-full"
          required
        />
        <button className="text-sm uppercase bg-blue-500 border border-blue-500  text-white p-2 w-full rounded-md  hover:bg-transparent hover:text-black duration-300 transition-colors">
          sign up
        </button>
        <button className="text-sm bg-red-500 border border-red-500 uppercase w-full p-2 text-white rounded-md hover:bg-transparent hover:text-black duration-300 transition-colors">
          continue with google
        </button>
      </form>
      <div>
        <p className="mt-4 text-xs">
          Already have account
          <Link to="/sign-in" className="text-blue-500"> Sing In</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
