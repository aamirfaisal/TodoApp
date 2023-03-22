import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from 'redux-persist/es/persistReducer';
import allTaskReducer from "../Slice";

const persistConfig = { key: 'root', storage: AsyncStorage }
const rootReducer = combineReducers({ allTaskReducer })
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const myStore = configureStore({ reducer: persistedReducer, middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }) })