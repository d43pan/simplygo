import React, { useState, useEffect } from 'react';

function LoadingDots() {
    const [dots, setDots] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(dots => dots.length < 3 ? dots + '.' : '');
        }, 200);

        return () => clearInterval(interval);
    }, []);

    return <span>Going {dots}</span>;
}

export default LoadingDots;