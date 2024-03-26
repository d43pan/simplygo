// Header.tsx
import React from 'react';
import AuthenticationButton from './AuthenticationButton';

const Header: React.FC = () => {
  return (
    <header className="p-4 bg-blue-600 text-white">
      <div className="logo">Simply Go</div>
      {/* Other header content */}
      <div className="login"><AuthenticationButton /></div>
      
    </header>
  );
};

export default Header;