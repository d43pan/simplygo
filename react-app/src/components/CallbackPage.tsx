import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useLocation, useNavigate } from 'react-router-dom';



const CallbackPage = () => {

  const { error } = useAuth0();

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        {error.message}
      </div>
    )
  }

  return (
    <div></div>
  )

}


/*const CallbackPage = () => {
  const { handleRedirectCallback} = useAuth0();
  const location = useLocation();
  const navigate = useNavigate();
  const [queryParams, setQueryParams] = useState({});

  useEffect(() => {
    const processCallback = async () => {
        try {
          await handleRedirectCallback();
          navigate('/'); // Redirect to the home page after handling the callback
        } catch (error) {
          console.error("Error processing the callback from Auth0: ", error);
        }
    };

   /* const urlParams = new URLSearchParams(location.search);
    const params = {};
    for (let param of urlParams) {
      params[param[0]] = param[1];
    }
    setQueryParams(params);
  
    processCallback();
  }, [handleRedirectCallback, navigate, location]);

  return (
    <div>
      <h1>Callback</h1>
      <h2>Query Parameters:</h2>
      <ul>
        {Object.entries(queryParams).map(([key, value]) => (
          <li key={key}>
            {key}: {value}
          </li>
        ))}
      </ul>
    </div>
  );
};
*/
export default CallbackPage;