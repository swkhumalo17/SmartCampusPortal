// src/pages/Auth/LoginPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-mint-50 px-4">
      <div className="flex w-full max-w-5xl rounded-3xl overflow-hidden shadow-lg bg-white">
        
        {/* Left Panel */}
        <div className="w-1/2 bg-mint-100 p-10 flex flex-col justify-center items-center">
          <img
            src="/completed.png"
            alt="Campus Illustration"
            className="w-full max-w-sm mb-10"
          />
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800">Smart Campus Portal</h2>
            <p className="text-sm text-gray-600 mt-2">
              Access campus services like room bookings, class schedules,
              maintenance requests, and important announcements.
            </p>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-1/2 p-10 bg-white flex flex-col justify-center">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Sign in</h1>

          <form className="space-y-4">
            <div>
              <label className="text-sm text-gray-600 block mb-1">Username or email</label>
              <input
                type="email"
                placeholder="studentNo@tut4life.ac.za"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mint-500"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 block mb-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mint-500"
              />
            </div>

            <div className="flex justify-between text-sm items-center">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <Link to="/forgot-password" className="text-mint-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800 transition"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-3 text-sm text-gray-500">or</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          {/* Google Button */}
          <button className="flex items-center justify-center w-full border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition">
            <FcGoogle className="text-xl mr-2" />
            <span className="text-sm text-gray-700">Sign in with Google</span>
          </button>

          {/* Footer */}
          <p className="text-sm text-center text-gray-600 mt-6">
            Don’t have an account?{' '}
            <Link to="/register" className="text-mint-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
