// Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="p-4 bg-blue-600 text-white">
            <p>© {currentYear} My App</p>
            {/* Other footer content */}
        </footer>
    );
};

export default Footer;