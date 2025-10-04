import { useState, useEffect } from 'react';
import { Briefcase, Bookmark } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ProfileDropdown from './ProfileDropdown';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = () => {
            if (profileDropdownOpen) {
                setProfileDropdownOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [profileDropdownOpen]);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* logo */}
                    <Link to="/find-jobs" className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                            <Briefcase className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-lg font-bold text-gray-800">JobPortal</span>
                    </Link>

                    {/* Auth Button */}
                    <div className="flex items-center space-x-3">
                        {user && (
                            <button
                                className="p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200 relative"
                                onClick={() => navigate('saved-jobs')}
                            >
                                <Bookmark className="h-6 w-6 text-gray-600" />
                            </button>
                        )}

                        {isAuthenticated ? (
                            <ProfileDropdown
                                isOpen={profileDropdownOpen}
                                OnToggle={(e) => {
                                    e.stopPropagation();
                                    setProfileDropdownOpen(!profileDropdownOpen);
                                }}
                                avatar={user?.avatar || ""}
                                companyName={user?.name || ""}
                                email={user?.email || ""}
                                onLogout={logout}
                                userRole={user?.userRole || ""}
                            />
                        ) : (
                            <>
                                <a
                                    href="/login"
                                    className="text-gray-600 hover:text-gray-800 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-gray-100"
                                >
                                    Login
                                </a>
                                <a
                                    href="/signup"
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-sm"
                                >
                                    SignUp
                                </a>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
