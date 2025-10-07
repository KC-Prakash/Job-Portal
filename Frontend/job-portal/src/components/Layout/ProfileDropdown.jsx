import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProfileDropdown = ({
    isOpen,
    OnToggle,
    avatar,
    companyName,
    email,
    onLogout,
    userRole,
}) => {
    const navigate = useNavigate();

    const handleProfileClick = () => {
        const profilePath =
            userRole === 'jobseeker' ? '/profile' : '/company-profile';

        navigate(profilePath);
        OnToggle(); // Dropdown बन्द गर्ने
    };

    return (
        <div className="relative">
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    OnToggle(e);
                }}
                className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50 transition-colors duration-200"
            >
                {avatar ? (
                    <img
                        src={avatar}
                        alt="Avatar"
                        className="h-9 w-9 object-cover rounded-full"
                    />
                ) : (
                    <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                            {companyName?.charAt(0).toUpperCase()}
                        </span>
                    </div>
                )}
                <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-gray-900">{companyName}</p>
                    <p className="text-xs text-gray-500">
                        {userRole === 'jobseeker' ? 'Job Seeker' : 'Employer'}
                    </p>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400" />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{companyName}</p>
                        <p className="text-xs text-gray-500">{email}</p>
                    </div>

                    <button
                        onClick={handleProfileClick}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    >
                        View Profile
                    </button>

                    <div className="border-t border-gray-100 mt-2 pt-2"></div>

                    <button
                        onClick={onLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;
