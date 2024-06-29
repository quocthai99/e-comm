import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./user/userSlice";
import authSlice from "./auth/authSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
  },
});

export default store;
