import {combineReducers, configureStore} from "@reduxjs/toolkit";
import sliceModal from "./sliceModal";
import sliceTree from "./sliceTree";

export const rootReducer = combineReducers({
    sliceModal,
    sliceTree
});

export const setStore = () => configureStore({reducer: rootReducer});