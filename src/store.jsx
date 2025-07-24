import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "reduxjs-toolkit-persist";
import storage from "reduxjs-toolkit-persist/lib/storage";
import autoMergeLevel1 from "reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel1";
import storedDataReducer from "./redux/storedDataReducer";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import valuesReducer from "./redux/valuesReducer";


const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel1,
  whiteList: ["storedDataReducer", "valuesReducer",],
};

const middlewareHandler = (getDefaultMiddleware) => {
  return [
    ...getDefaultMiddleware({
      serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  ];
};

const reducers = combineReducers({
  storedDataReducer,
  valuesReducer,
});

const _persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: _persistedReducer,
  middleware: (getDefaultMiddleware) => 
    // middlewareHandler(getDefaultMiddleware),
    getDefaultMiddleware({serializableCheck:false})
});
