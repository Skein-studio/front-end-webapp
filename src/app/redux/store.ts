// src/redux/store.ts

import { configureStore } from "@reduxjs/toolkit";
import nodesReducer from "./sketchSlice";

const store = configureStore({
  reducer: {
    nodes: nodesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
