import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "integrify-fullstack-selvi", //this key has to be very unique!
  storage,
  blacklist: ["product"],
};

export const persistedReducer = (rootReducer: any) =>
  persistReducer(persistConfig, rootReducer);
