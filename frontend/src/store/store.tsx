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
import storage from "redux-persist/lib/storage";

import { productSlice } from "./slices/productSlice";
import { ProductState } from "../interface/Products";
import { authSlice } from "./slices/authSlice";
import { BearerToken, CurrentUser, CurrentUserInfo } from "../interface/Users";
import { currentUserSlice } from "./slices/currentUserSlice";
import { currentUserInfoSlice } from "./slices/currentUserInfoSlice";
import { persistedReducer } from "./persistConfig";
import { OrderArray } from "../interface/Orders";
import { OrderProductArray } from "../interface/OrderProduct";
import { orderSlice } from "./slices/orderSlice";
import { orderProductSlice } from "./slices/orderProduct";

const appReducer = combineReducers({
  product: productSlice.reducer,
  auth: authSlice.reducer,
  user: currentUserSlice.reducer,
  userInfo: currentUserInfoSlice.reducer,
  orders: orderSlice.reducer,
  orderProducts: orderProductSlice.reducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "USER_LOGOUT") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const rootReducerWithPersistence = persistedReducer(appReducer);

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
  orders: OrderArray;
  orderProducts: OrderProductArray;
};

export const persistor = persistStore(store);
