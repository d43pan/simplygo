import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PathInput = () => {
    const [path, setPath] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/go/${path}`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={path} 
                onChange={e => setPath(e.target.value)} 
                placeholder="Enter path"
            />
            <button type="submit">Go</button>
        </form>
    );
};

export default PathInput;