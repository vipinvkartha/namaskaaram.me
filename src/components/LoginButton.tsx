import { useAuth0 } from "@auth0/auth0-react";
import { FcGoogle } from 'react-icons/fc';

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      onClick={() => loginWithRedirect()}
      className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
    >
      <FcGoogle className="h-5 w-5 bg-white rounded-full" />
      Sign In
    </button>
  );
}; 