import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const Protected = ({isAuthenticated , login, children}) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Simulate an asynchronous check of authentication status
      const checkAuthentication = async () => {
        // You can replace the setTimeout with an actual authentication check
        // For example, make a request to your server to verify the user's authentication status
        await new Promise((resolve) => setTimeout(resolve, 1000));
  
        setLoading(false);
      };
  
      checkAuthentication();
    }, []);
  
    if (loading) {
      // You can render a loading spinner or any other indicator here
      return <section className="sec-loading">
      <div className="one">
      </div>
    </section>;
    }
    if(!isAuthenticated) return <Navigate to={login}/>;
    return children;
   
}

export default Protected;
