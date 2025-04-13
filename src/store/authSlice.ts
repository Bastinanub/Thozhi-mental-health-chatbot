import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, AgeGroup, AuthState } from '../types/user';

const getAgeGroup = (age: number): AgeGroup => {
  if (age <= 10) return 'kids';
  if (age <= 17) return 'teen';
  if (age <= 25) return 'young';
  return 'adult';
};

const initialState: AuthState = {
  user: null,
  ageGroup: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.ageGroup = getAgeGroup(action.payload.age);
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.ageGroup = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;