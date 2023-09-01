import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { productSlice } from "./slices/productSlice";
import { ProductState } from "../interface/Products";
import { authSlice } from "./slices/authSlice";
import { BearerToken, CurrentUser, CurrentUserInfo } from "../interface/Users";
import { currentUserSlice } from "./slices/currentUserSlice";
import { currentUserInfoSlice } from "./slices/currentUserInfoSlice";
import { persistedReducer } from "./persistConfig";

const rootReducer = combineReducers({
  product: productSlice.reducer,
  auth: authSlice.reducer,
  user: currentUserSlice.reducer,
  userInfo: currentUserInfoSlice.reducer,
});

const rootReducerWithPersistence = persistedReducer(rootReducer);

export const store = configureStore({
  reducer: rootReducerWithPersistence,
  //needed to ignore these sepcifically for redux-persists
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = {
  product: ProductState;
  auth: BearerToken;
  user: CurrentUser;
  userInfo: CurrentUserInfo;
};

export const persistor = persistStore(store);
