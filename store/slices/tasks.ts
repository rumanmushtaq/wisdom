// src/store/slices/auth.slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Task {
  title: string;
  description: string;
  status: string;
  isActive: boolean;
  websiteUrl: boolean;
  verificationDuration: number;
  date: string;
  updatedAt?: string;
  createdAt?: string;
  _id?: string;
}

export interface UserTasks {
  _id: string;
  userId: string;
  taskId: Task ;
  verificationCode: string;
  userStatus: string;
  earnedCredits: number;
  expireAt: string;
  createdAt?: string;
  updatedAt?: string;
}

interface AuthState {
  myTasks: UserTasks[];
}

const initialState: AuthState = {
  myTasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setMyTasks: (state, action) => {
      state.myTasks = action.payload;
    },

    updateTaskStatus: (
      state,
      action: PayloadAction<{
        taskId: string;
        userStatus: UserTasks["userStatus"];
      }>
    ) => {
      const { taskId, userStatus } = action.payload;
      const task = state.myTasks.find((t) => t.taskId._id === taskId);
      if (task) {
        task.taskId.status = userStatus;
        task.userStatus = userStatus;
      }
    },
  },
});

export const { setMyTasks, updateTaskStatus } = tasksSlice.actions;
export default tasksSlice.reducer;
