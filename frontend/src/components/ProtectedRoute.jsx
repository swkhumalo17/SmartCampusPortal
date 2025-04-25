import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRoles }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user || !requiredRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
