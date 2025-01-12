import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

export const Welcome = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-8">
          <div className="flex items-center space-x-6">
            {user.picture && (
              <img
                src={user.picture}
                alt={user.name || 'User'}
                className="h-24 w-24 rounded-full"
              />
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome, {user.name}!
              </h1>
              <p className="text-gray-600 mt-2">{user.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 