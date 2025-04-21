import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const [role, setRole] = useState('Student');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const getPasswordStrength = (pwd) => {
    if (pwd.length > 8) return 'Strong';
    if (pwd.length > 4) return 'Medium';
    return 'Weak';
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-[Inter]">
      {/* Left Panel */}
      <div className="md:w-1/2 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-4">
            Smart Campus Portal
          </h1>
          <p className="text-gray-700 text-base md:text-lg mb-6">
            Empowering Students, Lecturers, and Admins through modern digital services.
          </p>
          <img
            src="/assets/register-illustration.svg" // Make sure this file exists
            alt="Campus illustration"
            className="w-full h-auto max-w-xs mx-auto"
          />
        </div>
      </div>

      {/* Right Panel */}
      <div className="md:w-1/2 w-full bg-white flex items-center justify-center px-4 py-10 md:py-20">
        <div className="w-full max-w-xl bg-white p-6 sm:p-8 rounded-xl shadow-xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Create an Account</h2>
          <p className="text-center text-sm text-gray-500 mb-6">Register below to access campus services</p>

          <form className="space-y-5">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full">
                <label className="block mb-1 text-sm text-gray-600">First Name</label>
                <input type="text" placeholder="John" className="input-field" />
              </div>
              <div className="w-full">
                <label className="block mb-1 text-sm text-gray-600">Last Name</label>
                <input type="text" placeholder="Doe" className="input-field" />
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-600">Email Address</label>
              <input type="email" placeholder="you@example.com" className="input-field" />
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-600">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`input-field ${
                  passwordStrength === 'Strong'
                    ? 'border-green-500'
                    : passwordStrength === 'Medium'
                    ? 'border-yellow-400'
                    : 'border-red-400'
                }`}
              />
              <p className={`text-xs mt-1 ${
                passwordStrength === 'Strong'
                  ? 'text-green-600'
                  : passwordStrength === 'Medium'
                  ? 'text-yellow-600'
                  : 'text-red-600'
              }`}>
                Strength: {passwordStrength}
              </p>
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-600">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-field"
              />
              {confirmPassword && confirmPassword !== password && (
                <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
              )}
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-600">User Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="input-field"
              >
                <option value="Student">Student</option>
                <option value="Lecturer">Lecturer</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            {role === 'Student' && (
              <div>
                <label className="block mb-1 text-sm text-gray-600">Student Number</label>
                <input type="text" placeholder="12345678" className="input-field" />
              </div>
            )}

            {role === 'Lecturer' && (
              <div>
                <label className="block mb-1 text-sm text-gray-600">Staff Code</label>
                <input type="text" placeholder="STAFF001" className="input-field" />
              </div>
            )}

            <div>
              <label className="block mb-1 text-sm text-gray-600">Department / Faculty</label>
              <input type="text" placeholder="Computer Science" className="input-field" />
            </div>

            <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition duration-200">
              Create Account
            </button>
          </form>

          <div className="text-sm text-center mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-green-500 hover:underline">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
