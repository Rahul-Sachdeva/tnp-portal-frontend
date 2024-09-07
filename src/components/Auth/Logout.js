import { useContext } from 'react';
import { AuthContext } from '../../hooks/AuthContext';

const Logout = () => {
  const { logout } = useContext(AuthContext);
  const loginUser = localStorage.getItem('user');

  return (
    loginUser && 
    <button onClick={()=>logout(loginUser)} className="btn btn-danger">
      Logout
    </button>
  );
};

export default Logout;
