import { configureStore } from "@reduxjs/toolkit";
import DaoCreationSlice from "./Components/DaoManager/CreateDAO/DaoCreationSlice";
// import nameSlice from "./Components/DaoManager/CreateDAO/DaoCreationSlice";

const store = configureStore({
  reducer: {
    Alchemy: DaoCreationSlice,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
