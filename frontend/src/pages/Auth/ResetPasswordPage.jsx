import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API_ENDPOINTS from '../apiEndpoints'; // 👈 Import API endpoints

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setStatus('');

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(`${API_ENDPOINTS.RESET_PASSWORD}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Password reset failed');
      }

      setStatus('Password has been successfully reset.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f9ff] px-4">
      <div className="flex w-full max-w-5xl rounded-3xl overflow-hidden shadow-lg bg-white">
        {/* Left */}
        <div className="w-1/2 bg-[#e0f2fe] p-10 flex flex-col justify-center items-center">
          <img src="/ResetPassword.png" alt="Reset Password" className="w-full max-w-sm mb-10" />
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800">Set a New Password</h2>
            <p className="text-sm text-gray-600 mt-2">Make sure it's strong and secure.</p>
          </div>
        </div>

        {/* Right */}
        <div className="w-1/2 p-10 flex flex-col justify-center bg-white">
          <h1 className="text-2xl font-bold text-center mb-6">Reset Password</h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="newPassword" className="label">New Password</label>
              <input
                id="newPassword"
                type="password"
                className="input-field"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="label">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                className="input-field"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {status && <p className="text-sm text-green-600 mt-1">{status}</p>}
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}

            <button type="submit" className="btn-primary mt-4">Reset Password</button>

            <div className="text-sm text-center mt-4">
              <Link to="/login" className="link">Back to Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
