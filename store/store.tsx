import { configureStore } from "@reduxjs/toolkit";
import { movieApi } from "../services/movieApi";
import { userApi } from "../services/userApi";
import { actorApi } from "../services/actorApi";

export const store = configureStore({
  reducer: {
    [movieApi.reducerPath]: movieApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [actorApi.reducerPath]: actorApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(movieApi.middleware)
      .concat(userApi.middleware)
      .concat(actorApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
