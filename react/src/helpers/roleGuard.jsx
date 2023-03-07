import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const withRoleGuard = (WrappedComponent, allowedRoles) => {
  const ComponentWithRoleGuard = (props) => {
    const navigate = useNavigate();
    const userRole = localStorage.getItem('role');
    const isAuthenticated = localStorage.getItem('token');

    useEffect(() => {
      if (!isAuthenticated || !allowedRoles.includes(userRole)) {
        navigate('/login');
      }
    }, [isAuthenticated, userRole, navigate]);

    return <WrappedComponent {...props} />;
  };

  return ComponentWithRoleGuard;
};

export default withRoleGuard;
