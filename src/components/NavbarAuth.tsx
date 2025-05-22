
import { Link } from 'react-router-dom';
import Auth from './Auth';

const NavbarAuth = () => {
  return (
    <div className="flex items-center gap-4">
      <Auth />
    </div>
  );
};

export default NavbarAuth;
