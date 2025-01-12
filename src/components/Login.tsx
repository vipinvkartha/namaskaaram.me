import { useAuth0 } from '@auth0/auth0-react';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const Login = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate('/welcome');
    }
  }, [isAuthenticated, user, navigate]);

  if (isAuthenticated && user) {
    return (
      <button
        onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
        className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
      >
        Log Out
      </button>
    );
  }

  return (
    <button
      onClick={() => loginWithRedirect({
        authorizationParams: {
          connection: 'google-oauth2'
        }
      })}
      className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
    >
      <FcGoogle className="h-5 w-5 bg-white rounded-full" />
      Sign In
    </button>
  );
}; 