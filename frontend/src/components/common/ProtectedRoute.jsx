import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

ProtectedRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default ProtectedRoute;