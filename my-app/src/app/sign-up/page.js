"use client";

import React, { useState } from 'react';

function page() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  // Track confirm password separately (optional, not sent to backend)
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log("SUBMIT WORKS");
    // Optionally check password and confirmPassword match before submitting
    if (form.password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    if (res.ok) {
      // تفريغ الفورم
      setForm({
        name: "",
        email: "",
        password: "",
      });
      setConfirmPassword("");
    }
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen  bg-gray-100 overflow-hidden">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-xl">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Create Account
        </h1>

        {/* Form */}
        <form onSubmit={handelSubmit} className="flex flex-col gap-4">

          {/* Name */}
          <input
            type="text"
            name="name"
            value={form.name}
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="off"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            value={form.email}
            placeholder="Email"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="off"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            value={form.password}
            placeholder="Password"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="new-password"
          />

          {/* Confirm Password */}
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={handleConfirmPasswordChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="new-password"
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            Sign Up
          </button>

          <p className='text-center'>
            Already have account ? <a className='text-blue-600' href='/login'>Log in</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default page