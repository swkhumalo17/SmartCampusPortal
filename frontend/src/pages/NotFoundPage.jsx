// src/pages/NotFoundPage.jsx
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const NotFoundPage = () => (
  <div className="text-center py-20">
    <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
    <p className="text-gray-600">The page you’re looking for doesn’t exist.</p>
  </div>
);

export default NotFoundPage;
