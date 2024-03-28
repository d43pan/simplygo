// Header.tsx
import React from 'react';
import AuthenticationButton from './AuthenticationButton';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="p-4 bg-blue-600 text-white">
      <div className="logo">
        <Link to="/">
        Simply Go
        </Link>
        </div>
      {/* Other header content */}
      <div className="login"><AuthenticationButton /></div>
      
    </header>
  );
};

export default Header;