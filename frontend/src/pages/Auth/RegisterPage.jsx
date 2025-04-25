import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [role, setRole] = useState('Student');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [strength, setStrength] = useState({ label: '', color: '' });
  const [passwordError, setPasswordError] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const evaluatePasswordStrength = (value) => {
    let score = 0;
    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[a-z]/.test(value)) score++;
    if (/\d/.test(value)) score++;
    if (/[\W_]/.test(value)) score++;

    if (score <= 2) {
      setStrength({ label: 'Weak', color: 'bg-red-500' });
    } else if (score === 3 || score === 4) {
      setStrength({ label: 'Medium', color: 'bg-yellow-500' });
    } else {
      setStrength({ label: 'Strong', color: 'bg-green-500' });
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    evaluatePasswordStrength(value);

    if (confirmPassword && confirmPassword !== value) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (value !== password) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
  
    const fullName = document.getElementById("fullName")?.value.trim() || '';
    const username = email.trim();
    const adminId = document.getElementById("adminId")?.value.trim() || '';
    const phoneNumber = document.getElementById("phoneNumber")?.value.trim() || '';
  
    const requestData = {
      fullName,
      email: email.trim(),
      password,
      role,
      username,
      adminId,
      phoneNumber,
    };
  
    if (role === 'Admin') {
      requestData.accessLevel = document.getElementById("accessLevel")?.value || '';
    } else if (role === 'Lecturer') {
      requestData.department = document.getElementById("department")?.value.trim() || '';
      requestData.employeeId = document.getElementById("employeeId")?.value.trim() || '';
    } else if (role === 'Student') {
      requestData.studentNumber = document.getElementById("studentNumber")?.value.trim() || '';
      requestData.faculty = document.getElementById("faculty")?.value || '';
      requestData.levelOfStudy = document.getElementById("levelOfStudy")?.value || '';
      requestData.yearOfStudy = document.getElementById("yearOfStudy")?.value || '';
    }
  
    try {
      const response = await fetch('http://localhost:5139/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }
  
      const data = await response.json();
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      setPasswordError(err.message);
    }
  };  

  return (
    <div className="min-h-screen flex items-center justify-center bg-mint-50 px-4">
      <div className="flex w-full max-w-5xl rounded-3xl overflow-hidden shadow-lg bg-white">
        {/* Left Panel */}
        <div className="w-1/2 bg-mint-100 p-10 flex flex-col justify-center items-center">
          <img src="/completed.png" alt="Campus" className="w-full max-w-sm mb-10" />
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800">Smart Campus Portal</h2>
            <p className="text-sm text-gray-600 mt-2">
              Register to access study room bookings, class timetables, and campus services.
            </p>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-1/2 p-10 bg-white flex flex-col justify-center">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Create Account</h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input id="fullName" type="text" placeholder="John Doe" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              {password && (
                <div className="mt-2">
                  <div className="h-2 rounded-full w-full bg-gray-200">
                    <div
                      className={`h-2 rounded-full ${strength.color}`}
                      style={{
                        width:
                          strength.label === 'Weak'
                            ? '33%'
                            : strength.label === 'Medium'
                            ? '66%'
                            : '100%',
                      }}
                    ></div>
                  </div>
                  <p
                    className={`text-sm mt-1 ${
                      strength.color === 'bg-red-500'
                        ? 'text-red-500'
                        : strength.color === 'bg-yellow-500'
                        ? 'text-yellow-600'
                        : 'text-green-600'
                    }`}
                  >
                    {strength.label} Password
                  </p>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              {passwordError && <p className="text-sm text-red-500 mt-1">{passwordError}</p>}
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Register As</label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value="Student">Student</option>
                <option value="Lecturer">Lecturer</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            {role === 'Student' && (
              <>
                <div>
                  <label htmlFor="studentNumber" className="block text-sm font-medium text-gray-700 mb-1">Student Number</label>
                  <input id="studentNumber" type="text" placeholder="2023123456" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <label htmlFor="faculty" className="block text-sm font-medium text-gray-700 mb-1">Faculty</label>
                  <select id="faculty" className="w-full px-4 py-2 border border-gray-300 rounded-md">
                    <option value="">Select faculty</option>
                    <option value="IT">IT</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Business">Business</option>
                  </select>
                </div>
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <label htmlFor="levelOfStudy" className="block text-sm font-medium text-gray-700 mb-1">Level of Study</label>
                    <select id="levelOfStudy" className="w-full px-4 py-2 border border-gray-300 rounded-md">
                      <option value="Diploma">Diploma</option>
                      <option value="BTech">BTech</option>
                      <option value="Masters">Masters</option>
                    </select>
                  </div>
                  <div className="w-1/2">
                    <label htmlFor="yearOfStudy" className="block text-sm font-medium text-gray-700 mb-1">Year of Study</label>
                    <select id="yearOfStudy" className="w-full px-4 py-2 border border-gray-300 rounded-md">
                      <option value="1">1st</option>
                      <option value="2">2nd</option>
                      <option value="3">3rd</option>
                      <option value="Final">Final Year</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {role === 'Lecturer' && (
              <>
                <div>
                  <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
                  <input id="employeeId" type="text" placeholder="L001234" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <input id="department" type="text" placeholder="Computer Science" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                </div>
              </>
            )}

            {role === 'Admin' && (
              <>
                <div>
                  <label htmlFor="adminId" className="block text-sm font-medium text-gray-700 mb-1">Admin ID</label>
                  <input id="adminId" type="text" placeholder="ADM001" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <label htmlFor="accessLevel" className="block text-sm font-medium text-gray-700 mb-1">Access Level</label>
                  <select id="accessLevel" className="w-full px-4 py-2 border border-gray-300 rounded-md">
                    <option value="System">System</option>
                    <option value="Support">Support</option>
                    <option value="Management">Management</option>
                  </select>
                </div>
              </>
            )}

            <div className="text-sm flex items-center space-x-2">
              <input type="checkbox" className="w-4 h-4" required />
              <span>I agree to the <a href="#" className="text-mint-600 underline">terms and conditions</a></span>
            </div>

            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800 transition"
            >
              Create Account
            </button>
          </form>

          <p className="text-sm text-center text-gray-600 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-mint-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
