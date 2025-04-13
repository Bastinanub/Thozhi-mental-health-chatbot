import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { RootState } from '../store/store';
import { 
  MessageCircle, 
  Gamepad2, 
  BookOpen, 
  Users, 
  LogOut,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const ageGroup = useSelector((state: RootState) => state.auth.ageGroup);

  const getThemeColors = () => {
    switch (ageGroup) {
      case 'kids':
        return 'from-yellow-500 to-pink-500';
      case 'teen':
        return 'from-purple-500 to-blue-500';
      case 'young':
        return 'from-teal-500 to-blue-500';
      case 'adult':
        return 'from-gray-600 to-blue-600';
      default:
        return 'from-gray-600 to-blue-600';
    }
  };

  const navItems = [
    { path: '/dashboard', icon: MessageCircle, label: 'Chat with Thozhi' },
    { path: '/dashboard/games', icon: Gamepad2, label: 'Games' },
    { path: '/dashboard/articles', icon: BookOpen, label: 'Articles' },
    { path: '/dashboard/professionals', icon: Users, label: 'Professionals' },
  ];

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-64 min-h-screen bg-white shadow-lg"
    >
      <div className={`h-20 bg-gradient-to-r ${getThemeColors()} flex items-center justify-center`}>
        <Sparkles className="w-8 h-8 text-white" />
        <h1 className="text-xl font-bold text-white ml-2">Thozhi</h1>
      </div>

      <nav className="p-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center p-3 rounded-lg mb-2 transition-all ${
                isActive
                  ? `bg-gradient-to-r ${getThemeColors()} text-white`
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="ml-3">{item.label}</span>
          </NavLink>
        ))}

        <button
          onClick={() => dispatch(logout())}
          className="flex items-center w-full p-3 rounded-lg text-gray-700 hover:bg-gray-100 mt-8"
        >
          <LogOut className="w-5 h-5" />
          <span className="ml-3">Logout</span>
        </button>
      </nav>
    </motion.div>
  );
};

export default Sidebar;