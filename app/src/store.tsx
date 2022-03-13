import { configureStore } from "@reduxjs/toolkit";
import nameSlice from "./Components/DaoManager/CreateDAO/nameSlice";

const store = configureStore({
  reducer: {
    name: nameSlice,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
