import { useDispatch } from "react-redux";

import { store } from "./store";

type AppDispatch = typeof store.dispatch;
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;

/* reference: https://redux.js.org/usage/usage-with-typescript#define-typed-hooks */
