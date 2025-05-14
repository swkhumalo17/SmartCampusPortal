import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import API_ENDPOINTS from '../apiEndpoints'; // 👈 Import the endpoint constants

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setStatus('');

    try {
      const response = await fetch(API_ENDPOINTS.FORGOT_PASSWORD, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Something went wrong');
      }

      setStatus('A reset link has been sent to your email.');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f9ff] px-4">
      <div className="flex w-full max-w-5xl rounded-3xl overflow-hidden shadow-lg bg-white">
        {/* Left Section */}
        <div className="w-1/2 bg-[#e0f2fe] p-10 flex flex-col justify-center items-center">
          <img src="/ForgotPassword.png" alt="Forgot Password" className="w-full max-w-sm mb-10" />
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800">Forgot Your Password?</h2>
            <p className="text-sm text-gray-600 mt-2">
              Enter your email and we'll send you a reset link.
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-1/2 p-10 flex flex-col justify-center bg-white">
          <h1 className="text-2xl font-bold text-center mb-6">Reset Your Password</h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="label">Email Address</label>
              <input
                id="email"
                type="email"
                className="input-field"
                placeholder="e.g. student123@tut4life.ac.za"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {status && <p className="text-sm text-green-600 mt-1">{status}</p>}
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}

            <button type="submit" className="btn-primary mt-4">Send Reset Link</button>

            <div className="text-sm text-center mt-4">
              <Link to="/login" className="link">Back to Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
