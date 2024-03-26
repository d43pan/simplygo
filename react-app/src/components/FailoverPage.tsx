import { useParams } from 'react-router-dom';

const FailoverPage: React.FC = () => {
    const { failoverPage } = useParams();


        return <div>
            <p>You've gotten somewhere you shouldn't be.</p> 
            <p> Go <a href="/">home</a>.</p>
        </div>

};

export default FailoverPage;