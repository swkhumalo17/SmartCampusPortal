import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API_ENDPOINTS from '../apiEndpoints';

const Input = ({ label, type = 'text', value, onChange, placeholder, name, autoComplete }) => (
  <div>
    <label htmlFor={name} className="label">{label}</label>
    <input
      id={name}
      name={name}
      type={type}
      className="input-field"
      value={value}
      onChange={(e) => onChange(e.target.value.trimStart())}
      placeholder={placeholder}
      autoComplete={autoComplete}
      required
    />
  </div>
);

const RegisterPage = () => {
  const [role, setRole] = useState('Student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [strength, setStrength] = useState({ label: '', color: '' });
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    studentNumber: '',
    faculty: '',
    levelOfStudy: '',
    yearOfStudy: '',
    employeeId: '',
    department: '',
    adminId: '',
    accessLevel: '',
  });

  const navigate = useNavigate();

  const evaluatePasswordStrength = (value) => {
    let score = 0;
    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[a-z]/.test(value)) score++;
    if (/\d/.test(value)) score++;
    if (/[\W_]/.test(value)) score++;

    if (score <= 2) setStrength({ label: 'Weak', color: 'bg-red-500' });
    else if (score <= 4) setStrength({ label: 'Medium', color: 'bg-yellow-500' });
    else setStrength({ label: 'Strong', color: 'bg-green-500' });
  };

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value.trimStart() }));
    setFormError('');
  };

  const validateForm = () => {
    if (!formData.fullName || !formData.phoneNumber || !email || !password || !confirmPassword) {
      setFormError('Please fill in all required fields.');
      return false;
    }
    if (password !== confirmPassword) {
      setFormError('Passwords do not match.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setFormError('Please enter a valid email address.');
      return false;
    }

    if (role === 'Student' && (!formData.studentNumber || !formData.faculty || !formData.levelOfStudy || !formData.yearOfStudy)) {
      setFormError('Please complete all student fields.');
      return false;
    }
    if (role === 'Lecturer' && (!formData.employeeId || !formData.department)) {
      setFormError('Please complete all lecturer fields.');
      return false;
    }
    if (role === 'Admin' && (!formData.adminId || !formData.accessLevel)) {
      setFormError('Please complete all admin fields.');
      return false;
    }

    return true;
  };

  const getRequestPayload = () => {
    const base = {
      fullName: formData.fullName.trim(),
      phoneNumber: formData.phoneNumber.trim(),
      email: email.trim(),
      password,
      role,
    };

    if (role === 'Student') {
      return {
        ...base,
        studentNumber: formData.studentNumber.trim(),
        faculty: formData.faculty,
        levelOfStudy: formData.levelOfStudy,
        yearOfStudy: formData.yearOfStudy,
      };
    }
    if (role === 'Lecturer') {
      return {
        ...base,
        employeeId: formData.employeeId.trim(),
        department: formData.department.trim(),
      };
    }
    if (role === 'Admin') {
      return {
        ...base,
        adminId: formData.adminId.trim(),
        accessLevel: formData.accessLevel,
      };
    }

    return base;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!validateForm()) return;

    try {
      setLoading(true);
      const requestData = getRequestPayload();
      const response = await fetch(API_ENDPOINTS.REGISTER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();
      if (!response.ok) {
        if (result.errors) {
          setFormError(Object.values(result.errors).join(' '));
        } else {
          throw new Error(result.message || 'Registration failed');
        }
        return;
      }

      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      setFormError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#f0f9ff]">
      <div className="flex flex-col md:flex-row w-full max-w-5xl rounded-3xl overflow-hidden shadow-lg bg-white">
        {/* Left Panel */}
        <div className="w-full md:w-1/2 bg-[#e0f2fe] p-10 flex flex-col justify-center items-center">
          <img src="/completed.png" alt="Campus Illustration" className="w-full max-w-sm mb-10" />
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">Smart Campus Portal</h2>
            <p className="text-sm text-gray-600 mt-2">Manage your campus life efficiently.</p>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-1/2 p-10 bg-white">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Your Account</h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {formError && <div className="text-red-600 text-sm text-center">{formError}</div>}

            <Input label="Full Name" name="fullName" value={formData.fullName} onChange={(val) => handleInputChange('fullName', val)} placeholder="e.g. Thabo Mokoena" />
            <Input label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={(val) => handleInputChange('phoneNumber', val)} placeholder="e.g. 0821234567" />
            <Input label="Email Address" name="email" type="email" value={email} onChange={setEmail} placeholder="e.g. student123@tut4life.ac.za" autoComplete="email" />
            <Input label="Password" name="password" type="password" value={password} onChange={(val) => { setPassword(val); evaluatePasswordStrength(val); }} placeholder="Choose a strong password" autoComplete="new-password" />

            {password && (
              <div>
                <div className="h-2 w-full rounded-full bg-gray-200">
                  <div className={`h-2 rounded-full ${strength.color} transition-all duration-300`}
                    style={{ width: strength.label === 'Weak' ? '33%' : strength.label === 'Medium' ? '66%' : '100%' }}
                  />
                </div>
                <p className={`text-xs mt-1 ${strength.color === 'bg-red-500' ? 'text-red-500' : strength.color === 'bg-yellow-500' ? 'text-yellow-600' : 'text-green-600'}`}>
                  {strength.label} Password
                </p>
                {strength.label === 'Weak' && (
                  <p className="text-xs text-red-500 mt-1">Use at least 8 characters with uppercase, lowercase, number, and symbol.</p>
                )}
              </div>
            )}

            <Input label="Confirm Password" name="confirmPassword" type="password" value={confirmPassword} onChange={setConfirmPassword} placeholder="Re-enter password" autoComplete="new-password" />

            <div>
              <label className="label">Register As</label>
              <select className="input-field" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="Student">Student</option>
                <option value="Lecturer">Lecturer</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            {role === 'Student' && (
              <>
                <Input label="Student Number" name="studentNumber" value={formData.studentNumber} onChange={(val) => handleInputChange('studentNumber', val)} placeholder="e.g. 219876543" />
                <div>
                  <label className="label">Faculty</label>
                  <select className="input-field" value={formData.faculty} onChange={(e) => handleInputChange('faculty', e.target.value)}>
                    <option value="" disabled>Select Faculty</option>
                    <option value="Information and Communication Technology">Information and Communication Technology</option>
                    <option value="Engineering and the Built Environment">Engineering and the Built Environment</option>
                    <option value="Management Sciences">Management Sciences</option>
                    <option value="Science">Science</option>
                    <option value="Humanities">Humanities</option>
                    <option value="Economics and Finance">Economics and Finance</option>
                  </select>
                </div>
                <div className="flex gap-4">
                  <select className="input-field w-1/2" value={formData.levelOfStudy} onChange={(e) => handleInputChange('levelOfStudy', e.target.value)}>
                    <option value="" disabled>Level of Study</option>
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Advanced Diploma">Advanced Diploma</option>
                    <option value="Postgraduate Diploma">Postgraduate Diploma</option>
                  </select>
                  <select className="input-field w-1/2" value={formData.yearOfStudy} onChange={(e) => handleInputChange('yearOfStudy', e.target.value)}>
                    <option value="" disabled>Year</option>
                    <option value="1">1st</option>
                    <option value="2">2nd</option>
                    <option value="3">3rd</option>
                    <option value="Final">Final Year</option>
                  </select>
                </div>
              </>
            )}

            {role === 'Lecturer' && (
              <>
                <Input label="Employee ID" name="employeeId" value={formData.employeeId} onChange={(val) => handleInputChange('employeeId', val)} placeholder="e.g. EMP123456" />
                <Input label="Department" name="department" value={formData.department} onChange={(val) => handleInputChange('department', val)} placeholder="e.g. Computer Science" />
              </>
            )}

            {role === 'Admin' && (
              <>
                <Input label="Admin ID" name="adminId" value={formData.adminId} onChange={(val) => handleInputChange('adminId', val)} placeholder="e.g. ADM001" />
                <div>
                  <label className="label">Access Level</label>
                  <select className="input-field" value={formData.accessLevel} onChange={(e) => handleInputChange('accessLevel', e.target.value)}>
                    <option value="" disabled>Select Access Level</option>
                    <option value="System">System</option>
                    <option value="Campus">Campus</option>
                  </select>
                </div>
              </>
            )}

            <button type="submit" className="btn-primary w-full mt-4" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
            <p className="text-sm text-center text-gray-600 mt-4">
              Already have an account? <Link to="/login" className="link">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
