import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import API_ENDPOINTS from '../apiEndpoints';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const savedEmail = localStorage.getItem('email');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleInputChange = (setter) => (e) => {
    setError('');
    setter(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.match(/\S+@\S+\.\S+/)) {
      setError('Please enter a valid email.');
      return;
    }

    try {
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (result.isValid) {
        const { token, role, fullName, levelOfStudy } = result.data;
        const userData = {
          token,
          role,
          fullName,
          levelOfStudy,
          email,
          id: result.data.id || null,
        };

        login(userData);

        if (rememberMe) {
          localStorage.setItem('email', email);
        } else {
          localStorage.removeItem('email');
        }

        switch (role) {
          case 'Admin':
            navigate('/admin/dashboard');
            break;
          case 'Lecturer':
            navigate('/lecturer/dashboard');
            break;
          case 'Student':
            navigate('/student/dashboard');
            break;
          default:
            navigate('/login');
        }
      } else {
        setError('Invalid email or password.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f9ff] flex items-center justify-center px-4 py-10">
      <div className="flex w-full max-w-5xl bg-white rounded-3xl shadow-lg overflow-hidden">
        {/* Left Section */}
        <div className="w-1/2 bg-[#e0f2fe] p-10 flex flex-col items-center justify-center">
          <img
            src="/completed.png"
            alt="Smart Campus"
            className="w-full max-w-sm mb-8"
          />
          <h2 className="text-2xl font-semibold text-gray-800">Smart Campus Portal</h2>
          <p className="text-sm text-gray-600 mt-2 text-center max-w-xs">
            Access room bookings, schedules, maintenance requests and more.
          </p>
        </div>

        {/* Right Section */}
        <div className="w-1/2 p-10 flex flex-col justify-center bg-white">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign In to Your Account</h1>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="text-center text-sm text-red-600">{error}</div>
            )}

            <div>
              <label className="label">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={handleInputChange(setEmail)}
                placeholder="Enter your university email"
                className="input-field"
                required
              />
            </div>

            <div className="relative">
              <label className="label">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handleInputChange(setPassword)}
                placeholder="Enter your password"
                className="input-field pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-9 right-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe((prev) => !prev)}
                  className="mr-2"
                />
                Remember me
              </label>
              <Link to="/forgot-password" className="link">Forgot password?</Link>
            </div>

            <button type="submit" className="btn-primary w-full mt-2">
              Login
            </button>
          </form>

          <div className="divider mt-6"><span>or</span></div>

          <button className="flex items-center justify-center w-full border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition">
            <FcGoogle className="text-xl mr-2" />
            <span className="text-sm text-gray-700">Sign in with Google</span>
          </button>

          <p className="text-sm text-center text-gray-600 mt-6">
            Don’t have an account?{' '}
            <Link to="/register" className="link">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
