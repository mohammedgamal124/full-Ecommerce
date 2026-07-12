"use client";
import React from 'react'
import { useState } from 'react';
function page() {
  const [form , setForm ] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }
   
  

 const  handelSubmit = async(e)=>{
  e.preventDefault();
  const res = await fetch("http://localhost:5000/api/auth/login",{
    method:"post",
    headers:{
      "Content-Type": "application/json",
    },
    body:JSON.stringify(form)
  });

  if(res.ok){
    setForm({
      email:"",
      password:""
    })
  }
  const data = await res.json();
  console.log(data)

  if(res.ok){
    localStorage.setItem("token",data.token)
  }
 }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        
        <h1 className="text-2xl font-bold text-center mb-6">
          Login
        </h1>

        <form onSubmit={handelSubmit} className="space-y-4">
          
          {/* Email */}
          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            Login
          </button>

        </form>

        <p className="text-sm text-center mt-4 text-gray-500">
          Don’t have an account?{" "}
          <a href="/sign-up" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>

      </div>
    </div>
  );
}

export default page
