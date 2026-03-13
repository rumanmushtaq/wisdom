import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SettingState {
  settings: any;
}

const initialState: SettingState = {
  settings: {},
};
    
const settingSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettings(state, action: PayloadAction<any[]>) {
      state.settings = action.payload;
    },
  },
});

export const { setSettings } = settingSlice.actions;
export default settingSlice.reducer;
