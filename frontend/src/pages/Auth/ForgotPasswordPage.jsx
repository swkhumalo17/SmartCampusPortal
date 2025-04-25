import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send reset link');
      }

      setMessage('Reset link sent! Check your email.');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-mint-50 px-4">
      <div className="flex w-full max-w-5xl rounded-3xl overflow-hidden shadow-lg bg-white">
        
        {/* Left Panel */}
        <div className="w-1/2 bg-mint-100 p-10 flex flex-col justify-center items-center">
       
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800">Forgot Your Password?</h2>
            <p className="text-sm text-gray-600 mt-2">
              Enter your email and we’ll send you instructions to reset your password.
            </p>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-1/2 p-10 bg-white flex flex-col justify-center">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Reset Password</h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}
            {message && (
              <div className="text-green-600 text-sm text-center">{message}</div>
            )}

            <div>
              <label className="text-sm text-gray-600 block mb-1">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mint-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800 transition"
            >
              Send Reset Link
            </button>
          </form>

          <p className="text-sm text-center text-gray-600 mt-6">
            Remembered your password?{' '}
            <Link to="/login" className="text-mint-600 hover:underline">
              Back to login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
