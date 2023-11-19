import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PermissionDenied = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/', { replace: true });
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return <div className="m-auto">You are not allowed to access this resource</div>;
};

export default PermissionDenied;
