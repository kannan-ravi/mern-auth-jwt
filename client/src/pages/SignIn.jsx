import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
  const [formData, setFormData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setLoading(true);
    const res = await fetch("/api/auth/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    setLoading(false);

    if (data.success === false) {
      setError(true);
      return;
    }

    navigate("/");
  };

  return (
    <div className="pt-6 max-w-md mx-auto">
      <h1 className="text-center mb-6 text-3xl font-bold">Sign In</h1>
      <form
        className="flex flex-col items-center gap-4"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          placeholder="Email"
          className="p-2 text-sm border border-gray-400 rounded-md w-full"
          onChange={handleChange}
          name="email"
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 text-sm border border-gray-400 rounded-md w-full"
          onChange={handleChange}
          name="password"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="text-sm uppercase bg-blue-500 border border-blue-500  text-white p-2 w-full rounded-md  hover:bg-transparent hover:text-black duration-300 transition-colors"
        >
          {loading ? "loading..." : "sign in"}
        </button>
        <button className="text-sm bg-red-500 border border-red-500 uppercase w-full p-2 text-white rounded-md hover:bg-transparent hover:text-black duration-300 transition-colors">
          continue with google
        </button>
      </form>
      <div>
        <p className="mt-4 text-xs">
          Don't have account
          <Link to="/sign-up" className="text-blue-500">
            {" "}
            Sing up
          </Link>
        </p>
      </div>
      <p className="text-red-700">{error && "ERROR"}</p>
    </div>
  );
}

export default SignIn;
