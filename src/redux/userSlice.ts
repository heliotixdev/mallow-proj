import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserState {
  users: User[];
  selectedUser: User | null;
}

const initialState: UserState = {
  users: [],
  selectedUser: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    selectUser(state, action: PayloadAction<User>) {
      state.selectedUser = action.payload;
    },
    updateUser(state, action: PayloadAction<User>) {
      const updatedUser = action.payload;
      state.users = state.users.map(user =>
        user.id === updatedUser.id ? updatedUser : user
      );
      state.selectedUser = null;
    },
    deleteUser(state, action: PayloadAction<string>) {
      const userId = action.payload;
      state.users = state.users.filter(user => user.id !== userId);
    },
    addUser(state, action: PayloadAction<User>) {
      state.users.push(action.payload);
    },
  },
});

export const {
  setUsers,
  selectUser,
  updateUser,
  deleteUser,
  addUser
} = userSlice.actions;

export default userSlice.reducer;
