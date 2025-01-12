import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { FcGoogle } from 'react-icons/fc';

export const SignInPrompt = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign in required</h2>
        <p className="text-gray-600 mb-6">
          Please sign in to customize and use templates
        </p>
        <button
          onClick={() => loginWithRedirect()}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          <FcGoogle className="h-5 w-5 bg-white rounded-full" />
          Sign in with Google
        </button>
        <button
          onClick={() => window.location.href = '/'}
          className="w-full mt-4 text-gray-600 hover:text-gray-900"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}; 