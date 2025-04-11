import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/authSlice';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Star } from 'lucide-react';

const SignupForm: React.FC = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setUser({
      name: formData.name,
      age: parseInt(formData.age),
      gender: formData.gender as 'male' | 'female' | 'other',
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <Heart className="text-pink-500 w-8 h-8" />
          <Sparkles className="text-purple-500 w-8 h-8 mx-2" />
          <Star className="text-yellow-500 w-8 h-8" />
        </div>
        
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
          Welcome to Thozhi
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Your personal mental wellness companion
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age
            </label>
            <input
              type="number"
              required
              min="5"
              max="100"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter your age"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <select
              required
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200"
          >
            Start Your Journey
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default SignupForm;