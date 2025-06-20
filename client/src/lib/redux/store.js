import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { ApiService } from "./services/api.service";
import { authSlice } from "./slices/auth.slice";
import { layoutSlice } from "./slices/layout.slice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: [ApiService.reducerPath],
};

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [layoutSlice.name]: layoutSlice.reducer,
  [ApiService.reducerPath]: ApiService.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(ApiService.middleware),
});

export const persistor = persistStore(store);
