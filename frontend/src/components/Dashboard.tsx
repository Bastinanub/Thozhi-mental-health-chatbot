import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Sidebar from './Sidebar';
import ChatBot from './ChatBot';
import Games from './Games';
import Articles from './Articles';
import Professionals from './Professionals';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
  const { ageGroup, user } = useSelector((state: RootState) => state.auth);

  const getThemeStyles = () => {
    switch (ageGroup) {
      case 'kids':
        return 'from-yellow-100 to-pink-100';
      case 'teen':
        return 'from-purple-100 to-blue-100';
      case 'young':
        return 'from-teal-100 to-blue-100';
      case 'adult':
        return 'from-gray-100 to-blue-100';
      default:
        return 'from-gray-100 to-blue-100';
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=2000")',
      }}
    >
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-white">
              Welcome, {user?.name}! 👋
            </h1>
            <p className="text-white/80 mt-2">
              How are you feeling today?
            </p>
          </motion.div>

          <Routes>
            <Route path="/" element={<ChatBot />} />
            <Route path="/games" element={<Games />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/professionals" element={<Professionals />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;