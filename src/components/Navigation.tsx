import React, { useState, useEffect, useRef } from 'react';
import { Layers, ChevronDown } from 'lucide-react';
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from './LoginButton';
import { useNavigate, Link } from 'react-router-dom';

export function Navigation() {
  const { isAuthenticated, user, logout, isLoading } = useAuth0();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Handle click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Clean up event listener
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
    setIsDropdownOpen(false);
  };

  const handleProfileClick = () => {
    navigate('/welcome');
    setIsDropdownOpen(false);
  };

  // Show loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Layers className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">namaskaaram.me</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Templates
            </Link>
            <Link
              to="/pricing"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Pricing
            </Link>
            {isAuthenticated && (
              <Link
                to="/builder"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Builder
              </Link>
            )}
            
            {isAuthenticated && user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
                >
                  {user.picture ? (
                    <img
                      src={user.picture}
                      alt={user.name || 'User'}
                      className="h-8 w-8 rounded-full"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                      {user.name?.charAt(0) || 'U'}
                    </div>
                  )}
                  <span className="text-gray-700">
                    {user.name || user.email || 'User'}
                  </span>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 ring-1 ring-black ring-opacity-5">
                    <button
                      onClick={handleProfileClick}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <LoginButton />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}