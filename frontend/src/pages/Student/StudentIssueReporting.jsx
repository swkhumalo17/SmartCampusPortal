import React, { useState } from 'react';
import Card from '../../components/Card';
import { Wrench } from 'lucide-react';
import { toast } from 'react-toastify';
import API_ENDPOINTS from '../apiEndpoints'; // adjust path if needed

const StudentIssueReporting = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    category: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(API_ENDPOINTS.REPORT_ISSUE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Issue reported successfully!');
        setFormData({
          title: '',
          description: '',
          location: '',
          category: '',
        });
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message || 'Submission failed'}`);
      }
    } catch (err) {
      console.error('Issue submission failed:', err);
      toast.error('An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Report an Issue</h1>

      <Card title="Report Issue" icon={<Wrench />} to="/student/report" />

      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        <div>
          <label className="label">Title</label>
          <input
            type="text"
            name="title"
            className="input-field"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="label">Description</label>
          <textarea
            name="description"
            className="input-field"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>
        <div>
          <label className="label">Location</label>
          <input
            type="text"
            name="location"
            className="input-field"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="label">Category</label>
          <select
            name="category"
            className="input-field"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Electrical">Electrical</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Furniture">Furniture</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button type="submit" className="btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Issue'}
        </button>
      </form>
    </div>
  );
};

export default StudentIssueReporting;
