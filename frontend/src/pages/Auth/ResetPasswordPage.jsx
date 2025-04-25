import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (newPassword !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password: newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Password reset failed');
      }

      setMessage('Password has been reset successfully!');
      setTimeout(() => navigate('/login'), 3000); // Redirect to login
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-mint-50 px-4">
      <div className="flex w-full max-w-5xl rounded-3xl overflow-hidden shadow-lg bg-white">
        
        {/* Left Panel */}
        <div className="w-1/2 bg-mint-100 p-10 flex flex-col justify-center items-center">
          <img
            src="/reset-password.png"
            alt="Reset Password Illustration"
            className="w-full max-w-sm mb-10"
          />
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800">Reset Your Password</h2>
            <p className="text-sm text-gray-600 mt-2">
              Enter a new password and confirm it to complete the reset.
            </p>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-1/2 p-10 bg-white flex flex-col justify-center">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">New Password</h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && <div className="text-red-600 text-sm text-center">{error}</div>}
            {message && <div className="text-green-600 text-sm text-center">{message}</div>}

            <div>
              <label className="text-sm text-gray-600 block mb-1">New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mint-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 block mb-1">Confirm Password</label>
              <input
                type="password"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mint-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800 transition"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
