import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token')

  if(!token) {
    return <Navigate to="/" replace/>;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      localStorage.removeItem('token');
      return <Navigate to="/" replace/>;
    }
  } catch (error) {
    localStorage.removeItem('token');
    return <Navigate to="/" replace/>;
  }
    return children ;
};

export default ProtectedRoute;